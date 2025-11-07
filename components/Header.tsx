
import React from 'react';

interface HeaderProps {
  balance: number;
}

const Header: React.FC<HeaderProps> = ({ balance }) => {
  const balanceColor = balance >= 0 ? 'text-income' : 'text-expense';
  
  return (
    <header className="bg-secondary shadow-md p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Controle Financeiro
        </h1>
        <div className="text-right">
          <span className="text-sm text-gray-400 block">Saldo Atual</span>
          <span className={`text-2xl md:text-3xl font-bold ${balanceColor}`}>
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
