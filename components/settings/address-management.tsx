'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Building,
  MapPin,
  MoreVertical,
  Plus,
  Star,
  Pencil,
  Trash2,
  Loader2,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { AddressType } from '@/types/address';
import { Skeleton } from '../ui/skeleton';
import { useDisclosure } from '@/hooks/use-disclosure';

const addressFormSchema = z.object({
  name: z.string().min(1, 'Address name is required.'),
  type: z.enum([AddressType.Home, AddressType.Work, AddressType.Other], {
    required_error: 'Please select an address type.',
  }),
  street: z.string().min(1, 'Street address is required.'),
  city: z.string().min(1, 'City is required.'),
  state: z.string().min(1, 'State/Province is required.'),
  zipCode: z.string().min(1, 'ZIP/Postal code is required.'),
  country: z.string().min(1, 'Country is required.'),
  isPrimary: z.boolean().optional(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

export default function AddressManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: '',
      type: AddressType.Home,
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const handleAddAddress = async (values: AddressFormValues) => {
    // if (!user) {
    //   return;
    // }

    // await createAddress([
    //   {
    //     name: values.name,
    //     type: values.type,
    //     street: values.street,
    //     city: values.city,
    //     state: values.state,
    //     zip_code: values.zipCode,
    //     country: values.country,
    //     profile_id: user.id,
    //   },
    // ]);

    onClose();
    form.reset();

    toast({
      title: 'Address Added',
      description: 'Your new address has been added successfully.',
    });
  };

  const handleEditAddress = async (values: AddressFormValues) => {
    // if (!currentAddress) return;

    // await updateAddress({
    //   id: currentAddress.id,
    //   name: values.name,
    //   type: values.type as AddressType,
    //   street: values.street,
    //   city: values.city,
    //   state: values.state,
    //   zip_code: values.zipCode,
    //   country: values.country,
    // });

    onClose();
    form.reset();

    toast({
      title: 'Address Updated',
      description: 'Your address has been updated successfully.',
    });
  };

  const handleDeleteAddress = async (id: string) => {
    // await deleteAddress({ id });

    toast({
      title: 'Address Deleted',
      description: 'The address has been removed from your account.',
    });
  };

  const handleSetPrimary = async (id: string) => {
    // await updateAddress({ id, is_primary: true });

    toast({
      title: 'Primary Address Updated',
      description: 'Your primary address has been updated.',
    });
  };

  const openAddDialog = () => {
    form.reset();
    onOpen();
  };

  // const openEditDialog = (address: Tables<'addresses'>) => {
  //   setCurrentAddress(address);
  //   form.reset({
  //     name: address.name,
  //     type: address.type as AddressType,
  //     street: address.street,
  //     city: address.city,
  //     state: address.state,
  //     zipCode: address.zip_code,
  //     country: address.country,
  //     isPrimary: address.is_primary,
  //   });
  //   onOpen();
  // };

  const getAddressIcon = (type: AddressType) => {
    switch (type) {
      case AddressType.Home:
        return <Home className='h-4 w-4' />;
      case AddressType.Work:
        return <Building className='h-4 w-4' />;
      case AddressType.Other:
      default:
        return <MapPin className='h-4 w-4' />;
    }
  };

  const isEdit = true;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-medium'>Your Addresses</h3>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            open ? openAddDialog() : onClose();
          }}
        >
          <DialogTrigger asChild>
            <Button size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>{isEdit ? 'Edit' : 'Add New'} Address</DialogTitle>
              <DialogDescription>
                Enter the details for your {isEdit ? 'address' : 'new address'}.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  isEdit ? handleEditAddress : handleAddAddress
                )}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g. Main Residence, Summer Home'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Give this address a memorable name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select address type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={AddressType.Home}>Home</SelectItem>
                          <SelectItem value={AddressType.Work}>Work</SelectItem>
                          <SelectItem value={AddressType.Other}>
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='street'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter your street address'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder='City' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='state'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder='State/Province' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='zipCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP/Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder='ZIP/Postal Code' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder='Country' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      onClose();
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  {/* <Button type='submit'>
                    {isPendingUpdate || isPendingCreate ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        {isEdit ? 'Editing' : 'Saving'} Address
                      </>
                    ) : (
                      <>{isEdit ? 'Edit' : 'Save'} Address</>
                    )}
                  </Button> */}
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* {isLoading ? (
        <div className='grid gap-4 md:grid-cols-2'>
          <Skeleton className='w-full h-40' />
          <Skeleton className='w-full h-40' />
        </div>
      ) : addresses?.length ? (
        <div className='grid gap-4 md:grid-cols-2'>
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={address.is_primary ? 'border-primary' : ''}
            >
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                  <div className='flex items-center'>
                    {getAddressIcon(address.type as AddressType)}
                    <CardTitle className='ml-2 text-base'>
                      {address.name}
                    </CardTitle>
                    {address.is_primary && (
                      <Badge
                        variant='outline'
                        className='ml-2 bg-primary/10 text-primary border-primary'
                      >
                        <Star className='h-3 w-3 mr-1 fill-primary' />
                        Primary
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <MoreVertical className='h-4 w-4' />
                        <span className='sr-only'>Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      {!address.is_primary && (
                        <DropdownMenuItem
                          onClick={() => handleSetPrimary(address.id)}
                        >
                          <Star className='mr-2 h-4 w-4' />
                          Set as Primary
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => openEditDialog(address)}>
                        <Pencil className='mr-2 h-4 w-4' />
                        Edit Address
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteAddress(address.id)}
                        className='text-destructive focus:text-destructive'
                      >
                        {isPendingDelete ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Deleting
                          </>
                        ) : (
                          <>
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete Address
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  {address.type.charAt(0).toUpperCase() +
                    address.type.slice(1).toLowerCase()}{' '}
                  Address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-sm'>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip_code}
                  </p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-10'>
            <MapPin className='h-10 w-10 text-muted-foreground mb-4' />
            <p className='text-muted-foreground text-center'>
              You haven't added any addresses yet.
            </p>
            <Button variant='outline' className='mt-4' onClick={openAddDialog}>
              <Plus className='mr-2 h-4 w-4' />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
