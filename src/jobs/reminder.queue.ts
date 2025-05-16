import { Queue } from "bullmq";
import { config } from "../config/config";

const reminderQueue = new Queue("reminder", {
    connection: {
        host: config.get('redisHost'),
        port: config.get('redisPort')
    }
});

export async function scheduleReminder(chatId: string, message: string) {
    await reminderQueue.add(
        `reminder-${chatId}`,
        { chatId, message },
        {
            repeat: {
                pattern: '0 * * * *', // every hour at minute 0
                jobId: `reminder-${chatId}`
            }
        }
        );
}

// export async function removeReminder(chatId: string) {
//     await reminderQueue.removeRepeatableByKey(`reminder-${chatId}`);
// }
