// @ts-expect-error effector does not have public types of withFactory
import { withFactory as _withFactory } from 'effector'

type WithFactory = <R>({
	sid,
	name,
	loc,
	method,
	fn
}: {
	sid: string
	name?: string
	loc?: unknown
	method?: string
	fn: () => R
}) => R

export const withFactory = _withFactory as WithFactory
