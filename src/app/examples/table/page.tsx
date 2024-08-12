'use client'

import type { Row } from '@tanstack/react-table'
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useRef, useState } from 'react'

const data = Array.from({ length: 100 }, (_, i) => ({
	id: i + 1,
	name: 'faker.person.fullName()',
	email: 'faker.internet.email()',
	phone: 'faker.phone.number()',
	country: 'faker.location.country()'
}))

type Item = (typeof data)[number]

export default function TablePage() {
	const defaultColumns = useMemo<ColumnDef<Item>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID'
			},
			{
				accessorKey: 'name',
				header: 'Name'
			},
			{
				accessorKey: 'email',
				header: 'Email'
			},
			{
				accessorKey: 'phone',
				header: 'Phone'
			},
			{
				accessorKey: 'country',
				header: 'Country'
			}
		],
		[]
	)

	const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

	const table = useReactTable({
		data,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		columnResizeMode: 'onChange',
		columnResizeDirection: 'ltr',
		debugTable: true
	})

	const { rows } = table.getRowModel()

	//The virtualizer needs to know the scrollable container element
	const tableContainerRef = useRef<HTMLDivElement>(null)

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => tableContainerRef.current,
		//measure dynamic row height, except in firefox because it measures table border height incorrectly
		measureElement:
			typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 5
	})

	return (
		<div className="app">
			({data.length} rows)
			<div className="relative isolate h-[800px] overflow-auto border" ref={tableContainerRef}>
				<table className="grid" style={{ width: table.getCenterTotalSize() }}>
					<thead className="sticky top-0 z-10 grid bg-gray-100">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="flex w-full">
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											style={{
												width: header.getSize()
											}}
											className="relative flex p-2"
										>
											<div
												{...{
													className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
													onClick: header.column.getToggleSortingHandler()
												}}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: ' 🔼',
													desc: ' 🔽'
												}[header.column.getIsSorted() as string] ?? null}
											</div>
											<div
												{...{
													onDoubleClick: () => header.column.resetSize(),
													onMouseDown: header.getResizeHandler(),
													onTouchStart: header.getResizeHandler(),
													className: `w-1 absolute cursor-grab h-full bg-black right-0 top-0 ${
														header.column.getIsResizing() ? 'isResizing' : ''
													}`
												}}
											/>
										</th>
									)
								})}
							</tr>
						))}
					</thead>
					<tbody
						style={{
							display: 'grid',
							height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
							position: 'relative' //needed for absolute positioning of rows
						}}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const row = rows[virtualRow.index] as Row<Item>
							return (
								<tr
									data-index={virtualRow.index} //needed for dynamic row height measurement
									ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
									key={row.id}
									className="absolute flex w-full"
									style={{
										transform: `translateY(${virtualRow.start}px)` //this should always be a `style` as it changes on scroll
									}}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<td
												key={cell.id}
												style={{
													display: 'flex',
													width: cell.column.getSize()
												}}
												className="overflow-hidden p-2"
											>
												<div className="bg-gray-100">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</div>
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
