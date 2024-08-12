'use client'
import { TextInput } from '@/shared/ui/text_input'
import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogTrigger
} from '@radix-ui/react-dialog'
import { Button } from 'react-aria-components'

export default function Page() {
	return (
		<div>
			<h1>Text Input</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault(), console.log('submit')
				}}
			>
				<TextInput
					labelSlot={({ children, ...props }) => {
						return (
							<label className="sr-only text-red-500" {...props}>
								{children}
							</label>
						)
					}}
					label={<div>Wowowowoow</div>}
					isRequired
					validationBehavior="aria"
				/>
				<TextInput label={<div>Wowowowoow</div>} />
				<TextInput label={'Wowowowoow'} isInvalid />
				<button type="submit">Submit</button>
			</form>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open dialog</Button>
				</DialogTrigger>
				<DialogPortal>
					<DialogOverlay>
						<DialogContent>
							<h2>Dialog Content</h2>
							<p>Dialog content goes here.</p>
						</DialogContent>
					</DialogOverlay>
				</DialogPortal>
			</Dialog>
		</div>
	)
}
