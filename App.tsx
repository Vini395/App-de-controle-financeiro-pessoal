
import React, { useState, useMemo } from 'react';
import { Transaction, TransactionType } from './types';
import useTransactions from './hooks/useTransactions';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import GeminiInsights from './components/GeminiInsights';
import { PlusIcon } from './components/Icons';

export default function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | undefined>(undefined);

  const handleOpenModal = (transaction?: Transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTransactionToEdit(undefined);
    setIsModalOpen(false);
  };

  const handleSaveTransaction = (transaction: Omit<Transaction, 'id'> | Transaction) => {
    if ('id' in transaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }
    handleCloseModal();
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  };

  const { balance, monthlyIncome, monthlyExpenses, expenseData } = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    const income = monthlyTransactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthlyTransactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = transactions.reduce((sum, t) => {
      return t.type === TransactionType.INCOME ? sum + t.amount : sum - t.amount;
    }, 0);

    const expensesByCategory = monthlyTransactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));
    
    return { balance: totalBalance, monthlyIncome: income, monthlyExpenses: expenses, expenseData: chartData };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-primary font-sans">
      <Header balance={balance} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <SummaryCards income={monthlyIncome} expenses={monthlyExpenses} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-secondary p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100">Transações Recentes</h2>
              <button
                onClick={() => handleOpenModal()}
                className="bg-income hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-transform transform hover:scale-105"
              >
                <PlusIcon />
                <span className="ml-2 hidden sm:inline">Nova Transação</span>
              </button>
            </div>
            <TransactionList
              transactions={transactions}
              onEdit={handleOpenModal}
              onDelete={handleDeleteTransaction}
            />
          </div>
          <div className="space-y-8">
             <ExpenseChart data={expenseData} />
             <GeminiInsights transactions={transactions.filter(t => t.type === TransactionType.EXPENSE)} />
          </div>
        </div>
      </main>
      {isModalOpen && (
        <TransactionForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTransaction}
          transaction={transactionToEdit}
        />
      )}
    </div>
  );
}
