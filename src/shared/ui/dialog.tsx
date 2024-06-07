'use client'

import type { VariantProps } from '@/shared/libs/cva'
import { cva, cx } from '@/shared/libs/cva'
import {
	Close as _Close,
	Content as _Content,
	Description as _Description,
	Overlay as _Overlay,
	Portal as _Portal,
	Root as _Root,
	Title as _Title,
	Trigger as _Trigger
} from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef, ComponentRef } from 'react'
import { forwardRef } from 'react'

export const Root = _Root
export const Portal = _Portal

export const Trigger = forwardRef<
	ComponentRef<typeof _Trigger>,
	ComponentPropsWithoutRef<typeof _Trigger>
>(({ className, ...props }, ref) => <_Trigger ref={ref} className={cx('', className)} {...props} />)
Trigger.displayName = _Trigger.displayName

export const Close = forwardRef<
	ComponentRef<typeof _Close>,
	ComponentPropsWithoutRef<typeof _Close>
>(({ className, ...props }, ref) => <_Close ref={ref} className={cx('', className)} {...props} />)
Close.displayName = _Close.displayName

const content = cva({
	base: 'fixed left-1/2 w-[calc(100vw-theme(spacing.4))] max-w-screen-sm -translate-x-1/2 rounded bg-white p-4 shadow-md',
	variants: {
		position: {
			top: 'top-5',
			center: 'top-1/2 -translate-y-1/2'
		},
		animated: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		position: 'top'
	},
	compoundVariants: [
		{
			animated: true,
			position: 'top',
			className: ''
		}
	]
})

export const Content = forwardRef<
	ComponentRef<typeof _Content>,
	ComponentPropsWithoutRef<typeof _Content> & VariantProps<typeof content>
>(({ className, position, animated, ...props }, ref) => (
	<_Content ref={ref} className={content({ position, animated, className })} {...props} />
))
Content.displayName = _Content.displayName

export const Overlay = forwardRef<
	ComponentRef<typeof _Overlay>,
	ComponentPropsWithoutRef<typeof _Overlay>
>(({ className, ...props }, ref) => (
	<_Overlay
		ref={ref}
		className={cx('fixed inset-0 bg-black/30 backdrop-blur-sm', className)}
		{...props}
	/>
))
Overlay.displayName = _Overlay.displayName

export const Title = forwardRef<
	ComponentRef<typeof _Title>,
	ComponentPropsWithoutRef<typeof _Title>
>(({ className, ...props }, ref) => <_Title ref={ref} className={cx('', className)} {...props} />)
Title.displayName = _Title.displayName

export const Description = forwardRef<
	ComponentRef<typeof _Description>,
	ComponentPropsWithoutRef<typeof _Description>
>(({ className, ...props }, ref) => (
	<_Description ref={ref} className={cx('', className)} {...props} />
))
Description.displayName = _Description.displayName

export {
	Root as Dialog,
	Content as DialogContent,
	Description as DialogDescription,
	Overlay as DialogOverlay,
	Portal as DialogPortal,
	Title as DialogTitle,
	Trigger as DialogTrigger
}
