import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PolicyPrivacy = () => {
  return (
    <div className="  py-32 bg-gray-900 mx-auto">
      <div className="  bg-white mx-auto  ">
        <div className="flex flex-col space-y-3 mx-auto py-24 max-w-7xl">
          <header>
            <h1 className="mega-title">Privacy Policy for Boilerplate in Next</h1>
            <p>Last updated: 20-1-2024</p>
          </header>

          <section>
            <h2>Information We Collect:</h2>
            <p>
              <strong>1. Account Information:</strong>
              When you sign up for our services, we collect personal information
              such as your name, email address, and payment details.
            </p>
            <p>
              <strong>2. Service Usage Data:</strong>
              We may collect data on how you use our hosting services, including
              server logs and other usage information.
            </p>
            <p>
              <strong>3. Cookies and Tracking Technologies:</strong>
              We use cookies and similar tracking technologies to enhance your
              experience and collect information about your browsing activities.
            </p>
          </section>

          <section>
            <h2>How We Use Your Information:</h2>
            <p>
              <strong>1. Provide and Improve Services:</strong>
              We use your information to deliver, maintain, and improve our
              hosting services, as well as to respond to your inquiries.
            </p>
          </section>

          <section>
            <h2>Information Sharing:</h2>
            <p>
              <strong>1. Third-Party Service Providers:</strong>
              We may share your information with third-party service providers
              who assist us in delivering and improving our services.
            </p>
            <p>
              <strong>2. Legal Requirements:</strong>
              We may disclose your information when required by law or in
              response to valid legal requests.
            </p>
          </section>

          <footer>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a href="mailto:contact@hostingclan.com">
                contact@hostingclan.com
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PolicyPrivacy;
