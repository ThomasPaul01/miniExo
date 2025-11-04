import express, { Request, Response } from 'express'
import { average } from './lib'

const app = express()

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running!')
})


app.post('/average', (req: Request, res: Response) => {
    const numbers: number[] = req.body.numbers;
    if (!Array.isArray(numbers) || numbers.some(num => typeof num !== 'number')) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of numbers.' });
    }
    const result = average(numbers);
    res.json({ average: result });
});

export default app;