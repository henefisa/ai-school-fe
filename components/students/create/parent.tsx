import { useState } from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { formSchema as studentFormSchema } from '@/app/dashboard/students/create/schema';
import {
  formSchema as parentFormSchema,
  setParentPayload,
} from '@/app/dashboard/parents/create/schema';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { useCreateParent } from '@/apis/parents/create';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useListParents } from '@/apis/parents/list-parents';
import { defaultValues } from '@/app/dashboard/parents/create/defaultValues';
import { getDisplayName } from '@/utils/get-display-name';
import { PersonalInfo } from '@/components/parents/create/personal';
import { AddressInfo } from '@/components/parents/create/address';
import { EmergencyContacts } from '@/components/parents/create/emergency-contacts';
import { AdditionalInfo } from '@/components/parents/create/additional';
import { AssociatedStudents } from '@/components/parents/create/associated-students';
import { FormValues } from '@/app/dashboard/parents/create/page';
import { PARENTS_KEYS } from '@/apis/parents/keys';
import { getError } from '@/utils/getError';
import { ParentInfo } from '@/apis/parents/type';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Search, Plus, X } from 'lucide-react';
import { getUrl } from '@/utils/getUrl';
import { Badge } from '@/components/ui/badge';
import useDebounce from '@/hooks/use-debounce';

interface ParentProps {
  form: UseFormReturn<z.infer<typeof studentFormSchema>>;
}

export function Parent({ form }: ParentProps) {
  const [isNewParentDialogOpen, setIsNewParentDialogOpen] = useState(false);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const q = useDebounce(searchTerm, 500);

  const filter = {
    page: 1,
    pageSize: 10,
    q,
    status: true,
  };

  const createParentMutation = useCreateParent({
    queryKey: PARENTS_KEYS.listParents(filter),
  });
  const { data: parents } = useListParents(filter);

  const parentForm = useForm<FormValues>({
    resolver: zodResolver(parentFormSchema),
    defaultValues,
  });

  const [selectedParent, setSelectedParent] = useState<ParentInfo | null>(null);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const handleSelectParent = (parent: ParentInfo) => {
    setSelectedParent(parent);
    setIsSearchDialogOpen(false);
  };

  const handleRemoveParent = () => {
    form.setValue('parent.parentId', '');
    setSelectedParent(null);
  };

  const onSubmitParent = async (values: FormValues) => {
    try {
      const parentData = setParentPayload(values);

      const result = await createParentMutation.mutateAsync(parentData);

      form.setValue('parent.parentId', result.id);

      setIsNewParentDialogOpen(false);
      parentForm.reset();

      toast({
        title: 'Parent Created Successfully',
        description: `${values.personal.firstName} ${values.personal.lastName} has been added as a parent.`,
      });
    } catch (error) {
      toast({
        title: 'Failed to Create Parent',
        description:
          getError(error) ??
          'There was an error creating the parent. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parent Information</CardTitle>
        <CardDescription>Associate a parent with this student</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {!selectedParent ? (
          <div className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='parent.parentId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent</FormLabel>
                    <FormControl>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                          <Dialog
                            open={isSearchDialogOpen}
                            onOpenChange={setIsSearchDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant='outline'
                                className='w-full justify-between'
                              >
                                Search parents
                                <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-[425px]'>
                              <DialogHeader>
                                <DialogTitle>Search Parents</DialogTitle>
                                <DialogDescription>
                                  Find an existing parent by name
                                </DialogDescription>
                              </DialogHeader>
                              <div className='py-4'>
                                <div className='space-y-4'>
                                  <div className='space-y-2'>
                                    <Label htmlFor='search-parent'>
                                      Search
                                    </Label>
                                    <Input
                                      id='search-parent'
                                      placeholder='Enter parent'
                                      value={searchTerm}
                                      onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className='max-h-[300px] overflow-y-auto space-y-2'>
                                    {parents?.count ? (
                                      parents?.results.map((parent) => (
                                        <div
                                          key={parent.id}
                                          className='flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer'
                                          onClick={() => {
                                            field.onChange(parent.id);
                                            handleSelectParent(parent);
                                          }}
                                        >
                                          <Avatar className='h-10 w-10'>
                                            <AvatarImage
                                              src={getUrl(
                                                parent.user.photoUrl ?? ''
                                              )}
                                              alt={getDisplayName(parent)}
                                            />
                                            <AvatarFallback>
                                              {parent.firstName.charAt(0)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-2'>
                                              <p className='text-sm font-medium'>
                                                {getDisplayName(parent)}
                                              </p>
                                              <Badge
                                                variant='outline'
                                                className='text-xs'
                                              >
                                                {parent.relationshipToStudent}
                                              </Badge>
                                            </div>
                                            <p className='text-xs text-muted-foreground truncate'>
                                              {parent.email}
                                            </p>
                                            <p className='text-xs text-muted-foreground'>
                                              {parent.contactNumber1}
                                            </p>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className='text-center text-sm text-muted-foreground'>
                                        No parents found
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            type='button'
                            onClick={() => setIsNewParentDialogOpen(true)}
                          >
                            <Plus className='mr-2 h-4 w-4' /> New Parent
                          </Button>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          Search for an existing parent by name
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ) : (
          <div className='rounded-lg border p-4'>
            <div className='flex items-start justify-between'>
              <div className='flex items-start gap-3'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={getUrl(selectedParent.user.photoUrl ?? '')}
                    alt={getDisplayName(selectedParent)}
                  />
                  <AvatarFallback>
                    {selectedParent.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-medium'>
                      {getDisplayName(selectedParent)}
                    </h3>
                    <Badge variant='outline'>
                      {selectedParent.relationshipToStudent}
                    </Badge>
                  </div>
                  <div className='mt-1 text-sm text-muted-foreground'>
                    {selectedParent.email}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {selectedParent.contactNumber1}
                  </div>
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleRemoveParent}
                className='h-8 w-8'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
        )}
        <Dialog
          open={isNewParentDialogOpen}
          onOpenChange={setIsNewParentDialogOpen}
        >
          <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Create New Parent</DialogTitle>
            </DialogHeader>
            <Form {...parentForm}>
              <form
                onSubmit={parentForm.handleSubmit(onSubmitParent)}
                className='space-y-4'
              >
                <PersonalInfo form={parentForm} />
                <AddressInfo form={parentForm} />
                <EmergencyContacts form={parentForm} />
                <AdditionalInfo form={parentForm} />
                <AssociatedStudents form={parentForm} />
                <div className='flex justify-between'>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => setIsNewParentDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    disabled={createParentMutation.isPending}
                  >
                    {createParentMutation.isPending ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Creating...
                      </>
                    ) : (
                      'Create Parent'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
