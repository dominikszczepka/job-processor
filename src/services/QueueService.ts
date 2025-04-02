import amqplib, { ChannelModel, Channel } from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

export class QueueService {
  private connection!: ChannelModel;
  private channel!: Channel;
  private readonly url: string;
  private readonly queueName: string;

  constructor() {
    this.url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    this.queueName = process.env.QUEUE_NAME || 'job_queue';
  }

  async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(this.url);
      this.channel = await this.connection?.createChannel();
      
      // Ensure the queue exists
      await this.channel?.assertQueue(this.queueName, {
        durable: true
      });

      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }

  async consume(callback: (message: any) => Promise<void>): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    try {
      await this.channel.consume(this.queueName, async (msg) => {
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString());
            await callback(content);
            this.channel?.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            // Reject the message and requeue it
            this.channel?.nack(msg, false, true);
          }
        }
      });
    } catch (error) {
      console.error('Error setting up consumer:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log('Connection closed');
    } catch (error) {
      console.error('Error closing connection:', error);
      throw error;
    }
  }
} 