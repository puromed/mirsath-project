# Mirsath Islamic Cooperative - Khairat Management System

<p align="center">
    <img src="public/images/Mirsath Logo.png" width="200" alt="Mirsath Logo" style="border-radius: 10px;">
</p>

<p align="center">
    <strong>🕌 A modern web application for managing Islamic cooperative khairat schemes</strong>
</p>

<p align="center">
    <em>Built with Laravel, Inertia.js, React, and Radix UI</em>
</p>

---

## 📋 Table of Contents

- [About Mirsath](#about-mirsath)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Prerequisites Installation](#prerequisites-installation)
- [Project Installation](#project-installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Admin Features](#admin-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🕌 About Mirsath

**Mirsath Islamic Cooperative** is a comprehensive Khairat (mutual aid) management system designed for Islamic communities and mosques. The system enables mosque administrators to manage member registrations, dependent tracking, claims processing, and financial transactions in accordance with Islamic principles.

### Key Benefits:
- **Shariah Compliant**: Built following Islamic mutual aid principles
- **Mosque Governed**: Designed for community oversight and transparency
- **User-Friendly**: Modern interface accessible to all community members
- **Comprehensive**: Complete member lifecycle management
- **Secure**: Role-based access control and data protection

---

## ✨ Features

### 👥 **Member Management**
- User registration and profile management
- IC number validation and duplicate prevention
- Member status tracking (Pending, Active, Rejected)
- Annual membership fee tracking

### 👨‍👩‍👧‍👦 **Family Management**
- Add and manage dependents (spouse, children, parents)
- Relationship tracking and validation
- Age calculation and status monitoring

### 📋 **Claims Processing**
- Submit claims for deceased family members
- Upload death certificates and supporting documents
- Multi-step approval workflow
- Automated payout calculations

### 💰 **Financial Management**
- Annual membership fee tracking
- Payment history and receipts
- Claim payout management
- Financial reporting

### 👮 **Admin Dashboard**
- Comprehensive member oversight
- Claims review and approval system
- Financial reporting and analytics
- Export functionality (CSV/PDF)

### 📊 **Reporting & Analytics**
- Professional PDF reports with Islamic branding
- Member statistics and trends
- Claims analytics and processing times
- Financial summaries and auditing

---

## 🔧 System Requirements

### Minimum Requirements:
- **PHP**: 8.1 or higher
- **Node.js**: 18.0 or higher
- **MySQL**: 8.0 or higher
- **Composer**: 2.0 or higher
- **Git**: Latest version

### Recommended:
- **RAM**: 4GB or more
- **Storage**: 2GB free space
- **Operating System**: Windows 10/11, macOS 10.15+, or Ubuntu 20.04+

---

## 📦 Prerequisites Installation

### Step 1: Install PHP & MySQL

#### **Windows (using Laragon - Recommended)**
1. Download [Laragon](https://laragon.org/download/) (Full version)
2. Install Laragon with default settings
3. Start Laragon (Apache & MySQL will start automatically)
4. Laragon includes PHP 8.1+, MySQL, and phpMyAdmin

#### **Windows (using XAMPP - Alternative)**
1. Download [XAMPP](https://www.apachefriends.org/download.html)
2. Install XAMPP with Apache, MySQL, and PHP
3. Start Apache and MySQL services

#### **macOS**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP and MySQL
brew install php@8.1 mysql
brew services start mysql
```

#### **Ubuntu/Linux**
```bash
# Update package index
sudo apt update

# Install PHP and extensions
sudo apt install php8.1 php8.1-cli php8.1-fpm php8.1-mysql php8.1-xml php8.1-curl php8.1-zip php8.1-mbstring

# Install MySQL
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
```

### Step 2: Install Composer
1. Visit [getcomposer.org](https://getcomposer.org/download/)
2. Download and install Composer for your operating system
3. Verify installation: `composer --version`

### Step 3: Install Node.js & npm
1. Visit [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 4: Install Git
1. Visit [git-scm.com](https://git-scm.com/)
2. Download and install Git for your operating system
3. Configure Git:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

---

## 🚀 Project Installation

### Step 1: Get the Project Files

#### Option A: Clone with Git (Recommended)
```bash
# Clone the project
git clone https://github.com/puromed/mirsath-project.git

# Navigate to project directory
cd mirsath-project
```

#### Option B: Download ZIP File
1. Download the project ZIP file from GitHub
2. **For Laragon Users:**
   - Extract the ZIP file to `C:\laragon\www\`
   - Rename the extracted folder to `mirsath-project`
   - Final path should be: `C:\laragon\www\mirsath-project\`
3. **For XAMPP Users:**
   - Extract the ZIP file to `C:\xampp\htdocs\`
   - Rename the extracted folder to `mirsath-project`
   - Final path should be: `C:\xampp\htdocs\mirsath-project\`
4. **For macOS/Linux:**
   - Extract to your web server document root
   - Typically `/var/www/html/` or your preferred web directory
5. Open terminal/command prompt and navigate to the project directory:
   ```bash
   # For Laragon
   cd C:\laragon\www\mirsath-project
   
   # For XAMPP
   cd C:\xampp\htdocs\mirsath-project
   
   # For macOS/Linux
   cd /path/to/your/web/directory/mirsath-project
   ```

### Step 2: Install PHP Dependencies
```bash
# Install Laravel dependencies
composer install
```

### Step 3: Install JavaScript Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Puppeteer for PDF generation
npm install puppeteer
```

### Step 4: Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Step 5: Database Setup

#### Import Database with Sample Data:
**Using phpMyAdmin (Laragon/XAMPP) - Recommended:**
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Create new database named `mirsath_db`
3. Set collation to `utf8mb4_unicode_ci`
4. Select the `mirsath_db` database
5. Click on the **Import** tab
6. Choose the file `mirsath_db-1752860302183.sql` from the project root directory
7. Click **Go** to import the database with sample data

**Using MySQL Command Line (Alternative):**
```sql
mysql -u root -p
CREATE DATABASE mirsath_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mirsath_db;
SOURCE /path/to/project/mirsath_db-1752860302183.sql;
exit
```

#### Configure Database Connection:
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mirsath_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

### Step 6: Database Migrations (Skip if using SQL Import)

**If you imported the SQL file in Step 5, skip this step as the database is already set up with sample data.**

**If you created an empty database, run migrations:**
```bash
# Run migrations to create tables
php artisan migrate

# Seed the database with sample data (optional)
php artisan db:seed
```

### Step 7: Create Storage Link
```bash
# Create symbolic link for file storage
php artisan storage:link
```

### Step 8: Build Frontend Assets
```bash
# Build CSS and JavaScript assets
npm run build

# For development with hot reloading
npm run dev
```

---

## ⚙️ Configuration

### File Storage Setup
Ensure the `storage` directory is writable:
```bash
# Linux/macOS
chmod -R 775 storage bootstrap/cache

# Windows (run as administrator)
icacls storage /grant Everyone:F /T
icacls bootstrap/cache /grant Everyone:F /T
```

### Email Configuration (Optional)
For notifications, configure email in `.env`:
```env
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@mirsath.org
MAIL_FROM_NAME="Mirsath Islamic Cooperative"
```

---

## 🎯 Usage

### Starting the Application

#### Development Mode:
```bash
# Terminal 1: Start Laravel development server
php artisan serve

# Terminal 2: Start Vite development server (for hot reloading)
npm run dev
```

#### Production Mode:
```bash
# Build optimized assets
npm run build

# Start with web server (Apache/Nginx)
# Point document root to /public directory
```

### Accessing the Application

- **Homepage**: `http://localhost:8000`
- **Member Registration**: `http://localhost:8000/register`
- **Member Login**: `http://localhost:8000/login`
- **Admin Login**: `http://localhost:8000/admin/login`
- **FAQ Page**: `http://localhost:8000/faq`

### Default Admin Credentials
```
Email: admin@mirsath.org
Password: password123
```

*(Change these credentials immediately after first login)*

---

## 👮 Admin Features

### Member Management
- View all registered members
- Approve/reject membership applications
- Export member data (CSV/PDF)
- Track membership status and payments

### Claims Processing
- Review submitted claims
- Approve/reject claims with notes
- Set payout amounts
- Download claim certificates
- Export claims reports (CSV/PDF)

### Dependent Management
- View all registered dependents
- Monitor family relationships
- Export dependent data (CSV/PDF)

### Financial Oversight
- Track annual membership fees
- Monitor claim payouts
- Generate financial reports
- Export transaction history

---

## 🛠️ Technology Stack

### Backend
- **Laravel 11**: PHP framework
- **MySQL**: Database management
- **Spatie Laravel PDF**: Professional PDF generation
- **Laravel Sanctum**: API authentication
- **Spatie SimpleExcel**: CSV export functionality

### Frontend
- **React 18**: User interface framework
- **Inertia.js**: Server-side rendering
- **Radix UI**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server

### Development Tools
- **Composer**: PHP dependency management
- **NPM**: JavaScript package management
- **Git**: Version control
- **Puppeteer**: Headless browser for PDF generation

---

## 📁 Project Structure

```
mirsath-project/
├── app/
│   ├── Http/Controllers/          # Laravel controllers
│   ├── Models/                    # Eloquent models
│   ├── Policies/                  # Authorization policies
│   └── Notifications/             # Email notifications
├── database/
│   ├── migrations/                # Database schema
│   └── seeders/                   # Sample data
├── resources/
│   ├── js/
│   │   ├── Pages/                 # React page components
│   │   ├── Layouts/               # Layout components
│   │   └── Components/            # Reusable components
│   ├── views/
│   │   └── pdf/                   # PDF templates
│   └── css/                       # Stylesheets
├── routes/
│   └── web.php                    # Application routes
├── storage/
│   └── app/private/               # Uploaded files
└── public/
    ├── images/                    # Static assets
    └── build/                     # Compiled assets
```

---

## 🔧 Development

### Running Tests
```bash
# Run PHP tests
php artisan test

# Run JavaScript tests
npm run test
```

### Code Style
```bash
# Format PHP code
./vendor/bin/pint

# Format JavaScript code
npm run lint
```

### Database Management
```bash
# Fresh migration (WARNING: Deletes all data)
php artisan migrate:fresh

# Rollback migrations
php artisan migrate:rollback

# Seed database with sample data
php artisan db:seed
```

---

## 🔍 Troubleshooting

### Common Issues

#### **"Permission denied" errors**
```bash
# Fix file permissions (Linux/macOS)
sudo chown -R $USER:$USER .
chmod -R 755 storage bootstrap/cache
```

#### **Database connection errors**
1. Check MySQL service is running
2. Verify database credentials in `.env`
3. Ensure database `mirsath_db` exists

#### **PDF generation fails**
```bash
# Install missing Puppeteer
npm install puppeteer

# Check Chrome/Chromium installation
npm run puppeteer:install
```

#### **Assets not loading**
```bash
# Clear cache and rebuild
php artisan cache:clear
php artisan config:clear
npm run build
```

#### **Migration errors**
```bash
# Reset database (WARNING: Deletes all data)
php artisan migrate:fresh

# Fix specific migration
php artisan migrate:status
php artisan migrate:rollback --step=1
```

### Getting Help
- Check [Laravel Documentation](https://laravel.com/docs)
- Visit [Inertia.js Documentation](https://inertiajs.com/)
- Review [Radix UI Documentation](https://www.radix-ui.com/)
- Create an issue on the project repository

---



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


---

