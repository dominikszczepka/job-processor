import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import Record from '../models/Record';
import sequelize from '../config/database';

dotenv.config();

export class MessageProcessor {
    private readonly ai: GoogleGenAI;
    constructor() {
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    async archivizeMessage(message: any){
        const parsed_message = JSON.parse(message);
        
    }

    async processMessage(message: any): Promise<void> {
        await this.archivizeMessage(message); // Call archive logic
        
        const prompt = `${message}`; // Placeholder - update with proper prompt formatting
        const response = await this.ai.models.generateContent({
            model: "gemma-3-27b-it",
            contents: prompt,
          });
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
