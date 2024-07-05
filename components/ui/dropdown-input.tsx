"use client"

import React from 'react';
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

interface DropdownInputProps {
  label: string;
  onSelect: (status: string) => void;
  menuItems: string[];
}

export const DropdownInput: React.FC<DropdownInputProps> = ({ label, onSelect, menuItems }) => {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full h-[2.5rem] ">
          <Button variant="outline" className="w-full h-full border-gray-300 flex justify-start text-gray-400">
            {label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[11rem] rounded-[5px] max-h-[10rem] overflow-y-scroll scrollbar-hide z-[9999] bg-white">
          <DropdownMenuGroup>
            {menuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className="rounded-[5px] hover:cursor-pointer focus:bg-neutral-200"
                onClick={() => onSelect(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};