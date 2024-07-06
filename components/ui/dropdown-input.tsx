import React, { useState } from 'react';
import { Button } from '../ui/button';

interface DropdownInputProps {
  label: string;
  onSelect: (status: string) => void;
  menuItems: string[];
  className?: string; 
}

export const DropdownInput: React.FC<DropdownInputProps> = ({ label, onSelect, menuItems }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="relative w-full h-[2.5rem]">
      <Button
        variant="outline"
        className="w-full h-full border border-gray-300 text-gray-700 flex justify-start focus:outline-none focus:ring-black"
        onClick={() => document.getElementById('dropdown-select')?.focus()}
      >
        {selectedItem ? selectedItem : label}
      </Button>
      <select
        id="dropdown-select"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border border-gray-300 text-gray-700 focus:outline-none focus:ring-black"
        onChange={handleSelectChange}
        value={selectedItem || ""}
      >
        <option value="" disabled hidden>Select an option</option>
        {menuItems.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
