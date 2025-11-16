import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Загружаем env переменные based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    
    // Настройки сервера разработки
    server: {
      port: 3000,
      open: true, // Автоматически открывать браузер
      proxy: {
        // Прокси для API запросов к json-server
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    },
    
    // Настройки preview сервера
    preview: {
      port: 4173,
      open: true
    },
    
    // Настройки сборки
    build: {
      outDir: 'dist',
      sourcemap: true, // Генерация source maps для отладки
      rollupOptions: {
        output: {
          // Разделение vendor и app кода
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@mui/material', '@mui/icons-material'],
            utils: ['lodash', 'date-fns', 'axios']
          },
          // Чанки для асинхронных маршрутов
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      // Чанк предупреждения размера
      chunkSizeWarningLimit: 1000
    },
    
    // Разрешение путей (алиасы)
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@services': resolve(__dirname, './src/services'),
        '@types': resolve(__dirname, './src/types'),
        '@utils': resolve(__dirname, './src/utils'),
        '@styles': resolve(__dirname, './src/styles'),
        '@stores': resolve(__dirname, './src/stores'),
        '@constants': resolve(__dirname, './src/utils/constants')
      }
    },
    
    // Глобальные CSS переменные
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/variables.scss";`
        }
      }
    },
    
    // Переменные окружения
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
    },
    
    // Оптимизации
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@mui/material',
        '@mui/icons-material'
      ],
      exclude: ['js-big-decimal']
    }
  };
});