<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { transactions, balance, income, expenses, type TransactionType } from '@/stores/transactions';
	import { Wallet, ArrowDownCircle, ArrowUpCircle, PlusCircle, Trash2, TrendingUp, PieChart } from 'lucide-svelte';

	let type: TransactionType = 'expense';
	let category = '';
	let description = '';
	let amount = '';
	let date = new Date().toISOString().split('T')[0];

	function addTransaction(e?: Event) {
		e?.preventDefault();
		if (!amount || parseFloat(amount) <= 0) return;
		transactions.addTransaction({
			type,
			category: category || 'Autre',
			description,
			amount: parseFloat(amount),
			date
		});
		category = '';
		description = '';
		amount = '';
	}

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
	}

	$: savingsRate = $income > 0 ? (($income - $expenses) / $income) * 100 : 0;
</script>

<div class="mb-8">
	<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
		Tableau de bord
	</h2>
	<p class="text-muted-foreground text-lg">Suivez et analysez vos finances en un coup d'œil</p>
</div>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
	<Card class="border-purple-500/20 bg-gradient-to-br from-card to-purple-950/5 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] transition-all duration-300">
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Solde Net</CardTitle>
			<Wallet class="h-4 w-4 text-purple-400" />
		</CardHeader>
		<CardContent>
			<div class="text-2xl md:text-3xl font-bold { $balance >= 0 ? 'text-foreground' : 'text-red-400' }">{formatCurrency($balance)}</div>
			<p class="text-xs text-muted-foreground mt-1">Revenus - Dépenses</p>
		</CardContent>
	</Card>
	<Card class="border-green-500/20 bg-gradient-to-br from-card to-green-950/5 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)] transition-all duration-300">
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Revenus</CardTitle>
			<ArrowUpCircle class="h-4 w-4 text-green-400" />
		</CardHeader>
		<CardContent>
			<div class="text-2xl md:text-3xl font-bold text-green-400">{formatCurrency($income)}</div>
			<p class="text-xs text-muted-foreground mt-1">Total encaissé</p>
		</CardContent>
	</Card>
	<Card class="border-red-500/20 bg-gradient-to-br from-card to-red-950/5 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)] transition-all duration-300">
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Dépenses</CardTitle>
			<ArrowDownCircle class="h-4 w-4 text-red-400" />
		</CardHeader>
		<CardContent>
			<div class="text-2xl md:text-3xl font-bold text-red-400">{formatCurrency($expenses)}</div>
			<p class="text-xs text-muted-foreground mt-1">Total dépensé</p>
		</CardContent>
	</Card>
	<Card class="border-blue-500/20 bg-gradient-to-br from-card to-blue-950/5 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] transition-all duration-300">
		<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle class="text-sm font-medium">Taux d'épargne</CardTitle>
			<TrendingUp class="h-4 w-4 text-blue-400" />
		</CardHeader>
		<CardContent>
			<div class="text-2xl md:text-3xl font-bold text-blue-400">{savingsRate.toFixed(1)}%</div>
			<p class="text-xs text-muted-foreground mt-1">Du revenu épargné</p>
		</CardContent>
	</Card>
</div>

<div class="grid gap-8 lg:grid-cols-3">
	<Card class="lg:col-span-1 border-primary/30 shadow-[0_20px_70px_-15px_rgba(168,85,247,0.3)] backdrop-blur">
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<PlusCircle class="h-5 w-5 text-primary" />
				Nouvelle transaction
			</CardTitle>
			<CardDescription>Ajoutez un revenu ou une dépense</CardDescription>
		</CardHeader>
		<CardContent>
			<form onsubmit={addTransaction} class="space-y-4">
				<div class="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
					<button
						type="button"
						class="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all {type === 'income' ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-accent'}"
						on:click={() => (type = 'income')}
					>
						<ArrowUpCircle class="h-4 w-4" />
						Revenu
					</button>
					<button
						type="button"
						class="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all {type === 'expense' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-accent'}"
						on:click={() => (type = 'expense')}
					>
						<ArrowDownCircle class="h-4 w-4" />
						Dépense
					</button>
				</div>
				<div class="space-y-2">
					<label for="amount" class="text-sm font-medium">Montant (€)</label>
					<Input id="amount" type="number" step="0.01" placeholder="0.00" bind:value={amount} required class="text-lg" />
				</div>
				<div class="space-y-2">
					<label for="category" class="text-sm font-medium">Catégorie</label>
					<Input id="category" placeholder="Alimentation, Transport, Salaire, Loisirs..." bind:value={category} />
				</div>
				<div class="space-y-2">
					<label for="description" class="text-sm font-medium">Description</label>
					<Input id="description" placeholder="Détails de la transaction" bind:value={description} />
				</div>
				<div class="space-y-2">
					<label for="date" class="text-sm font-medium">Date</label>
					<Input id="date" type="date" bind:value={date} />
				</div>
				<Button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25">
					<PlusCircle class="mr-2 h-4 w-4" />
					Ajouter la transaction
				</Button>
			</form>
		</CardContent>
	</Card>

	<Card class="lg:col-span-2 border-primary/20 shadow-[0_20px_70px_-15px_rgba(168,85,247,0.2)]">
		<CardHeader>
			<CardTitle class="flex items-center gap-2">
				<PieChart class="h-5 w-5 text-primary" />
				Historique des transactions
			</CardTitle>
			<CardDescription>Suivi en temps réel de vos opérations</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-3 max-h-[600px] overflow-y-auto pr-2">
				{#if $transactions.length === 0}
					<div class="text-center py-12">
						<Wallet class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
						<p class="text-muted-foreground">Aucune transaction pour le moment</p>
						<p class="text-sm text-muted-foreground mt-1">Ajoutez votre première transaction ci-dessus</p>
					</div>
				{:else}
					{#each $transactions as transaction (transaction.id)}
						<div class="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-all group">
							<div class="flex items-center gap-4">
								<div class="p-2.5 rounded-full {transaction.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'} ring-1 {transaction.type === 'income' ? 'ring-green-500/30' : 'ring-red-500/30'}">
									{#if transaction.type === 'income'}
										<ArrowUpCircle class="h-5 w-5 text-green-400" />
									{:else}
										<ArrowDownCircle class="h-5 w-5 text-red-400" />
									{/if}
								</div>
								<div>
									<p class="font-semibold">{transaction.category}</p>
									<p class="text-sm text-muted-foreground">
										{transaction.description || 'Sans description'} • {transaction.date}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<div class="text-right">
									<p class="text-lg font-bold {transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}">
										{transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
									</p>
								</div>
								<Button
									variant="ghost"
									size="icon"
									class="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
									on:click={() => transactions.removeTransaction(transaction.id)}
								>
									<Trash2 class="h-4 w-4" />
								</Button>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</CardContent>
	</Card>
</div>
