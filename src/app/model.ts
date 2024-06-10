import { withFactory } from '@/shared/libs/with_factory'
import { createQuery } from '@farfetched/core'
import { createEffect } from 'effector'

export const query = withFactory({
	fn: () =>
		createQuery({
			effect: createEffect({
				handler: async () => {
					const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
					return res.json()
				}
			})
		}),
	sid: 'myQuery'
})
