<script lang="ts">
	import { cn } from "@/lib/utils";
	import { buttonVariants, type ButtonVariant, type ButtonSize } from "./index.js";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface $$Props extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
	}

	let className: $$Props["class"] = undefined;
	export let variant: ButtonVariant = "default";
	export let size: ButtonSize = "default";
	export { className as class };
</script>

<button
	class={cn(buttonVariants({ variant, size }), className)}
	on:click
	on:submit
	{...$$restProps}
>
	<slot />
</button>
