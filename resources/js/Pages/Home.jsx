import {
    Box,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Heading,
    Section,
    Text,
    Badge,
    Separator,
    Link,
  } from '@radix-ui/themes';
  import {
    ArrowRightIcon,
    FileTextIcon,
    LockClosedIcon,
    PersonIcon,
    CheckIcon,
    StarIcon,
    ClockIcon,
  } from '@radix-ui/react-icons';

  export default function Home() {
    const timelineData = [
      {
        n: '1',
        title: 'Register Online',
        description: 'Complete our quick sign-up form with your details and pay your first contribution securely online.',
        badges: [
          { text: '5 minutes', color: 'emerald' },
          { text: 'Secure payment', color: 'blue' },
        ]
      },
      {
        n: '2',
        title: 'Instant Coverage',
        description: 'You and your dependents are immediately protected by our mutual fund with full benefits.',
        badges: [
          { text: 'Immediate', color: 'green' },
          { text: 'Full family', color: 'mint' },
        ]
      },
      {
        n: '3',
        title: 'Submit Claims',
        description: 'In the event of a member\'s passing, submit a claim digitally with required documents.',
        badges: [
          { text: 'Digital process', color: 'amber' },
          { text: 'Document upload', color: 'orange' },
        ]
      },
      {
        n: '4',
        title: 'Fast Disbursement',
        description: 'Approved claims are processed and paid within 48 hours to support the family.',
        badges: [
          { text: '48 hours', color: 'violet' },
          { text: 'Direct transfer', color: 'indigo' },
        ]
      },
    ];

    return (
      <Box className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        {/* NAVBAR */}
        <Box
          as="header"
          className="bg-white/95 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50 shadow-sm"
        >
          <Container size="4" py="4">
            <Flex justify="between" align="center">
              {/* Logo */}
              <img src="/images/Mirsath Logo.png" alt="Mirsath Logo" className="h-20 w-auto" />
  
              {/* Links */}
              <Flex gap="4" align="center">
                <Button variant="ghost" color="emerald" asChild className="hover:bg-emerald-50">
                  <a href="/about">About</a>
                </Button>
                <Button variant="ghost" color="emerald" asChild className="hover:bg-emerald-50">
                  <a href="/faq">Help</a>
                </Button>
                <Button variant="ghost" color="emerald" className="hover:bg-emerald-50">
                  Contact
                </Button>
                <Separator orientation="vertical" size="2" />
                <Button variant="outline" color="emerald" asChild className="border-emerald-300 hover:bg-emerald-50">
                  <a href="/login">Log In</a>
                </Button>
                <Button variant="solid" color="emerald" asChild className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md">
                  <a href="/register">Join Now</a>
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Box>
  
        {/* HERO */}
        <Section
          size="3"
          className="relative overflow-hidden flex items-center justify-center text-center"
          style={{
            backgroundImage: 'url(/images/hero_background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 'calc(100vh - 80px)', // Adjust height based on navbar
          }}
        >
          {/* Overlay for readability */}
          <Box position="absolute" inset="0" className="bg-black/60" />

          <Container size="4" position="relative" py="20">
            <Flex direction="column" align="center" gap="8" className="text-white">
              <Badge size="3" variant="soft" color="grass" className="px-4 py-2 font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                <StarIcon className="mr-2" />
                Trusted by 650+ Families
              </Badge>
              
              <Box className="space-y-4">
                <img src="/images/Mirsath Navbar.png" alt="Mirsath Logo" className="h-[18rem] w-auto mx-auto" />
                <Text size="6" as="p" className="max-w-3xl font-medium text-green-100">
                  A community death-benefit fund for Setia Alam Mosque members.
                </Text>
                <Text size="4" as="p" className="max-w-2xl text-gray-300">
                  Providing financial support and peace of mind for Muslim families through 
                  our trusted mutual aid program.
                </Text>
              </Box>
              
              <Flex gap="4" mt="6" className="flex-wrap justify-center">
                <Button size="4" variant="solid" color="grass" asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg px-8">
                  <a href="/register">
                    Get Started <ArrowRightIcon />
                  </a>
                </Button>
                <Button size="4" variant="outline" color="gray" className="border-white/50 text-white hover:bg-white/10 px-8">
                  Learn More
                </Button>
              </Flex>
              
              {/* Trust indicators */}
              <Flex gap="6" mt="8" className="text-sm text-gray-200">
                <Flex align="center" gap="2">
                  <CheckIcon className="text-green-400" />
                  <Text size="2">Shariah Compliant</Text>
                </Flex>
                <Flex align="center" gap="2">
                  <CheckIcon className="text-green-400" />
                  <Text size="2">Mosque Governed</Text>
                </Flex>
                <Flex align="center" gap="2">
                  <CheckIcon className="text-green-400" />
                  <Text size="2">Community Focused</Text>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Section>
  
        {/* FEATURES */}
        <Section size="3" py="20" className="bg-slate-50 relative z-10 -mt-20 rounded-t-2xl lg:rounded-t-3xl">
          <Container size="4">
            <Box className="text-center mb-12">
              <Badge size="2" variant="soft" color="emerald" className="mb-4">
                Why Choose MIRSATH?
              </Badge>
              <Heading size="8" align="center" mb="4" color="emerald11" className="font-bold">
                Built for Our Community
              </Heading>
              <Text size="4" color="gray10" className="max-w-2xl mx-auto">
                Designed with Islamic principles and community values at heart
              </Text>
            </Box>
            
            <Grid columns={{ initial: '1', md: '3' }} gap="8">
              <FeatureCard
                icon={<PersonIcon width="28" height="28" />}
                title="Member Care"
                desc="Affordable contributions that protect you and your family with transparent, community-based support."
                highlight="From RM60/year"
              />
              <FeatureCard
                icon={<FileTextIcon width="28" height="28" />}
                title="Simple Claims"
                desc="Paperwork-lite process with transparent tracking and fast approval within 48 hours."
                highlight="Digital Process"
              />
              <FeatureCard
                icon={<LockClosedIcon width="28" height="28" />}
                title="Trusted & Secure"
                desc="Governed by the mosque committee, audited annually, and built on principles of mutual aid."
                highlight="Mosque Governed"
              />
            </Grid>
          </Container>
        </Section>
  
        {/* TIMELINE */}
        <Section size="3" className="bg-white relative overflow-hidden" py="24">
          {/* Background Pattern */}
          <Box
            position="absolute"
            inset="0"
            style={{
              backgroundImage: 'url(/pattern-islamic.svg)',
              opacity: 0.02,
              backgroundSize: 150,
            }}
            aria-hidden
          />
          
          <Container size="4" position="relative">
            <Box className="text-center mb-16">
              <Badge size="2" variant="soft" color="emerald" className="mb-6 px-4 py-2">
                <ClockIcon className="mr-2" />
                Simple & Quick Process
              </Badge>
              <Heading size="8" align="center" mb="6" className="font-bold text-slate-800 max-w-3xl mx-auto">
                How It Works
              </Heading>
              <Text size="4" className="max-w-2xl mx-auto text-slate-600 leading-relaxed">
                Follow these simple steps to get your family protected with our streamlined process.
              </Text>
            </Box>

            <Box className="relative max-w-4xl mx-auto">
              {/* Central Timeline Line for Desktop */}
              <Box
                position="absolute"
                width="3px"
                height="100%"
                top="0"
                left="50%"
                className="hidden md:block bg-gradient-to-b from-transparent via-emerald-400 to-transparent rounded-full transform -translate-x-1/2"
              />
              {/* Vertical Line for Mobile */}
              <Box
                position="absolute"
                width="3px"
                height="100%"
                top="0"
                left="calc(2rem - 1.5px)" // Aligns with the center of the mobile connector circle
                className="block md:hidden bg-gradient-to-b from-transparent via-emerald-400 to-transparent rounded-full"
              />
              
              <Flex direction="column" gap="12">
                {timelineData.map((step, index) => (
                  <EnhancedTimeStep 
                    key={step.n}
                    n={step.n} 
                    title={step.title}
                    side={index % 2 === 0 ? 'left' : 'right'}
                    delay={`${index * 200}ms`}
                  >
                    <Text size="3" className="text-slate-600 leading-relaxed mb-4">
                      {step.description}
                    </Text>
                    <Flex gap="2" className="flex-wrap">
                      {step.badges.map(badge => (
                        <Badge key={badge.text} variant="soft" color={badge.color} size="1">{badge.text}</Badge>
                      ))}
                    </Flex>
                  </EnhancedTimeStep>
                ))}
              </Flex>
            </Box>
          </Container>
        </Section>

        {/* STATS */}
        {/* <Section size="3" py="16">
          <Container size="4">
            <Grid columns={{ initial: '2', md: '4' }} gap="8" align="center">
              <Stat number="650+" label="Active Members" />
              <Stat number="RM 2 million +" label="Benefits Paid" />
              <Stat number="99%" label="Claim Approval Rate" />
              <Stat number="24/7" label="Member Support" />
            </Grid>
          </Container>
        </Section> */}
  
        {/* CTA */}
        <Section size="3" className="mt-24 mb-24 bg-slate-100" py={{initial: '12', md: '20'}}>
          <Container size="4">
            <Grid columns={{ initial: '1', md: '2' }} gap={{initial: '8', md: '12'}} align="center">
              <Box>
                <Heading size={{initial: '7', md: '8'}} className="font-bold text-slate-800 mb-4 max-w-lg">
                  Ready to protect your family and community?
                </Heading>
                <Text size={{initial: '4', md: '5'}} className="text-slate-600 max-w-xl">
                  Join 650+ families who trust MIRSATH for their mutual aid needs. 
                  Get started today with our simple registration process.
                </Text>
              </Box>
              <Flex direction={{initial: 'column', sm: 'row'}} gap="4" justify={{ sm: 'center', md: 'end' }}>
                <Button size="4" color="emerald" variant="solid" highContrast className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                  Join MIRSATH Today
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" className="ml-2 w-5 h-5">
                    <path fill="currentColor" fillRule="evenodd" d="M8.146 3.146a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L11.793 8H1.5a.5.5 0 0 1 0-1h10.293L8.146 3.854a.5.5 0 0 1 0-.708" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button size="4" variant="outline" color="gray" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Flex>
            </Grid>
          </Container>
        </Section>
  
        {/* FOOTER */}
        <Box as="footer" className="bg-slate-900 text-white relative overflow-hidden" py="16">
          {/* Background pattern */}
          <Box
            position="absolute"
            inset="0"
            style={{
              backgroundImage: 'url(/pattern-islamic.svg)',
              opacity: 0.05,
              backgroundSize: 200,
            }}
            aria-hidden
          />
          
          <Container size="4" position="relative" mt="12">
            <Grid columns={{ initial: "1", md: "4" }} gap="8" className="mb-12">
              <Box>
                <img src="/images/Mirsath Logo.png" alt="Mirsath Logo" className="h-20 w-auto mb-6" />
                <Text size="3" className="text-slate-300 leading-relaxed">
                  Supporting families through mutual aid since 2020. A Shariah-compliant community initiative governed by mosque principles.
                </Text>
                
                <Flex gap="4" className="mt-6">
                  <Badge variant="soft" color="emerald" size="2">Shariah Compliant</Badge>
                  <Badge variant="soft" color="mint" size="2">Community Driven</Badge>
                </Flex>
              </Box>
              
              <Box>
                <Text size="4" weight="bold" className="mb-4 text-emerald-400">Quick Links</Text>
                <Flex direction="column" gap="3">
                  <Link href="/about" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">About MIRSATH</Link>
                  <Link href="/register" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Registration</Link>
                  <Link href="/login" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Login</Link>
                  <Link href="/admin/login" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Admin</Link>
                  <Link href="/faqs" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Frequently Asked Questions</Link>
                </Flex>
              </Box>
              
              <Box>
                <Text size="4" weight="bold" className="mb-4 text-emerald-400">Support</Text>
                <Flex direction="column" gap="3">
                  <Link href="/contact" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Contact Us</Link>
                  <Link href="/policies" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Terms & Conditions</Link>
                  <Link href="/privacy" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</Link>
                  <Link href="/complaint" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">File a Complaint</Link>
                  <Link href="/feedback" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">Feedback</Link>
                </Flex>
              </Box>
              
              <Box>
                <Text size="4" weight="bold" className="mb-4 text-emerald-400">Contact Info</Text>
                <Flex direction="column" gap="4" className="text-slate-300">
                  <Flex align="center" gap="3">
                    <Box className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                    <Text size="2">
                      Setia Alam Mosque<br />
                      Jalan Setia Prima T U13/T, Setia Alam, Seksyen, U13 Shah Alam, 40170 Shah Alam, Selangor
                    </Text>
                  </Flex>
                  <Flex align="center" gap="3">
                    <Box className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                    <Text size="2">info@mirsath.org</Text>
                  </Flex>
                  <Flex align="center" gap="3">
                    <Box className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                    <Text size="2">+60 123456789</Text>
                  </Flex>
                  
                  <Badge variant="soft" color="emerald" className="mt-2 w-fit">
                    🕌 Mosque Governed
                  </Badge>
                </Flex>
              </Box>
            </Grid>
            
            <Separator className="my-8 opacity-20" />
            
            <Flex justify="between" align="center" className="text-slate-400 flex-wrap gap-4">
              <Text size="2">
                © 2025 MIRSATH Mutual Aid Society. All rights reserved.
              </Text>
              <Flex gap="6" className="text-xs">
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Box>
    );
  }

  function EnhancedTimeStep({ n, title, children, side, delay }) {
    const isRightSide = side === 'right';

    return (
      <Box className={`timeline-step`} style={{ animationDelay: delay }}>
        <Grid columns={{ initial: "1", md: "2" }} gap={{initial: '6', md: '8'}} className="items-center">
          {/* Step content card */}
          <Box className={`${isRightSide ? 'md:order-2' : 'md:order-1'} order-2`}>
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50">
              <Flex direction="column" gap="2">
                <Heading as="h3" size="5" className="font-bold text-slate-800">
                  {title}
                </Heading>
                {children}
              </Flex>
            </Card>
          </Box>

          {/* Timeline connector (center on desktop, left on mobile) */}
          <Box className={`${isRightSide ? 'md:order-1' : 'md:order-2'} order-1 flex md:justify-center justify-start`}>
            <Box
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white relative z-10"
            >
              <Text size="5" weight="bold" className="text-white">
                {n}
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>
    );
  }

  function FeatureCard({ icon, title, desc, highlight }) {
    return (
      <Card className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
        <Flex direction="column" gap="5">
          <Box 
            className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white shadow-inner"
          >
            {icon}
          </Box>
          
          <Box>
            <Flex justify="between" align="start" mb="2">
              <Heading as="h3" size="5" className="font-bold text-slate-800">
                {title}
              </Heading>
              <Badge color="emerald" variant="soft" radius="full" className="font-medium">
                {highlight}
              </Badge>
            </Flex>
            <Text as="p" size="3" className="text-slate-600 leading-relaxed">
              {desc}
            </Text>
          </Box>
        </Flex>
      </Card>
    );
  }

  function Stat({ number, label }) {
    return (
      <Card py="6" px="4" radius="large" className="text-center bg-white/60 backdrop-blur-sm border border-emerald-100/50 hover:bg-white/80 transition-all duration-300">
        <Flex direction="column" align="center" gap="3">
          <Heading size="8" color="emerald11" className="font-bold">
            {number}
          </Heading>
          <Text color="gray11" size="3" weight="medium">{label}</Text>
        </Flex>
      </Card>
    );
  }
