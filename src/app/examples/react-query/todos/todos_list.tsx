'use client'

import { getTodos } from '@/entities/todos/queries'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export const TodosList = () => {
	const searchParams = useSearchParams()
	const limit = +(searchParams?.get('limit') ?? 5)
	const { data, isFetching, fetchStatus } = useQuery(getTodos({ limit }))
	const queryClient = useQueryClient()

	return (
		<>
			<p>Status: {fetchStatus}</p>
			<ul>
				{data?.map((todo, i) => (
					<li key={todo.id}>
						{i + 1}:{todo.title}
					</li>
				))}
				{isFetching && <li>Fetching wow...</li>}
			</ul>
			<button
				onClick={async () => {
					await queryClient.invalidateQueries({
						queryKey: ['todos', { limit: 5 }]
					})
				}}
			>
				Invalidate
			</button>
		</>
	)
}
