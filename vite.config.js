import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({}) => {
	return {
		base: '/',
		plugins: [
			vue(),
			Components({}),
			AutoImport({
				imports: [
					'vue',
					'vue-router',
					'pinia'
				],
				dirs: [
					'./src/stores',
				]
			}),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	}
})
