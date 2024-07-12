import { getTodos } from '@/entities/todos/queries'
import { createQueryClient } from '@/shared/query_client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { searchParamsCache } from './search_params_cache'
import { TodosList } from './todos_list'

export async function Todos() {
	const limit = searchParamsCache.get('limit')
	console.log('RSC limit', limit)
	const queryClient = createQueryClient()
	await queryClient.prefetchQuery(getTodos({ limit }))
	const state = dehydrate(queryClient)

	return (
		<HydrationBoundary state={state}>
			<TodosList />
		</HydrationBoundary>
	)
}
