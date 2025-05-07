// app/privacy-policy/page.tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className='bg-gray-50 min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 max-w-4xl mx-auto px-4 py-12'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Privacy Policy
        </h1>
        <p className='text-gray-600 mb-6 text-sm'>Effective Date: May 2025</p>

        <section className='space-y-6 text-sm text-gray-700 leading-6'>
          <p>
            At NaijaGasOnline, your privacy is important to us. This privacy
            policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <div>
            <h2 className='font-semibold text-gray-900 text-lg mb-2'>
              1. Information We Collect
            </h2>
            <ul className='list-disc list-inside'>
              <li>
                Personal details such as your name, phone number, address, and
                email.
              </li>
              <li>
                Payment and transaction information processed through secure
                third-party providers.
              </li>
              <li>
                Usage data including device information, browser type, and pages
                visited.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='font-semibold text-gray-900 text-lg mb-2'>
              2. How We Use Your Information
            </h2>
            <ul className='list-disc list-inside'>
              <li>To fulfill and manage orders.</li>
              <li>
                To communicate with you about updates and promotional content.
              </li>
              <li>
                To improve our website and services based on your feedback.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='font-semibold text-gray-900 text-lg mb-2'>
              3. Data Security
            </h2>
            <p>
              We use modern security practices and encryption protocols to
              protect your data from unauthorized access or disclosure.
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-gray-900 text-lg mb-2'>
              4. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or request deletion of your
              data by contacting us at{' '}
              <a
                href='mailto:support@naijagasonline.com'
                className='text-green-600 hover:underline'
              >
                support@naijagasonline.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-gray-900 text-lg mb-2'>
              5. Changes to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be
              reflected on this page with a revised effective date.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
