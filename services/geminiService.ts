
import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeExpenses = async (transactions: Transaction[]): Promise<string> => {
  if (!API_KEY) {
    return "A chave de API do Gemini não foi configurada. A análise de IA está desativada.";
  }
  
  if (transactions.length === 0) {
    return "Não há despesas para analisar. Adicione algumas transações de despesa primeiro.";
  }

  const model = 'gemini-2.5-flash';

  const transactionsString = transactions
    .map(t => `- ${t.date.split('T')[0]}: ${t.description} (${t.category}) - R$ ${t.amount.toFixed(2)}`)
    .join('\n');

  const prompt = `
    Você é um assistente financeiro especialista. Analise a seguinte lista de despesas de um usuário e forneça um resumo conciso de seus hábitos de consumo.
    Depois do resumo, ofereça 2-3 dicas práticas e acionáveis para ajudar o usuário a economizar dinheiro, baseadas especificamente nos dados fornecidos.
    Seja amigável e encorajador. Formate sua resposta em markdown.

    Lista de Despesas:
    ${transactionsString}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing expenses with Gemini:", error);
    return "Ocorreu um erro ao tentar analisar suas despesas. Por favor, tente novamente mais tarde.";
  }
};
