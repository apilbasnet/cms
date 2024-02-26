import { Button } from '@edge-ui/react';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <h1 className="text-5xl">404</h1>
        <p className="text-xl">Page not found</p>
        <Link href="/dashboard">
          <Button>Return home</Button>
        </Link>
      </div>
    </div>
  );
}
