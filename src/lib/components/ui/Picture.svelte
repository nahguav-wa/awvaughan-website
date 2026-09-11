<!--
	Picture Component
	Responsive photograph with an AVIF source and a JPEG fallback.

	Consumes the derivatives produced by scripts/optimize-images.mjs, which emits
	`<name>.{avif,jpg}` at the source width and `<name>-480.{avif,jpg}` for
	phones. AVIF is offered first because it measured 27% smaller than mozjpeg on
	these photographs; WebP measured larger than the JPEG fallback and is not
	generated.
-->
<script lang="ts">
	interface Props {
		/** Basename under /images, e.g. 'hero-image'. */
		name: string;
		/** Alt text. Pass an empty string for a purely decorative image. */
		alt: string;
		/** Intrinsic width of the source, so the browser reserves the right box. */
		width: number;
		/** Intrinsic height of the source. */
		height: number;
		/** Additional classes for the img element. */
		class?: string;
		/** Layout hint for srcset selection. */
		sizes?: string;
		/**
		 * Set for the largest above-the-fold image on the page. Loads eagerly at
		 * high priority instead of lazily — this is the LCP element.
		 */
		priority?: boolean;
	}

	let {
		name,
		alt,
		width,
		height,
		class: className = '',
		sizes = '100vw',
		priority = false
	}: Props = $props();

	const avifSrcset = $derived(`/images/${name}-480.avif 480w, /images/${name}.avif ${width}w`);
	const jpegSrcset = $derived(`/images/${name}-480.jpg 480w, /images/${name}.jpg ${width}w`);
</script>

<picture>
	<source type="image/avif" srcset={avifSrcset} {sizes} />
	<img
		src="/images/{name}.jpg"
		srcset={jpegSrcset}
		{sizes}
		{alt}
		{width}
		{height}
		class={className}
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : 'auto'}
		decoding="async"
	/>
</picture>
