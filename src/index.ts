import { MessageProcessor } from './services/MessageProcessor';
import { QueueService } from './services/QueueService';
import sequelize from './config/database';

async function main() {
  const queueService = new QueueService();
  const messageProcessor = new MessageProcessor();

  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync();
    console.log('Database synchronized.');

    // Connect to RabbitMQ
    await queueService.connect();

    // Start consuming messages
    console.log('Starting to consume messages...');
    await queueService.consume(messageProcessor.processMessage.bind(messageProcessor));

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down...');
      await queueService.close();
      await sequelize.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Application error:', error);
    await queueService.close();
    await sequelize.close();
    process.exit(1);
  }
}

main(); 