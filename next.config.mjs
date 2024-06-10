// @ts-check
import svg from '@neodx/svg/webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.plugins.push(
				svg({
					root: 'src/assets/icons',
					output: 'public/sprites',
					group: true,
					fileName: process.env.NODE_ENV === 'production' ? '{name}.{hash:8}.svg' : '{name}.svg',
					metadata: {
						path: 'src/shared/sprite.gen.ts',
						runtime: {
							size: true,
							viewBox: true
						}
					},
					resetColors: {
						keep: ['none'],
						replaceUnknown: 'currentColor'
					}
				})
			)
		}
		return config
	},
	experimental: {
		typedRoutes: true
	}
}

export default nextConfig
