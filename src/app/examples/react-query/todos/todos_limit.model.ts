import { createEvent, createStore, sample } from 'effector'

export const $limit = createStore(3, { sid: 'todos-limit' })
export const limitChanged = createEvent<number>()
sample({ clock: limitChanged, target: $limit, fn: (newLimit) => newLimit })
