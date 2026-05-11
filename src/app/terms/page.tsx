import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="May 11, 2026">
      <p>
        By accessing or using Ascend Focus, you agree to be bound by these Terms of Service. Please read them carefully.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using our platform, you agree to comply with and be bound by these terms. If you do not agree to these terms, you may not use our services.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content, features, and functionality on the Ascend Focus platform are the exclusive property of Ascend Focus and its licensors. You may not use our branding, logos, or content without express permission.
      </p>

      <h2>4. Prohibited Conduct</h2>
      <p>
        You agree not to:
      </p>
      <ul>
        <li>Use the service for any illegal or unauthorized purpose.</li>
        <li>Interfere with or disrupt the integrity or performance of the service.</li>
        <li>Attempt to gain unauthorized access to our systems or networks.</li>
        <li>Use automated systems (bots, scrapers) to access the service.</li>
      </ul>

      <h2>5. Termination</h2>
      <p>
        We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users or us.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Ascend Focus shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We may modify these terms at any time. Your continued use of the service after such changes constitutes your acceptance of the new terms.
      </p>
    </LegalPageLayout>
  );
}
