<script lang="ts">
	import { Home, CreditCard, PieChart, Target, Settings, TrendingUp, Wallet } from 'lucide-svelte';
	import { Button } from '@/components/ui/button';
	
	const menuItems = [
		{ icon: Home, label: 'Tableau de bord', path: '#dashboard' },
		{ icon: CreditCard, label: 'Transactions', path: '#transactions' },
		{ icon: PieChart, label: 'Répartition', path: '#analytics' },
		{ icon: Target, label: 'Objectifs', path: '#goals' },
		{ icon: TrendingUp, label: 'Statistiques', path: '#stats' },
		{ icon: Wallet, label: 'Budgets', path: '#budgets' },
		{ icon: Settings, label: 'Paramètres', path: '#settings' }
	];
</script>

<aside class="hidden lg:flex w-64 flex-col border-r border-border/40 bg-background/98 backdrop-blur fixed left-0 top-0 h-screen z-[100] transition-all duration-300">
	<div class="flex items-center gap-2 p-2 border-b border-border/40 h-16">
		<div class="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
			<Wallet class="h-5 w-5 text-white" />
		</div>
		<div>
			<h1 class="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
				BudgetWise
			</h1>
		</div>
	</div>
	<nav class="flex-1 space-y-1 p-2">
		{#each menuItems as item}
			<a
				href={item.path}
				class="flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground {item.path === window.location.hash ? 'text-primary font-medium' : ''}"
				on:click={e => e.preventDefault()}
			>
				<svelte:component this={item.icon} class="h-4 w-4 flex-shrink-0" />
				<span>{item.label}</span>
			</a>
		{/each}
	</nav>
</aside>