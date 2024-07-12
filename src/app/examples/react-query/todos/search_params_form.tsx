'use client'

import { parseAsInteger, useQueryState } from 'nuqs'

export const SearchParamsForm = () => {
	const [limit, setLimit] = useQueryState(
		'limit',
		parseAsInteger.withDefault(5).withOptions({
			shallow: true,
			throttleMs: 2000,
			clearOnDefault: true
		})
	)

	return (
		<form>
			<input
				type="number"
				name="limit"
				value={limit}
				onChange={(e) => setLimit(e.target.valueAsNumber)}
				className="border p-1"
			/>
			<button type="submit">Submit</button>
		</form>
	)
}
