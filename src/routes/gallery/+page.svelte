<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let images: string[] = [];
  let active: number | null = null;

  // generate sample images (picsum) for the gallery
  onMount(() => {
    const seeds = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
    images = seeds.map((s) => `https://picsum.photos/seed/${s}/1200/800`);
  });

  function open(i: number) {
    active = i;
  }
  function close() {
    active = null;
  }
  function prev() {
    if (active === null) return;
    active = (active - 1 + images.length) % images.length;
  }
  function next() {
    if (active === null) return;
    active = (active + 1) % images.length;
  }

  // keyboard handlers for lightbox
  const onKey = (e: KeyboardEvent) => {
    if (active === null) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  onMount(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

<svelte:head>
  <title>Gallery — MAKARTIDAS</title>
</svelte:head>

<Navbar />

<main class="container mx-auto px-4 py-8">
  <h1 class="text-2xl font-semibold mb-4">Gallery</h1>
  <p class="text-sm text-gray-600 mb-6">Kumpulan gambar contoh. Klik gambar untuk memperbesar.</p>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {#each images as img, i}
      <button class="group relative block overflow-hidden rounded-lg bg-gray-100 shadow-sm focus:outline-none" on:click={() => open(i)} aria-label={`Open image ${i + 1}`}>
        <img src={`${img.replace('/1200/800','/600/400')}`} alt={`image-${i + 1}`} class="w-full h-44 object-cover transform group-hover:scale-105 transition duration-300" />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
      </button>
    {/each}
  </div>
</main>

<Footer />

{#if active !== null}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    on:click={close}
    on:keydown={(e) => { if (e.key === 'Escape') close(); }}
    style="padding:0; border:none; margin:0;"
    aria-label="Close lightbox"
  >
    <div
      class="relative max-w-4xl max-h-[90vh] w-full mx-4"
      role="document"
      on:click|stopPropagation
    >
      <button
        class="absolute top-2 right-2 text-white bg-black/40 p-2 rounded-full hover:bg-black/60"
        on:click={close}
        aria-label="Close"
        on:keydown={(e) => { if (e.key === 'Escape') close(); }}
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <img src={images[active]} alt={`full-${active + 1}`} class="w-full h-auto rounded-lg shadow-lg" />

      <button class="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50" on:click={prev} aria-label="Previous">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>

      <button class="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50" on:click={next} aria-label="Next">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  </div>
{/if}

<style>
  /* small fade-in for images */
  @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
  img { animation: fade-in 160ms ease-in; }
</style>
