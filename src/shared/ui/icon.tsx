import { cx } from '@/shared/libs/cva'
import { SPRITES_META, type SpritesMap } from '@/shared/sprite.gen'
import type { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
	name: AnyIconName
}

export type AnyIconName = { [Key in keyof SpritesMap]: IconName<Key> }[keyof SpritesMap]
export type IconName<Key extends keyof SpritesMap> = `${Key}/${SpritesMap[Key]}`

export function Icon({ name, className, ...props }: IconProps) {
	const { viewBox, filePath, iconName, axis } = getIconMeta(name)

	return (
		<svg
			className={cx('sprite-icon', className)}
			viewBox={viewBox}
			data-axis={axis}
			focusable="false"
			aria-hidden
			{...props}
		>
			<use href={`/sprites/${filePath}#${iconName}`} />
		</svg>
	)
}

const getIconMeta = <Key extends keyof SpritesMap>(name: IconName<Key>) => {
	const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]]
	const {
		filePath,
		items: {
			[iconName]: { viewBox, width, height }
		}
	} = SPRITES_META[spriteName]
	const axis = width === height ? 'xy' : width > height ? 'x' : 'y'

	return { filePath, iconName, viewBox, axis }
}
