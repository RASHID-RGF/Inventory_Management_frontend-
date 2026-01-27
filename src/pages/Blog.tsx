import { DashboardLayout } from '@/components/layout/DashboardLayout';

const Blog = () => {
  const posts = [
    {
      title: 'How to Manage Inventory Efficiently in Your Kenyan Shop',
      date: '2024-01-15',
      excerpt: 'Learn the best practices for tracking stock levels, managing suppliers, and optimizing your inventory turnover to maximize profits.',
    },
    {
      title: 'Top 5 Inventory Management Mistakes to Avoid',
      date: '2024-01-10',
      excerpt: 'Discover common pitfalls that Kenyan business owners face and how StockKenya helps you avoid them.',
    },
    {
      title: 'Integrating Technology in Small Businesses',
      date: '2024-01-05',
      excerpt: 'How modern tools like StockKenya can transform the way you run your retail or wholesale business.',
    },
    {
      title: 'Understanding Profit Margins in Retail',
      date: '2023-12-28',
      excerpt: 'A guide to calculating and improving your profit margins with real-time sales and inventory data.',
    },
  ];

  return (
    <DashboardLayout title="Blog">
      <div className="space-y-6 max-w-4xl">
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <article key={index} className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold text-foreground mb-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{post.date}</p>
              <p className="text-muted-foreground">{post.excerpt}</p>
              <button className="mt-4 text-primary hover:underline">Read more</button>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Blog;