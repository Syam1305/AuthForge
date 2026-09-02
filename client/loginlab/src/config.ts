import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  authforgeBaseUrl: process.env.AUTHFORGE_BASE_URL || 'http://localhost:4000'
};
