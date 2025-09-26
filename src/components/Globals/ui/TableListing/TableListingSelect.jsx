import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Globals/ui/select';
import { useState } from 'react';

const TableListingSelect = ({ inView, setInView, totalPages }) => {
  function handleSelectChange(data) {
    setInView(data);
  }

  const all = totalPages;

  return (
    <div className='flex items-center gap-1'>
      <p className='hidden pr-2 text-[11px] sm:block'>Showing: </p>
      <Select onValueChange={handleSelectChange} value={inView}>
        <SelectTrigger className='w-[51px] h-[35px] border focus:ring-table-dark-200 text-gray-600 text-xs'>
          <SelectValue
            placeholder={inView === all ? 'All' : inView}
            className='placeholder:text-table-dark-200 text-table-dark-200 '
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[5, 10, 20, 50, 100, all].map((val) => (
              <SelectItem key={val} value={val}>
                {val === all ? `All (${val})` : val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className='pr-2 text-[11px]'>of {totalPages} </p>
    </div>
  );
};

export default TableListingSelect;
