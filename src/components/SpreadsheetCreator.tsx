// components/SpreadsheetCreator.tsx (Updated)
'use client';

import { useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';

interface SpreadsheetCreatorProps {
  onSheetCreated: (spreadsheetId: string) => void;
  onBack: () => void;
}

const SpreadsheetCreator = ({ onSheetCreated, onBack }: SpreadsheetCreatorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [sheetName, setSheetName] = useState('Company Expenses - FY 2024-25');
  const [error, setError] = useState('');

  const createSpreadsheet = async () => {
    if (!sheetName.trim()) {
      setError('Please enter a spreadsheet name');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const response = await fetch('/api/sheets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: sheetName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create spreadsheet');
      }

      // Initialize with EMPTY template structure only
      await initializeSpreadsheetTemplate(data.id);
      
      onSheetCreated(data.id);
    } catch (err: any) {
      setError(err.message || 'Failed to create spreadsheet');
    } finally {
      setIsCreating(false);
    }
  };

  const initializeSpreadsheetTemplate = async (spreadsheetId: string) => {
    // Create ONLY headers - no sample data
    const headers = [
      ['Month', 'Total Expenses', 'Dep.on Motor Car', 'Dep.on Plank Machinery-1', 'Dep.on Building', 'Assembling Charges', 'Transportation & Packaging', 'Interest on Bank Loan', 'Troughs & Conveyance', 'Dep.on Computers & Printers', 'Professional & Consultancy Charges', 'Others', 'Notes']
    ];

    // Additional instructions row
    const instructions = [
      ['INSTRUCTIONS:', 'Enter actual expense amounts in respective columns', '', '', '', '', '', '', '', '', '', '', '']
    ];

    // Example format row (optional - can be removed)
    const exampleFormat = [
      ['Format Example:', '1500000', '350000', '300000', '180000', '120000', '90000', '70000', '50000', '35000', '25000', '120000', 'May 2024 expenses']
    ];

    const values = [...headers, ...instructions, [''] /* empty row */, exampleFormat];

    await fetch('/api/sheets/append', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spreadsheetId,
        range: 'Sheet1!A1',
        values: values,
      }),
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Setup Expense Tracking</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="sheetName" className="block text-sm font-medium text-gray-700 mb-2">
              Spreadsheet Name
            </label>
            <input
              type="text"
              id="sheetName"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter spreadsheet name"
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">📊 Ready for Real Data</h3>
            <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
              <li>Empty template with proper expense categories</li>
              <li>Enter your actual company expense data</li>
              <li>Dashboard updates automatically</li>
              <li>Financial year-wise tracking</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">📝 Next Steps:</h3>
            <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
              <li>Create spreadsheet template</li>
              <li>Go to Google Sheets and enter your actual expense data</li>
              <li>Return to dashboard to view analytics</li>
              <li>Data syncs automatically</li>
            </ol>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={createSpreadsheet}
              disabled={isCreating}
              className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating Template...
                </>
              ) : (
                'Create Expense Template'
              )}
            </button>
            
            <button
              onClick={onBack}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetCreator;