import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';
import dotenv from 'dotenv';

dotenv.config();

convict.addFormat(convictFormatWithValidator.url);

const config = convict({
    port: {
        doc: 'The port to bind',
        format: 'port',
        default: 3000,
        env: 'PORT'
    },
    botToken: {
        doc: 'The Telegram bot token',
        format: String,
        default: '',
        env: 'BOT_TOKEN',
        sensitive: true
    },
    redisHost: {
        doc: 'The Redis host',
        format: String,
        default: 'localhost',
        env: 'REDIS_HOST'
    },
    redisPort: {
        doc: 'The Redis port',
        format: 'port',
        default: 6379,
        env: 'REDIS_PORT'
    },
    webhookUrl: {
        doc: 'The webhook URL for Telegram bot',
        format: 'url',
        default: '',
        env: 'WEBHOOK_URL'
    }
});

config.validate({ allowed: 'strict' });

export { config };