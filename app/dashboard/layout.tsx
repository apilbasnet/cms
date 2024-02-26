import { Protected } from '@/components/protected';
import SidebarMenu from '@/components/sidebarMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <div className="flex gap-2">
        <SidebarMenu />
        {children}
      </div>
    </Protected>
  );
}
