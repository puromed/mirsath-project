# Mirsath Registration Page - Improved Design Guide

## Overview
This guide provides detailed instructions for implementing the improved registration page design using Radix UI and Tailwind CSS, focusing on accessibility and modern web standards.

## Design Structure

### Layout Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                              │
│                    [MIRSATH LOGO]                          │
│                                                            │
│              Pendaftaran Sistem MiRSATH                   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                        FORM AREA                           │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │  PERSONAL INFO  │    │     CONTACT & SECURITY         │ │
│  │  ─────────────  │    │     ─────────────────────      │ │
│  │ [First Name]    │    │ [Email Address]               │ │
│  │ [Last Name]     │    │ [Password]                    │ │
│  │ [Mosque Name]   │    │ [Confirm Password]            │ │
│  │ [IC Number]     │    │ [Password Strength]           │ │
│  └─────────────────┘    └─────────────────────────────────┘ │
│                                                            │
│                    [REGISTER BUTTON]                       │
│                                                            │
│              Already have account? [Login Link]           │
└─────────────────────────────────────────────────────────────┘
```

## Component Specifications

### 1. Form Container
```css
/* Tailwind Classes */
max-w-4xl mx-auto px-6 py-8
bg-white rounded-xl shadow-lg
```

### 2. Form Fields Layout
```css
/* Two-column responsive grid */
grid grid-cols-1 md:grid-cols-2 gap-6
```

### 3. Input Field Structure
```
┌─────────────────────────────────────────┐
│ Label (Floating/Above)                  │
│ ┌─────────────────────────────────────┐ │
│ │ Input Field                         │ │
│ │ [User Input Here]                   │ │
│ └─────────────────────────────────────┘ │
│ ✓ Validation Message / Error           │
└─────────────────────────────────────────┘
```

## Detailed Implementation Requirements

### Form Fields Configuration

#### Left Column - Personal Information
1. **Nama Awal (First Name)**
   - Label: "Nama Awal"
   - Placeholder: "Masukkan nama awal anda"
   - Required: Yes
   - Validation: Text only, min 2 characters

2. **Nama Akhir (Last Name)**
   - Label: "Nama Akhir"
   - Placeholder: "Masukkan nama akhir anda"
   - Required: Yes
   - Validation: Text only, min 2 characters

3. **Nama Masjid (Mosque Name)**
   - Label: "Nama Masjid"
   - Placeholder: "Masjid Setia Alam"
   - Required: Yes
   - Type: Select dropdown or text input

4. **No Kad Pengenalan (IC Number)**
   - Label: "No Kad Pengenalan"
   - Placeholder: "Masuk No Kad Pengenalan Anda"
   - Required: Yes
   - Validation: Malaysian IC format (XXXXXX-XX-XXXX)

#### Right Column - Contact & Security
1. **Alamat E-mel (Email Address)**
   - Label: "Alamat E-mel"
   - Placeholder: "Masukkan alamat e-mel anda"
   - Required: Yes
   - Validation: Valid email format

2. **Kata Laluan (Password)**
   - Label: "Kata Laluan"
   - Placeholder: "Masukkan kata laluan anda"
   - Required: Yes
   - Type: Password with show/hide toggle
   - Validation: Min 8 characters, mixed case, numbers

3. **Pengesahan Kata Laluan (Confirm Password)**
   - Label: "Pengesahan Kata Laluan"
   - Placeholder: "Sahkan kata laluan anda"
   - Required: Yes
   - Validation: Must match password

4. **Password Strength Indicator**
   ```
   ┌─────────────────────────────────────┐
   │ Password Strength: [████████░░] 8/10│
   │ ✓ 8+ characters                     │
   │ ✓ Uppercase letter                  │
   │ ✓ Lowercase letter                  │
   │ ✗ Special character                 │
   └─────────────────────────────────────┘
   ```

### Input Field Styling

#### Normal State
```css
/* Tailwind Classes */
border border-gray-300 rounded-lg px-4 py-3
focus:border-green-500 focus:ring-2 focus:ring-green-200
transition-all duration-200
bg-white text-gray-900
```

#### Focus State
```css
/* Enhanced focus with green theme */
border-green-500 ring-2 ring-green-200
outline-none shadow-sm
```

#### Error State
```css
/* Error styling */
border-red-500 ring-2 ring-red-200
bg-red-50
```

#### Success State
```css
/* Success styling */
border-green-500 ring-2 ring-green-200
bg-green-50
```

### Button Design

#### Primary Button (Register)
```
┌─────────────────────────────────────────────────────────────┐
│                      DAFTAR AKAUN                          │
│                    [Loading Spinner]                        │
└─────────────────────────────────────────────────────────────┘
```

```css
/* Tailwind Classes */
w-full py-3 px-6 
bg-green-600 hover:bg-green-700 
text-white font-medium rounded-lg
focus:ring-4 focus:ring-green-300
transition-all duration-200
disabled:opacity-50 disabled:cursor-not-allowed
```

#### Button States
- **Normal**: Green background
- **Hover**: Darker green + subtle lift
- **Focus**: Ring indicator
- **Loading**: Spinner + disabled state
- **Disabled**: Opacity reduced

### Validation & Error Handling

#### Field Validation Visual Feedback
```
┌─────────────────────────────────────────┐
│ Email Address                           │
│ ┌─────────────────────────────────────┐ │
│ │ invalid-email@                    ✗ │ │
│ └─────────────────────────────────────┘ │
│ ⚠️ Please enter a valid email address   │
└─────────────────────────────────────────┘
```

#### Success State
```
┌─────────────────────────────────────────┐
│ Email Address                           │
│ ┌─────────────────────────────────────┐ │
│ │ user@example.com                  ✓ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Responsive Design

#### Mobile Layout (< 768px)
```css
/* Stack columns vertically */
grid-cols-1 gap-4
/* Adjust padding and spacing */
px-4 py-6
/* Full width inputs */
w-full
```

#### Tablet Layout (768px - 1024px)
```css
/* Maintain two-column layout */
grid-cols-2 gap-6
/* Adjusted container width */
max-w-3xl
```

#### Desktop Layout (> 1024px)
```css
/* Optimal spacing */
max-w-4xl
grid-cols-2 gap-8
```

### Accessibility Features

#### Required Implementations
1. **Proper Labels**: All fields must have associated labels
2. **ARIA Attributes**: `aria-invalid`, `aria-describedby` for errors
3. **Focus Management**: Logical tab order
4. **Color Contrast**: Minimum 4.5:1 ratio
5. **Screen Reader Support**: Meaningful error messages
6. **Keyboard Navigation**: All interactive elements accessible

#### Example ARIA Implementation
```html
<label for="email" class="block text-sm font-medium text-gray-700">
  Alamat E-mel
</label>
<input
  id="email"
  name="email"
  type="email"
  aria-invalid="false"
  aria-describedby="email-error"
  class="mt-1 block w-full..."
/>
<div id="email-error" class="mt-2 text-sm text-red-600" role="alert">
  Please enter a valid email address
</div>
```

### Animation & Micro-interactions

#### Form Entrance Animation
```css
/* Fade in with slide up */
animate-in slide-in-from-bottom-4 fade-in duration-500
```

#### Button Hover Effects
```css
/* Subtle scale and shadow */
hover:scale-105 hover:shadow-lg
transform transition-all duration-200
```

#### Input Focus Animations
```css
/* Smooth border and ring transitions */
transition-all duration-200 ease-in-out
```

## Technical Implementation Notes

### Radix UI Components to Use
- `@radix-ui/react-form` - Form validation and accessibility
- `@radix-ui/react-label` - Accessible labels
- `@radix-ui/react-toast` - Success/error notifications

### State Management
- Use React Hook Form for form state
- Implement real-time validation
- Handle loading states during submission

### Color Palette
- **Primary Green**: `#16a34a` (green-600)
- **Hover Green**: `#15803d` (green-700)
- **Light Green**: `#dcfce7` (green-100)
- **Error Red**: `#dc2626` (red-600)
- **Success Green**: `#059669` (emerald-600)

This improved design maintains your original aesthetic while adding modern accessibility features and better user experience patterns.