import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createLoginLabApp() {
  const app = express();

  app.use(express.json());

  // Expose public runtime config endpoint to client UI (only non-sensitive public parameters)
  app.get('/api/config', (_req, res) => {
    res.json({
      authforgeBaseUrl: config.authforgeBaseUrl,
      googleClientId: config.googleClientId,
      googleAuthEnabled: config.googleAuthEnabled
    });
  });

  // Serve static assets (check dist/public or src/public)
  const publicDir = fs.existsSync(path.join(__dirname, 'public'))
    ? path.join(__dirname, 'public')
    : path.join(__dirname, '..', 'src', 'public');
  app.use(express.static(publicDir));

  // Single-page application fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const app = createLoginLabApp();
  app.listen(config.port, () => {
    console.log(`\n========================================`);
    console.log(`🧪 LoginLab Client Application Running`);
    console.log(`========================================`);
    console.log(`Port           : ${config.port}`);
    console.log(`AuthForge URL  : ${config.authforgeBaseUrl}`);
    console.log(`URL            : http://localhost:${config.port}`);
    console.log(`========================================\n`);
  });
}
