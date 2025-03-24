'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDisplayName } from '@/utils/get-display-name';
import { getProfileById } from '@/queries/profile/get-profile-by-id';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const supabase = createClient();
  const { data: profile } = useQuery(getProfileById(supabase, user?.id ?? ''), {
    enabled: !!user?.id,
  });
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src={String(profile?.avatar_url)}
              alt={getDisplayName(profile)}
            />
            <AvatarFallback>{getDisplayName(profile)[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium'>{getDisplayName(profile)}</p>
            <p className='text-xs text-muted-foreground'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/dashboard/profile'>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
            router.push('/auth/login');
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
