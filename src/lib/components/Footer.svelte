<script lang="ts">
	import { resolve } from '$app/paths';

	const currentYear = new Date().getFullYear();
	const email = 'alex.vaughan@awvaughan.com';
	const phoneLabel = '(757) 402-1100';
</script>

<footer class="border-t border-white/5 bg-slate-950 py-10">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-300 sm:flex-row sm:items-start sm:justify-between"
	>
		<div class="text-center sm:text-left">
			<p class="text-sm font-semibold text-white">Serving Virginia Beach, Virginia</p>
			<p class="mt-2 text-sm text-slate-400">
				&copy; {currentYear} AW Vaughan Company LLC. Jeremiah 29:11
			</p>
		</div>

		<div class="flex flex-col items-center gap-4 text-center sm:items-end sm:text-right">
			<nav
				class="flex flex-wrap items-center justify-center gap-4 text-[0.7rem] tracking-[0.25em] text-slate-400 uppercase sm:justify-end sm:text-xs md:text-sm"
			>
				<a class="transition hover:text-cyan-300" href={resolve('/about')}>About</a>
				<a class="transition hover:text-cyan-300" href={resolve('/services')}>Services</a>
				<a class="transition hover:text-cyan-300" href={resolve('/contact')}>Contact</a>
			</nav>
			<div class="flex flex-wrap items-center justify-center gap-4 text-slate-300 sm:justify-end">
				<a class="transition hover:text-cyan-300" href="mailto:alex.vaughan@awvaughan.com"
					>{email}</a
				>
				<span class="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true"></span>
				<a class="transition hover:text-cyan-300" href="tel:+17574021100">{phoneLabel}</a>
			</div>
		</div>
	</div>
</footer>
