<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
	import { PieChart } from 'lucide-svelte';
</script>

<div class="mb-8">
	<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-2">Répartition</h2>
	<p class="text-muted-foreground text-lg">Analyse de vos dépenses par catégorie</p>
</div>

<Card>
	<CardHeader>
		<CardTitle class="flex items-center gap-2">
			<PieChart class="h-5 w-5" />
			Répartition des dépenses
		</CardTitle>
	</CardHeader>
	<CardContent>
		<p class="text-center text-muted-foreground py-12">Analyse en cours de développement</p>
	</CardContent>
</Card>
