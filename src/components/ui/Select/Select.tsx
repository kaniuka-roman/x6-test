'use client';

import clsx from 'clsx';
import s from './Select.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ChevronIcon } from '@/components/icons/icons';
import { createPortal } from 'react-dom';
type Option = {
   label: string;
   value: string;
};
type SelectProps = {
   options: Option[];
   label: string;
   onChange: (value: string) => void;
   value: string;
   className?: string;
   defaultValue?: string;
};

type DropdownProps = {
   options: Option[];
   onChange: (option: Option) => void;
   value: string | null;
   position: { x: number; y: number };
   isOpen: boolean;
   label: string;
   ref: React.RefObject<HTMLDivElement | null>;
};
export const Select = ({
   label,
   onChange,
   value,
   className,
   options,
   defaultValue,
}: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectPosition, setSelectPosition] = useState({
      x: 0,
      y: 0,
   });
   const [selectedOption, setSelectedOption] = useState(() =>
      options.find(option => option.value === (value || defaultValue)),
   );

   const selectRef = useRef<HTMLDivElement>(null);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const currentOptionLabel = selectedOption?.label || 'Select an option';

   const handleOpenSelect = () => setIsOpen(!isOpen);

   useEffect(() => {
      const getSelectPosition = () => {
         if (selectRef.current) {
            const { right, bottom } = selectRef.current.getBoundingClientRect();

            return setSelectPosition({ x: right, y: bottom });
         }
         return setSelectPosition({ x: 0, y: 0 });
      };
      getSelectPosition();
      window.addEventListener('resize', getSelectPosition);

      return () => window.removeEventListener('resize', getSelectPosition);
   }, []);
   useEffect(() => {
      const closeOnClickOutside = (e: MouseEvent) => {
         if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('click', closeOnClickOutside);
      return () => {
         document.removeEventListener('click', closeOnClickOutside);
      };
   }, [isOpen]);
	const handleOptionClick = (option: Option) => {
		setSelectedOption(option);
		setIsOpen(false);
		onChange(option.value);
	}
   return (
      <div className={s.selectContainer}>
         <p className={s.label} onClick={handleOpenSelect}>
            {label}
         </p>
         <div
            ref={selectRef}
            className={clsx(s.select, isOpen && s.open, className)}
            onClick={handleOpenSelect}>
            <p className={s.currentOptionLabel}>{currentOptionLabel}</p>
            <ChevronIcon className={s.chevronIcon} />
         </div>
         {createPortal(
            <Dropdown
               ref={dropdownRef}
               options={options}
               onChange={handleOptionClick}
               value={selectedOption?.value ?? null}
               position={selectPosition}
               isOpen={isOpen}
               label={label}
            />,
            document.body,
         )}
      </div>
   );
};

const Dropdown = ({ isOpen, onChange, value, options, position, label, ref }: DropdownProps) => {
   return (
      <div
         ref={ref}
         style={{ left: position.x, top: position.y + 6 }}
         className={clsx(s.dropdown, isOpen && s.open)}>
         <p className={s.dropdownLabel}>{label}</p>
         <div className={s.dropdownOptions}>
            {options.map(option => (
               <div
                  key={option.value}
                  className={clsx(s.dropdownOption, option.value === value && s.selected)}
                  onClick={() => {
                     onChange(option);
                  }}>
                  {option.label}
               </div>
            ))}
         </div>
      </div>
   );
};
