
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

interface SummaryCardsProps {
  income: number;
  expenses: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expenses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-secondary p-6 rounded-xl shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 text-lg">Receitas do Mês</h3>
          <p className="text-3xl font-bold text-income">
            {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        <div className="bg-green-500/20 p-3 rounded-full">
          <ArrowUpIcon className="text-income" />
        </div>
      </div>
      <div className="bg-secondary p-6 rounded-xl shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-gray-400 text-lg">Despesas do Mês</h3>
          <p className="text-3xl font-bold text-expense">
            {expenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        <div className="bg-red-500/20 p-3 rounded-full">
          <ArrowDownIcon className="text-expense" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
