import axios from 'axios';
const API_BASE = '/api';
const client = axios.create({
    baseURL: API_BASE,
    timeout: 120000, // 2 minute timeout for redesigns
});
export const apiClient = {
    fetchPage: async (url) => {
        const { data } = await client.post('/fetch-page', { url });
        return data;
    },
    redesign: async (html, userPrompt, sessionId) => {
        const { data } = await client.post('/redesign', {
            html,
            userPrompt,
            sessionId,
        });
        return data;
    },
    suggest: async (html, sessionId) => {
        const { data } = await client.post('/suggest', {
            html,
            sessionId,
        });
        return data;
    },
};
