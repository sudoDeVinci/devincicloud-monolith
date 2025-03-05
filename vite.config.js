import path from 'path'

export default {
  root: './src',
  base: '/',
  publicDir: '../static',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/css')
    }
  }
}
