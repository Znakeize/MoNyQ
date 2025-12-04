import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for Budget Data
export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    category: string;
    type: 'income' | 'expense';
}

interface BudgetContextType {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: string) => void;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const savedData = await AsyncStorage.getItem('transactions');
            if (savedData) {
                setTransactions(JSON.parse(savedData));
            } else {
                // Mock Data for initial load
                const mockData: Transaction[] = [
                    { id: '1', title: 'Salary', amount: 5000, date: new Date().toISOString(), category: 'Income', type: 'income' },
                    { id: '2', title: 'Rent', amount: 1200, date: new Date().toISOString(), category: 'Housing', type: 'expense' },
                    { id: '3', title: 'Groceries', amount: 300, date: new Date().toISOString(), category: 'Food', type: 'expense' },
                ];
                setTransactions(mockData);
            }
        };
        loadData();
    }, []);

    const saveTransactions = async (newTransactions: Transaction[]) => {
        setTransactions(newTransactions);
        await AsyncStorage.setItem('transactions', JSON.stringify(newTransactions));
    };

    const addTransaction = (transaction: Transaction) => {
        const newTransactions = [transaction, ...transactions];
        saveTransactions(newTransactions);
    };

    const deleteTransaction = (id: string) => {
        const newTransactions = transactions.filter(t => t.id !== id);
        saveTransactions(newTransactions);
    };

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpenses;

    return (
        <BudgetContext.Provider value={{ transactions, addTransaction, deleteTransaction, totalIncome, totalExpenses, balance }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};
