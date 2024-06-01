import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['chart.js'],
  },
});



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
 
//   plugins: [react()],
//   server: {
//     hmr: {
//       overlay: true,
//     },
//   },
// })


