import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
// REMOVE THE FOLLOWING LINE
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // REMOVE THE FOLLOWING LINE
    // componentTagger()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
