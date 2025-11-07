
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'> | Transaction) => void;
  transaction?: Transaction;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, onSave, transaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(String(transaction.amount));
      setDate(new Date(transaction.date).toISOString().split('T')[0]);
      setType(transaction.type);
      setCategory(transaction.category);
    } else {
      // Reset form
      setDescription('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setType(TransactionType.EXPENSE);
      setCategory('');
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      description,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      type,
      category: type === TransactionType.INCOME ? 'Receita' : category,
    };
    
    if (transaction) {
      onSave({ ...transactionData, id: transaction.id });
    } else {
      onSave(transactionData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">{transaction ? 'Editar' : 'Nova'} Transação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Descrição</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="w-full mt-1 p-2 bg-accent rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Valor</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" className="w-full mt-1 p-2 bg-accent rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Data</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full mt-1 p-2 bg-accent rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
          </div>
          <fieldset className="flex gap-4">
            <legend className="block text-sm font-medium text-gray-300 mb-2">Tipo</legend>
            <div className="flex items-center">
              <input id="expense" type="radio" name="type" value={TransactionType.EXPENSE} checked={type === TransactionType.EXPENSE} onChange={() => setType(TransactionType.EXPENSE)} className="h-4 w-4 text-red-500 bg-gray-700 border-gray-600 focus:ring-red-600" />
              <label htmlFor="expense" className="ml-2 text-sm font-medium text-gray-300">Despesa</label>
            </div>
            <div className="flex items-center">
              <input id="income" type="radio" name="type" value={TransactionType.INCOME} checked={type === TransactionType.INCOME} onChange={() => setType(TransactionType.INCOME)} className="h-4 w-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-600" />
              <label htmlFor="income" className="ml-2 text-sm font-medium text-gray-300">Receita</label>
            </div>
          </fieldset>
          {type === TransactionType.EXPENSE && (
            <div>
              <label className="block text-sm font-medium text-gray-300">Categoria</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} required className="w-full mt-1 p-2 bg-accent rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
            </div>
          )}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{transaction ? 'Salvar' : 'Adicionar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
