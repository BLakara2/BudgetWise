import { writable, derived } from 'svelte/store';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
	id: string;
	type: TransactionType;
	category: string;
	description: string;
	amount: number;
	date: string;
}

function createTransactionStore() {
	const { subscribe, set, update } = writable<Transaction[]>([]);

	return {
		subscribe,
		addTransaction: (transaction: Omit<Transaction, 'id'>) => {
			update((transactions) => [
				{ ...transaction, id: crypto.randomUUID() },
				...transactions
			]);
		},
		removeTransaction: (id: string) => {
			update((transactions) => transactions.filter((t) => t.id !== id));
		},
		clear: () => set([])
	};
}

export const transactions = createTransactionStore();

export const balance = derived(transactions, ($transactions) => {
	return $transactions.reduce((acc, t) => {
		return t.type === 'income' ? acc + t.amount : acc - t.amount;
	}, 0);
});

export const income = derived(transactions, ($transactions) => {
	return $transactions
		.filter((t) => t.type === 'income')
		.reduce((acc, t) => acc + t.amount, 0);
});

export const expenses = derived(transactions, ($transactions) => {
	return $transactions
		.filter((t) => t.type === 'expense')
		.reduce((acc, t) => acc + t.amount, 0);
});
