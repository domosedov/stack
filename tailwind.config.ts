import type { Config } from 'tailwindcss'
//@ts-expect-error no public types
import animatedPlugin from 'tailwindcss-animated'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			data: {
				'state-open': 'state="open"',
				'state-closed': 'state="closed"'
			}
		}
	},
	plugins: [animatedPlugin]
}
export default config
