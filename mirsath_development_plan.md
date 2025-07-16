# Mirsath - Khairat Management System: Development Plan

## 1. Project Overview

This document outlines the step-by-step implementation plan for the Mirsath system, a web application built with Laravel, Inertia.js, and React. The goal is to build a robust, modern, and user-friendly platform for managing the mosque's khairat scheme.

**Top Priority for the Guiding LLM:** You are to act as an expert senior web developer with deep knowledge of Laravel, Inertia.js, and React. Your primary task is to guide me, the developer, through each step of the implementation process. Provide detailed explanations, best practices, and code examples based on the official documentation. Do not automate any task or generate full files unless I explicitly ask you to do so. Your role is to be a mentor and guide.

## 2. Current Project Status

The foundational work is complete:

- **System Requirements:** The DFD, ERD, and UI/UX designs have been finalized.
- **Database Connection:** The Laravel application is successfully connected to the mirsath MySQL database.
- **Database Schema:** All necessary database migrations have been created and successfully run using `php artisan migrate`. The database now contains all 7 tables (members, dependents, claims, payments, staff, users, staff_accounts) with the correct structure.

## 3. Development Workflow: Frontend-First with Mock Data

We will follow a "frontend-first" development approach. This allows us to build and perfect the entire user interface and user experience before connecting it to the backend logic.

### Phase 1: Frontend Development (React & Radix UI)

The goal of this phase is to build a complete, visually accurate, but non-functional frontend using static mock data.

#### Step 1.1: Set Up Authentication Pages

Every application needs an entry point. We will create the React components for user authentication.

**Task:** Create two new page components in your `resources/js/Pages/Auth/` directory.

- **Register.jsx:** Build the registration form based on the design mockups. The form should include fields for name, email, ic_number, password, and password_confirmation.
- **Login.jsx:** Build the login form with fields for email and password.

**Note:** At this stage, the forms will not submit any data. The focus is purely on the UI.

#### Step 1.2: Build the User Dashboard

This is the main hub for a logged-in member.

**Task:** Implement the `UserDashboard.jsx` component as we designed it.

- Create the main layout with the collapsible sidebar and top navigation bar.
- Use the mock data objects we defined to populate the four key widgets:
  - **Membership Status Card:** Display the user's status, member since date, and next payment due date.
  - **My Family (Dependents) List:** List the dependents and include an "+ Add New Dependent" button.
  - **My Claims Section:** Include a "Submit New Claim" button and a table listing the user's claim history.
  - **My Payment History Table:** A table listing the user's past payments.

**Reference:** The static `UserDashboard.jsx` code we previously reviewed is the blueprint for this step.

#### Step 1.3: Build the Admin Dashboard

This is the control panel for mosque staff.

**Task:** Create an `AdminDashboard.jsx` component.

- Implement the same sidebar and top-nav layout.
- Crucially, implement the two "Action Required" cards we specified:
  - **"Pending Memberships" Card:** A card displaying a static number (e.g., "5") of members awaiting activation.
  - **"Pending Claims" Card:** A card displaying a static number (e.g., "2") of claims awaiting review.
- Include the "Recent Activity" or "Latest Invoices" table at the bottom.

#### Step 1.4: Build the "Action" Modals and Forms

These are the components that handle data creation and editing.

**Task 1:** "Submit New Claim" Modal:

- This is the most critical user workflow. Design a multi-step form inside a Radix UI Dialog (modal).
- Step 1: Select the deceased person from a dropdown.
- Step 2: Enter claim details (Date of Death, Death Certificate Upload).
- Step 3: Review and confirm.

**Task 2:** "Add/Edit Dependent" Modal:

- Create a simple form within a Dialog for adding or editing a dependent's details.

### Phase 2: Backend Development (Laravel)

Once the frontend is visually complete, we will build the backend logic to make it dynamic.

#### Step 2.1: Implement Authentication Logic

**Task:** Build the Laravel controllers and routes to handle user registration and login, connecting them to the React forms via Inertia.

#### Step 2.2: Build the Dashboard Logic

**Task:** Create the Laravel controllers that will fetch real data from the database and pass it to the UserDashboard and AdminDashboard components as props.

#### Step 2.3: Implement Core Functionality

**Task:** Build the backend logic for submitting claims, adding dependents, approving memberships, and approving claims. This will involve creating the necessary controllers, routes, and form validation rules (e.g., for ic_number).

This structured plan ensures we build the application efficiently, starting with a clear and user-friendly interface and then wiring it up to a robust backend.