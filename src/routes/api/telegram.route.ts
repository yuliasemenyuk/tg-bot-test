import { Router, Request, Response } from 'express';
import { bot } from '../../bot/bot';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('=== Root Route Hit ===');
    console.log('Time:', new Date().toISOString());
    res.send('Telegram bot is running');
});

router.post('/webhook', (req: Request, res: Response) => {
    try {
        if (!req.body) {
            res.status(400).send('No body in request');
            return;
        }

        bot.processUpdate(req.body);
        res.sendStatus(200);
    } catch (error: any) {
        console.error('Failed to process update:', error);
        res.sendStatus(500);
    }
});

export const telegramRouter = router;
