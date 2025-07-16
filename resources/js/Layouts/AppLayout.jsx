import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Callout,
    Dialog,
} from '@radix-ui/themes';
import { HamburgerMenuIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const SidebarLink = ({ icon, label, active, collapsed, onClick }) => (
    <Button
        variant="ghost"
        onClick={onClick}
        className={`w-full font-semibold text-sm rounded-lg transition-all duration-200 ${
            active 
            ? 'bg-accent-light-green text-primary-dark' 
            : 'text-white hover:bg-white/10'
        } ${
            collapsed 
            ? 'justify-center h-12' 
            : 'justify-start h-12 px-4'
        }`}
        title={collapsed ? label : ""}
    >
        {icon}
        {!collapsed && <span className="ml-3">{label}</span>}
    </Button>
);

export default function AppLayout({ children, navLinks, helpLinks, title, userName, avatarUrl, pageTitle, pageSubtitle }) {
    const { flash } = usePage().props;
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeLink, setActiveLink] = useState(navLinks[0]?.label || '');
    const decision = flash?.decision;

    const DecisionModal = () => (
        <Dialog.Root open={!!decision}>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <div className={`text-center p-4 rounded-lg ${
                    decision === 'Active' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                    {decision === 'Active' ? (
                        <CheckCircledIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    ) : (
                        <CrossCircledIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    )}
                    <Dialog.Title className="text-xl font-bold mb-2">
                        {decision === 'Active' ? 'Application Approved!' : 'Application Update'}
                    </Dialog.Title>
                    <p className="mb-4">
                        {decision === 'Active'
                            ? 'Welcome! Your membership is now active.'
                            : 'We regret to inform you that your application was not approved.'}
                    </p>
                    <Dialog.Close>
                        <Button variant="soft">Continue</Button>
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-page-bg">
            <DecisionModal />
            <Flex>
                <aside className={`${sidebarCollapsed ? 'w-24' : 'w-72'} bg-sidebar-bg text-white transition-all duration-300 ease-in-out flex-shrink-0`}>
                    <Flex direction="column" justify="between" className="h-full">
                        <Box>
                            <Box className={`py-6 px-6 ${sidebarCollapsed ? 'px-4' : ''}`}>
                                <Text weight="bold" className={`text-accent-gold transition-all duration-300 ${sidebarCollapsed ? 'text-center text-xl' : 'text-3xl'}`}>
                                    {sidebarCollapsed ? 'M.' : 'MIRSATH.'}
                                </Text>
                                {!sidebarCollapsed && title && <Text size="1" className="text-white/60">{title}</Text>}
                            </Box>
                            <nav className={`space-y-2 ${sidebarCollapsed ? 'p-3' : 'p-4'}`}>
                                {navLinks.map(link => (
                                    <SidebarLink 
                                        key={link.label} 
                                        {...link} 
                                        active={activeLink === link.label} 
                                        collapsed={sidebarCollapsed} 
                                        onClick={() => setActiveLink(link.label)} 
                                    />
                                ))}
                            </nav>
                        </Box>
                        <nav className={`space-y-2 ${sidebarCollapsed ? 'p-3' : 'p-4'}`}>
                            {helpLinks.map(link => (
                                <SidebarLink 
                                    key={link.label} 
                                    {...link} 
                                    active={false} 
                                    collapsed={sidebarCollapsed} 
                                    onClick={link.label === 'Logout' ? handleLogout : () => {}} 
                                />
                            ))}
                        </nav>
                    </Flex>
                </aside>

                <Box className="flex-1">
                    <nav className="bg-white px-6 py-3 border-b border-slate-200">
                        <Flex justify="between" align="center">
                            <Flex align="center" gap="4">
                                <Button variant="ghost" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-text-dark">
                                    <HamburgerMenuIcon />
                                </Button>
                            </Flex>
                            
                            <Flex align="center" gap="3">
                                <Text weight="bold" size="3" className="text-text-dark">{userName}</Text>
                                <Avatar src={avatarUrl} fallback={userName?.[0] || 'U'} size="3" radius="full" />
                            </Flex>
                        </Flex>
                    </nav>

                    <main className="p-6">
                        {flash?.success && (
                            <Callout.Root color="green" role="alert" className="mb-4">
                                <Callout.Icon>
                                    <CheckCircledIcon />
                                </Callout.Icon>
                                <Callout.Text>
                                    {flash.success}
                                </Callout.Text>
                            </Callout.Root>
                        )}
                        <Box className="mb-6">
                            {pageTitle && <h1 className="text-3xl font-bold text-text-dark">{pageTitle}</h1>}
                            {pageSubtitle && <p className="text-text-muted">{pageSubtitle}</p>}
                        </Box>
                        
                        {children}
                    </main>
                </Box>
            </Flex>
        </div>
    );
}