import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [react(), tailwindcss()],
		define: {
			'process.env': {
				NODE_ENV: JSON.stringify(mode),
				VITE_API_URL: JSON.stringify(env.VITE_API_URL),
			},
		},
		server: {
			open: true,
		},
	};
});
