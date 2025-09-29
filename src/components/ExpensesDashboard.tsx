// components/ExpensesDashboard.tsx (Updated for real data)
'use client';

import { useState, useEffect } from 'react';
import { Download, TrendingUp, TrendingDown, Loader2, ExternalLink, Edit3 } from 'lucide-react';
import ExpenseChart from './ExpenseChart';
import ExpenseBreakdown from './ExpenseBreakdown';

interface ExpenseData {
  month: string;
  expenses: number;
  categories: {
    [key: string]: number;
  };
}

interface ExpensesDashboardProps {
  spreadsheetId: string;
}

const ExpensesDashboard = ({ spreadsheetId }: ExpensesDashboardProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [hasData, setHasData] = useState(false);
  const [asOnDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [period] = useState(`01.04.${new Date().getFullYear()-1} to 31.03.${new Date().getFullYear()}`);

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [spreadsheetId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sheets/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spreadsheetId,
          range: 'Sheet1!A2:M100', // Skip header row
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch data');
      }

      const transformedData = transformRealData(data.values || []);
      setExpenseData(transformedData);
      setHasData(transformedData.length > 0);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };
const transformRealData = (values: string[][]): ExpenseData[] => {
  if (values.length === 0) return [];

  return values
    .filter(row => row.length >= 2 && row[0] && row[1])
    .map(row => {
      const month = row[0]?.trim() || '';
      
      // Handle different number formats more robustly
      let expensesValue = row[1]?.toString() || '0';
      
      // Remove currency symbols, commas, spaces and convert to number
      expensesValue = expensesValue
        .replace(/[₹$,]/g, '')  // Remove ₹, $, and commas
        .replace(/\s+/g, '')   // Remove spaces
        .replace(/[^\d.-]/g, ''); // Remove any other non-numeric characters except . and -
      
      const expenses = parseFloat(expensesValue) || 0;
      
      const categories: { [key: string]: number } = {};
      const categoryNames = [
        'Dep.on Motor Car', 'Dep.on Plank Machinery-1', 'Dep.on Building', 
        'Assembling Charges', 'Transportation & Packaging', 'Interest on Bank Loan',
        'Troughs & Conveyance', 'Dep.on Computers & Printers', 
        'Professional & Consultancy Charges', 'Others'
      ];

      categoryNames.forEach((name, index) => {
        let categoryValue = row[index + 2]?.toString() || '0';
        categoryValue = categoryValue
          .replace(/[₹$,]/g, '')
          .replace(/\s+/g, '')
          .replace(/[^\d.-]/g, '');
        categories[name] = parseFloat(categoryValue) || 0;
      });

      return { month, expenses, categories };
    })
    .filter(item => !isNaN(item.expenses) && item.expenses > 0)
    .sort((a, b) => {
      // Sort by month if possible, otherwise keep original order
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      const aIndex = monthOrder.indexOf(a.month);
      const bIndex = monthOrder.indexOf(b.month);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      return 0;
    });
};

  const openSpreadsheet = () => {
    window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`, '_blank');
  };

  const handleDownloadReport = () => {
    // Implement PDF/download functionality
    console.log('Generating expense report...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin text-blue-600" size={24} />
          <span className="text-gray-600">Loading company expense data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <div className="text-red-600 mb-4">Error loading data</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // if (!hasData) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 p-6">
  //       <div className="mb-6">
  //         <div className="flex justify-between items-center mb-2">
  //           <h1 className="text-2xl font-bold text-gray-900">Expense-Manager-Beta </h1>
  //           <button
  //             onClick={openSpreadsheet}
  //             className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
  //           >
  //             <Edit3 size={16} />
  //             ENTER EXPENSE DATA
  //           </button>
  //         </div>
  //       </div>

  //       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
  //         <div className="text-center">
  //           <div className="bg-yellow-50 inline-flex p-4 rounded-full mb-4">
  //             <Edit3 className="text-yellow-600" size={48} />
  //           </div>
  //           <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Tracking Expenses</h2>
  //           <p className="text-gray-600 mb-6">
  //             Your expense template is ready! Click the button below to start entering your company's financial data.
  //           </p>
            
  //           <div className="grid md:grid-cols-2 gap-6 mb-8">
  //             <div className="bg-blue-50 p-4 rounded-lg">
  //               <h3 className="font-semibold text-blue-900 mb-2">📊 How to Get Started:</h3>
  //               <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1 text-left">
  //                 <li>Click "ENTER EXPENSE DATA" button</li>
  //                 <li>Enter monthly expenses in Google Sheets</li>
  //                 <li>Save the spreadsheet</li>
  //                 <li>Return here to view analytics</li>
  //               </ol>
  //             </div>
              
  //             <div className="bg-green-50 p-4 rounded-lg">
  //               <h3 className="font-semibold text-green-900 mb-2">💡 Pro Tips:</h3>
  //               <ul className="text-sm text-green-800 list-disc list-inside space-y-1 text-left">
  //                 <li>Enter data month-wise for best results</li>
  //                 <li>Include all expense categories</li>
  //                 <li>Dashboard updates automatically</li>
  //                 <li>Data is secure in your Google Drive</li>
  //               </ul>
  //             </div>
  //           </div>

  //           <button
  //             onClick={openSpreadsheet}
  //             className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium text-lg"
  //           >
  //             Open Google Sheets to Enter Data
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Calculate analytics from real data
  const breakdownData = calculateBreakdownData();
  const totalExpenses = expenseData.reduce((sum, month) => sum + month.expenses, 0);
  const expensesThisMonth = expenseData[expenseData.length - 1]?.expenses || 0;
  const previousMonthExpenses = expenseData.length > 1 ? expenseData[expenseData.length - 2]?.expenses : 0;
  const monthlyChange = previousMonthExpenses ? 
    ((expensesThisMonth - previousMonthExpenses) / previousMonthExpenses) * 100 : 0;
  
  const mostSpending = breakdownData[0]?.name || 'No data';
  const mostSpendingAmount = breakdownData[0]?.amount || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Data Entry Option */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Expense-Manager-Beta</h1>
          <div className="flex gap-2">
            <button
              onClick={openSpreadsheet}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <Edit3 size={16} />
              UPDATE DATA
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Download size={16} />
              EXPORT REPORT
            </button>
          </div>
        </div>
        
        <div className="flex gap-6 mt-4 text-sm">
          <div>
            <span className="font-semibold">As on Date:</span> {asOnDate}
          </div>
          <div>
            <span className="font-semibold">Period:</span> {period}
          </div>
          <div>
            <span className="font-semibold">Data Source:</span> Your Google Sheets
          </div>
        </div>
      </div>

      {/* Real Data Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expenses (Period)</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{totalExpenses.toLocaleString('en-IN')}
            </span>
            <span className={`flex items-center text-sm ${monthlyChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {monthlyChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(monthlyChange).toFixed(1)}% from last month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Current Month</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{expensesThisMonth.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500">
              {expenseData[expenseData.length - 1]?.month || 'Current'}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Highest Expense Category</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">{mostSpending}</span>
            <span className="text-lg font-semibold text-blue-600">
              ₹{mostSpendingAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {breakdownData[0]?.value.toFixed(1)}% of total
          </div>
        </div>
      </div>

      {/* Charts with Real Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Expense Trend</h3>
            <span className="text-sm text-gray-500">{expenseData.length} months data</span>
          </div>
          <ExpenseChart data={expenseData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Expense Distribution</h3>
            <span className="text-sm text-gray-500">Based on actual data</span>
          </div>
          <ExpenseBreakdown data={breakdownData} />
        </div>
      </div>

      {/* Data Summary Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Month</th>
                <th className="text-right py-2">Total Expenses</th>
                {breakdownData.slice(0, 5).map(cat => (
                  <th key={cat.name} className="text-right py-2">{cat.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenseData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.month}</td>
                  <td className="text-right py-2 font-medium">₹{item.expenses.toLocaleString('en-IN')}</td>
                  {breakdownData.slice(0, 5).map(cat => (
                    <td key={cat.name} className="text-right py-2">
                      ₹{item.categories[cat.name]?.toLocaleString('en-IN') || '0'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function calculateBreakdownData() {
    if (expenseData.length === 0) return [];
    
    const categorySums: { [key: string]: number } = {};
    
    expenseData.forEach(monthData => {
      Object.entries(monthData.categories).forEach(([category, amount]) => {
        categorySums[category] = (categorySums[category] || 0) + amount;
      });
    });

    const total = Object.values(categorySums).reduce((sum, amount) => sum + amount, 0);
    
    return Object.entries(categorySums)
      .map(([name, amount]) => ({
        name,
        value: total > 0 ? (amount / total) * 100 : 0,
        amount,
      }))
      .sort((a, b) => b.value - a.value);
  }
};

export default ExpensesDashboard;