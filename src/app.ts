import express, { Request, Response } from 'express';
import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 4000; 

// Middleware (optional, but commonly used for parsing JSON bodies)
app.use(express.json());

// Define a basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello dddd'); // Handles GET requests to the root path.
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Logs a message when the server starts listening.
});