import type { Config } from 'tailwindcss'
import twPlugin from 'tailwindcss/plugin'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			data: {
				'state-open': 'state="open"',
				'state-closed': 'state="closed"',
				focused: 'focused=true',
				hovered: 'hovered=true',
				pressed: 'pressed=true'
			}
		}
	},
	plugins: [
		twPlugin(function ({ addComponents }) {
			addComponents({
				'.sprite-icon': {
					boxSizing: 'border-box',
					display: 'inline-block',
					userSelect: 'none',
					fill: 'currentColor',
					color: 'inherit',
					'&[data-axis*="x"]': {
						width: '1em'
					},
					'&[data-axis*="y"]': {
						height: '1em'
					}
				}
			})
		})
	]
}
export default config
