# Expense Manager

A privacy-focused, open-source expense management application that integrates with Google Sheets for secure data storage. **Your data stays in your Google Sheets - nothing is stored on our servers.**

## 🔒 Privacy & Security Vision

**Complete Data Ownership**: All your financial data remains in your personal Google Sheets. We never store, process, or have access to your sensitive information. This ensures maximum privacy and compliance with data protection regulations.

## ✨ Current Features

### 🔐 Authentication & Security
- **Google OAuth Integration**: Secure sign-in with Google accounts
- **JWT-based Sessions**: Secure session management with automatic token refresh
- **Zero Data Storage**: No personal or financial data stored on our servers

### 📊 Spreadsheet Management
- **Create New Sheets**: Generate expense tracking spreadsheets with pre-configured templates
- **Template System**: Pre-built expense categories including:
  - Depreciation (Motor Car, Machinery, Building, Computers)
  - Operating Expenses (Transportation, Packaging, Interest)
  - Professional Services (Consultancy, Assembling)
  - Custom categories and notes
- **Sheet Management**: View, organize, and manage multiple expense sheets
- **Real-time Sync**: Live data synchronization with Google Sheets

### 📈 Analytics Dashboard
- **Interactive Charts**: 
  - Line charts for expense trends over time
  - Pie charts for expense category breakdown
- **Real-time Analytics**: Live updates every 30 seconds
- **Financial Insights**:
  - Total expenses tracking
  - Month-over-month comparisons
  - Category-wise spending analysis
  - Export capabilities for reports

### 🎨 User Experience
- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Intuitive Navigation**: Easy-to-use interface for all user levels
- **Mobile Responsive**: Works seamlessly across all devices
- **Real-time Updates**: Instant data refresh and synchronization

## 🚀 Future Roadmap

### 📄 Document Processing (Coming Soon)
- **Bank Statement Upload**: Automated parsing of bank statements
- **Invoice Processing**: Extract data from PDF invoices and receipts
- **OCR Integration**: Optical Character Recognition for scanned documents
- **Smart Categorization**: AI-powered expense categorization
- **Multi-format Support**: PDF, CSV, Excel file processing

### 🔄 Enhanced Automation
- **Recurring Transactions**: Automatic detection and categorization
- **Smart Alerts**: Budget alerts and spending notifications
- **Data Validation**: Automated error detection and correction
- **Backup & Sync**: Enhanced data backup and synchronization

### 📱 Advanced Features
- **Mobile App**: Native mobile applications for iOS and Android
- **Offline Support**: Work without internet connection
- **Team Collaboration**: Multi-user expense tracking for businesses
- **Advanced Reporting**: Custom report generation and scheduling

### 🔧 Technical Improvements
- **Performance Optimization**: Faster loading and processing
- **API Enhancements**: RESTful API for third-party integrations
- **Plugin System**: Extensible architecture for custom features
- **Advanced Security**: Enhanced encryption and security measures

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js with Google OAuth
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Google Integration**: Google Sheets API, Google Drive API
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Google Cloud Console project with Sheets and Drive APIs enabled
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-manager-beta.git
   cd expense-manager-beta
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   LOG_SHEET_ID=optional_log_sheet_id
   LOG_SHEET_RANGE=Sheet1!A:E
   ```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🍴 Fork & Branch Workflow

1. **Fork the Repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally:
     ```bash
     git clone https://github.com/yourusername/expense-manager-beta.git
     cd expense-manager-beta
     git remote add upstream https://github.com/originalowner/expense-manager-beta.git
     ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/issue-description
   # or
   git checkout -b enhancement/feature-description
   ```

3. **Make Your Changes**
   - Write clean, well-documented code
   - Follow existing code style and patterns
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   npm run dev  # Test locally
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of your changes
   - Link any related issues

### 📋 Contribution Guidelines

#### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### Commit Messages
Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests

#### Pull Request Process
1. Ensure your code passes all tests
2. Update documentation if needed
3. Provide clear description of changes
4. Include screenshots for UI changes
5. Link related issues

### 🎯 Areas for Contribution

#### High Priority
- **Document Processing**: Bank statement and invoice parsing
- **Mobile Responsiveness**: Enhanced mobile experience
- **Performance**: Optimization and caching improvements
- **Testing**: Unit and integration tests

#### Medium Priority
- **UI/UX Improvements**: Better user experience
- **Accessibility**: WCAG compliance
- **Internationalization**: Multi-language support
- **API Documentation**: Comprehensive API docs

#### Low Priority
- **Code Refactoring**: Clean up legacy code
- **Documentation**: Tutorials and guides
- **Examples**: Sample implementations
- **Tools**: Development utilities

### 🐛 Reporting Issues

When reporting issues, please include:
- **Environment**: OS, Node.js version, browser
- **Steps to Reproduce**: Clear reproduction steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Error Messages**: Full error logs

### 💡 Feature Requests

For feature requests:
- Check existing issues first
- Provide detailed use case
- Explain the benefit to users
- Consider implementation complexity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Sheets API for data storage
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling
- Recharts for data visualization
- All contributors who help improve this project

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/expense-manager-beta/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/expense-manager-beta/discussions)
- **Email**: support@expensemanager.com

---

**Remember**: Your data privacy is our priority. Everything stays in your Google Sheets! 🔒
