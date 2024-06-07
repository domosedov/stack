// @ts-expect-error effector does not have public types of withFactory
import { withFactory as withFactoryRow } from 'effector'

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

export const withFactory = withFactoryRow as WithFactory
