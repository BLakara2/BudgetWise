<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
	import { Target } from 'lucide-svelte';
</script>

<div class="mb-8">
	<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-2">Objectifs</h2>
	<p class="text-muted-foreground text-lg">Définissez et suivez vos objectifs d'épargne</p>
</div>

<Card>
	<CardHeader>
		<CardTitle class="flex items-center gap-2">
			<Target class="h-5 w-5" />
			Mes objectifs
		</CardTitle>
	</CardHeader>
	<CardContent>
		<p class="text-center text-muted-foreground py-12">Aucun objectif défini</p>
	</CardContent>
</Card>
