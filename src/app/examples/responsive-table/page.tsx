'use client'

import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogTrigger
} from '@/shared/ui/dialog'
import { useEffect, useRef } from 'react'

type ScrollPosition = {
	left: number
	top: number
}

function getScrollState(scrollPosition: ScrollPosition): 'x' | 'y' | 'both' | 'none' {
	if (scrollPosition.left > 0 && scrollPosition.top > 0) {
		return 'both'
	} else if (scrollPosition.left > 0) {
		return 'x'
	} else if (scrollPosition.top > 0) {
		return 'y'
	}
	return 'none'
}

function onScroll(e: Event) {
	const container = e.currentTarget as HTMLDivElement
	const { scrollLeft, scrollTop } = container
	const state = getScrollState({ left: scrollLeft, top: scrollTop })
	container.dataset.scroll = state
}

export default function ResponsiveTablePage() {
	const tableContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = tableContainerRef.current
		container?.addEventListener('scroll', onScroll)
		return () => {
			container?.removeEventListener('scroll', onScroll)
		}
	}, [])

	useEffect(() => {
		const container = tableContainerRef.current
		const headerColumns = container?.querySelectorAll('thead th')
		if (headerColumns && headerColumns.length > 0) {
			for (let i = 0; i < headerColumns.length; i++) {
				const column = headerColumns[i]
				const width = Math.round(column.getBoundingClientRect().width)
				container?.style.setProperty(`--column-${i}-width`, `${width}px`)
			}
		}
	}, [])

	return (
		<div className="mx-auto max-w-7xl px-4">
			<h1>Responsive Table Example</h1>
			<div
				ref={tableContainerRef}
				className="relative isolate mx-auto h-[640px] max-w-full overflow-auto border border-gray-500"
			>
				<table className="w-full min-w-[640px] table-auto font-mono text-sm">
					<thead>
						<tr className="bg-slate-200">
							<th className="sticky top-0 z-20 w-[min(10vw,200px)] bg-inherit p-2.5 text-left first:left-0 first:z-30">
								Name
							</th>
							<th className="sticky top-0 z-20 bg-inherit p-2.5 text-left">Position</th>
							<th className="sticky top-0 z-20 bg-inherit p-2.5 text-left">Office</th>
							<th className="sticky top-0 z-20 bg-inherit p-2.5 text-left">Age</th>
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 100 }).map((_, i) => (
							<tr key={i} className="odd:bg-gray-100 even:bg-white">
								<td className="w-[min(10vw,200px)] bg-inherit p-2.5 text-left first:sticky first:left-0 first:z-10 first:opacity-90">
									Tiger Nixon
								</td>
								<td className="bg-inherit p-2.5 text-left">System Architect</td>
								<td className="bg-inherit p-2.5 text-left">Edinburgh</td>
								<td className="bg-inherit p-2.5 text-left">61</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogPortal>
					<DialogOverlay />
					<DialogContent
						position="top"
						animated
						className="bg-black font-mono text-xl/6 text-lime-400"
					>
						Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.
						Свое, города составитель о ее деревни страна он риторический которое собрал родного даль
						взгляд правилами агентство залетают свой возвращайся заглавных?
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</div>
	)
}
