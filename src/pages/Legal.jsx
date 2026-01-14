import React, { useState } from 'react';

export default function LegalitiesPage() {
  const [activePage, setActivePage] = useState('home');

  const renderHome = () => (
    <div className="min-h-screen mt-8 sm:mt-12 bg-white flex items-center justify-center px-4">
      <div className="w-full sm:w-[95%] lg:w-[90%] flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-0">

        {/* Left Section - Legalities */}
        <div className="w-full lg:flex-1 flex justify-center lg:justify-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl title font-bold text-gray-900 tracking-tight text-center lg:text-left">
            Legalities
          </h1>
        </div>

        {/* Vertical Line - Hidden on mobile */}
        <div className="hidden lg:block h-64 xl:h-96 w-px bg-red-500 mx-8 xl:mx-16"></div>

        {/* Horizontal Line - Visible only on mobile */}
        <div className="block lg:hidden w-full h-px bg-red-500"></div>

        {/* Right Section - Buttons */}
        <div className="w-full lg:flex-1 flex title flex-col items-center lg:items-end space-y-4 sm:space-y-6 lg:space-y-8">
          <button
            onClick={() => setActivePage('privacy')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center lg:text-left"
          >
            Privacy & Policy
          </button>

          <button
            onClick={() => setActivePage('terms')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center lg:text-left"
          >
            Terms & Conditions
          </button>

          <button
            onClick={() => setActivePage('shipping')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center lg:text-left"
          >
            Shipping Policy
          </button>

          <button
            onClick={() => setActivePage('returns')}
            className="block text-xl sm:text-2xl title font-semibold text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300 text-center lg:text-left"
          >
            Return & Exchange Policy
          </button>
        </div>
      </div>
    </div>
  );


  const renderPolicyPage = (title, content) => (
    <div className="min-h-screen mt-8 sm:mt-12 bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full sm:w-[95%] mt-6 lg:w-[90%] mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl title font-bold text-gray-900 text-center mb-8 sm:mb-10 md:mb-12">
          {title}
        </h1>

        {/* Sections - Responsive layout */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {content.sections.map((section, idx) => (
            <div
              key={idx}
              id={`section-${idx}`}
              className="flex flex-col lg:grid lg:grid-cols-[22%_1px_1fr] gap-4 lg:gap-x-6 items-start"
            >
              {/* Left Title cell */}
              <div className="w-full lg:pr-4">
                <a
                  href={`#section-${idx}`}
                  className="block text-left text-lg sm:text-xl font-extrabold text-gray-900 leading-snug hover:text-rose-600 transition"
                >
                  {section.title}
                </a>
              </div>

              {/* Divider cell - Horizontal on mobile, Vertical on desktop */}
              <div className="w-full lg:w-px h-px lg:h-auto lg:self-stretch">
                <div className="w-full lg:w-px h-px lg:h-full bg-red-500" />
              </div>

              {/* Content cell */}
              <div className="w-full text-left">
                <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
                  <div className="[&_ul]:ml-4 sm:[&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-left [&_ol]:ml-4 sm:[&_ol]:ml-6 [&_ol]:text-left">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );




  // ------------------------------------------------------------------
  // SHIPPING POLICY CONTENT (UPDATED FROM DOCUMENT)
  // ------------------------------------------------------------------
  const shippingContent = {
    sections: [
      {
        title: " Order Processing",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Please allow up to **24 hours** for order processing, subject to product availability and payment verification.</p>
            <p>Once an order has been confirmed, it **cannot be modified or cancelled**.</p>
            <p>Orders are processed and shipped from **Maharashtra, India**, excluding weekends and public holidays.</p>
            <p>Customers will receive an **order confirmation email** upon successful checkout and a **shipping confirmation** with tracking details once the order is dispatched.</p>
            <p>**INKPHYOUS** reserves the right to cancel any order at its discretion for security or verification reasons.</p>
          </div>
        )
      },
      {
        title: " Pre-Orders",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Pre-order items will be shipped upon arrival at our facility.</p>
            <p>All pre-orders are charged at checkout and are **non-cancellable and non-refundable**.</p>
            <p>For assistance, contact **info@inkphyous.com**.</p>
          </div>
        )
      },
      {
        title: " Shipping",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p><strong>Domestic Orders:</strong> Complimentary standard delivery within **3–5 business days** after dispatch.</p>
            <p><strong>International Orders:</strong> Shipped via **DHL/UPS or equivalent**. Duties, taxes, and fees are the customer's responsibility.</p>
            <p>Delivery times are estimates and exclude processing periods. **INKPHYOUS** is not liable for delays due to customs or courier issues.</p>
          </div>
        )
      },
      {
        title: " Lost or Damaged Shipments",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Once an order is marked as delivered by the courier, **INKPHYOUS** assumes no liability for loss, theft, or damage. All transit risks rest with the courier partner.</p>
          </div>
        )
      },
      {
        title: " Final Sale",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Items purchased during **sales or promotions** are **final sale** and not eligible for return, exchange, or refund.</p>
            <p>**INKPHYOUS** may modify or withdraw sale terms at any time without notice. No price adjustments will be made for prior purchases.</p>
          </div>
        )
      },
      {
        title: " Customer Support",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>For any queries regarding orders, shipping, or delivery, please contact us on <a href="mailto:info@inkphyous.com" className="text-rose-600 hover:underline">info@inkphyous.com</a> or **fill out the form on our Contact Page**.</p>
          </div>
        )
      }
    ]
  };

  // ------------------------------------------------------------------
  // TERMS & CONDITIONS CONTENT (UPDATED FROM DOCUMENT)
  // ------------------------------------------------------------------
  const termsContent = {
    sections: [
      {
        title: " Introduction",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Welcome to **Inkphyous.com** , a website owned and operated by **Inkphyous, LLC** ("Inkphyous," "we," or "us"). These **Terms of Use** and our **Privacy Policy** apply to all visitors, users, and others who access or use this Website ("Users" or "you").</p>
            <p>By accessing or using this Website and/or purchasing products through it, you agree to comply with and be bound by these Terms of Use and our Privacy Policy. If you do not agree to these Terms of Use or the Privacy Policy, you must not access or use this Website.</p>
            <p>Last updated on [Insert Date].</p>
          </div>
        )
      },
      {
        title: " Eligibility to Use",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>You must be at least **16 years old** to use this Website. By using the Website, you represent that you meet this age requirement.</p>
            <p>We reserve the right to terminate access if a user is underage or otherwise legally incapacitated.</p>
          </div>
        )
      },
      {
        title: " Account and Membership",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>You may freely browse our website without creating an account. However, to make a purchase or proceed to checkout, you will be required to log in or create an account using accurate, current, and complete information.</p>
            <p>We may revoke or terminate your registration at any time, without notice, at our discretion.</p>
          </div>
        )
      },
      {
        title: " Electronic Communications",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>By using the Website or communicating with us electronically, you consent to receive communications electronically from us.</p>
          </div>
        )
      },
      {
        title: " Conduct and Comments",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>You agree to use the Website lawfully and responsibly. You will not post or submit content that is unlawful, infringing, abusive, defamatory, obscene, threatening, or contains viruses or spam.</p>
            <p>All comments, reviews, feedback, or submissions ("Comments") become our exclusive property. We may use, reproduce, modify, publish, or distribute them without obligation to you.</p>
            <p>We reserve the right (but are not obligated) to monitor, edit, or remove any Comments.</p>
          </div>
        )
      },
      {
        title: " Intellectual Property",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>All content on the Website, including text, graphics, logos, images, and software, is the property of **Inkphyous** and is protected under intellectual property laws.</p>
            <p>You may not reproduce, distribute, or create derivative works from content without express written permission.</p>
          </div>
        )
      },
      {
        title: " Product Information and Accuracy",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We strive to display products accurately, but colors, sizes, and details may vary due to display devices or other factors.</p>
            <p>Product descriptions, pricing, and availability are subject to change without notice.</p>
            <p>We reserve the right to limit quantities, modify product information, or refuse/cancel orders in cases of error, unless the product has already been dispatched.</p>
          </div>
        )
      },
      {
        title: " Orders and Payments",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>By placing an order, you agree to provide complete and accurate purchase and account information.</p>
            <p>Payment must be made at the time of purchase. All payments are non-refundable unless otherwise stated.</p>
            <p>We reserve the right to refuse or cancel orders, notifying you via the email provided.</p>
          </div>
        )
      },
      {
        title: " Shipping and Delivery",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Shipping costs and delivery times vary based on your location and selected shipping method.</p>
            <p>We are not responsible for delays, loss, or damages occurring during shipping.</p>
            <p>Title and risk pass to you once the product is shipped to the carrier.</p>
          </div>
        )
      },
      {
        title: " Returns and Refunds",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Please refer to our **Return Policy** for details. All sales are final unless otherwise stated in our Return Policy.</p>
          </div>
        )
      },
      {
        title: " Limitation of Liability",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Inkphyous is not liable for any direct or indirect damages arising from your use of the Website or products purchased through it.</p>
            <p>In no event shall our liability exceed the amount paid for the product.</p>
          </div>
        )
      },
      {
        title: " Pricing",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Prices are displayed by default in **United Arab Emirates Dirhams (AED)** for customers in Dubai and in **Indian Rupees (INR)** for customers in India.</p>
            <p>All prices include applicable taxes but exclude shipping costs. You may change the displayed currency at any time using the currency selection option available at the bottom of the website.</p>
            <p>Prices may change at our discretion without prior notice.</p>
          </div>
        )
      },
      {
        title: " Payment Methods & Security",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Accepted payment methods include:</p>
            <ul className="list-disc ml-4 sm:ml-6 space-y-1">
              <li>**Cash on Delivery (COD)** – additional charges may apply</li>
              <li>**Credit/Debit Cards** – Visa, MasterCard, AMEX, Rupay, Maestro</li>
              <li>**UPI Payments** – Google Pay, PhonePe, BHIM, etc.</li>
              <li>**Wallets** – Paytm, Razorpay, etc.</li>
            </ul>
            <p>Payments are securely processed using **SSL encryption**. We never request account or payment details via email.</p>
          </div>
        )
      },
      {
        title: " Termination",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We may suspend or terminate your access if you breach these Terms. Termination does not affect accrued rights or obligations.</p>
            <p>Content and account information may be deleted without liability.</p>
          </div>
        )
      },
      {
        title: " Governing Law",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>These Terms and any agreements between you and Inkphyous are governed by the **laws of India**.</p>
          </div>
        )
      },
      {
        title: " Changes to Terms",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We may update or modify these Terms at any time without notice.</p>
            <p>Continued use of the Website after changes constitutes acceptance of the updated Terms.</p>
          </div>
        )
      },
      {
        title: " Contact Information",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>For questions or concerns regarding these Terms, please contact us at: <a href="mailto:info@inkphyous.com" className="text-rose-600 hover:underline">info@inkphyous.com</a>.</p>
          </div>
        )
      }
    ]
  };

  // ------------------------------------------------------------------
  // RETURN & EXCHANGE POLICY CONTENT (UPDATED FROM DOCUMENT)
  // ------------------------------------------------------------------
  const returnsContent = {
    sections: [
      {
        title: " General Terms",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>This Return & Exchange Policy ("Policy") governs all purchases made through **inkphyous.com** ("Website") and the **INKPHYOUS Return & Exchange Portal**.</p>
            <p>By placing an order or initiating a return or exchange request, you acknowledge and agree to the terms of this Policy.</p>
            <p>The version applicable to your order will be the one in effect at the time of purchase.</p>
          </div>
        )
      },
      {
        title: " Returns and Exchanges",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We accept return and exchange requests within **Five (5) days** from the date of delivery.</p>
            <p>Once your request has been reviewed and approved, our logistics partner will schedule a collection within **24–48 hours**, subject to service availability in your area. Pickups will be attempted up to **two times**.</p>
            <p>If our courier partner is unable to complete the collection, you may be required to **return the shipment directly** to our warehouse. Reverse pickup service is subject to availability based on your area's pincode coverage.</p>
            <p>Returned products undergo a mandatory **Quality Check (QC)** upon receipt. Products must be returned in **unused, unwashed, and undamaged** condition, with original packaging, brand tags, and all accompanying accessories intact.</p>
            <p>If the requested size or item is unavailable, a **gift card** of equivalent value will be issued, redeemable for future online purchases.</p>
          </div>
        )
      },
      {
        title: " Cancellations and Refunds",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p><strong>Cash on Delivery (COD) Orders:</strong> May be cancelled only **prior to dispatch** from our warehouse.</p>
            <p><strong>Prepaid Orders:</strong> Are **final and non-refundable** once confirmed.</p>
            <p>Refunds, where applicable, will be issued as **gift cards** valid for **six (6) months** from the date of issue. Shipping and handling charges are non-refundable.</p>
          </div>
        )
      },
      {
        title: " Product Quality Concerns",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>**INKPHYOUS** offers a **15-day review period** for genuine product issues such as color fading, print cracking, or manufacturing defects.</p>
            <p>If reported within this period, we will arrange a pickup and provide an appropriate resolution in the form of replacement or store credit. Requests submitted after the 15-day period will not be eligible for return or compensation.</p>
          </div>
        )
      },
      {
        title: " Conditions for Acceptance",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Return or exchange requests will only be accepted if the following criteria are met:</p>
            <ul className="list-disc ml-4 sm:ml-6 space-y-1">
              <li>The item is in its original condition, with no signs of use, odor, or damage.</li>
              <li>All brand labels, packaging, and accessories are intact.</li>
              <li>Products purchased as sets are returned in full.</li>
              <li>The return is initiated against the same order and verified by **INKPHYOUS** records.</li>
            </ul>
            <p>**INKPHYOUS** reserves the right to **decline any request** that fails to meet the above requirements.</p>
          </div>
        )
      },
      {
        title: " Customer Support",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>For any assistance or clarification regarding returns, exchanges, or cancellations, please contact us on <a href="mailto:info@inkphyous.com" className="text-rose-600 hover:underline">info@inkphyous.com</a> or **fill out the form on our Contact Page**.</p>
            <p>Our team strives to respond to all queries within **24-48 business hours**.</p>
          </div>
        )
      }
    ]
  };


  // ------------------------------------------------------------------
  // PRIVACY POLICY CONTENT (KEPT AS ORIGINAL PLACEHOLDER)
  // ------------------------------------------------------------------
  const privacyContent = {
    sections: [
      {
        title: "Introduction",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-500 mb-4">
              <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-0">
                <div className="space-y-2 text-left">
                  <p className="font-semibold">Effective Date</p>
                  <p className="font-semibold">Last Updated</p>
                </div>
                <div className="text-left space-y-2 text-gray-600">
                  <p>[Insert Date]</p>
                  <p>[Insert Date]</p>
                </div>
              </div>
            </p>
            <p>INKPHYOUS ("we," "our," "us") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <a href="https://www.inkphyous.com" className="text-rose-600 hover:underline">www.inkphyous.com</a> ("Website").</p>
            <p>By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.</p>
          </div>
        )
      },
      {
        title: "Information We Collect",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We may collect the following types of information to provide you with a seamless and secure shopping experience:</p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold label text-bold text-black text-xl sm:text-2xl">
                  a. Personal Information</p>
                <p>When you make a purchase or interact with our Website, we may collect details such as your:</p>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold label text-bold text-black text-xl sm:text-2xl">
                  b. Non-Personal Information</p>
                <p>We may collect non-identifiable information automatically through cookies or analytics tools, including:</p>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                  <li>Browser type and version</li>
                  <li>IP address</li>
                  <li>Device information</li>
                  <li>Pages visited and duration of visit</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold label text-bold text-black text-xl sm:text-2xl">
                  c. Transactional Information</p>
                <p>We collect purchase-related details, including your order history, returns, and product preferences, to enhance your shopping experience.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "How We Use Your Information",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We use your information only for legitimate business purposes, including to:</p>
            <ul className="list-disc ml-4 sm:ml-6 space-y-2">
              <li><strong>Process and Fulfill Orders:</strong> To confirm your purchases, process payments, arrange shipping, manage returns, and provide order updates.</li>
              <li><strong>Enhance User Experience:</strong> To analyze browsing patterns, improve website performance, and optimize our services.</li>
              <li><strong>Marketing and Communications:</strong> With your consent, to send you promotional offers, product updates, or newsletters.</li>
              <li><strong>Compliance and Protection:</strong> To comply with legal obligations, prevent fraud, enforce our policies, and respond to lawful requests by public authorities.</li>
            </ul>
          </div>
        )
      },
      {
        title: "Sharing Your Information",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We respect your privacy and only share your personal data as necessary for business and legal purposes.</p>
            <ul className="list-disc ml-4 sm:ml-6 space-y-2">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party vendors who assist us in operating our Website, processing payments, delivering products, or providing other services. These providers are contractually obligated to protect your data and use it solely for the purposes specified by us.</li>
              <li><strong>Order Fulfillment:</strong> We may share relevant details (e.g., name, shipping address, payment details) with carriers or payment processors to complete your purchase.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information when required by law or in response to valid legal requests, including those related to national security or law enforcement.</li>
              <li><strong>No Sale of Data:</strong> We do not sell, rent, or trade your personal information to third parties.</li>
            </ul>
          </div>
        )
      },
      {
        title: "Data Security",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes secure payment gateways, encryption technologies, and other industry-standard security practices.</p>
            <p>However, please note that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </div>
        )
      },
      {
        title: "Your Rights",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>You have the right to:</p>
            <ul className="list-disc ml-4 sm:ml-6 space-y-1">
              <li>Access and review the personal data we hold about you</li>
              <li>Request corrections or updates to inaccurate or incomplete information</li>
              <li>Request deletion of your data, subject to applicable legal obligations</li>
            </ul>
            <p className="mt-3">To exercise these rights, please contact us at <a href="mailto:info@inkphyous.com" className="text-rose-600 hover:underline">info@inkphyous.com</a>.</p>
          </div>
        )
      },
      {
        title: "Cookies",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Our Website uses cookies to personalize and enhance your browsing experience. Cookies are small text files placed on your device that help us recognize your browser, store preferences, and analyze site performance.</p>
            <p>You may choose to disable cookies through your browser settings, but this may affect certain features or functionality of the Website.</p>
          </div>
        )
      },
      {
        title: "Changes to This Privacy Policy",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. Any revisions will be posted on this page with an updated "Last Updated" date.</p>
            <p>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
          </div>
        )
      },
      {
        title: "Contact Us",
        content: (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
            <p className="font-semibold">📧 Email: <a href="mailto:info@inkphyous.com" className="text-rose-600 hover:underline">info@inkphyous.com</a></p>
          </div>
        )
      }
    ]
  };

  if (activePage === 'home') {
    return renderHome();
  } else if (activePage === 'privacy') {
    return renderPolicyPage('Privacy Policy', privacyContent);
  } else if (activePage === 'terms') {
    return renderPolicyPage('Terms & Conditions', termsContent);
  } else if (activePage === 'shipping') {
    return renderPolicyPage('Shipping Policy', shippingContent);
  } else if (activePage === 'returns') {
    return renderPolicyPage('Return & Exchange Policy', returnsContent);
  }
}