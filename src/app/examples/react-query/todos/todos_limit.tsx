'use client'

import { useUnit } from 'effector-react'
import { $limit, limitChanged } from './todos_limit.model'

export const TodosLimit = () => {
	const [limit, setLimit] = useUnit([$limit, limitChanged])
	return (
		<div className="rounded border border-dashed p-2">
			<h1>Todos SSR</h1>
			<p>Limit: {limit}</p>
			<input
				type="number"
				value={limit}
				onChange={(e) => setLimit(e.target.valueAsNumber)}
				className="border p-1"
			/>
		</div>
	)
}
