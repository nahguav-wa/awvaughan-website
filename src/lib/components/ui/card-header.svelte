<script lang="ts">
	import { cn } from '$lib/utils/cn';

	type CardHeaderProps = {
		class?: string;
	};

	let { class: className = '' }: CardHeaderProps = $props();
	const restProps = $restProps();
	$: classes = cn('flex flex-col gap-3 p-6', className, restProps.class);
</script>

<div {...restProps} class={classes}>
	<slot />
</div>
