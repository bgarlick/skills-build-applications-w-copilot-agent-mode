import 'dotenv/config';

export const port = Number(process.env.PORT || 8000);

export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;