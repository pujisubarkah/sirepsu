<script lang="ts">
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<nav class="flex justify-between items-center p-4 bg-linear-to-r from-blue-900 to-blue-800 shadow-lg border-b-2 border-blue-700">
	<div class="flex items-center">
		<span class="text-white font-bold text-2xl">PEMBINAAN STATISTIK SEKTORAL LANRI</span>
	</div>

	<!-- Desktop Menu -->
	<ul class="hidden md:flex gap-6 list-none font-open-sans text-lg text-white">
		<li>
			<a href="/" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded">
				Beranda
			</a>
		</li>
		<li>
			<a href="/epss" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded">
				EPSS LAN
			</a>
		</li>
		<li>
			<a href="/penilaian" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded">
				Penilaian
			</a>
		</li>
	</ul>

	<!-- Mobile Menu Button -->
	<div class="md:hidden">
		<button
			onclick={toggleMenu}
			class="text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:text-blue-200 focus:bg-blue-700 transition p-2 rounded"
			aria-label="Toggle menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if isOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				{/if}
			</svg>
		</button>
	</div>
</nav>

<!-- Mobile Menu -->
{#if isOpen}
	<div class="md:hidden bg-linear-to-r from-blue-900 to-blue-800 shadow-lg border-b-2 border-blue-700">
		<div class="flex flex-col px-4 py-2">
			<a href="/" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded" onclick={toggleMenu}>
				Beranda
			</a>
			<a href="/epss" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded" onclick={toggleMenu}>
				EPSS LAN
			</a>
			<a href="/penilaian" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded" onclick={toggleMenu}>
				Penilaian
			</a>
		</div>
	</div>
{/if}