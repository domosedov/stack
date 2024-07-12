'use client'

import { QueryClientProvider as Provider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { getQueryClient } from './query_client'

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
	return (
		<Provider client={getQueryClient()}>
			<ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
			<ReactQueryDevtools initialIsOpen={false} />
		</Provider>
	)
}
