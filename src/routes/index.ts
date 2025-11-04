import express, { Request, Response } from 'express'
import moviesRouter from './movies'

const app = express()


app.use(express.json()); 
//log
app.use((req, res, next) => logger(req, res, next));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Movies API
app.use('/movies', moviesRouter)

function logger(req: Request, _res: Response, next: express.NextFunction) {
  if (process.env.LOG_REQUEST_HEADERS === '1') {
    console.log('\n--- headerLogger: request.headers ---');
    console.log(req.headers);
    console.log('--- end headers ---\n');
  }
  next();
}
export default app;