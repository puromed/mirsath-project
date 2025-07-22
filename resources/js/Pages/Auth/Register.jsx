import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import * as Form from '@radix-ui/react-form';
import * as Label from '@radix-ui/react-label';
import { Section, RadioGroup, Flex, Text } from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

const FormField = ({ label, id, type = 'text', placeholder, error, value, onChange, maxLength, pattern, ...props }) => {
    const [lengthWarning, setLengthWarning] = useState(false);
    const [patternWarning, setPatternWarning] = useState(false);

    const handleChange = (e) => {
        const newValue = e.target.value;
        
        // Check length constraint only for fields that need strict validation
        if (maxLength && (id === 'icNumber' || id.includes('phone'))) {
            if (id === 'icNumber') {
                setLengthWarning(newValue.length !== maxLength);
            } else {
                setLengthWarning(newValue.length > maxLength);
            }
        } else {
            setLengthWarning(false);
        }

        // Check pattern constraint only for IC and phone
        if (pattern && (id === 'icNumber' || id.includes('phone'))) {
            const regex = new RegExp(pattern);
            setPatternWarning(newValue.length > 0 && !regex.test(newValue));
        }

        

        onChange(e);
    };
        const showWarning = (id === 'icNumber' || id.includes('phone')) && (lengthWarning || patternWarning);

    return (
        <Form.Field className="space-y-3" name={id}>
            <div className="flex justify-between">
                <Label.Root className="text-sm font-medium text-primary-dark" htmlFor={id}>
                    {label}
                </Label.Root>
                {maxLength && (
                    <span className={`text-xs ${
                        id === 'icNumber'
                            ? (value.length === maxLength ? 'text-green-600' : 'text-red-400')
                            : (value.length > maxLength ? 'text-red-400' : 'text-text-muted')
                    }`}>
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    className={`w-full px-6 py-4 rounded-full bg-white/80 border ${
                        error || showWarning
                            ? 'border-red-400 ring-2 ring-red-300/50'
                            : 'border-primary-dark/30 focus:border-primary-dark'
                    } text-text-dark placeholder-text-muted/70 focus:ring-2 focus:ring-primary-dark/20 transition-all duration-200`}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    pattern={pattern}
                    {...props}
                />
                {value && (
                    <div className="absolute right-4 top-4">
                        {error || showWarning ? (
                            <CrossCircledIcon className="h-5 w-5 text-red-400" />
                        ) : (
                            <CheckCircledIcon className="h-5 w-5 text-primary-dark" />
                        )}
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
            {patternWarning && !error && (
                <p className="text-sm text-red-400 mt-1">
                    {id === 'icNumber' 
                        ? 'IC Number must contain 12 numbers'
                        : id.includes('phone')
                        ? 'Phone number must contain 10-11 numbers'
                        : 'Invalid format'}
                </p>
            )}
        </Form.Field>
    );
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
  });
  const [consent, setConsent] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    icNumber: '',
    phone_number: '',
    date_of_birth: '',
    house_no: '',
    street_address: '',
    postcode: '40170',
    city: 'Setia Alam',
    state: 'Selangor',
    next_of_kin_name: '',
    next_of_kin_phone: '',
    next_of_kin_relationship: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const updatePasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    
    let strength = Object.values(checks).filter(Boolean).length * 25;
    setPasswordStrength(strength);
    setPasswordChecks(checks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consent) {
      post('/register', {
        onSuccess: () => alert('Registration successful! Please wait for admin approval.'),
        onError: (errors) => {
          console.error('Registration Errors:', errors);
          setStep(1); 
          alert('An error occurred during registration. Please check the information entered. Error has been logged to console.');
        }
      });
    } else {
      alert('You must agree to the terms and conditions.');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary-green">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent-gold mb-4 tracking-wide">MIRSATH.</h1>
          <h2 className="text-2xl font-semibold text-background-off-white mb-2">Register to MIRSATH System</h2>
        </div>

        <Section 
          size="3"
          className="w-full bg-background-off-white/95 backdrop-blur-sm rounded-xl shadow-lg relative min-h-[calc(100vh-16rem)] flex flex-col justify-center p-8 md:p-12"
        >
          <div className="relative z-10">
            <Form.Root onSubmit={handleSubmit} className="space-y-8">
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-6">Step 1: Personal & Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <FormField 
                        label="Full Name" 
                        id="name" 
                        value={data.name} 
                        onChange={e => setData('name', e.target.value)} 
                        error={errors.name} 
                        maxLength={50}
                        pattern="^[a-zA-Z ]+$"
                        required 
                      />
                      <FormField 
                        label="IC Number" 
                        id="icNumber" 
                        value={data.icNumber} 
                        onChange={e => setData('icNumber', e.target.value)} 
                        error={errors.icNumber} 
                        maxLength={12}
                        pattern="^[0-9]{12}$"
                        placeholder="XXXXXXXXXXXX"
                        required 
                      />
                      <FormField 
                        label="Phone Number" 
                        id="phone_number" 
                        value={data.phone_number} 
                        onChange={e => setData('phone_number', e.target.value)} 
                        error={errors.phone_number} 
                        maxLength={11}
                        pattern="^[0-9]{10,11}$"
                        placeholder="01XXXXXXXXX"
                        required 
                      />
                      <FormField label="Tarikh Lahir" id="date_of_birth" type="date" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} error={errors.date_of_birth} required />
                    </div>
                    <div className="space-y-6">
                      <FormField 
                        label="House No." 
                        id="house_no" 
                        value={data.house_no} 
                        onChange={e => setData('house_no', e.target.value)} 
                        error={errors.house_no} 
                        maxLength={3}
                        placeholder="123"
                        required 
                      />
                      <FormField 
                        label="Street Address" 
                        id="street_address" 
                        value={data.street_address} 
                        onChange={e => setData('street_address', e.target.value)} 
                        error={errors.street_address} 
                        maxLength={100}
                        placeholder="Jalan Example 1/2"
                        required 
                      />
                      <FormField 
                        label="Postcode" 
                        id="postcode" 
                        value={data.postcode} 
                        onChange={e => setData('postcode', e.target.value)} 
                        error={errors.postcode} 
                        maxLength={5}
                        pattern="^[0-9]{5}$"
                        placeholder="40170"
                        required 
                      />
                      <FormField label="City" id="city" value={data.city} readOnly />
                      <FormField label="State" id="state" value={data.state} readOnly />
                    </div>
                  </div>
                  <div className="pt-6 text-right">
                    <button type="button" onClick={nextStep} className="px-8 py-3 bg-primary-dark text-white font-bold rounded-full">Seterusnya</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-6">Step 2: Next of Kin Information</h3>
                  <div className="space-y-6">
                    <FormField 
                      label="Next of Kin Name" 
                      id="next_of_kin_name" 
                      value={data.next_of_kin_name} 
                      onChange={e => setData('next_of_kin_name', e.target.value)} 
                      error={errors.next_of_kin_name} 
                      maxLength={50}
                      pattern="^[a-zA-Z ]+$"
                      placeholder="Nama Waris"
                      required 
                    />
                    <FormField 
                      label="Next of Kin Phone" 
                      id="next_of_kin_phone" 
                      value={data.next_of_kin_phone} 
                      onChange={e => setData('next_of_kin_phone', e.target.value)} 
                      error={errors.next_of_kin_phone} 
                      maxLength={11}
                      pattern="^[0-9]{10,11}$"
                      placeholder="01XXXXXXXXX"
                      required 
                    />
                    <div>
                      <Label.Root className="text-sm font-medium text-primary-dark">Hubungan</Label.Root>
                      <RadioGroup.Root value={data.next_of_kin_relationship} onValueChange={value => setData('next_of_kin_relationship', value)}>
                        <Flex gap="4" direction="row" wrap="wrap" className="mt-2">
                          <Text as="label" size="2"><RadioGroup.Item value="Spouse" /> Pasangan</Text>
                          <Text as="label" size="2"><RadioGroup.Item value="Child" /> Anak</Text>
                          <Text as="label" size="2"><RadioGroup.Item value="Parent" /> Ibu/Bapa</Text>
                          <Text as="label" size="2"><RadioGroup.Item value="Sibling" /> Adik-beradik</Text>
                        </Flex>
                      </RadioGroup.Root>
                      {errors.next_of_kin_relationship && <p className="text-sm text-red-400 mt-1">{errors.next_of_kin_relationship}</p>}
                    </div>
                  </div>
                  <div className="pt-6 flex justify-between">
                    <button type="button" onClick={prevStep} className="px-8 py-3 bg-neutral-gray text-white font-bold rounded-full">Kembali</button>
                    <button type="button" onClick={nextStep} className="px-8 py-3 bg-primary-dark text-white font-bold rounded-full">Seterusnya</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-6">Step 3: Account Information</h3>
                  <div className="space-y-6">
                    <FormField 
                      label="Email Address" 
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
                      <Label.Root className="text-sm font-medium text-primary-dark">Password</Label.Root>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} id="password" value={data.password} onChange={e => { setData('password', e.target.value); updatePasswordStrength(e.target.value); }} className={`w-full px-6 py-4 rounded-full bg-white/80 border ${errors.password ? 'border-red-400' : 'border-primary-dark/30'}`} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4">{showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}</button>
                      </div>
                      {data.password && (
                        <div className="mt-3 space-y-2">
                          <div className="w-full bg-text-muted/30 rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all duration-300 ${passwordStrength < 50 ? 'bg-red-500' : passwordStrength < 100 ? 'bg-yellow-500' : 'bg-primary-green'}`} style={{ width: `${passwordStrength}%` }} />
                          </div>
                          <div className="text-sm space-y-1 mt-2">
                            <p className={`${passwordChecks.length ? 'text-primary-dark' : 'text-text-muted'}`}>{passwordChecks.length ? '✓' : '○'} Sekurang-kurangnya 8 aksara</p>
                            <p className={`${passwordChecks.uppercase ? 'text-primary-dark' : 'text-text-muted'}`}>{passwordChecks.uppercase ? '✓' : '○'} Satu huruf besar</p>
                            <p className={`${passwordChecks.lowercase ? 'text-primary-dark' : 'text-text-muted'}`}>{passwordChecks.lowercase ? '✓' : '○'} Satu huruf kecil</p>
                            <p className={`${passwordChecks.special ? 'text-primary-dark' : 'text-text-muted'}`}>{passwordChecks.special ? '✓' : '○'} Satu aksara khas (!@#$... etc)</p>
                          </div>
                        </div>
                      )}
                      {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
                    </div>
                    <div className="space-y-3">
                      <Label.Root className="text-sm font-medium text-primary-dark">Password Confirmation</Label.Root>
                      <div className="relative">
                        <input 
                          type={showPasswordConfirmation ? 'text' : 'password'} 
                          id="password_confirmation" 
                          value={data.password_confirmation} 
                          onChange={e => setData('password_confirmation', e.target.value)} 
                          className={`w-full px-6 py-4 rounded-full bg-white/80 border ${
                            errors.password_confirmation 
                              ? 'border-red-400 ring-2 ring-red-300/50' 
                              : 'border-primary-dark/30 focus:border-primary-dark'
                          } text-text-dark placeholder-text-muted/70 focus:ring-2 focus:ring-primary-dark/20 transition-all duration-200`}
                          placeholder="Sahkan kata laluan anda"
                          required 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} 
                          className="absolute right-4 top-4 text-text-muted hover:text-text-dark transition-colors"
                        >
                          {showPasswordConfirmation ? <EyeClosedIcon className="h-5 w-5" /> : <EyeOpenIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password_confirmation && <p className="text-sm text-red-400 mt-1">{errors.password_confirmation}</p>}
                    </div>
                  </div>
                  <div className="pt-6 flex justify-between">
                    <button type="button" onClick={prevStep} className="px-8 py-3 bg-neutral-gray text-white font-bold rounded-full">Kembali</button>
                    <button type="button" onClick={nextStep} className="px-8 py-3 bg-primary-dark text-white font-bold rounded-full">Seterusnya</button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark mb-6">Step 4: Confirmation & Agreement</h3>
                  <div className="p-6 bg-white/80 rounded-lg space-y-2 text-text-dark">
                    <h4 className="font-bold text-lg">Please confirm your information:</h4>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>IC:</strong> {data.icNumber}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Alamat:</strong> {`${data.house_no}, ${data.street_address}, ${data.postcode} ${data.city}, ${data.state}`}</p>
                    <p><strong>Waris:</strong> {`${data.next_of_kin_name} (${data.next_of_kin_relationship}) - ${data.next_of_kin_phone}`}</p>
                  </div>
                  <div className="mt-6">
                    <label className="flex items-center">
                      <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} className="h-5 w-5 text-primary-dark focus:ring-primary-dark" />
                      <span className="ml-3 text-sm text-text-dark">I confirm that the information above is true and I agree to the <a href="#" className="text-accent-gold underline">terms and conditions</a> of registration.</span>
                    </label>
                  </div>
                  <div className="pt-6 flex justify-between">
                    <button type="button" onClick={prevStep} className="px-8 py-3 bg-neutral-gray text-white font-bold rounded-full">Back</button>
                    <button type="submit" disabled={!consent || processing} className={`px-8 py-3 font-bold rounded-full text-white ${!consent || processing ? 'bg-text-muted cursor-not-allowed' : 'bg-primary-dark hover:bg-primary-green'}`}>
                      {processing ? 'Processing...' : 'Submit'}
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center pt-4">
                <p className="text-sm">
                  <span className="text-text-dark">Already have an account? </span>
                  <Link href="/login" className="text-accent-gold hover:text-accent-gold/80 font-medium transition-colors">
                    Login here
                  </Link>
                </p>
              </div>
            </Form.Root>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Register;
