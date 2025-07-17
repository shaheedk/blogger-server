import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './configs/db';
import adminRouter from './routes/AdminRoutes';
import blogRouter from './routes/blogRoutes';


const app = express();
const PORT = process.env.PORT || 4000; 



// Middlewares 
app.use(express.json());
app.use(cors())

 connectDB()

//  Routes 
app.get('/', (req: Request, res: Response) => {
    res.send('Api working'); 
});

app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
export default app;