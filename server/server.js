import express from 'express';
import 'dotenv/config';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req,res) => {
    res.status(200).send("App is running");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
