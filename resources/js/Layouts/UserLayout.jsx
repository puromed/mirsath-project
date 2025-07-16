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

export default function UserLayout({ children, userName = "Member User" }) {
    // Define navigation links for users
    const navLinks = [
        { label: 'Dashboard', icon: <DashboardIcon width="20" height="20"/> },
        { label: 'My Profile', icon: <PersonIcon width="20" height="20"/> },
        { label: 'My Dependents', icon: <IdCardIcon width="20" height="20"/> },
        { label: 'My Claims', icon: <FileTextIcon width="20" height="20"/> },
        { label: 'Payment History', icon: <BarChartIcon width="20" height="20"/> },
    ];

    // Define help links for users
    const helpLinks = [
        { label: 'Help & FAQ', icon: <QuestionMarkCircledIcon width="18" height="18"/> },
        { label: 'Logout', icon: <ExitIcon width="18" height="18"/> },
    ];

    return (
        <AppLayout
            navLinks={navLinks}
            helpLinks={helpLinks}
            title="MEMBER PORTAL"
            userName={userName}
            avatarUrl="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            pageTitle="Dashboard"
            pageSubtitle="Welcome to your personal membership portal."
        >
            {children}
        </AppLayout>
    );
}
