import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { Section, Flex, Text, Spinner } from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

const FormField = ({ label, id, type = 'text', placeholder, error, value, onChange, maxLength, pattern, ...props }) => {
    return (
        <Form.Field className="space-y-3" name={id}>
            <div className="flex justify-between">
                <Label.Root className="text-sm font-medium text-gray-700" htmlFor={id}>
                    {label}
                </Label.Root>
                {maxLength && (
                    <span className={`text-xs ${
                        value.length > maxLength 
                            ? 'text-red-400' 
                            : value.length === maxLength 
                            ? 'text-yellow-500' 
                            : 'text-gray-500'
                    }`}>
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
            <input
                id={id}
                type={type}
                className={`w-full px-6 py-4 rounded-full bg-white/80 border ${
                    error ? 'border-red-400 ring-2 ring-red-300/50' : 'border-gray-300 focus:border-blue-500'
                } text-gray-800 placeholder-gray-400/70 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
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

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black flex items-center justify-center">
            <Section size="3" className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2 tracking-wide">MIRSATH.</h1>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Log Masuk Admin</h2>
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
                        placeholder="admin@mirsath.my"
                        required 
                    />
                    <div className="space-y-3">
                        <Label.Root className="text-sm font-medium text-gray-700">Kata Laluan</Label.Root>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                value={data.password} 
                                onChange={e => setData('password', e.target.value)} 
                                className={`w-full px-6 py-4 rounded-full bg-white/80 border ${errors.password ? 'border-red-400' : 'border-gray-300'} text-gray-800 placeholder-gray-400/70 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`} 
                                placeholder="Kata laluan admin" 
                                required 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-500">
                                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
                    </div>
                    <button type="submit" disabled={processing} className={`w-full px-8 py-3 font-bold rounded-full text-white ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {processing ? (
                            <Flex align="center" justify="center" gap="2">
                                <Spinner size="2" />
                                <span>Memproses...</span>
                            </Flex>
                        ) : (
                            'Log Masuk'
                        )}
                    </button>
                    <div className="text-center mt-8">
                                            <Link href="/" className="text-sm text-primary-dark hover:text-accent-gold transition-colors">
                                                &larr; Back to Homepage
                                            </Link>
                                        </div>
                    
                </Form.Root>
            </Section>
        </div>
    );
};

export default AdminLogin;
