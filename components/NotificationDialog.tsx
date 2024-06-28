import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  Input,
} from '@edge-ui/react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';
import { useToast } from '@edge-ui/react';
import { RoleType, users } from '@/lib/api/user.api';

type StudentEditProps = {
  user:
    | {
        id: number;
        name: string;
        email: string;
        contact: string;
        address: string;
        course: { id: number; name: string };
        activeSemester: { id: number; name: string };
        password: string;
      }
    | undefined;
  role: RoleType;
  onDone: () => void;
};

export const NotificationDialog = ({
  user,
  onDone,
  role,
}: StudentEditProps) => {
  const { toast } = useToast();
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const formSchema = z.object({
    title: z.string().min(2, {
      message: 'Title must be at least 2 characters.',
    }),
    message: z.string().min(2, {
      message: 'Message must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const sendNotification = useCallback(async () => {
    try {
      if (!user) {
        await users.notifyAll(notificationTitle, notificationMessage, role);
      } else {
        await users.notify(
          user.id,
          notificationTitle,
          notificationMessage,
          role
        );
      }
      onDone();
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Error',
        description:
          (err.response?.data as any)?.message || 'Error sending notification',
      });
    }
  }, [user, notificationTitle, role, notificationMessage, onDone, toast]);

  return (
    <div className="fixed inset-[-100px] bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-4 rounded-lg shadow-lg space-y-4 w-2/5 max-w-4xl">
        <div className="flex flex-col items-center justify-center ">
          <div>Send Notification</div>
          <div className="w-5/6">
            <Form {...form}>
              <form className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          type="text"
                          {...field}
                          onChange={(event) =>
                            setNotificationTitle(event.target.value)
                          }
                          placeholder="Title..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message">Message</FormLabel>
                      <FormControl>
                        <Input
                          id="message"
                          type="textarea"
                          {...field}
                          onChange={(event) =>
                            setNotificationMessage(event.target.value)
                          }
                          placeholder="Message..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="mt-4 space-x-2">
            <Button
              variant="destructive"
              onClick={() => {
                onDone();
              }}
            >
              Cancel
            </Button>
            <Button onClick={sendNotification} variant="outline">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
