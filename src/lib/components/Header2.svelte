<script lang="ts">
	import { onMount } from 'svelte';

	let isScrolled = false;

	onMount(() => {
		const handleScroll = () => {
			// Add solid background and move to top after scrolling past a threshold
			isScrolled = window.scrollY > 10;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class="fixed left-0 right-0 z-40 transition-all duration-300"
	class:top-0={isScrolled}
	class:top-12={!isScrolled}
	class:bg-transparent={!isScrolled}
	class:bg-white={isScrolled}
	class:shadow-md={isScrolled}
>
	<div class="container mx-auto px-4">
		<div class="flex items-center justify-between py-4">
			<!-- Logo - Left Aligned -->
			<a href="/" class="flex items-center">
				<img 
					src="/logo.svg" 
					alt="Company Logo" 
					class="h-12 w-auto transition-all duration-300"
					class:h-10={isScrolled}
				/>
			</a>

			<!-- Navigation - Right Aligned -->
			<nav class="hidden md:block">
				<ul class="flex items-center gap-8">
					<li>
						<a 
							href="/about" 
							class="font-medium transition-colors duration-200 hover:text-blue-600"
							class:text-white={!isScrolled}
							class:text-gray-800={isScrolled}
						>
							About
						</a>
					</li>
					<li>
						<a 
							href="/services" 
							class="font-medium transition-colors duration-200 hover:text-blue-600"
							class:text-white={!isScrolled}
							class:text-gray-800={isScrolled}
						>
							Services
						</a>
					</li>
					<li>
						<a 
							href="/contact" 
							class="font-medium transition-colors duration-200 hover:text-blue-600"
							class:text-white={!isScrolled}
							class:text-gray-800={isScrolled}
						>
							Contact
						</a>
					</li>
				</ul>
			</nav>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2"
				aria-label="Toggle menu"
			>
				<svg 
					class="w-6 h-6 transition-colors"
					class:text-white={!isScrolled}
					class:text-gray-800={isScrolled}
					fill="none" 
					stroke="currentColor" 
					viewBox="0 0 24 24"
				>
					<path 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						stroke-width="2" 
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>
