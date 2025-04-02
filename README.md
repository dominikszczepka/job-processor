# Job Processor

A TypeScript Node.js application that processes messages from a RabbitMQ queue.

## Prerequisites

- Node.js (v14 or higher)
- RabbitMQ server running locally or accessible via network
- npm or yarn package manager

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
RABBITMQ_URL=amqp://localhost:5672
QUEUE_NAME=job_queue
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Features

- Connects to RabbitMQ queue
- Processes messages asynchronously
- Handles message acknowledgment and requeuing
- Graceful shutdown handling
- Error handling and logging

## Message Format

The application expects messages in JSON format. Example:
```json
{
  "id": "123",
  "type": "job",
  "data": {
    "task": "process_data",
    "parameters": {
      "input": "sample_data"
    }
  }
}
```

## Error Handling

- Failed messages are requeued automatically
- Connection errors are logged and handled gracefully
- Application can be shut down gracefully using Ctrl+C 