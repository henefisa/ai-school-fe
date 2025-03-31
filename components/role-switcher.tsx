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
import { useRole } from '@/hooks/use-role';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/types/role';
import { LightbulbIcon as SwitchIcon } from 'lucide-react';

const options: { label: string; value: Role }[] = [
  { label: 'Admin', value: Role.Admin },
  { label: 'Teacher', value: Role.Teacher },
  { label: 'Student', value: Role.Student },
  { label: 'Parent', value: Role.Parent },
];

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const { toast } = useToast();

  const handleRoleChange = (newRole: string) => {
    const formattedRole =
      newRole.charAt(0).toUpperCase() + newRole.slice(1).toLowerCase();

    setRole(newRole as Role);

    toast({
      title: 'Role updated',
      description: `Your role has been changed to ${formattedRole}.`,
    });
  };

  if (!role) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='capitalize'>
          <SwitchIcon className='mr-2 h-4 w-4' />
          {role.toLowerCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuLabel>Select your role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={role} onValueChange={handleRoleChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
