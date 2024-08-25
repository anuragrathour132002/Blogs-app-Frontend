import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This will bind the server to 0.0.0.0
    port: 3000,  // You can set this to any port that Render or your environment expects
  },
});
