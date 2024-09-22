import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    apiUrl: "http://localhost:3000/api/"
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
});
