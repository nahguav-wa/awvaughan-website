<script lang="ts">
	import { onMount } from 'svelte';
	import { MapPin, Phone, Mail } from '@lucide/svelte';

	let isVisible = true;

	onMount(() => {
		const handleScroll = () => {
			// Only visible when at the very top of the page
			isVisible = window.scrollY === 0;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white transition-transform duration-300 hidden md:block"
	class:translate-y-0={isVisible}
	class:-translate-y-full={!isVisible}
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-center gap-8 py-3 text-sm">
			<!-- Location -->
			<div class="flex items-center gap-2">
				<MapPin class="w-4 h-4" />
				<span>Virginia Beach, Virginia</span>
			</div>

			<!-- Phone -->
			<div class="flex items-center gap-2">
				<Phone class="w-4 h-4" />
				<a href="tel:+17574021100" class="hover:text-gray-300 transition-colors">
					757-402-1100
				</a>
			</div>

			<!-- Email -->
			<div class="flex items-center gap-2">
				<Mail class="w-4 h-4" />
				<a href="mailto:alex.vaughan@awvaughan.com" class="hover:text-gray-300 transition-colors">
					alex.vaughan@awvaughan.com
				</a>
			</div>
		</div>
	</div>
</header>