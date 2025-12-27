<script lang="ts">
	export let imageSrc = '/hero-image.jpg';
	export let imageAlt = 'Hero Image';
	export let title = 'Welcome to Our Company';
	export let subtitle = 'Delivering excellence in everything we do';
</script>

<section class="relative w-full h-screen pt-16 md:pt-24">
	<!-- Background Image -->
	<div class="absolute inset-0 overflow-hidden">
		<img 
			src={imageSrc} 
			alt={imageAlt}
			class="w-full h-full object-cover"
		/>
		<!-- Overlay for better text readability -->
		<div class="absolute inset-0 bg-black bg-opacity-40"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
		<div class="text-center text-white max-w-4xl">
			<h1 class="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
				{title}
			</h1>
			<p class="text-xl md:text-2xl mb-8 drop-shadow-md">
				{subtitle}
			</p>
			<div class="flex gap-4 justify-center">
				<a 
					href="/contact" 
					class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg"
				>
					Get Started
				</a>
				<a 
					href="/services" 
					class="bg-transparent hover:bg-white hover:text-gray-900 text-white font-semibold px-8 py-3 rounded-lg border-2 border-white transition-all duration-200"
				>
					Learn More
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator (optional) -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<svg 
			class="w-6 h-6 text-white" 
			fill="none" 
			stroke="currentColor" 
			viewBox="0 0 24 24"
		>
			<path 
				stroke-linecap="round" 
				stroke-linejoin="round" 
				stroke-width="2" 
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>