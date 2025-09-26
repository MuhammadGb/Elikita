import { useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';

const useDropdownClose = (
    dropdownRef,
    triggerReff,
    setIsDropdownOpen
) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                triggerReff.current &&
                !triggerReff.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, setIsDropdownOpen]);
};

export default useDropdownClose;
