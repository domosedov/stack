import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { Todo } from './types'

type Config = {
	limit?: number
	start?: number
}

export const getTodos = (config?: Config) => {
	return queryOptions({
		queryKey: ['todos', config],
		queryFn: async ({ signal }) => {
			if (typeof config?.limit === 'number' && config.limit === 0) {
				throw new Error('limit must be a negative number')
			}

			signal.onabort = () => {
				console.log('Aborting')
			}

			const { limit = 5, start = 0 } = config || {}
			const url = new URL('https://jsonplaceholder.typicode.com/todos')
			url.searchParams.set('_limit', limit.toString())
			url.searchParams.set('_start', start.toString())
			const res = await fetch(url, { signal })

			if (!res.ok) {
				throw new Error('Network response was not ok', { cause: res })
			}
			return (await res.json()) as Todo[]
		},
		throwOnError: true,
		placeholderData: keepPreviousData
	})
}
