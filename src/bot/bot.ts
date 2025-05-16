import TelegramBot from 'node-telegram-bot-api';
import { config } from '../config/config';
import { scheduleReminder } from '../jobs/reminder.queue';

const botToken = config.get('botToken');
if (!botToken) {
    throw new Error('BOT_TOKEN is not set in environment variables');
}

export const bot = new TelegramBot(botToken, { webHook: false });

const webhookUrl = `${config.get('webhookUrl')}/webhook`;
console.log('=== Webhook Setup ===');
console.log('Setting webhook URL:', webhookUrl);

bot.setWebHook(webhookUrl).catch(error => {
    console.error('Failed to set webhook:', error);
    process.exit(1);
});

bot.on('message', (msg) => {
    console.log('=== Message Received ===');
    console.log('Chat ID:', msg.chat.id);
    console.log('Text:', msg.text);
    console.log('From:', msg.from?.username);
    console.log('Full message:', JSON.stringify(msg, null, 2));
});

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        await bot.sendMessage(chatId, 'Welcome! I will send you reminders every hour.');
        await scheduleReminder(chatId.toString(), '⏰ Hourly reminder: Time to check your tasks!');
    } catch (error) {
        console.error('Failed to schedule reminder:', error);
        await bot.sendMessage(chatId, 'Sorry, there was an error setting up your reminders.');
    }
});

process.once('SIGINT', () => {
    bot.deleteWebHook();
    process.exit(0);
});

process.once('SIGTERM', () => {
    bot.deleteWebHook();
    process.exit(0);
});
