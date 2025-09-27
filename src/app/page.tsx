// app/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SpreadsheetCreator from "@/components/SpreadsheetCreator";
import ExpensesDashboard from "@/components/ExpensesDashboard";
import Navbar from "@/components/Navbar";

type AppState = 'auth' | 'create-sheet' | 'dashboard';

export default function Home() {
  const { data: session } = useSession();
  const [currentState, setCurrentState] = useState<AppState>('auth');
  const [spreadsheetId, setSpreadsheetId] = useState<string>("");

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Expense-Manager-Beta
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Sign in to access your expenses dashboard
          </p>
          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onLogout={() => {
          setCurrentState('auth');
          setSpreadsheetId("");
          signOut();
        }}
        user={session.user!}
      />
      
      {currentState === 'create-sheet' && (
        <SpreadsheetCreator 
          onSheetCreated={(id) => {
            setSpreadsheetId(id);
            setCurrentState('dashboard');
          }}
          onBack={() => setCurrentState('auth')}
        />
      )}

      {currentState === 'dashboard' && spreadsheetId && (
        <ExpensesDashboard spreadsheetId={spreadsheetId} />
      )}

      {currentState === 'auth' && (
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Expenses Analysis
            </h1>
            <p className="text-gray-600 mb-6">
              Get started by creating a new spreadsheet to track your expenses data.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => setCurrentState('create-sheet')}
              >
                Create New Spreadsheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}