import { Worker, Job } from "bullmq";
import { config } from "../config/config";
import { bot } from "../bot/bot";

const reminderWorker = new Worker(
    "reminder",
    async (job: Job) => {
        const { chatId, message } = job.data;
        try {
            await bot.sendMessage(chatId, message);
        } catch (error) {
            console.error(`Failed to send reminder to chat ${chatId}:`, error);
            throw error;
        }
    },
    {
        connection: {
            host: config.get('redisHost'),
            port: config.get('redisPort')
        }
    }
);

reminderWorker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

reminderWorker.on('failed', (job, error) => {
    console.error(`Job ${job?.id} failed:`, error);
});

export { reminderWorker };

