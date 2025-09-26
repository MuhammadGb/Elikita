import { Check, Minus, TriangleAlert, X } from "lucide-react";

const TableStatus = ({ statusType }) => {
	const status = {
		PENDING: {
			Icon: <TriangleAlert className='w-[10px] h-[10px]  font-bold text-white' />,
			bgColor: "#FFF6E3",
			color: "#FFBB38",
		},
		COMPLETED: {
			Icon: <Check className='w-[10px] h-[10px]  font-bold text-white' />,
			bgColor: "#E5FFF7",
			color: "#00C781",
		},
		RESCHEDULED: {
			Icon: <Minus className='w-[10px] h-[10px] font-bold text-white' />,
			bgColor: "#E4EAEF",
			color: "#394E75",
		},
		CANCELED: {
			Icon: <X className='h-[10px] font-bold text-white w-[10px]' />,
			bgColor: "#FFEDED",
			color: "#FF4040",
		},
	};

	return (
		<span
			className={`inline-flex gap-1 p-1 text-xs rounded-lg bg-[${status[statusType]?.bgColor}]`}
			style={{
				backgroundColor: status[statusType]?.bgColor,
				color: status[statusType]?.color,
			}}
		>
			<span
				className='flex items-center justify-center w-4 h-4 rounded-full'
				style={{ backgroundColor: status[statusType]?.color }}
			>
				{status[statusType]?.Icon}
			</span>
			{statusType}
		</span>
	);
};

export default TableStatus;
