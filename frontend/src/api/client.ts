import axios from 'axios';

const API_BASE = '/api';

export interface FetchPageResponse {
  html: string;
  screenshot: string;
  url: string;
}

export interface RedesignResponse {
  html: string;
  screenshot: string;
  sessionId: string;
}

export interface SuggestResponse {
  suggestions: string[];
  sessionId: string;
}

const client = axios.create({
  baseURL: API_BASE,
  timeout: 120000, // 2 minute timeout for redesigns
});

export const apiClient = {
  fetchPage: async (url: string): Promise<FetchPageResponse> => {
    const { data } = await client.post<FetchPageResponse>('/fetch-page', { url });
    return data;
  },

  redesign: async (
    html: string,
    userPrompt: string,
    sessionId?: string
  ): Promise<RedesignResponse> => {
    const { data } = await client.post<RedesignResponse>('/redesign', {
      html,
      userPrompt,
      sessionId,
    });
    return data;
  },

  suggest: async (html: string, sessionId?: string): Promise<SuggestResponse> => {
    const { data } = await client.post<SuggestResponse>('/suggest', {
      html,
      sessionId,
    });
    return data;
  },
};
