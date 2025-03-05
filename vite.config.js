import path from 'path'

export default {
  root: './frontend/src',
  base: '/',
  publicDir: '../../backend/static',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'backend/static/css')
    }
  }
}
