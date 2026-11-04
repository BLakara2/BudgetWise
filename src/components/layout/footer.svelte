<script lang="ts">
	import { Heart } from 'lucide-svelte';
</script>

<footer class="sticky bottom-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="container mx-auto max-w-7xl px-4 py-4">
		<div class="flex flex-col md:flex-row items-center justify-between gap-2">
			<div class="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
				<span>Fait avec</span>
				<Heart class="h-3 w-3 md:h-4 md:w-4 text-red-500 fill-red-500" />
				<span>pour mieux gérer votre argent</span>
			</div>
			<p class="text-xs md:text-sm text-muted-foreground">
				© {new Date().getFullYear()} BudgetWise. Tous droits réservés.
			</p>
		</div>
	</div>
</footer>
