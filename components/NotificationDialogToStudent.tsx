import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@edge-ui/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Spinner } from "@/components/icons/icons";
import { Student, students } from "@/lib/api/student.api";
import { AxiosError } from "axios";
import { useToast } from "@edge-ui/react";
import { useGetCourses } from "@/lib/customHooks/getCourses";

type StudentEditProps = {
  student:
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
  onDone: () => void;
};

export const NotificationDialog = ({ student, onDone }: StudentEditProps) => {
  const { toast } = useToast();
  const [notificationMessage, setNotificationMessage] = useState("");

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const sendNotification = useCallback(async () => {
    try {
      alert(notificationMessage + "send to " + student?.name);
      onDone();
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: "Error",
        description:
          (err.response?.data as any)?.message || "Error sending notification",
      });
    }
  }, [student?.name, notificationMessage, onDone, toast]);

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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Notify</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
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
              {/* {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />} */}
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
