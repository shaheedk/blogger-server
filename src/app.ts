import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './configs/db';


const app = express();
const PORT = process.env.PORT || 4000; 



// Middlewares 
app.use(express.json());
app.use(cors())

 connectDB()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello dd'); 
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
export default app;