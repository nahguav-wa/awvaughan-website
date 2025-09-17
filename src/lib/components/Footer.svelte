<script lang="ts">
	import { resolve } from '$app/paths';

	const currentYear = new Date().getFullYear();
	const email = 'alex.vaughan@awvaughan.com';
	const phoneLabel = '(757) 402-1100';
</script>

<footer class="border-t border-white/10 bg-[var(--brand-navy-900)] py-10">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-sm text-slate-200 lg:flex-row lg:items-start lg:justify-between"
	>
		<div class="space-y-3 text-center lg:text-left">
			<p
				class="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-[var(--brand-teal)] uppercase"
			>
				<span aria-hidden="true" class="inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]"
				></span>
				Serving Hampton Roads
			</p>
			<p class="text-sm text-slate-200">
				&copy; {currentYear} AW Vaughan Company LLC. Jeremiah 29:11
			</p>
		</div>

		<nav
			aria-label="Footer navigation"
			class="flex flex-wrap items-center justify-center gap-4 text-[0.7rem] font-semibold tracking-[0.28em] text-slate-300 uppercase lg:justify-end lg:text-xs"
		>
			<a class="transition hover:text-[var(--brand-orange)]" href={resolve('/about')}>About</a>
			<a class="transition hover:text-[var(--brand-orange)]" href={resolve('/services')}>Services</a
			>
			<a class="transition hover:text-[var(--brand-orange)]" href={resolve('/contact')}>Contact</a>
		</nav>

		<address
			class="flex flex-col items-center gap-3 text-center text-sm text-slate-200 not-italic lg:items-end lg:text-right"
		>
			<a class="transition hover:text-[var(--brand-orange)]" href={`mailto:${email}`}>{email}</a>
			<a class="transition hover:text-[var(--brand-orange)]" href="tel:+17574021100">{phoneLabel}</a
			>
			<span class="text-xs tracking-[0.35em] text-slate-400 uppercase">Virginia Beach, VA</span>
		</address>
	</div>
</footer>
