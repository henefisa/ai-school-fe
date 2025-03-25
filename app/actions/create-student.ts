'use server';

import { createClient } from '@/utils/supabase/admin';

export async function createUser() {
  const client = await createClient();

  const response = await client.auth.admin.createUser({
    email: 'example1@example.com',
    password: '12345678',
    user_metadata: {
      first_name: 'Nghia',
      last_name: 'Tran Van',
      dob: '2000-03-10',
      gender: 'MALE',
      email: 'example1@example.com',
      phone: '',

      address: 'sample address',
      city: 'sample city',
      country: 'sample country',
      state: 'sample state',
      zip_code: 'sample zip code',
      type: 'HOME',
      name: 'sample name',
    },
    email_confirm: false,
  });

  return {
    isSuccess: true,
    message: 'Failed',
  };
}
