
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// Import process to fix 'Property cwd does not exist on type Process' error
import process from 'process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This is necessary to make process.env.GROQ_API_KEY work in the browser with Vite
      'process.env.GROQ_API_KEY': JSON.stringify(env.GROQ_API_KEY)
    }
  }
})
