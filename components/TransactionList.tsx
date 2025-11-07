
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { EditIcon, TrashIcon } from './Icons';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<{transaction: Transaction, onEdit: (transaction: Transaction) => void, onDelete: (id: string) => void}> = ({ transaction, onEdit, onDelete }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const amountColor = isIncome ? 'text-income' : 'text-expense';
  const sign = isIncome ? '+' : '-';

  return (
    <li className="flex items-center justify-between p-4 bg-accent/50 hover:bg-accent/80 rounded-lg transition-colors duration-200">
      <div className="flex items-center">
        <div className={`w-2 h-10 rounded-full ${isIncome ? 'bg-income' : 'bg-expense'}`}></div>
        <div className="ml-4">
          <p className="font-semibold text-white">{transaction.description}</p>
          <p className="text-sm text-gray-400">
            {transaction.category} - {new Date(transaction.date).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className={`font-bold text-lg ${amountColor}`}>
          {sign} {transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
        <button onClick={() => onEdit(transaction)} className="text-gray-400 hover:text-blue-400 p-2">
          <EditIcon />
        </button>
        <button onClick={() => onDelete(transaction.id)} className="text-gray-400 hover:text-red-400 p-2">
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-400 mt-8">Nenhuma transação encontrada.</p>;
  }

  return (
    <ul className="space-y-3">
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TransactionList;
