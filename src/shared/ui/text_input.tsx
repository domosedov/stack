'use client'

import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import type { AriaTextFieldProps } from 'react-aria'
import { useObjectRef, useTextField } from 'react-aria'
import { cx } from '../libs/cva'

type ForwardRef = ComponentRef<'input'>
type Props = AriaTextFieldProps & {
	labelSlot?: (props: ComponentPropsWithoutRef<'label'>) => ReactNode
}

export const TextInput = forwardRef<ForwardRef, Props>(({ labelSlot, ...props }, forwardedRef) => {
	const inputRef = useObjectRef(forwardedRef)
	const {
		inputProps: { className, ...restInputProps },
		labelProps
	} = useTextField(props, inputRef)

	return (
		<div className="flex flex-col gap-y-1 border border-dashed p-3">
			{typeof labelSlot === 'undefined' ? (
				<label {...labelProps}>{props.label}</label>
			) : (
				labelSlot({ ...labelProps, children: props.label })
			)}
			<input
				ref={inputRef}
				{...restInputProps}
				className={cx('border border-gray-300 aria-[invalid=true]:border-red-500', className)}
			/>
		</div>
	)
})

TextInput.displayName = 'TextInput'
