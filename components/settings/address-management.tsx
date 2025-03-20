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
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

// Define address type
type AddressType = 'home' | 'work' | 'other';

// Define address interface
interface Address {
  id: string;
  name: string; // Added custom name field
  type: AddressType;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

// Mock data for initial addresses
const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Main Residence', // Custom name
    type: 'home',
    street: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    country: 'United States',
    isPrimary: true,
  },
  {
    id: 'addr-2',
    name: 'Downtown Office', // Custom name
    type: 'work',
    street: '456 Corporate Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    country: 'United States',
    isPrimary: false,
  },
];

// Form schema for address validation
const addressFormSchema = z.object({
  name: z.string().min(1, 'Address name is required.'),
  type: z.enum(['home', 'work', 'other'], {
    required_error: 'Please select an address type.',
  }),
  street: z.string().min(1, 'Street address is required.'),
  city: z.string().min(1, 'City is required.'),
  state: z.string().min(1, 'State/Province is required.'),
  zipCode: z.string().min(1, 'ZIP/Postal code is required.'),
  country: z.string().min(1, 'Country is required.'),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

export default function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  // Initialize form
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: '',
      type: 'home',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  // Handle adding a new address
  const handleAddAddress = (data: AddressFormValues) => {
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      ...data,
      isPrimary: addresses.length === 0, // Make it primary if it's the first address
    };

    setAddresses([...addresses, newAddress]);
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      title: 'Address Added',
      description: 'Your new address has been added successfully.',
    });
  };

  // Handle editing an address
  const handleEditAddress = (data: AddressFormValues) => {
    if (!currentAddress) return;

    const updatedAddresses = addresses.map((addr) =>
      addr.id === currentAddress.id ? { ...addr, ...data } : addr
    );

    setAddresses(updatedAddresses);
    setIsEditDialogOpen(false);
    setCurrentAddress(null);
    toast({
      title: 'Address Updated',
      description: 'Your address has been updated successfully.',
    });
  };

  // Handle deleting an address
  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);

    // If we're deleting the primary address, make the first remaining address primary
    if (addressToDelete?.isPrimary && updatedAddresses.length > 0) {
      updatedAddresses[0].isPrimary = true;
    }

    setAddresses(updatedAddresses);
    toast({
      title: 'Address Deleted',
      description: 'The address has been removed from your account.',
    });
  };

  // Handle setting an address as primary
  const handleSetPrimary = (id: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isPrimary: addr.id === id,
    }));

    setAddresses(updatedAddresses);
    toast({
      title: 'Primary Address Updated',
      description: 'Your primary address has been updated.',
    });
  };

  // Open edit dialog and populate form with address data
  const openEditDialog = (address: Address) => {
    setCurrentAddress(address);
    form.reset({
      name: address.name,
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setIsEditDialogOpen(true);
  };

  // Get icon based on address type
  const getAddressIcon = (type: AddressType) => {
    switch (type) {
      case 'home':
        return <Home className='h-4 w-4' />;
      case 'work':
        return <Building className='h-4 w-4' />;
      default:
        return <MapPin className='h-4 w-4' />;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-medium'>Your Addresses</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter the details for your new address.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddAddress)}
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
                          <SelectItem value='home'>Home</SelectItem>
                          <SelectItem value='work'>Work</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
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
                      setIsAddDialogOpen(false);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Save Address</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-10'>
            <MapPin className='h-10 w-10 text-muted-foreground mb-4' />
            <p className='text-muted-foreground text-center'>
              You haven't added any addresses yet.
            </p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='grid gap-4 md:grid-cols-2'>
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={address.isPrimary ? 'border-primary' : ''}
            >
              <CardHeader className='pb-2'>
                <div className='flex justify-between items-start'>
                  <div className='flex items-center'>
                    {getAddressIcon(address.type)}
                    <CardTitle className='ml-2 text-base'>
                      {address.name}
                    </CardTitle>
                    {address.isPrimary && (
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
                      {!address.isPrimary && (
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
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete Address
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className='ml-6'>
                  {address.type.charAt(0).toUpperCase() + address.type.slice(1)}{' '}
                  Address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-sm'>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Update the details for this address.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditAddress)}
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
                        <SelectItem value='home'>Home</SelectItem>
                        <SelectItem value='work'>Work</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
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
                    setIsEditDialogOpen(false);
                    setCurrentAddress(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit'>Update Address</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
