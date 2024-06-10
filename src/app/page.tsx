import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogTrigger
} from '@/shared/ui/dialog'
import { Icon } from '@/shared/ui/icon'
import { allSettled, fork, serialize } from 'effector'
import { query } from './model'

export default async function Home() {
	const scope = fork()
	await allSettled(query.refresh, { scope })

	console.log('sid', query.__.meta.sid)

	return (
		<main className="mx-auto max-w-screen-xl px-4">
			<h1>Page</h1>
			<Icon name="tabler/selector" className="text-[300px]" />
			<Icon name="tabler/brand-telegram" className="stroke-[10] text-[300px]" />
			<pre>{JSON.stringify(serialize(scope), null, 2)}</pre>
			<Dialog>
				<DialogTrigger className="flex items-center gap-x-2 rounded border p-2 text-2xl">
					<Icon name="lucide/chevron-up" />
					<span>Open</span>
				</DialogTrigger>
				<DialogPortal>
					<DialogOverlay />
					<DialogContent
						position="top"
						animated
						className="bg-black font-mono text-xl/6 text-lime-400"
					>
						Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
						Свое, города составитель о ее деревни страна он риторический которое собрал родного даль
						взгляд правилами агентство залетают свой возвращайся заглавных?
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</main>
	)
}
