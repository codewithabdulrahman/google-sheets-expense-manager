// components/ExpenseChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpenseData {
  month: string;
  expenses: number;
  categories: {
    [key: string]: number;
  };
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

const ExpenseChart = ({ data }: ExpenseChartProps) => {
  const chartData = data.map(item => ({
    month: item.month,
    expenses: item.expenses,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
          />
          <Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Expenses']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#1d4ed8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;