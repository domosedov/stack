'use client'

import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverPortal,
	PopoverTrigger
} from '@radix-ui/react-popover'
import { createStore } from 'effector'
import { useList } from 'effector-react'

const data = createStore([
	{ id: 1, name: 'Hello', email: 'hello@example.com' },
	{ id: 2, name: 'World', email: 'world@example.com' },
	{ id: 3, name: 'Foo', email: 'foo@example.com' }
])

export default function Page() {
	return (
		<div>
			<h1>Popover</h1>
			{useList(data, {
				getKey: ({ id, email }) => id + email,
				fn: ({ id, name }) => (
					<div className="">
						<p>ID: {id}</p>
						<Popover>
							<p>Name: {name}</p>
							<PopoverTrigger>OpenDetails</PopoverTrigger>
							<PopoverAnchor />
							<PopoverPortal>
								<PopoverContent>
									Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные
									тексты. Вопрос страна однажды несколько семантика выйти взгляд даже единственное
									за!
								</PopoverContent>
							</PopoverPortal>
						</Popover>
					</div>
				)
			})}
		</div>
	)
}
