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
			},
			colors: {
				background: 'oklch(var(--color-background) / <alpha-value>)',
				foreground: 'oklch(var(--color-foreground) / <alpha-value>)',
				primary: 'oklch(var(--color-primary) / <alpha-value>)',
				border: 'oklch(var(--color-primary))'
			}
		}
	},
	plugins: [
		twPlugin(function ({ addComponents, theme }) {
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
				},
				'.input-border': {
					borderWidth: '1px',
					borderStyle: 'solid',
					borderColor: theme('colors.red.500'),
					'@media (prefers-color-scheme: dark)': {
						borderColor: theme('colors.red.100')
					}
				}
			})
		})
	]
}
export default config
