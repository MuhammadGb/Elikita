import { BiArrowBack } from "react-icons/bi";
import { Button } from "../button";
import { useRouter } from "next/navigation";

const TablePermissionDenied = () => {
	const router = useRouter();
	return (
		<div className='h-[30vh] flex flex-col items-center justify-center'>
			<h1 className='text-base font-normal text-gray-400'>
				You do not have permission to access this Data
			</h1>
			<Button
				variant='outline'
				size='sm'
				className='text-white mt-4 bg-brand-1000 hover:bg-brand-1000 hover:text-white flex items-center gap-2 max-sm:p-1 max-sm:text-[10px]'
				onClick={() => router.back()}
			>
				<BiArrowBack />
				Back
			</Button>
		</div>
	);
};

export default TablePermissionDenied;
