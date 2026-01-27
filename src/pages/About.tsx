import { DashboardLayout } from '@/components/layout/DashboardLayout';

const About = () => {
  return (
    <DashboardLayout title="About Us">
      <div className="space-y-6 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <h2>About StockKenya</h2>
          <p>
            StockKenya is a cutting-edge inventory management platform specifically designed for Kenyan businesses.
            We understand the unique challenges faced by shop owners, wholesalers, and retailers in managing their stock
            efficiently while keeping track of sales and profits.
          </p>
          <h3>Our Mission</h3>
          <p>
            To empower Kenyan entrepreneurs with simple, powerful tools that help them focus on growing their businesses
            rather than worrying about inventory management.
          </p>
          <h3>Why Choose StockKenya?</h3>
          <ul>
            <li>Tailored for the Kenyan market with KES currency support</li>
            <li>Real-time inventory tracking and alerts</li>
            <li>Easy-to-use interface accessible on any device</li>
            <li>Reliable cloud-based solution with 99.9% uptime</li>
            <li>Dedicated support for Kenyan businesses</li>
          </ul>
          <h3>Contact Us</h3>
          <p>
            Have questions? Reach out to our support team via WhatsApp or email us at support@stockkenya.com.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;