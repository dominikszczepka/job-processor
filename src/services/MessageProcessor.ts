import dotenv from 'dotenv';
import Record from '../models/Record';
import sequelize from '../config/database';
import { PromptsGenerator } from "./PromptsGenerator";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

// Define batch size limits in MB
const BATCH_SIZE_THRESHOLD_MB = 8;
// Convert MB to Bytes
const BATCH_SIZE_BYTES_THRESHOLD = BATCH_SIZE_THRESHOLD_MB * 1024 * 1024;

export class MessageProcessor {
    
    private s3Client: S3Client;
    private messageBuffer: any[] = [];
    private currentBatchSize: number = 0;
    private readonly archiveBucketName: string;
    private readonly llmUrl: string;

    constructor() {
        if (!process.env.AWS_REGION) {
            throw new Error("AWS_REGION environment variable is not set.");
        }
        if (!process.env.AWS_S3_ARCHIVE_BUCKET) {
            throw new Error("AWS_S3_ARCHIVE_BUCKET environment variable is not set.");
        }
        this.archiveBucketName = process.env.AWS_S3_ARCHIVE_BUCKET;
        this.s3Client = new S3Client({ region: process.env.AWS_REGION });
        if (!process.env.LLM_URL) {
            throw new Error("LLM_URL environment variable is not set.");
        }
        this.llmUrl = process.env.LLM_URL;
    }

    async archivizeMessage(message: string): Promise<void> {
        try {
            const parsedMessage = JSON.parse(message);
            const messageSizeBytes = Buffer.byteLength(message, 'utf8');

            this.messageBuffer.push(parsedMessage);
            this.currentBatchSize += messageSizeBytes;

            if (this.currentBatchSize >= BATCH_SIZE_BYTES_THRESHOLD) {
                await this._uploadArchiveBatch();
            }
        } catch (error) {
            console.error('Error processing message for archival:', error);
        }
    }

    private async _uploadArchiveBatch(): Promise<void> {
        const batch = this.messageBuffer;
        if (batch.length === 0) {
            return;
        }

        console.log(`Uploading batch of ${batch.length} messages.`);
        const batchString = JSON.stringify(batch);
        const batchSizeBytes = Buffer.byteLength(batchString, 'utf8');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const key = `archive-batch-${timestamp}.json`;

        const command = new PutObjectCommand({
            Bucket: this.archiveBucketName,
            Key: key,
            Body: batchString,
            StorageClass: 'DEEP_ARCHIVE',
            ContentType: 'application/json'
        });

        try {
            await this.s3Client.send(command);
            console.log(`Successfully uploaded batch ${key} (${batchSizeBytes} bytes) to S3 Glacier Deep Archive.`);
            this.messageBuffer = [];
            this.currentBatchSize = 0;
        } catch (error) {
            console.error(`Failed to upload batch ${key} to S3:`, error);
        }
    }

    async processMessage(message: any): Promise<void> {
        await this.archivizeMessage(message); // Call archive logic
        
        const promptsGenerator = new PromptsGenerator(); // Create an instance
        const prompt = promptsGenerator.generateJobOfferPrompt(message); // Call on the instance

        const apiResponse = await fetch(this.llmUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "model": "gemma3:27b",
                "prompt": prompt
            }),
        });
        const response = await apiResponse.json();
        if (!response.text)
            throw Error('Returned no text from LLM Api');

        const transaction = await sequelize.transaction();
        try {
            const record = JSON.parse(response.text);
            // Ensure record contains externalId before creating
            if (!record || typeof record.externalId !== 'string') {
                throw new Error('Invalid record format: externalId is missing or not a string.');
            }

            const dbRecord = await Record.create(
                {
                    data: record, // Store the entire parsed object
                    externalId: record.externalId // Extract externalId from the parsed record
                },
                { transaction }
            );
            console.log('Added new record with Id: ', dbRecord.id)
            await transaction.commit();

        } catch (error) {
            console.error('Error processing message:', error);
            await transaction.rollback();
            throw error;
        }
    }
}
