import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryCore } from './query_core'
import { searchParamsCache } from './search_params_cache'
import { SearchParamsForm } from './search_params_form'
import { Todos } from './todos'

export default function TodosPage({
	searchParams
}: {
	searchParams: Record<string, string | string[] | undefined>
}) {
	searchParamsCache.parse(searchParams)

	return (
		<div>
			<h1>Todos SSR</h1>
			<SearchParamsForm />
			<QueryCore />
			<ErrorBoundary fallback={<div>Some error...</div>}>
				<Suspense fallback={<div>Loading todos...</div>}>
					<Todos />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
