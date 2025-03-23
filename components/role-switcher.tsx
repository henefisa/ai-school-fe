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
import { useRoleStore } from '@/contexts/role';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/stores/role-store';
import { createClient } from '@/utils/supabase/client';
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query';
import { LightbulbIcon as SwitchIcon } from 'lucide-react';

const options: { label: string; value: Role }[] = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Teacher', value: 'TEACHER' },
  { label: 'Student', value: 'STUDENT' },
  { label: 'Parent', value: 'PARENT' },
  { label: 'Staff', value: 'STAFF' },
];

export function RoleSwitcher() {
  const { toast } = useToast();
  const supabase = createClient();
  const data = useRoleStore((state) => state);

  const { mutateAsync: update } = useUpdateMutation(
    supabase.from('user_roles'),
    ['id'],
    '*'
  );

  const handleRoleChange = async (newRole: string) => {
    try {
      await update({
        id: data.id,
        role: newRole as Role,
        user_id: data.userId,
      });

      toast({
        title: 'Role updated',
        description: `Your role has been changed to ${newRole}.`,
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description:
          'An error occurred while updating your role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='capitalize'>
          <SwitchIcon className='mr-2 h-4 w-4' />
          {data.role.toLowerCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48'>
        <DropdownMenuLabel>Select your role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={data.role}
          onValueChange={handleRoleChange}
        >
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
