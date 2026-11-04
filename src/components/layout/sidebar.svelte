<script lang="ts">
	import { Home, CreditCard, PieChart, Target, Settings, TrendingUp, Wallet, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { sidebarCollapsed } from '@/stores/ui';
	
	const menuItems = [
		{ icon: Home, label: 'Tableau de bord', href: '#dashboard', active: true },
		{ icon: CreditCard, label: 'Transactions', href: '#transactions' },
		{ icon: PieChart, label: 'Répartition', href: '#analytics' },
		{ icon: Target, label: 'Objectifs', href: '#goals' },
		{ icon: TrendingUp, label: 'Statistiques', href: '#stats' },
		{ icon: Wallet, label: 'Budgets', href: '#budgets' },
		{ icon: Settings, label: 'Paramètres', href: '#settings' }
	];
	
	function toggleSidebar() {
		sidebarCollapsed.update(v => !v);
	}
</script>

<aside class="hidden lg:flex {$sidebarCollapsed ? 'w-16' : 'w-64'} flex-col border-r border-border/40 bg-background/98 backdrop-blur fixed left-0 top-0 h-screen z-[100] transition-all duration-300">
	<div class="flex items-center {$sidebarCollapsed ? 'justify-center' : 'justify-between'} gap-2 p-2 border-b border-border/40 h-16">
		{#if !$sidebarCollapsed}
			<div class="flex items-center gap-2">
				<div class="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
					<Wallet class="h-5 w-5 text-white" />
				</div>
				<div>
					<h1 class="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						BudgetWise
					</h1>
				</div>
			</div>
		{:else}
			<div class="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
				<Wallet class="h-5 w-5 text-white" />
			</div>
		{/if}
		<button
			on:click={toggleSidebar}
			class="p-1.5 rounded-md hover:bg-accent transition-colors"
			aria-label="Basculer le menu"
		>
			{#if $sidebarCollapsed}
				<ChevronRight class="h-4 w-4" />
			{:else}
				<ChevronLeft class="h-4 w-4" />
			{/if}
		</button>
	</div>
	<nav class="flex-1 space-y-1 p-2">
		{#each menuItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 {$sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 rounded-lg text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground {item.active ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-primary border border-primary/30' : 'text-muted-foreground'}"
				title={$sidebarCollapsed ? item.label : ''}
			>
				<svelte:component this={item.icon} class="h-4 w-4 flex-shrink-0" />
				{#if !$sidebarCollapsed}
					<span>{item.label}</span>
				{/if}
			</a>
		{/each}
	</nav>
</aside>
