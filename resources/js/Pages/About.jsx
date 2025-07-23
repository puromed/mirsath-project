import {
  Box,
  Section,
  Container,
  Flex,
  Heading,
  Text,
  Grid,
  Card,
  Badge,
  Button,
  Separator,
  Link
} from '@radix-ui/themes';
import { 
  ArrowRightIcon, 
  CheckIcon, 
  HeartIcon,
  LockClosedIcon,
  LightningBoltIcon,
  PersonIcon,
  StarIcon
} from '@radix-ui/react-icons';

// Flip Card Component
function FlipCard({ front, back, className = '' }) {
  return (
    <div className={`group [perspective:1000px] min-h-[300px] ${className}`}>
      <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 [transform:rotateX(180deg)] [backface-visibility:hidden]">
          {back}
        </div>
      </div>
    </div>
  );
}

export default function About() {
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
              <Link href="/">
                <img src="/images/Mirsath Logo.png" alt="Mirsath Logo" className="h-20 w-auto" />
              </Link>
  
              {/* Links */}
              <Flex gap="4" align="center">
                <Button variant="ghost" color="emerald" asChild className="hover:bg-emerald-50">
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="solid" color="emerald" className="bg-gradient-to-r from-emerald-600 to-emerald-700">
                  About
                </Button>
                <Button variant="ghost" color="emerald" asChild className="hover:bg-emerald-50">
                  <Link href="/faq">FAQ</Link>
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

      {/* HERO */}
      <Section size="3" className="relative overflow-hidden flex items-center" style={{ minHeight: '70vh' }}>
        {/* Background Pattern */}
        <Box
          position="absolute"
          inset="0"
          style={{
            backgroundImage: 'url(/pattern-islamic.svg)',
            opacity: 0.03,
            backgroundSize: 200,
          }}
          aria-hidden
        />
        
        <Container size="4" position="relative">
          <Flex direction="column" align="center" className="text-center">
            <Badge size="3" variant="soft" color="emerald" className="mb-6 px-4 py-2">
              <HeartIcon className="mr-2" />
              Established 2020
            </Badge>
            
            <Heading size={{ initial: '8', md: '9' }} className="font-extrabold text-slate-800 mb-6 max-w-4xl">
              About <span className="text-emerald-600">MIRSATH</span>
            </Heading>
            
            <Text size={{ initial: '4', md: '5' }} className="max-w-3xl text-slate-700 leading-relaxed mb-8">
              MIRSATH is a Shariah-compliant mutual aid society founded to provide compassionate
              financial support for families during their most difficult moments. Since 2020, we have
              served our community with transparency, integrity, and unwavering commitment to Islamic
              principles.
            </Text>
            
            {/* Trust indicators */}
            <Flex gap="8" mt="8" mb="8" className="text-sm text-slate-600 flex-wrap justify-center">
              <Flex align="center" gap="2">
                <CheckIcon className="text-emerald-500" />
                <Text size="2">650+ Active Members</Text>
              </Flex>
              <Flex align="center" gap="2">
                <CheckIcon className="text-emerald-500" />
                <Text size="2">5+ Years of Service</Text>
              </Flex>
              <Flex align="center" gap="2">
                <CheckIcon className="text-emerald-500" />
                <Text size="2">100% Transparent</Text>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Section>

      {/* MISSION & VISION */}
      <Section size="3" py="24" className="bg-white rounded-t-3xl shadow-lg -mt-16 relative z-10">
        <Container size="4" mb="8">
          <Box className="text-center mb-16">
            <Badge size="2" variant="soft" color="mint" className="mb-4 mt-6 px-6 py-3 text-lg font-medium">
              Our Purpose
            </Badge>
            <Heading size="8" className="font-bold text-slate-800 mb-6">
              Guided by Faith, Driven by Compassion
            </Heading>
            <Text size="4" className="max-w-3xl mx-auto text-slate-600 leading-relaxed">
              We believe in the power of community and the importance of supporting one another 
              through life's challenges, rooted in Islamic principles of mutual aid and brotherhood.
            </Text>
          </Box>
          
          <Grid columns={{ initial: '1', md: '2' }} gap="12">
            <FlipCard
              front={
                <Card className="p-10 h-full bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl shadow-lg">
                  <Flex direction="column" gap="6">
                    <Box className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg width="50" height="50" viewBox="0 0 15 15" fill="none" color="white" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.50207C0.877075 3.84319 3.84319 0.877075 7.50208 0.877075C11.1609 0.877075 14.1271 3.84319 14.1271 7.50207C14.1271 11.1609 11.1609 14.1271 7.50208 14.1271C3.84319 14.1271 0.877075 11.1609 0.877075 7.50207ZM1.84898 7.00003C2.0886 4.26639 4.26639 2.0886 7.00003 1.84898V4.50003C7.00003 4.77617 7.22388 5.00003 7.50003 5.00003C7.77617 5.00003 8.00003 4.77617 8.00003 4.50003V1.84862C10.7356 2.08643 12.9154 4.26502 13.1552 7.00003H10.5C10.2239 7.00003 10 7.22388 10 7.50003C10 7.77617 10.2239 8.00003 10.5 8.00003H13.1555C12.9176 10.7369 10.7369 12.9176 8.00003 13.1555V10.5C8.00003 10.2239 7.77617 10 7.50003 10C7.22388 10 7.00003 10.2239 7.00003 10.5V13.1552C4.26502 12.9154 2.08643 10.7356 1.84862 8.00003H4.50003C4.77617 8.00003 5.00003 7.77617 5.00003 7.50003C5.00003 7.22388 4.77617 7.00003 4.50003 7.00003H1.84898Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                      
                    </Box>
                    <Box>
                      <Heading size="7" className="font-bold text-slate-800 mb-4" align="center">
                        Our Mission
                      </Heading>
                      
                    </Box>
                  </Flex>
                </Card>
              }
              back={
                <Card className="p-10 h-full bg-gradient-to-br from-emerald-600 to-green-700 border border-emerald-500 rounded-2xl shadow-lg text-white">
                  <Flex direction="column" gap="4">
                    <Heading size="7" className="font-bold mb-2">Key Actions</Heading>
                    <Text size="4" className="text-slate-600 leading-relaxed">
                        To foster a supportive community that ensures every member's family receives timely
                        financial assistance in the event of loss, guided by Islamic values of charity,
                        empathy, and collective responsibility.
                      </Text>
                  </Flex>
                </Card>
              }
            />
            
            <FlipCard
              front={
                <Card className="p-10 h-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-lg">
                  <Flex direction="column" gap="6">
                    <Box className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg width="50" height="50" color='white' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </Box>
                    <Box>
                      <Heading size="7" className="font-bold text-slate-800 mb-4" align="center">
                        Our Vision
                      </Heading>
                    </Box>
                  </Flex>
                </Card>
              }
              back={
                <Card className="p-10 h-full bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500 rounded-2xl shadow-lg text-white">
                  <Flex direction="column" gap="4">
                    <Heading size="7" className="font-bold mb-2">Future Goals</Heading>
                    <Text size="4" className="text-slate-600 leading-relaxed">
                        To be the leading faith-based mutual aid society, setting a benchmark for
                        transparency, efficiency, and compassion in community welfare across the region.
                      </Text>
                  </Flex>
                </Card>
              }
            />
          </Grid>
        </Container>
      </Section>

      {/* VALUES */}
      <Section size="3" py="24" className="bg-slate-50 relative overflow-hidden">
        {/* Background Pattern */}
        <Box
          position="absolute"
          inset="0"
          style={{
            backgroundImage: 'url(/pattern-iznik.svg)',
            opacity: 0.02,
            backgroundSize: 300,
          }}
          aria-hidden
        />
        
        <Container size="4" position="relative" mt="8" mb="8">
          <Box className="text-center mb-16">
            <Badge size="2" variant="soft" color="mint" className="mb-4 mt-6 px-6 py-3 text-lg font-medium">
              What Drives Us
            </Badge>
            <Heading size="8" className="font-bold text-slate-800 mb-6">
              Our Core Values
            </Heading>
            <Text size="4" className="max-w-2xl mx-auto text-slate-600">
              These principles guide every decision we make and every action we take
            </Text>
          </Box>
          
          <Grid columns={{ initial: '1', md: '3' }} gap="8">
            {[
              {
                title: 'Compassion',
                desc: 'We act with empathy and kindness, uplifting families in times of need with genuine care and understanding.',
                icon: <HeartIcon width="24" height="24" />,
                color: 'emerald'
              },
              {
                title: 'Transparency',
                desc: 'We operate with complete openness—members always know how funds are managed and distributed.',
                icon: <LockClosedIcon width="24" height="24" />,
                color: 'blue'
              },
              {
                title: 'Integrity',
                desc: 'We adhere strictly to Shariah principles and ethical financial practices in all our operations.',
                icon: <CheckIcon width="24" height="24" />,
                color: 'violet'
              }
            ].map((value, index) => (
              <Card key={value.title} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/50">
                <Flex direction="column" gap="6">
                  <Box className={`w-16 h-16 bg-${value.color}-100 rounded-2xl flex items-center justify-center border border-${value.color}-200`}>
                    <Box className={`text-${value.color}-600`}>
                      {value.icon}
                    </Box>
                  </Box>
                  
                  <Box>
                    <Heading size="5" className="font-bold text-slate-800 mb-3">
                      {value.title}
                    </Heading>
                    <Text size="3" className="text-slate-600 leading-relaxed">
                      {value.desc}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* COMMUNITY IMPACT */}
      <Section size="3" py="24" className="bg-gradient-to-r from-emerald-600 to-green-700 relative overflow-hidden">
        {/* Background Pattern */}
        <Box
          position="absolute"
          inset="0"
          style={{
            backgroundImage: 'url(/pattern-islamic.svg)',
            opacity: 0.1,
            backgroundSize: 200,
          }}
          aria-hidden
        />
        
        <Container size="4" position="relative" mb="8" mt="6">
          <Box className="text-center mb-16">
            <Heading size="8" className="font-bold text-white mb-6">
              Making a Difference Together
            </Heading>
            <Text size="4" className="max-w-2xl mx-auto text-emerald-100 leading-relaxed">
              See the positive impact we've created in our community through mutual support and care
            </Text>
          </Box>
          
          <Grid columns={{ initial: '2', md: '4' }} gap="8">
            <Card className="p-8 bg-white/95 rounded-2xl shadow-xl text-center border border-white/20 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <Flex direction="column" align="center" gap="4">
                <Heading size="8" className="font-bold text-emerald-600">650+</Heading>
                <Text size="3" className="text-slate-600 font-medium">Active Members</Text>
              </Flex>
            </Card>
            
            <Card className="p-8 bg-white/95 rounded-2xl shadow-xl text-center border border-white/20 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <Flex direction="column" align="center" gap="4">
                <Heading size="8" className="font-bold text-emerald-600">RM 2M+</Heading>
                <Text size="3" className="text-slate-600 font-medium">Benefits Paid</Text>
              </Flex>
            </Card>
            
            <Card className="p-8 bg-white/95 rounded-2xl shadow-xl text-center border border-white/20 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <Flex direction="column" align="center" gap="4">
                <Heading size="8" className="font-bold text-emerald-600">99%</Heading>
                <Text size="3" className="text-slate-600 font-medium">Approval Rate</Text>
              </Flex>
            </Card>
            
            <Card className="p-8 bg-white/95 rounded-2xl shadow-xl text-center border border-white/20 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <Flex direction="column" align="center" gap="4">
                <Heading size="8" className="font-bold text-emerald-600">5+</Heading>
                <Text size="3" className="text-slate-600 font-medium">Years Serving</Text>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* GOVERNANCE */}
      <Section size="3" py="24" className="bg-white">
        <Container size="4">
          <Box className="text-center mb-16 mt-6">
            <Badge size="2" variant="soft" color="mint" className="mb-4 mt-6 px-6 py-3 text-lg font-medium">
              Leadership & Governance
            </Badge>
            <Heading size="8" className="font-bold text-slate-800 mb-6">
              Guided by Faith, Governed by Trust
            </Heading>
            <Text size="4" className="max-w-3xl mx-auto text-slate-600 leading-relaxed">
              Our governance structure ensures accountability, transparency, and adherence to Islamic principles 
              in every aspect of our operations.
            </Text>
          </Box>
          
          <Grid columns={{ initial: '1', md: '2' }} gap="12" align="center">
            <Box>
              <Card className="p-10 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl shadow-lg">
                <Flex direction="column" gap="6">
                  <Box className="w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <PersonIcon width="32" height="32" className="text-white" />
                  </Box>
                  <Box>
                    <Heading size="6" className="font-bold text-slate-800 mb-4">
                      Mosque Committee Oversight
                    </Heading>
                    <Text size="3" className="text-slate-600 leading-relaxed mb-4">
                      Our operations are overseen by the Setia Alam Mosque Committee, ensuring all activities 
                      align with Islamic principles and community values.
                    </Text>
                    <Flex direction="column" gap="2">
                      <Flex align="center" gap="2">
                        <CheckIcon className="text-emerald-500" />
                        <Text size="2" className="text-slate-600">Monthly committee reviews</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <CheckIcon className="text-emerald-500" />
                        <Text size="2" className="text-slate-600">Annual financial audits</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <CheckIcon className="text-emerald-500" />
                        <Text size="2" className="text-slate-600">Shariah compliance verification</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Card>
            </Box>
            
            <Box>
              <Card className="p-10 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl shadow-lg">
                <Flex direction="column" gap="6">
                  <Box className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <LockClosedIcon width="32" height="32" className="text-white" />
                  </Box>
                  <Box>
                    <Heading size="6" className="font-bold text-slate-800 mb-4">
                      Transparent Operations
                    </Heading>
                    <Text size="3" className="text-slate-600 leading-relaxed mb-4">
                      Every member has access to detailed financial reports, claim statistics, and operational 
                      updates through our member portal and regular community meetings.
                    </Text>
                    <Flex direction="column" gap="2">
                      <Flex align="center" gap="2">
                        <CheckIcon className="text-emerald-500" />
                        <Text size="2" className="text-slate-600">Quarterly financial reports</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <CheckIcon className="text-emerald-500" />
                        <Text size="2" className="text-slate-600">Open member meetings</Text>
                      </Flex>
                      <Flex align="center" gap="2">
                        <CheckIcon className="text-emerald-500" />
                        <Text size="2" className="text-slate-600">Real-time claim tracking</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </Grid>
        </Container>
      </Section>

      {/* CALL TO ACTION */}
      <Section size="3" className="bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden" py="24">
        {/* Background Pattern */}
        <Box
          position="absolute"
          inset="0"
          style={{
            backgroundImage: 'url(/pattern-iznik.svg)',
            opacity: 0.03,
            backgroundSize: 400,
          }}
          aria-hidden
        />
        
        <Container size="4" className="text-center" position="relative">
          <Badge size="2" variant="soft" color="mint" className="mb-4 mt-6 px-6 py-3 text-lg font-medium">
            Join Our Community
          </Badge>
          <Heading size="8" className="font-bold text-slate-800 mb-6 max-w-3xl mx-auto">
            Ready to become part of our caring community?
          </Heading>
          <Text size="4" className="max-w-2xl mx-auto text-slate-600 leading-relaxed mb-8">
            Join hundreds of families who trust MIRSATH for their mutual aid needs. Experience the peace 
            of mind that comes from being part of a supportive, faith-based community.
          </Text>
          
          <Flex gap="4" className="justify-center flex-wrap">
            <Button size="4" color="emerald" variant="solid" highContrast className="shadow-lg hover:shadow-xl px-8" asChild>
              <a href="/register">
                Join MIRSATH Today <ArrowRightIcon className="ml-2" />
              </a>
            </Button>
            <Button size="4" variant="outline" color="emerald" className="border-emerald-300 hover:bg-emerald-50 px-8">
              Contact Us
            </Button>
          </Flex>
          
          {/* Additional trust elements */}
          <Flex gap="8" className="text-emerald-600 text-sm mt-8 justify-center flex-wrap">
            <Text size="2">✓ No hidden fees</Text>
            <Text size="2">✓ Immediate coverage</Text>
            <Text size="2">✓ Community support</Text>
          </Flex>
        </Container>
      </Section>

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
              <Link href="/admin/login" className="text-sm text-emerald-600 hover:text-emerald-800">
                Admin
              </Link>
              
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
