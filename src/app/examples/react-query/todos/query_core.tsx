'use client'
import type { Todo } from '@/entities/todos/types'
import { $queryClient } from '@/shared/query_client'
import { attach, createEvent, restore, sample } from 'effector'
import { useUnit } from 'effector-react'

const todosQueryFx = attach({
	source: { queryClient: $queryClient },
	effect: ({ queryClient }) =>
		queryClient.fetchQuery({
			queryKey: ['todos'],
			queryFn: () =>
				fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
					(res) => res.json() as Promise<Todo[]>
				),
			retry: 10,
			retryDelay: 5000
		})
})

const $todos = restore(todosQueryFx.doneData, [])
const fetchTodos = createEvent()

sample({ clock: fetchTodos, target: todosQueryFx })

export const QueryCore = () => {
	const [todos, getTodos] = useUnit([$todos, fetchTodos])

	return (
		<div>
			<h1>QueryCore</h1>
			<button onClick={() => getTodos()}>Get todos</button>
			<ul className="border border-red-500 p-5">
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	)
}
