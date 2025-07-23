import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Box,
    Container,
    Flex,
    Text,
    Button,
    Card,
    TextField,
    Badge,
    Separator,
    Heading,
} from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { 
    MagnifyingGlassIcon, 
    QuestionMarkCircledIcon,
    ChatBubbleIcon,
    EnvelopeClosedIcon,
    HomeIcon,
    ChevronRightIcon,
    ChevronDownIcon
} from '@radix-ui/react-icons';

export default function FAQ({ faqData, totalFaqs }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Filter FAQs based on search term and category
    const filteredFaqs = Object.entries(faqData).reduce((acc, [categoryKey, category]) => {
        if (selectedCategory !== 'all' && selectedCategory !== categoryKey) {
            return acc;
        }

        const filteredCategoryFaqs = category.faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredCategoryFaqs.length > 0) {
            acc[categoryKey] = {
                ...category,
                faqs: filteredCategoryFaqs
            };
        }

        return acc;
    }, {});

    const categoryStats = Object.entries(faqData).map(([key, category]) => ({
        key,
        title: category.title,
        count: category.faqs.length
    }));

    return (
        <>
            <Head title="Frequently Asked Questions - Mirsath Islamic Cooperative" />
            
            <Box className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
                {/* NAVBAR */}
                <Box
                    as="header"
                    className="bg-white/95 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50 shadow-sm"
                >
                    <Container size="4" py="4">
                        <Flex justify="between" align="center">
                            {/* Logo */}
                            <Link href="/">
                                <img src="/images/Mirsath Logo.png" alt="Mirsath Logo" className="h-20 w-auto" />
                            </Link>

                            {/* Links */}
                            <Flex gap="4" align="center">
                                <Button variant="ghost" color="emerald" asChild className="hover:bg-emerald-50">
                                    <Link href="/">Home</Link>
                                </Button>
                                <Button variant="ghost" color="emerald" asChild className="hover:bg-emerald-50">
                                    <Link href="/about">About</Link>
                                </Button>
                                <Button variant="solid" color="emerald" className="bg-gradient-to-r from-emerald-600 to-emerald-700">
                                    FAQ
                                </Button>
                                <Button variant="ghost" color="emerald" className="hover:bg-emerald-50">
                                    Contact
                                </Button>
                                <Separator orientation="vertical" size="2" />
                                <Button variant="outline" color="emerald" asChild className="border-emerald-300 hover:bg-emerald-50">
                                    <Link href="/login">Log In</Link>
                                </Button>
                                <Button variant="solid" color="emerald" asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md">
                                    <Link href="/register">Join Now</Link>
                                </Button>
                            </Flex>
                        </Flex>
                    </Container>
                </Box>

                {/* BREADCRUMBS */}
                <Container size="4" py="4">
                    <Flex align="center" gap="2" className="text-sm text-emerald-700">
                        <HomeIcon className="w-4 h-4" />
                        <Link href="/" className="hover:text-emerald-800">Home</Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <Text weight="medium">FAQ</Text>
                    </Flex>
                </Container>

                {/* HERO SECTION */}
                <Container size="4" py="8">
                    <Box className="text-center mb-12">
                        <Box className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-full mb-6">
                            <QuestionMarkCircledIcon className="w-10 h-10" />
                        </Box>
                        <Heading size="8" className="text-emerald-900 mb-4">
                            Frequently Asked Questions
                        </Heading>
                        <Text size="4" className="text-emerald-700 mb-8 max-w-2xl mx-auto">
                            Find answers to common questions about Mirsath Islamic Cooperative. 
                            Can't find what you're looking for? Contact our support team.
                        </Text>
                        
                        {/* Search Bar */}
                        <Box className="max-w-lg mx-auto mb-8">
                            <TextField.Root
                                placeholder="Search FAQs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="3"
                                className="w-full"
                            >
                                <TextField.Slot>
                                    <MagnifyingGlassIcon height="16" width="16" />
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>

                        {/* Statistics */}
                        <Flex gap="4" justify="center" className="mb-8">
                            <Card className="px-6 py-4">
                                <Text size="3" weight="bold" className="text-emerald-900">{totalFaqs}</Text>
                                <Text size="2" className="text-emerald-600">Total FAQs</Text>
                            </Card>
                            <Card className="px-6 py-4">
                                <Text size="3" weight="bold" className="text-emerald-900">{Object.keys(faqData).length}</Text>
                                <Text size="2" className="text-emerald-600">Categories</Text>
                            </Card>
                        </Flex>
                    </Box>

                    {/* CATEGORY FILTERS */}
                    <Box className="mb-8">
                        <Flex gap="2" wrap="wrap" justify="center">
                            <Button
                                variant={selectedCategory === 'all' ? 'solid' : 'outline'}
                                color="emerald"
                                onClick={() => setSelectedCategory('all')}
                                className="mb-2"
                            >
                                All Categories
                                <Badge variant="soft" color="emerald" className="ml-2">
                                    {totalFaqs}
                                </Badge>
                            </Button>
                            {categoryStats.map(category => (
                                <Button
                                    key={category.key}
                                    variant={selectedCategory === category.key ? 'solid' : 'outline'}
                                    color="emerald"
                                    onClick={() => setSelectedCategory(category.key)}
                                    className="mb-2"
                                >
                                    {category.title}
                                    <Badge variant="soft" color="emerald" className="ml-2">
                                        {category.count}
                                    </Badge>
                                </Button>
                            ))}
                        </Flex>
                    </Box>

                    {/* FAQ CONTENT */}
                    <Box className="max-w-4xl mx-auto">
                        {Object.keys(filteredFaqs).length === 0 ? (
                            <Card className="p-12 text-center">
                                <QuestionMarkCircledIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <Heading size="5" className="text-gray-600 mb-2">No FAQs Found</Heading>
                                <Text className="text-gray-500">
                                    Try adjusting your search terms or selecting a different category.
                                </Text>
                            </Card>
                        ) : (
                            Object.entries(filteredFaqs).map(([categoryKey, category]) => (
                                <Box key={categoryKey} className="mb-8">
                                    <Card className="p-6">
                                        <Heading size="6" className="text-emerald-900 mb-6 flex items-center gap-3">
                                            <Box className="w-3 h-3 bg-emerald-600 rounded-full"></Box>
                                            {category.title}
                                            <Badge variant="soft" color="emerald">
                                                {category.faqs.length} {category.faqs.length === 1 ? 'FAQ' : 'FAQs'}
                                            </Badge>
                                        </Heading>
                                        
                                        <Accordion.Root type="single" collapsible className="space-y-2">
                                            {category.faqs.map((faq, index) => (
                                                <Accordion.Item 
                                                    key={index} 
                                                    value={`${categoryKey}-${index}`}
                                                    className="border border-emerald-200 rounded-lg overflow-hidden bg-white"
                                                >
                                                    <Accordion.Trigger className="group w-full p-4 text-left hover:bg-emerald-50 focus:bg-emerald-50 transition-colors flex justify-between items-center">
                                                        <Text weight="medium" className="text-emerald-900 pr-4">
                                                            {faq.question}
                                                        </Text>
                                                        <ChevronDownIcon className="w-5 h-5 text-emerald-600 transform transition-transform group-data-[state=open]:rotate-180" />
                                                    </Accordion.Trigger>
                                                    <Accordion.Content className="p-4 pt-0 border-t border-emerald-100 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                                                        <Text className="text-gray-700 leading-relaxed">
                                                            {faq.answer}
                                                        </Text>
                                                    </Accordion.Content>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion.Root>
                                    </Card>
                                </Box>
                            ))
                        )}
                    </Box>

                    {/* CONTACT SECTION */}
                    <Box className="mt-16">
                        <Card className="p-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center">
                            <ChatBubbleIcon className="w-12 h-12 mx-auto mb-4" />
                            <Heading size="6" className="mb-4">Still Need Help?</Heading>
                            <Text className="mb-6 opacity-90">
                                Can't find the answer you're looking for? Our support team is here to help.
                            </Text>
                            <Flex gap="4" justify="center" wrap="wrap">
                                <Button variant="solid" color="green" size="3" className="bg-white text-emerald-700 hover:bg-gray-50">
                                    <EnvelopeClosedIcon className="w-4 h-4" />
                                    Email Support
                                </Button>
                                <Button variant="outline" size="3" className="border-white text-white hover:bg-white/10">
                                    <ChatBubbleIcon className="w-4 h-4" />
                                    Live Chat
                                </Button>
                            </Flex>
                        </Card>
                    </Box>
                </Container>

                {/* FOOTER */}
                <Box className="mt-16 py-8 border-t border-emerald-200 bg-white/50">
                    <Container size="4">
                        <Flex justify="between" align="center">
                            <Text size="2" className="text-emerald-600">
                                © {new Date().getFullYear()} Mirsath Islamic Cooperative. All rights reserved.
                            </Text>
                            <Flex gap="4">
                                <Link href="/about" className="text-sm text-emerald-600 hover:text-emerald-800">
                                    About
                                </Link>
                                <Link href="/faq" className="text-sm text-emerald-600 hover:text-emerald-800">
                                    FAQ
                                </Link>
                                <Link href="#" className="text-sm text-emerald-600 hover:text-emerald-800">
                                    Contact
                                </Link>
                                <Link href="#" className="text-sm text-emerald-600 hover:text-emerald-800">
                                    Privacy
                                </Link>
                            </Flex>
                        </Flex>
                    </Container>
                </Box>
            </Box>
        </>
    );
}
