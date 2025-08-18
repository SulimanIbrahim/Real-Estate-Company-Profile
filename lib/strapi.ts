import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStrapiURL = (path: string = '') => {
  return `${STRAPI_URL}${path}`;
};

export const getStrapiMedia = (url: string | null) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

// API Functions
export const fetchFromStrapi = async (endpoint: string, params?: any) => {
  try {
    const response = await strapiApi.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

export const postToStrapi = async (endpoint: string, data: any) => {
  try {
    const response = await strapiApi.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};
