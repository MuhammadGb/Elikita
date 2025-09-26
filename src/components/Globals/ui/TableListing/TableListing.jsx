import { Loader } from "lucide-react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../table";
import TableListingRow from "./TableListingRow";
import TableEmptyState from "./TableEmptyState";

const TableListing = ({
	tableHeaders,
	tableRows,
	showActionItems,
	rawData,
	isLoading = false,
	Component,
	showReferralDetails,
	settriggerSearch
}) => {
	return (
		<div className='px-3'>
			{isLoading ? (
				<div className='text-center '>
					<Loader className='w-5 h-5 mx-auto mt-20 text-brand-500 animate-spin' />
				</div>
			) : (
				<>
					{tableRows?.length > 0 ? (
						<Table>
							<TableHeader className='mt-4  border-b'>
								<TableRow>
									{tableHeaders?.map((header) => (
										<TableHead
											key={header.sortKey}
											scope='col'
											className='whitespace-nowrap'
										>
											{header.name}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>

							<TableBody>
								{tableRows?.map((rowData, index) => (
									<TableListingRow
										key={rowData.id}
										item={rowData}
										showActionItems={showActionItems}
										rawData={rawData}
										index={index}
										Component={Component}
										showReferralDetails={showReferralDetails}
										settriggerSearch={settriggerSearch}

									/>
								))}
							</TableBody>
						</Table>
					) : (
						<TableEmptyState />
					)}
				</>
			)}
		</div>
	);
};

export default TableListing;
