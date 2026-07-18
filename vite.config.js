// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Creates a secure bridge pathway to route traffic smoothly
//       '/api/gemini': {
//         target: 'https://googleapis.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/gemini/, '/v1beta/models/gemini-1.5-flash:streamGenerateContent'),
//       },
//     },
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Create a direct path mapping that passes the full endpoint text to Google safely
      '/api/gemini': {
        target: 'https://googleapis.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/gemini/, '')
      }
    }
  }
})
