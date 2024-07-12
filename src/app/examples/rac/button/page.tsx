'use client'
import { Button } from '@/shared/ui/react-aria-components/button'
import { useEffect, useRef } from 'react'

export default function ButtonPage() {
	const div1Ref = useRef<HTMLDivElement>(null)
	const div2Ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleDiv1ClickCapture(e: MouseEvent) {
			console.log('Div 1 click captured', e.target, e.currentTarget)
		}

		function handleDiv2ClickCapture(e: MouseEvent) {
			console.log('Div 2 click captured', e.target, e.currentTarget)
		}

		const div1 = div1Ref.current
		const div2 = div2Ref.current

		div1?.addEventListener('click', handleDiv1ClickCapture, { capture: false })
		div2?.addEventListener('click', handleDiv2ClickCapture, { capture: true })

		return () => {
			div1?.removeEventListener('click', handleDiv1ClickCapture, { capture: false })
			div2?.removeEventListener('click', handleDiv2ClickCapture, { capture: true })
		}
	}, [])

	return (
		<div className="container mx-auto px-4 py-12">
			<h1>Button</h1>
			<p>This is a button</p>
			<section>
				<div ref={div1Ref}>
					<div
						ref={div2Ref}
						// onClickCapture={(e) => {
						// 	console.log('Div 2 click captured', e.target, e.currentTarget)
						// }}
						// onClick={(e) => {
						// 	console.log('Div 2 click', e.target, e.currentTarget)
						// }}
					>
						<Button
							className={
								'data-hovered:bg-blue-500 data-pressed:scale-95 data-pressed:duration-200 data-pressed:transition-transform rounded bg-red-500 px-6 py-1.5 text-white'
							}
						>
							Click me
						</Button>
						<button
							onClick={(e) => {
								console.log('Button clicked!', e.target, e.currentTarget)
							}}
							className="rounded bg-red-500 px-6 py-1.5 text-white"
						>
							Click me
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}
