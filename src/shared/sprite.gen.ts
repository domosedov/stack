export interface SpritesMap {
	lucide: 'chevron-up'
	tabler: 'brand-telegram' | 'selector'
}
export const SPRITES_META: {
	[Key in keyof SpritesMap]: {
		filePath: string
		items: Record<
			SpritesMap[Key],
			{
				viewBox: string
				width: number
				height: number
			}
		>
	}
} = {
	lucide: {
		filePath: 'lucide.svg',
		items: {
			'chevron-up': {
				viewBox: '0 0 24 24',
				width: 24,
				height: 24
			}
		}
	},
	tabler: {
		filePath: 'tabler.svg',
		items: {
			'brand-telegram': {
				viewBox: '0 0 24 24',
				width: 24,
				height: 24
			},
			selector: {
				viewBox: '0 0 24 24',
				width: 24,
				height: 24
			}
		}
	}
}
