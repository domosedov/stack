import { createSearchParamsCache, parseAsInteger } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
	limit: parseAsInteger.withDefault(5)
})
