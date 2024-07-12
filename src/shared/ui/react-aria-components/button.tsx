import type { ComponentRef } from 'react'
import { forwardRef } from 'react'
import type { ButtonProps } from 'react-aria-components'
import { Button as RAC_Button } from 'react-aria-components'

export const Button = forwardRef<ComponentRef<typeof RAC_Button>, ButtonProps>((props, ref) => (
	<RAC_Button {...props} ref={ref} />
))

Button.displayName = 'Button'
