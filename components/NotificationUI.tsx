import { cn } from "@edge-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@edge-ui/react";

import { Notification } from "@/app/dashboard/notifications/page";

type CardProps = React.ComponentProps<typeof Card> & { data: Notification[] };

export default function NotificationUI({
  data,
  className,
  ...props
}: CardProps) {
  return (
    <Card className={cn("w-full ", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {data.map((notification, index) => (
            <div
              key={notification.id}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-2">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm font-medium leading-none">
                  {notification.message}
                </p>
                <div className="flex gap-4">
                  <p className="text-sm text-muted-foreground">
                    {notification.createdAt}
                  </p>
                  <p className="text-sm text-muted-foreground font-bold">
                    {notification.sentBy.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
