import { Button, Flex } from "@radix-ui/themes"

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
            
            <Flex gap="4">
                {/* Default button */}
                <Button variant="classic">
                    Default Button
                </Button>
                
                {/* Primary button */}
                <Button variant="solid">
                    Primary Button
                </Button>
                
                {/* Secondary button */}
                <Button variant="soft">
                    Secondary Button
                </Button>
            </Flex>
            
            <Flex className="mt-4" gap="2">
                {/* Different sizes */}
                <Button size="1">Small</Button>
                <Button size="2">Medium</Button>
                <Button size="3">Large</Button>
            </Flex>

            {/* Test link to login page */}
            <div className="mt-8">
                <a href="/login" className="text-primary-dark hover:underline">
                    Go to Login Page
                </a>
            </div>
            {/* Test link to register page */}
            <div className="mt-2">
                <a href="/register" className="text-primary-dark hover:underline">
                    Go to Register Page
                </a>
            </div>
        </div>
        
        
    );
}