import { 
    DashboardIcon,
    PersonIcon,
    IdCardIcon,
    FileTextIcon,
    BarChartIcon,
    QuestionMarkCircledIcon,
    ExitIcon,
    InfoCircledIcon
} from '@radix-ui/react-icons';
import AppLayout from './AppLayout';
import { Callout } from '@radix-ui/themes';
import { usePage } from '@inertiajs/react';

export default function UserLayout({ children, userName = "Member User" }) {
    // Define navigation links for users (simplified to only show dependents)
    const navLinks = [
        { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon width="20" height="20"/> },
        { label: 'My Dependents', href: '/dependents', icon: <IdCardIcon width="20" height="20"/> },
    ];

    // Define help links for users
    const helpLinks = [
        { label: 'Help & FAQ', icon: <QuestionMarkCircledIcon width="18" height="18"/> },
        { label: 'Logout', icon: <ExitIcon width="18" height="18"/> },
    ];

    const { flash = {} } = usePage().props;

    return (
        <AppLayout
            navLinks={navLinks}
            helpLinks={helpLinks}
            title="MEMBER PORTAL"
            userName={userName}

            pageTitle="Dashboard"
            pageSubtitle="Welcome to your personal membership portal."
        >
            {/* Flash Banners */}
            {flash.success && (
                <Callout.Root color={/rejected|not approved|declined/i.test(flash.success) ? 'red' : 'green'} mb="4">
                    <Callout.Icon />
                    <Callout.Text>{flash.success}</Callout.Text>
                </Callout.Root>
            )}
            {flash.error && (
                <Callout.Root color="red" mb="4">
                    <Callout.Icon />
                    <Callout.Text>{flash.error}</Callout.Text>
                </Callout.Root>
            )}

            {children}
        </AppLayout>
    );
}
