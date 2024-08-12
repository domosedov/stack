import { QueryCache, QueryClient } from '@tanstack/query-core'
import { defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query'
import { createStore } from 'effector'

export const $queryClient = createStore(
	new QueryClient({
		queryCache: new QueryCache()
	})
)

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 10 * 1000
			},
			dehydrate: {
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
	if (isServer) {
		return createQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = createQueryClient()
		return browserQueryClient
	}
}
