
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface ExpenseChartProps {
  data: ChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-secondary border border-gray-600 rounded-md shadow-lg">
        <p className="label text-white">{`${payload[0].name} : ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
      </div>
    );
  }
  return null;
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Despesas por Categoria</h2>
      <div style={{ width: '100%', height: 300 }}>
        {data.length > 0 ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Adicione despesas para ver o gráfico.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
