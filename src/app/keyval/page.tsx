'use client'

import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import { createEvent, createStore, sample } from 'effector'
import { createGate, useGate, useStoreMap, useUnit } from 'effector-react'
import { produce } from 'immer'
import { nanoid } from 'nanoid'
import { useReducer, useRef, useState } from 'react'

type PopoverId = string

const $popoverKeyVal = createStore<Record<PopoverId, boolean>>({})
const changePopover = createEvent<{ id: PopoverId; isOpen: boolean }>()
const togglePopover = createEvent<PopoverId>()
const removePopover = createEvent<PopoverId>()

const PopoverGate = createGate<PopoverId>()

sample({
	clock: changePopover,
	source: $popoverKeyVal,
	fn: (kv, { id, isOpen }) =>
		produce(kv, (draft) => {
			draft[id] = isOpen
		}),
	target: $popoverKeyVal
})

sample({
	clock: togglePopover,
	source: $popoverKeyVal,
	fn: (kv, id) =>
		produce(kv, (draft) => {
			draft[id] = !draft[id]
		}),
	target: $popoverKeyVal
})

sample({
	clock: removePopover,
	source: $popoverKeyVal,
	fn: (kv, id) =>
		produce(kv, (draft) => {
			delete draft[id]
		}),
	target: $popoverKeyVal
})

sample({
	clock: PopoverGate.close,
	source: $popoverKeyVal,
	fn: (kv, id) =>
		produce(kv, (draft) => {
			delete draft[id]
		}),
	target: $popoverKeyVal
})

$popoverKeyVal.watch((kv) => {
	console.log('kv', kv)
})

export default function Page() {
	const [_, forceRender] = useReducer((x) => x + 1, 0)
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="container mx-auto p-4">
			<h1>Keyval</h1>
			<button onClick={forceRender}>Force render</button>
			<button onClick={() => setIsOpen((x) => !x)}>Toggle</button>
			{isOpen && (
				<div className="mt-4 flex gap-3">
					{Array.from({ length: 3 }).map((_, i) => (
						<DemoPopover key={i} />
					))}
				</div>
			)}
		</div>
	)
}

function DemoPopover() {
	const id = useRef(nanoid())

	const isOpen = useStoreMap({
		store: $popoverKeyVal,
		keys: [id.current],
		fn: (kv, [id]) => kv[id],
		defaultValue: false
	})

	const change = useUnit(changePopover)

	useGate(PopoverGate, id.current)

	return (
		<Popover open={isOpen} onOpenChange={(isOpen) => change({ id: id.current, isOpen })}>
			<PopoverTrigger className="rounded-lg border border-gray-300 p-1.5 px-3">Open</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent
					sideOffset={4}
					className="w-60 rounded-lg border border-gray-300 bg-white p-2 shadow-md"
				>
					<div>
						Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
						Жизни имени переписали бросил, о парадигматическая наш предложения на берегу большого!
					</div>
				</PopoverContent>
			</PopoverPortal>
		</Popover>
	)
}
