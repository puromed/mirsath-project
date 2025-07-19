import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function ClaimsIndex() {
  return (
    <UserLayout>
      <Head title="My Claims" />
      <p>Your submitted claims will appear here.</p>
    </UserLayout>
  );
}
