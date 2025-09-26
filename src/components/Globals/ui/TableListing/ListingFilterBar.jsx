"use client";
import { Button } from "@/components/Globals/ui/button";
import { useEffect, useState } from "react";

const ListingFilterBar = ({ setFilter, filter }) => {
	const [filterStatus, setFilterStatus] = useState([
		{ name: "", active: false },
		{ name: "PENDING", active: false },
		{ name: "RESCHEDULED", active: false },
		{ name: "COMPLETED ", active: false },
		{ name: "CANCELED", active: false },
	]);

	const handleStatusChange = (name) => {
		setFilter(name);
	};

	useEffect(() => {
		const findIndex = filterStatus.findIndex(
			(status) => status.name === filter
		);
		const copy = [...filterStatus];
		const reset = copy.map((item) => ({
			name: item.name,
			active: false,
		}));
		reset[findIndex] = {
			...copy[findIndex],
			active: true,
		};

		setFilterStatus(reset);
	}, [filter]);

	return (
		<div className='flex flex-col gap-2 xl:justify-between xl:items-center xl:flex-row'>
			<div className='flex gap-2 max-w-[800px] flex-wrap'>
				{filterStatus.map(({ name, active }) => (
					<Button
						key={name}
						onClick={() => handleStatusChange(name)}
						size='xs'
						className={`p-1 px-4 text-xs font-normal ${
							active || filter === name
								? "bg-brand-1000 text-white hover:bg-brand-1000/90"
								: "bg-[#F1F1F1] text-brand-1000 hover:bg-[#F2F1F1]/40"
						}`}
					>
						{name || "ALL"}
					</Button>
				))}
			</div>
		</div>
	);
};

export default ListingFilterBar;
