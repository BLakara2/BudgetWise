<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { transactions } from '@/stores/transactions';
	import { CreditCard, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-svelte';

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
	}
</script>

<div class="mb-8">
	<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-2">Transactions</h2>
	<p class="text-muted-foreground text-lg">Historique complet de toutes vos transactions</p>
</div>

<Card>
	<CardHeader>
		<CardTitle class="flex items-center gap-2">
			<CreditCard class="h-5 w-5" />
			Toutes les transactions
		</CardTitle>
		<CardDescription>{$transactions.length} transaction(s)</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="space-y-3">
			{#if $transactions.length === 0}
				<p class="text-center text-muted-foreground py-12">Aucune transaction</p>
			{:else}
				{#each $transactions as transaction (transaction.id)}
					<div class="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
						<div class="flex items-center gap-4">
							<div class="p-2 rounded-full {transaction.type === 'income' ? 'bg-green-500/10' : 'bg-red-500/10'}">
								{#if transaction.type === 'income'}
									<ArrowUpCircle class="h-4 w-4 text-green-400" />
								{:else}
									<ArrowDownCircle class="h-4 w-4 text-red-400" />
								{/if}
							</div>
							<div>
								<p class="font-medium">{transaction.category}</p>
								<p class="text-sm text-muted-foreground">{transaction.description || 'Sans description'} • {transaction.date}</p>
							</div>
						</div>
						<div class="flex items-center gap-4">
							<p class="font-semibold {transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}">
								{transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
							</p>
							<Button variant="ghost" size="icon" on:click={() => transactions.removeTransaction(transaction.id)}>
								<Trash2 class="h-4 w-4" />
							</Button>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</CardContent>
</Card>
