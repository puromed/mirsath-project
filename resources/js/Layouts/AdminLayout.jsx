import { 
    DashboardIcon, 
    PersonIcon,
    IdCardIcon,
    FileTextIcon,
    BarChartIcon,
    GearIcon,
    QuestionMarkCircledIcon,
    ExitIcon
} from '@radix-ui/react-icons';
import AppLayout from './AppLayout';

export default function AdminLayout({ children }) {
    // Define navigation links for admin
    const navLinks = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: <DashboardIcon width="20" height="20"/> },
        { label: 'Members', href: '/admin/members', icon: <PersonIcon width="20" height="20"/> },
        { label: 'Dependents', href: '/admin/dependents', icon: <IdCardIcon width="20" height="20"/> },
        { label: 'Claims', href: '/admin/claims', icon: <FileTextIcon width="20" height="20"/> },
    ];

    // Define help links for admin
    const helpLinks = [
        { label: 'Help', icon: <QuestionMarkCircledIcon width="18" height="18"/> },
        { label: 'Logout', icon: <ExitIcon width="18" height="18"/> },
    ];

    return (
        <AppLayout
            navLinks={navLinks}
            helpLinks={helpLinks}
            title="ADMIN DASHBOARD"
            userName="Admin User"

            pageTitle="Admin Dashboard"
            pageSubtitle="Manage your organization's membership system"
        >
            {children}
        </AppLayout>
    );
}
