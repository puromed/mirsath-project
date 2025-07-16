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
        { label: 'Dashboard', icon: <DashboardIcon width="20" height="20"/> },
        { label: 'Members', icon: <PersonIcon width="20" height="20"/> },
        { label: 'Dependents', icon: <IdCardIcon width="20" height="20"/> },
        { label: 'Claims', icon: <FileTextIcon width="20" height="20"/> },
        { label: 'Reports', icon: <BarChartIcon width="20" height="20"/> },
        { label: 'Settings', icon: <GearIcon width="20" height="20"/> },
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
            avatarUrl="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=32&h=32&fit=crop&crop=face"
            pageTitle="Admin Dashboard"
            pageSubtitle="Manage your organization's membership system"
        >
            {children}
        </AppLayout>
    );
}
