'use client';

import * as React from 'react';
import { cn, Button, Input, Label, useToast } from '@edge-ui/react';
import { Spinner } from '@/components/icons/icons';
import LeftBlock from '../(components)/leftBlock';
import supabase from '@/lib/client';
import { useUser } from '@/lib/context/UserContext';
import { redirect } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Login({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { toast } = useToast();
  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (user) {
      redirect('/');
    }
  }, [user]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in to the account.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    if (!data.user) {
      toast({
        title: 'Error',
        description: 'Account with that email does not exist.',
        variant: 'destructive',
      });

      setIsLoading(false);
      return;
    }

    setUser(data.user);
  }

  return (
    <LeftBlock>
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                minLength={8}
              />
            </div>
            <Button disabled={isLoading} className="mt-4">
              {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>
          </div>
        </form>
      </div>
    </LeftBlock>
  );
}
