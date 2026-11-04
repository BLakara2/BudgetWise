<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { Moon, Sun } from 'lucide-svelte';
	import { sidebarCollapsed } from '@/stores/ui';
	
	export let isDark = true;
	export let toggleTheme: () => void = () => {};
</script>

<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 {$sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}">
	<div class="container mx-auto flex h-16 max-w-7xl items-center justify-end px-4">
		<Button variant="outline" size="icon" on:click={toggleTheme} class="shadow-sm hover:shadow-md">
			{#if isDark}
				<Sun class="h-4 w-4" />
			{:else}
				<Moon class="h-4 w-4" />
			{/if}
		</Button>
	</div>
</header>
