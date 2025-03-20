'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LightbulbIcon as SwitchIcon } from 'lucide-react';

export function RoleSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm'>
          <SwitchIcon className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
