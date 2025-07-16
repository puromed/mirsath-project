Project Brief: Mirsath - Khairat Management System

1. System Overview

Mirsath is a web-based Khairat Management System (Islamic Death Benefit Scheme) for the Setia Alam Mosque. Its primary purpose is to digitize and streamline the entire process of managing memberships, from registration and fee collection to the processing and payout of death benefit claims. The system is built on a modern technology stack: Laravel 11 for the backend, React for the frontend, and Inertia.js to connect them seamlessly. Styling is handled by Tailwind CSS with Radix UI for UI components.

2. Core User Roles

    Member: The primary user and head of a family. They can register, manage their profile and dependents, view their payment history, and submit claims.

    Admin (Mosque Staff): Administrative users responsible for the system's day-to-day operations. Their key tasks are activating new memberships after payment verification and reviewing/approving claims.

    Nazir: A supervisory role with read-only access to high-level financial and membership reports.

3. Key System Processes

The system is defined by two primary workflows:

A. Membership Onboarding & Management

    A new user registers through a single, comprehensive form.

    Upon submission, a Pending membership account is created in the database.

    An Admin manually verifies the payment (conducted outside the system).

    The Admin then finds the pending account in the admin dashboard and performs an "Activate Membership" action. This updates the member's status to Active.

    Members can log in to their personal dashboard to view their status, manage their list of dependents, and see their payment history.

B. Claim Processing

    An active Member initiates a claim through their dashboard.

    The claim form requires selecting the deceased person (who can be the member themselves or a registered dependent) and uploading a death certificate.

    The submitted claim appears in the Admin dashboard as a "Pending Claim".

    The Admin reviews the claim details and the uploaded certificate, then either "Approves" or "Rejects" it.

    The status of the claim is updated and reflected in the Member's dashboard.

4. Critical Process: Member Registration Form

This is the most important initial interaction and must be implemented with high precision. The goal is to create a user-friendly, accessible, and visually appealing form that guides the user effectively.

    Layout: The form should be presented within a central container that has a gradient background (#2a4a3d to #6d7b3c), set against a light-colored page background. The "MIRSATH." logo and page title appear above this gradient container.

    Structure: It uses a two-column layout on larger screens, separating "Personal Information" (Name, IC, etc.) from "Contact & Security" (Email, Password). On mobile, these columns stack vertically.

    User Experience (UX):

        Real-time Validation: The form must provide instant feedback. Input fields should show success (e.g., a green checkmark) or error (e.g., a red border and message) states as the user types.

        Password Strength Meter: A visual indicator must show the strength of the user's password in real-time based on criteria (length, case, special characters).

        Show/Hide Password: A toggle icon must be present in the password fields.

    Data Validation (to be enforced in Laravel):

        The ic_number must be validated to ensure it contains exactly 10 digits.

        Standard validation for other fields (required, email format, password confirmation) must be implemented.

    Accessibility: All form fields must have proper, visible <label> tags and use ARIA attributes for error states to ensure screen reader compatibility.

5. Database & Architecture Summary

The system is built on a normalized 7-table database schema: members, dependents, claims, payments, staff, users (for member logins), and staff_accounts.

    Key Relationships:

        members to users is One-to-One.

        members to dependents, claims, and payments are all One-to-Many.

    Polymorphic Association: The claims table correctly identifies the deceased by using two columns: deceased_person_id and deceased_person_type (which will contain either 'Member' or 'Dependent'). There is no separate deceased table.

This summary provides the complete context for the Mirsath project, its goals, and its technical architecture.