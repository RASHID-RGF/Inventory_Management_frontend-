# StockKenya - Inventory Management System

StockKenya is a modern, user-friendly inventory management platform designed specifically for Kenyan businesses. It helps shop owners, wholesalers, and retailers track stock levels, record sales, generate reports, and manage their operations efficiently.

## Features

### 🏠 Landing Page
- Attractive marketing page with feature highlights
- Call-to-action buttons for easy access
- Responsive design for all devices

### 📊 Dashboard
- Overview of key metrics and statistics
- Interactive charts for sales and inventory trends
- Recent sales and top products cards
- Real-time alerts for low stock and other notifications

### 📦 Inventory Management
- Add, edit, and delete inventory items
- Track stock levels with automatic low-stock alerts
- Category-based organization
- Search and filter functionality

### 🛒 Sales Recording
- Quick sales entry with product selection
- Automatic inventory updates upon sale
- Customer information tracking
- Sales history and receipts

### 📈 Reports & Analytics
- Comprehensive sales reports
- Profit and loss analysis
- Inventory turnover reports
- Custom date range filtering
- Export capabilities

### 🔔 Notifications
- Real-time alerts for low stock items
- Sales milestones and achievements
- System notifications and updates
- Customizable alert preferences

### 👥 Admin Panel
- User management and permissions
- System configuration
- Business settings and preferences
- Data backup and export options

### ⚙️ Settings
- Business information management
- User profile settings
- Notification preferences
- System customization options

### 📖 About & Blog
- Company information and mission
- Blog posts with industry insights
- Educational content for business owners
- Latest updates and features

### 🌙 Light/Dark Mode
- Toggle between light and dark themes
- Automatic system theme detection
- Persistent theme preferences

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router
- **State Management**: React Query for server state
- **Icons**: Lucide React
- **Charts**: Recharts
- **Theme**: next-themes for light/dark mode
- **Deployment**: Ready for modern hosting platforms

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stock-sense-kenya
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (shadcn/ui)
│   ├── layout/      # Layout components (TopNav, DashboardLayout)
│   └── dashboard/   # Dashboard-specific components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and mock data
└── App.tsx          # Main app component
```

## Key Components

- **Landing**: Marketing homepage
- **Dashboard**: Main dashboard with overview
- **Inventory**: Inventory management interface
- **Sales**: Sales recording and history
- **Reports**: Analytics and reporting
- **Notifications**: Alert management
- **Admin**: Administrative functions
- **Settings**: Configuration options
- **About**: Company information
- **Blog**: Educational content

## Features in Detail

### Inventory Tracking
- Real-time stock level monitoring
- Automatic reorder point calculations
- Category and supplier management
- Barcode integration ready

### Sales Management
- Point-of-sale style interface
- Customer tracking
- Discount and tax calculations
- Receipt generation

### Reporting
- Daily, weekly, monthly reports
- Profit margin analysis
- Inventory valuation
- Sales trend analysis

### User Experience
- Responsive design for mobile and desktop
- Intuitive navigation
- Fast loading times
- Accessible interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact our team at support@stockkenya.com

## Roadmap

- Mobile app development
- Multi-store management
- Advanced analytics
- Integration with popular POS systems
- API for third-party integrations
