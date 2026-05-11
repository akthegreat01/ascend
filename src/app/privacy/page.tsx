import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="May 11, 2026">
      <p>
        At Ascend Focus, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information that you provide directly to us, such as when you create an account, update your profile, or use our productivity tools. This includes:
      </p>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, and password.</li>
        <li><strong>Productivity Data:</strong> Tasks, habits, goals, journal entries, and focus session logs.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our platform.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Provide, maintain, and improve our services.</li>
        <li>Personalize your experience and provide tailored insights.</li>
        <li>Communicate with you about updates, features, and support.</li>
        <li>Analyze usage patterns to enhance platform performance.</li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <p>
        Your data is stored securely using industry-standard encryption. We implement technical and organizational measures to protect your personal information from unauthorized access, loss, or disclosure.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        We may use third-party services for analytics, ad serving (Google AdSense), and payments. These services may collect information in accordance with their own privacy policies.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information at any time. You can also export your data or request a copy of the information we hold about you.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at privacy@ascendfocus.com.
      </p>
    </LegalPageLayout>
  );
}
