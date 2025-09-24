<script lang="ts">
	import { resolve } from '$app/paths';

	const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-[var(--border-soft)] bg-[var(--surface-base)] py-12">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid gap-10 text-sm text-[var(--text-muted)] md:grid-cols-3">
			<div class="space-y-3">
				<p class="text-base font-semibold text-[var(--text-dark)]">A.W. Vaughan Company, LLC</p>
				<p class="text-sm text-[var(--text-muted)]">“Jeremiah 29:11”</p>
			</div>
			<nav aria-labelledby="footer-company-heading">
				<h3
					id="footer-company-heading"
					class="text-xs font-semibold tracking-[0.3em] text-[var(--text-dark)] uppercase"
				>
					Company
				</h3>
				<ul class="mt-4 space-y-3">
					<li>
						<a class="transition hover:text-[var(--brand-blue)]" href={resolve('/about')}>
							About Us
						</a>
					</li>
					<li>
						<a class="transition hover:text-[var(--brand-blue)]" href={resolve('/services')}>
							Services
						</a>
					</li>
					<li>
						<a class="transition hover:text-[var(--brand-blue)]" href={resolve('/projects')}>
							Projects
						</a>
					</li>
					<li>
						<a class="transition hover:text-[var(--brand-blue)]" href={resolve('/careers')}>
							Careers
						</a>
					</li>
				</ul>
			</nav>
			<nav aria-labelledby="footer-legal-heading">
				<h3
					id="footer-legal-heading"
					class="text-xs font-semibold tracking-[0.3em] text-[var(--text-dark)] uppercase"
				>
					Legal
				</h3>
				<ul class="mt-4 space-y-3">
					<li>
						<a class="transition hover:text-[var(--brand-blue)]" href={resolve('/privacy-policy')}>
							Privacy Policy
						</a>
					</li>
					<li>
						<a
							class="transition hover:text-[var(--brand-blue)]"
							href={resolve('/terms-of-service')}
						>
							Terms of Service
						</a>
					</li>
				</ul>
			</nav>
		</div>

		<div class="mt-12 border-t border-[var(--border-soft)] pt-6 text-xs text-[var(--text-muted)]">
			<p class="text-center">
				&copy; {currentYear} A.W. Vaughan Company, LLC. All rights reserved.
			</p>
		</div>
	</div>
</footer>
