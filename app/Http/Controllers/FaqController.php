<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display the FAQ page for all users (guest and authenticated)
     */
    public function index(): Response
    {
        // FAQ data organized by categories
        $faqData = [
            'membership' => [
                'title' => 'Membership',
                'faqs' => [
                    [
                        'question' => 'Who can become a member of Mirsath Islamic Cooperative?',
                        'answer' => 'Any Muslim individual who agrees to follow Islamic principles and the cooperative\'s bylaws can become a member. Members must be at least 18 years old and provide necessary documentation including IC, proof of income, and completed application forms.'
                    ],
                    [
                        'question' => 'What are the membership fees?',
                        'answer' => 'The membership fee includes a one-time registration fee of RM 50 and an annual membership fee of RM 100. Additional contributions may be made voluntarily to increase benefit coverage.'
                    ],
                    [
                        'question' => 'How do I register my dependents?',
                        'answer' => 'You can register your spouse and children as dependents through your member dashboard. Required documents include birth certificates for children and marriage certificate for spouse. Dependent registration is free for immediate family members.'
                    ],
                    [
                        'question' => 'Can I change my membership details?',
                        'answer' => 'Yes, you can update your personal information, contact details, and dependent information through your member dashboard or by visiting our office. Some changes may require supporting documentation.'
                    ]
                ]
            ],
            'claims' => [
                'title' => 'Claims & Benefits',
                'faqs' => [
                    [
                        'question' => 'What benefits are covered under the cooperative?',
                        'answer' => 'Our cooperative provides death benefits for members and their registered dependents. The benefit amount depends on your membership duration and contribution level. Benefits range from RM 5,000 to RM 15,000.'
                    ],
                    [
                        'question' => 'How do I submit a claim?',
                        'answer' => 'Claims can be submitted through your member dashboard by uploading the required documents including death certificate, IC of deceased, and claimant\'s IC. You can also submit claims in person at our office.'
                    ],
                    [
                        'question' => 'What documents are required for a claim?',
                        'answer' => 'Required documents include: Original death certificate, Copy of deceased\'s IC, Copy of claimant\'s IC, Bank account details for payment, and any additional documents requested by the review committee.'
                    ],
                    [
                        'question' => 'How long does claim processing take?',
                        'answer' => 'Claims are typically processed within 14-21 working days from the date of submission with complete documentation. Complex cases may require additional time for verification.'
                    ],
                    [
                        'question' => 'Can I track my claim status?',
                        'answer' => 'Yes, you can track your claim status in real-time through your member dashboard. You will also receive email notifications for any status updates or requests for additional information.'
                    ]
                ]
            ],
            'payments' => [
                'title' => 'Payments & Contributions',
                'faqs' => [
                    [
                        'question' => 'How can I make payments?',
                        'answer' => 'Payments can be made through online banking, bank transfer, or in-person at our office. We accept payments via FPX, credit card, and cash (office visits only).'
                    ],
                    [
                        'question' => 'When are annual fees due?',
                        'answer' => 'Annual membership fees are due on the anniversary of your membership start date. You will receive reminder notifications 30 days before the due date.'
                    ],
                    [
                        'question' => 'What happens if I miss a payment?',
                        'answer' => 'Members have a 30-day grace period after the due date. After this period, membership benefits may be suspended until payment is made. Please contact us if you\'re experiencing financial difficulties.'
                    ],
                    [
                        'question' => 'Can I view my payment history?',
                        'answer' => 'Yes, your complete payment history is available in your member dashboard. You can download payment receipts and annual statements for your records.'
                    ]
                ]
            ],
            'technical' => [
                'title' => 'Technical Support',
                'faqs' => [
                    [
                        'question' => 'I forgot my password. How can I reset it?',
                        'answer' => 'Click on "Forgot Password" on the login page and enter your registered email address. You will receive a password reset link within a few minutes. If you don\'t receive the email, check your spam folder.'
                    ],
                    [
                        'question' => 'Why can\'t I log into my account?',
                        'answer' => 'Common issues include incorrect email/password, expired session, or browser cache issues. Try clearing your browser cache, ensuring caps lock is off, and using the correct email address. Contact support if the problem persists.'
                    ],
                    [
                        'question' => 'How do I update my email address?',
                        'answer' => 'You can update your email address in your profile settings within the member dashboard. You will need to verify the new email address before the change takes effect.'
                    ],
                    [
                        'question' => 'Is my personal information secure?',
                        'answer' => 'Yes, we use industry-standard encryption and security measures to protect your personal information. Our systems are regularly updated and monitored for security threats.'
                    ]
                ]
            ],
            'contact' => [
                'title' => 'Contact & Support',
                'faqs' => [
                    [
                        'question' => 'What are your office hours?',
                        'answer' => 'Our office is open Monday to Friday, 9:00 AM to 5:00 PM, and Saturday 9:00 AM to 1:00 PM. We are closed on Sundays and public holidays.'
                    ],
                    [
                        'question' => 'How can I contact customer support?',
                        'answer' => 'You can contact us via email at support@mirsath.org, phone at +603-1234-5678, or visit our office at Setia Alam Mosque. We aim to respond to all inquiries within 24 hours.'
                    ],
                    [
                        'question' => 'Do you provide services in other languages?',
                        'answer' => 'Our primary languages are English and Bahasa Malaysia. We can arrange translation services for other languages upon request with advance notice.'
                    ],
                    [
                        'question' => 'Can I schedule an appointment?',
                        'answer' => 'Yes, you can schedule appointments for consultations or document submission by calling our office or sending an email. Walk-ins are also welcome during office hours.'
                    ]
                ]
            ]
        ];

        return Inertia::render('FAQ', [
            'faqData' => $faqData,
            'totalFaqs' => collect($faqData)->sum(fn($category) => count($category['faqs']))
        ]);
    }
}
