import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-dark-50/50">
      <AdminSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminTopbar userName={user.name} />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
