import { Spinner } from "./icons/icons";

export function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner className="animate-spin text-destructive h-12 w-12" />
    </div>
  );
}
