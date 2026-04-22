import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchPageRoute } from './routes/fetch.js';
import { redesignRoute, suggestRoute } from './routes/redesign.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/fetch-page', fetchPageRoute);
app.post('/api/redesign', redesignRoute);
app.post('/api/suggest', suggestRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
