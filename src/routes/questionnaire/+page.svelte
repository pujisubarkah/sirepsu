<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Placeholder for rich text editor - load client-only
	let content = '';
	let Quill: any = null;
	let indicators: any[] = [];
	let loadingIndicators = true;
	let indicatorsError: string | null = null;
	let selectedLevel: string | null = null;

	interface Level {
		id: string;
		levelNama: string;
		levelSkor: number;
		levelPenjelasan: string;
	}
	let levels: Level[] = [];

	let currentPage = 1;
	let TOTAL_PAGES = 0;
	let QUESTION_IDS: Array<string | number> = [];

	interface Question {
		id: number;
		domainNama: string;
		indikatorNama: string;
		indikatorPenjelasan: string;
	}
	let currentQuestion: Question | null = null;

	let unitKerja = '';
	let fileUrl = '';
	let isSidebarOpen = false;

	// Placeholder for Supabase - assuming it's set up
	// import { supabase } from '$lib/supabaseClient';

	// Recompute pagination when indicators change - REMOVED, now set directly in fetch
	// $: {
	//     TOTAL_PAGES = indicators.length;
	//     QUESTION_IDS = indicators.map((i) => i.id);
	//     console.log('Pagination updated - TOTAL_PAGES:', TOTAL_PAGES, 'QUESTION_IDS:', QUESTION_IDS);
	// }

	// Update currentQuestion when currentPage changes
	$: if (currentPage) {
		console.log('currentPage changed to:', currentPage);
		updateCurrentQuestion();
	}

	onMount(async () => {
		// Fetch unit kerja (placeholder for now)
		unitKerja = 'Unit Kerja Contoh';

		// Fetch levels from API
		if (browser) {
			try {
				const levelRes = await fetch('/api/level');
				if (!levelRes.ok) throw new Error(`Level fetch failed: ${levelRes.status}`);
				const levelData = await levelRes.json();
				levels = Array.isArray(levelData) ? levelData : [];
				console.log('Levels loaded:', levels.length);
			} catch (err: any) {
				console.error('Failed to load levels', err);
			}
		}

		// Load indikator list from API
		if (browser) {
			try {
				const res = await fetch('/api/indikator');
				if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
				const data = await res.json();
				// Expect an array of indikator objects
				indicators = Array.isArray(data) ? data : [];
				// Set pagination after indicators are loaded
				TOTAL_PAGES = indicators.length;
				QUESTION_IDS = indicators.map((i) => i.id);
				if (indicators.length > 0) {
					currentPage = 1;
					updateCurrentQuestion();
				}
				console.log('Indicators loaded:', indicators.length, 'TOTAL_PAGES set to:', TOTAL_PAGES, 'QUESTION_IDS:', QUESTION_IDS);
				console.log('First 3 indicators:', indicators.slice(0, 3));
				console.log('Sample indicator fields:', indicators[0] ? Object.keys(indicators[0]) : 'No indicators');
				// Update current question after loading
				updateCurrentQuestion();
			} catch (err: any) {
				console.error('Failed to load indikator list', err);
				indicatorsError = String(err?.message || err);
			} finally {
				loadingIndicators = false;
			}
		}

		// Load the Quill editor only on the client to avoid SSR errors
		if (browser) {
			try {
				const mod = await import('svelte-quill');
				Quill = mod.default || mod;
			} catch (err) {
				console.warn('Failed to load svelte-quill on client:', err);
			}
		}
	});

	function handleMenuClick(pageId: number | string) {
		currentPage = Number(pageId);
		updateCurrentQuestion();
	}

	function handleLevelClick(levelId: string) {
		selectedLevel = levelId;
		// insertOrUpdateData(levelId, content, fileUrl);
	}

	function updateCurrentQuestion() {
		console.log('updateCurrentQuestion called, currentPage:', currentPage, 'indicators.length:', indicators.length, 'loadingIndicators:', loadingIndicators);
		if (loadingIndicators) {
			console.log('Still loading indicators, skipping update');
			return;
		}
		if (currentPage && indicators.length > 0) {
			const item = indicators[currentPage - 1];
			console.log('Setting currentQuestion for page', currentPage, 'indicators.length:', indicators.length, 'item exists:', !!item);
			if (item) {
				console.log('Setting currentQuestion to:', item.indikatorNama || item.indikator_nama);
				currentQuestion = {
					id: item.id,
					domainNama: item.domainNama ?? item.domain_nama ?? '',
					indikatorNama: item.indikatorNama ?? item.indikator_nama ?? item.indikatorNamaIndonesia ?? '',
					indikatorPenjelasan: item.indikatorPenjelasan ?? item.indikator_penjelasan ?? item.indikatorPenjelasan ?? ''
				} as Question;
				console.log('currentQuestion set to:', currentQuestion.indikatorNama);
			} else {
				console.log('No item found for page', currentPage, 'available pages:', indicators.length);
			}
		} else {
			console.log('Cannot update currentQuestion: currentPage =', currentPage, 'indicators.length =', indicators.length);
		}
	}

	function handleContentChange(value: string) {
		content = value;
		// insertOrUpdateData(selectedLevel, content, fileUrl);
	}

	function handleFileUrl(value: string) {
		fileUrl = value;
		// insertOrUpdateData(selectedLevel, content, value);
	}

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
</script>

<Navbar />

<main class="p-6 max-w-4xl mx-auto rounded-lg">
	<h1 class="text-xl font-bold mb-4">PENILAIAN MANDIRI</h1>
	<p class="text-gray-600 mb-6">Penilaian Mandiri Unit Kerja {unitKerja}</p>

	<div class="flex justify-between items-center mb-6">
		<div>
			<button on:click={toggleSidebar} class="bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded mr-2">
				<i class="fa fa-ellipsis-v"></i> RINGKASAN
			</button>
		</div>

		<!-- Pagination Controls -->
		<div class="flex">
			<button disabled={currentPage === 1} on:click={() => { console.log('Previous clicked, currentPage:', currentPage, 'TOTAL_PAGES:', TOTAL_PAGES); currentPage = Math.max(1, currentPage - 1); updateCurrentQuestion(); }} class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors {currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" aria-label="Previous page">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
			</button>
			<span class="mx-4 text-sm text-gray-600">Page {currentPage} of {TOTAL_PAGES}</span>
			<button disabled={currentPage === TOTAL_PAGES || TOTAL_PAGES === 0} on:click={() => { console.log('Next clicked, currentPage:', currentPage, 'TOTAL_PAGES:', TOTAL_PAGES); currentPage = Math.min(TOTAL_PAGES, currentPage + 1); updateCurrentQuestion(); }} class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors ml-2 {currentPage === TOTAL_PAGES || TOTAL_PAGES === 0 ? 'opacity-50 cursor-not-allowed' : ''}" aria-label="Next page">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>
	</div>

	<div class="border-t border-gray-300 pt-4 mb-6">
		{#if loadingIndicators}
			<div class="p-4">Memuat indikator...</div>
		{:else if indicatorsError}
			<div class="p-4 text-red-600">Gagal memuat indikator: {indicatorsError}</div>
		{:else if currentQuestion}
			<div class="mb-4">
				<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Domain</h3>
				<p class="text-lg font-semibold text-gray-900 mb-2">{currentQuestion.domainNama}</p>
			</div>
			<div class="mb-4">
				<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Indikator</h3>
				<p class="text-lg font-semibold text-gray-900 mb-2">{currentQuestion.indikatorNama}</p>
			</div>
			<div class="mb-4">
				<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Penjelasan</h3>
				<p class="text-gray-700 leading-relaxed">{currentQuestion.indikatorPenjelasan}</p>
			</div>
		{/if}
	</div>

	<!-- Levels Section -->
	<div class="space-y-3 border rounded mb-4 p-4">
		<h3 class="font-semibold mb-3">Pilih Level Penilaian</h3>
		{#each levels as level}
			<label
				class="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors {selectedLevel === level.id ? 'bg-teal-50 border-teal-300' : 'border-gray-200'}"
			>
				<input
					type="radio"
					name="level"
					value={level.id}
					bind:group={selectedLevel}
					class="mt-1 text-teal-600 focus:ring-teal-500"
					on:change={() => handleLevelClick(level.id)}
				/>
				<div class="flex-1">
					<h4 class="font-medium text-gray-900">{level.levelNama}</h4>
					<p class="text-sm text-gray-600 mt-1">{level.levelPenjelasan}</p>
				</div>
			</label>
		{/each}
	</div>

	<!-- Rich Text Editor -->
	<div class="border rounded mb-4 p-4" style="height: 300px;">
		<h3 class="font-semibold">Penjelasan Bukti Dukung</h3>
		{#if Quill}
			<svelte:component this={Quill} bind:value={content} on:text-change={(e: any) => handleContentChange(e.detail)} />
		{:else}
			<div class="text-gray-500">Editor sedang dimuat...</div>
		{/if}
	</div>

	<!-- File Uploader -->
	<div class="border rounded mb-4 p-4">
		<h3 class="font-semibold">Link Bukti Dukung</h3>
		<p class="text-gray-600">Input link file yang mendukung penilaian Anda yang telah diunggah pada <a class="text-teal-700" href="https://drive.google.com/drive/folders/1SjE5izKM6QQsax9tIL6QhaiM-oEM8O9Q?usp=drive_link" target="_blank">Folder Google Drive Bukti Dukung</a></p>
		<input
			type="text"
			class="border rounded w-full p-2 mt-2"
			placeholder="Masukkan link file"
			bind:value={fileUrl}
		/>
		{#if fileUrl}
			<a href={fileUrl} target="_blank" rel="noreferrer" class="text-teal-700 hover:underline"><b>Lihat File</b></a>
		{/if}
	</div>
</main>

<Footer />