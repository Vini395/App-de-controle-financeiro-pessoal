
import React, { useState, useCallback } from 'react';
import { analyzeExpenses } from '../services/geminiService';
import { Transaction } from '../types';
import { SparklesIcon, LoadingIcon } from './Icons';

interface GeminiInsightsProps {
  transactions: Transaction[];
}

const GeminiInsights: React.FC<GeminiInsightsProps> = ({ transactions }) => {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setInsights('');
    try {
      const result = await analyzeExpenses(transactions);
      setInsights(result);
    } catch (err) {
      setError('Falha ao obter insights. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [transactions]);

  const formattedInsights = insights.split('\n').map((line, index) => {
      if (line.startsWith('###') || line.startsWith('##') || line.startsWith('#')) {
          return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.replace(/#/g, '')}</h3>;
      }
      if (line.startsWith('* ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
      return <p key={index} className="my-1">{line}</p>;
  });


  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
        <SparklesIcon className="text-yellow-400 mr-2" />
        Análise com IA
      </h2>
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <LoadingIcon />
            Analisando...
          </>
        ) : (
          'Analisar Minhas Despesas'
        )}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}
      
      {insights && (
        <div className="mt-4 text-gray-300 prose prose-invert max-w-none">
            {formattedInsights}
        </div>
      )}
    </div>
  );
};

export default GeminiInsights;
