<script lang="ts">
	import HeroImage from '$lib/components/HeroImage.svelte';
</script>

<HeroImage 
	imageSrc="/hero-image.jpg"
	imageAlt="Your Company Hero"
	title="Welcome to Our Company"
	subtitle="Delivering excellence in everything we do"
/>

<!-- About Section -->
<section class="py-20 bg-white">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
			<p class="text-lg text-gray-600 mb-8">
				We are a leading company dedicated to providing exceptional services and solutions 
				to our clients. With years of experience and a commitment to excellence, we pride 
				ourselves on delivering results that exceed expectations.
			</p>
			<div class="grid md:grid-cols-3 gap-8 mt-12">
				<div class="p-6">
					<div class="text-blue-600 mb-4">
						<svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
					<p class="text-gray-600">Quick turnaround times without compromising quality</p>
				</div>
				<div class="p-6">
					<div class="text-blue-600 mb-4">
						<svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
					<p class="text-gray-600">Rigorous standards ensuring the best outcomes</p>
				</div>
				<div class="p-6">
					<div class="text-blue-600 mb-4">
						<svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
					<p class="text-gray-600">Experienced professionals dedicated to your success</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Services Section -->
<section class="py-20 bg-gray-50">
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">Our Services</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Service One</h3>
					<p class="text-gray-600 mb-4">
						Comprehensive solutions tailored to meet your specific needs. We work closely 
						with you to understand your goals and deliver exceptional results.
					</p>
					<a href="/services" class="text-blue-600 hover:text-blue-700 font-medium">
						Learn More →
					</a>
				</div>
				<div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Service Two</h3>
					<p class="text-gray-600 mb-4">
						Professional expertise combined with innovative approaches to solve complex 
						challenges and drive meaningful outcomes for your business.
					</p>
					<a href="/services" class="text-blue-600 hover:text-blue-700 font-medium">
						Learn More →
					</a>
				</div>
				<div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Service Three</h3>
					<p class="text-gray-600 mb-4">
						Strategic planning and execution that transforms your vision into reality with 
						measurable results and sustainable growth.
					</p>
					<a href="/services" class="text-blue-600 hover:text-blue-700 font-medium">
						Learn More →
					</a>
				</div>
				<div class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
					<h3 class="text-2xl font-semibold text-gray-900 mb-4">Service Four</h3>
					<p class="text-gray-600 mb-4">
						Ongoing support and maintenance to ensure your continued success with 
						responsive service and proactive solutions.
					</p>
					<a href="/services" class="text-blue-600 hover:text-blue-700 font-medium">
						Learn More →
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-blue-600 text-white">
	<div class="container mx-auto px-4 text-center">
		<h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
		<p class="text-xl mb-8 max-w-2xl mx-auto">
			Let's work together to bring your vision to life. Contact us today for a consultation.
		</p>
		<a 
			href="/contact" 
			class="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg"
		>
			Contact Us Now
		</a>
	</div>
</section>

