import { Address } from '@/apis/students/type';

export const getAddress = (address: Address) => {
  return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
};
