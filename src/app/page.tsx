import {
	Root as Dialog,
	Content as DialogContent,
	Overlay as DialogOverlay,
	Portal as DialogPortal,
	Trigger as DialogTrigger
} from '@/shared/ui/dialog'

export default function Home() {
	return (
		<main>
			<h1>Page</h1>
			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogPortal>
					<DialogOverlay />
					<DialogContent position="center">
						Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
						Свое, города составитель о ее деревни страна он реторический которое собрал родного даль
						взгляд правилами агентство залетают свой возвращайся заглавных?
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</main>
	)
}
