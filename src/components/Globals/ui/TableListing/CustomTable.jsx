"use client";
import ConfirmAppointment from "@/components/frontdesk/Dashboard/Appointmentts/ConfirmAppointment/ConfirmAppoinment";
import SearchBar from "@/components/frontdesk/Dashboard/Patient/SearchBar";
import { CustomDatePicker } from "@/components/frontdesk/Dashboard/ReferralsInternal/DateRangePicker";
import { getAccessCodes } from "@/utils";
import { Loader, PackageCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCalendarCheck2 } from "react-icons/lu";
import { Button } from "../button";
import ListingFilterBar from "./ListingFilterBar";
import TableEmptyState from "./TableEmptyState";
import TableListing from "./TableListing";
import TableListingPagination from "./TableListingPagination";
import TableListingSelect from "./TableListingSelect";
import TablePermissionDenied from "./TablePermissionDenied";
const CustomTable = ({
	tableHeaders,
	tableRows,
	setclearResult,

	showPermisionDenied,
	setFilterStatus,
	setStartDate,
	setEndDate,
	setInView,
	inView,
	setSearchTerm,
	searchTerm,
	currentPage,
	handleClick,
	totalPages,
	isLoading,
	rawData,
	handleSearch,
	isSearched,
	setisSearched,
	filterStatus,
	searchRef,
	settriggerSearch,
}) => {
	const [showDetailModal, setShowDetailModal] = useState(false);
	const accessCodes = getAccessCodes();
	const router = useRouter();
	return (
		<>
			<div className="relative rounded-l-xl border-l-blue-600 border-l-[6px] z-10 w-[100%]  h-auto mb-4 bg-white  rounded-[5px] border shadow-sm py-2 px-3 ">
			<h4>Appointment</h4>
			<div className='flex flex-col gap-5 px-3 xl:justify-between xl:items-center xl:flex-row'>
				<ListingFilterBar setFilter={setFilterStatus} filter={filterStatus} />
				<div className='flex flex-col gap-2 sm:flex-row '>
					{/* <Button
						className='flex items-center gap-2 max-sm:p-1 max-sm:text-[10px] bg-brand-1000 hover:bg-brand-1000'
						onClick={() => setShowDetailModal(true)}
					
					>
						<PackageCheck className='w-4 h-4 mr-1' />
						Confirm Appointment
					</Button> */}

					<Link href='/frontdesk/appointment/create' className='block w-full'>
						<Button className='flex items-center gap-2 max-sm:p-1 max-sm:text-[10px] bg-brand-1000 hover:bg-brand-1000'>
							<LuCalendarCheck2 className='w-4 h-4 mr-1' />
							Create New Appointment
						</Button>
					</Link>
				</div>
			</div>

			<div className='px-2 py-2 '>
				<div ref={searchRef} className='flex items-center gap-4 '>
					<SearchBar
						searchParam={searchTerm}
						setSearchParam={setSearchTerm}
						text='appointments'
					/>
					<CustomDatePicker
						setStartDate={setStartDate}
						setEndDate={setEndDate}
					/>
					<Button
						variant='outline'
						size='sm'
						className='text-brand-400 hover:text-brand-400 border border-brand-100 hover:bg-transparent flex items-center gap-2 max-sm:p-1 max-sm:text-[10px]'
						onClick={() => handleSearch()}
					>
						<FaSearch />
					</Button>

					{isSearched && (
						<Button
							variant='outline'
							size='sm'
							className='text-red-700 hover:text-red-700 border border-red-700 hover:bg-transparent flex items-center gap-2 max-sm:p-1 max-sm:text-[10px]'
							onClick={() => {
								setclearResult(false);
								setSearchTerm("");
								setisSearched(false);
								setFilterStatus("");
							}}
						>
							Clear search <FaRegTrashCan className='text-red-700' />
						</Button>
					)}
				</div>
			</div>
			</div>
			<div className='min-h-screen p-0 py-4 bg-white border  shadow-sm rounded-[5px]'>
				

				<div className='mb-6 border-b min-h-[60vh]'>
					{isLoading ? (
						<div className='h-[40vh] xl:h-[60vh] flex items-center justify-center'>
							<Loader className='w-8 h-8 mx-auto animate-spin' />
						</div>
					) : (
						<>
							{!showPermisionDenied ? (
								<>
									{tableRows.length > 0 ? (
										<TableListing
											tableHeaders={tableHeaders}
											tableRows={tableRows}
											showActionItems={true}
											rawData={rawData}
											settriggerSearch={settriggerSearch}
										/>
									) : (
										<TableEmptyState />
									)}
								</>
							) : (
								<TablePermissionDenied />
							)}
						</>
					)}
				</div>

				<div className='flex items-center justify-between px-3'>
					<TableListingSelect
						inView={inView}
						setInView={setInView}
						totalPages={totalPages * inView}
					/>
					<TableListingPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onClick={handleClick}
					/>
				</div>
				{showDetailModal && (
					<ConfirmAppointment
						showDetailModal={showDetailModal}
						close={() => setShowDetailModal(false)}
					/>
				)}
			</div>
		</>
	);
};

export default CustomTable;
