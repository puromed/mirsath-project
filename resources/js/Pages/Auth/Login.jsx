import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { Section, Flex, Text, Spinner } from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

// Reuse FormField from Register.jsx if possible
const FormField = ({ label, id, type = 'text', placeholder, error, value, onChange, maxLength, pattern, ...props }) => {
    return (
        <Form.Field className="space-y-3" name={id}>
            <div className="flex justify-between">
                <Label.Root className="text-sm font-medium text-primary-dark" htmlFor={id}>
                    {label}
                </Label.Root>
                {maxLength && (
                    <span className={`text-xs ${
                        value.length > maxLength 
                            ? 'text-red-400' 
                            : value.length === maxLength 
                            ? 'text-yellow-500' 
                            : 'text-text-muted'
                    }`}>
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
            <input
                id={id}
                type={type}
                className={`w-full px-6 py-4 rounded-full bg-white/80 border ${
                    error ? 'border-red-400 ring-2 ring-red-300/50' : 'border-primary-dark/30 focus:border-primary-dark'
                } text-text-dark placeholder-text-muted/70 focus:ring-2 focus:ring-primary-dark/20 transition-all duration-200`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                pattern={pattern}
                {...props}
            />
            {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
        </Form.Field>
    );
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-green flex items-center justify-center">
            <Section size="3" className="w-full max-w-md bg-background-off-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-accent-gold mb-2 tracking-wide">MIRSATH.</h1>
                    <h2 className="text-xl font-semibold text-primary-dark mb-2">Log Masuk Sistem</h2>
                </div>
                <Form.Root onSubmit={handleSubmit} className="space-y-8">
                    <FormField 
                        label="Alamat E-mel" 
                        id="email" 
                        type="email" 
                        value={data.email} 
                        onChange={e => setData('email', e.target.value)} 
                        error={errors.email} 
                        maxLength={100}
                        placeholder="nama@contoh.com"
                        required 
                    />
                    <div className="space-y-3">
                        <Label.Root className="text-sm font-medium text-primary-dark">Kata Laluan</Label.Root>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                value={data.password} 
                                onChange={e => setData('password', e.target.value)} 
                                className={`w-full px-6 py-4 rounded-full bg-white/80 border ${errors.password ? 'border-red-400' : 'border-primary-dark/30'} text-text-dark placeholder-text-muted/70 focus:ring-2 focus:ring-primary-dark/20 transition-all duration-200`} 
                                placeholder="Kata laluan anda" 
                                required 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4">
                                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
                    </div>
                    <button type="submit" disabled={processing} className={`w-full px-8 py-3 font-bold rounded-full text-white ${processing ? 'bg-text-muted cursor-not-allowed' : 'bg-primary-dark hover:bg-primary-green'}`}>
                        {processing ? (
                            <Flex align="center" justify="center" gap="2">
                                <Spinner size="2" color="gold" />
                                <span>Memproses...</span>
                            </Flex>
                        ) : (
                            'Log Masuk'
                        )}
                    </button>
                    <div className="text-center pt-4">
                        <p className="text-sm">
                            <span className="text-text-dark">Belum ada akaun? </span>
                            <Link href="/register" className="text-accent-gold hover:text-accent-gold/80 font-medium transition-colors">
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </Form.Root>
            </Section>
        </div>
    );
};

export default Login;
