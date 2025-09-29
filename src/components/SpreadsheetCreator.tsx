// components/SpreadsheetCreator.tsx
'use client';

import { useState } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';

interface SpreadsheetCreatorProps {
  onSheetCreated: (spreadsheetId: string, spreadsheetName: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const SpreadsheetCreator = ({ 
  onSheetCreated, 
  showBackButton = true, 
  onBack 
}: SpreadsheetCreatorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [sheetName, setSheetName] = useState('');
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

      // Initialize with template structure
      await initializeSpreadsheetTemplate(data.id);
      
      // Return to dashboard - spreadsheet will auto-open
      onSheetCreated(data.id, sheetName);
    } catch (err: any) {
      setError(err.message || 'Failed to create spreadsheet');
    } finally {
      setIsCreating(false);
    }
  };

  const initializeSpreadsheetTemplate = async (spreadsheetId: string) => {
    const headers = [
      ['Month', 'Total Expenses', 'Dep.on Motor Car', 'Dep.on Plank Machinery-1', 'Dep.on Building', 'Assembling Charges', 'Transportation & Packaging', 'Interest on Bank Loan', 'Troughs & Conveyance', 'Dep.on Computers & Printers', 'Professional & Consultancy Charges', 'Others', 'Notes']
    ];

    const instructions = [
      ['INSTRUCTIONS:', 'Enter actual expense amounts in respective columns', '', '', '', '', '', '', '', '', '', '', '']
    ];

    const exampleFormat = [
      ['Format Example:', '1500000', '350000', '300000', '180000', '120000', '90000', '70000', '50000', '35000', '25000', '120000', 'May 2024 expenses']
    ];

    const values = [...headers, ...instructions, [''], exampleFormat];

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
        {/* SIMPLIFIED HEADER - No back button at all */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Create Expense Spreadsheet</h2>
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

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center">
              <ExternalLink className="mr-2" size={16} />
              What happens next?
            </h3>
            <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1">
              <li>We'll create a new Google Sheet with expense categories</li>
              <li>Sheet will open automatically in a new tab</li>
              <li>Enter your company expense data in the sheet</li>
              <li>Return here to see your dashboard with live analytics</li>
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
              className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {isCreating ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Creating Spreadsheet...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2" size={20} />
                  Create Spreadsheet
                </>
              )}
            </button>
            
            {/* No Cancel button at all when showBackButton is false */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetCreator;