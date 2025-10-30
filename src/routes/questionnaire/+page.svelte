<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Quill from 'svelte-quill';

	// Placeholder for rich text editor - will install later
	let content = '';
	let selectedLevel: number | null = null;
	interface Level {
		id: number;
		level_nama: string;
		level_penjelasan: string;
	}
	let levels: Level[] = [];
	let currentPage = 1;
	const TOTAL_PAGES = 15;
	const QUESTION_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	interface Question {
		id: number;
		indikator_nama: string;
		indikator_deskripsi: string;
	}
	let currentQuestion: Question | null = null;
	let unitKerja = '';
	let fileUrl = '';
	let isModalOpen = false;
	let isSidebarOpen = false;
	let summaryContent = '';

	// Placeholder for Supabase - assuming it's set up
	// import { supabase } from '$lib/supabaseClient';

	onMount(async () => {
		// Fetch unit kerja
		// const { data: { user } } = await supabase.auth.getUser();
		// ... fetch logic

		// Fetch levels
		// const { data: levelData } = await supabase.schema('simbatik').from('level').select('*');
		// setLevels(levelData || []);

		// For now, use placeholder data
		levels = [
			{ id: 1, level_nama: 'Level 1', level_penjelasan: 'Penjelasan level 1' },
			{ id: 2, level_nama: 'Level 2', level_penjelasan: 'Penjelasan level 2' },
			{ id: 3, level_nama: 'Level 3', level_penjelasan: 'Penjelasan level 3' }
		];
		unitKerja = 'Unit Kerja Contoh';
	});

	// Fetch question based on currentPage
	$: if (currentPage) {
		// const questionId = QUESTION_IDS[currentPage - 1];
		// const { data: questionData } = await supabase.schema('simbatik').from('indikator').select('*').eq('id', questionId).single();
		// currentQuestion = questionData;

		// Placeholder
		currentQuestion = {
			id: QUESTION_IDS[currentPage - 1],
			indikator_nama: `Indikator ${QUESTION_IDS[currentPage - 1]}`,
			indikator_deskripsi: `Deskripsi indikator ${QUESTION_IDS[currentPage - 1]}`
		};
	}

	function handleMenuClick(pageId: number) {
		currentPage = pageId;
	}

	function handleLevelClick(levelId: number) {
		selectedLevel = levelId;
		// insertOrUpdateData(levelId, content, fileUrl);
	}

	function handleContentChange(value: string) {
		content = value;
		// insertOrUpdateData(selectedLevel, content, fileUrl);
	}

	function handleFileUrl(value: string) {
		fileUrl = value;
		// insertOrUpdateData(selectedLevel, content, value);
	}

	function handleLightbulbClick() {
		if (currentQuestion) {
			summaryContent = `Indikator: ${currentQuestion.indikator_nama}\nDeskripsi: ${currentQuestion.indikator_deskripsi}`;
			isModalOpen = true;
		}
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
			<button disabled={currentPage === 1} on:click={() => currentPage--} class="px-4 py-2 bg-teal-600 text-white rounded {currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" aria-label="Previous page">
				<i class="fa fa-chevron-left"></i>
			</button>
			<button disabled={currentPage === TOTAL_PAGES} on:click={() => currentPage++} class="px-4 py-2 bg-teal-600 text-white rounded ml-2 {currentPage === TOTAL_PAGES ? 'opacity-50 cursor-not-allowed' : ''}" aria-label="Next page">
				<i class="fa fa-chevron-right"></i>
			</button>
		</div>
	</div>

	<div class="border-t border-gray-300 pt-4 mb-6">
		{#if currentQuestion}
			<div class="flex items-center">
				<h2 class="text-lg font-semibold mb-2">Indikator {currentQuestion.indikator_nama}</h2>
				<button on:click={handleLightbulbClick} class="ml-2 text-yellow-500" aria-label="Informasi tentang indikator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-8 h-8"
						fill="currentColor"
						viewBox="0 0 24 24">
						<path d="M9 21h6v-1H9v1zm3-19C7.48 2 4 5.48 4 10c0 2.53 1.4 4.78 3.5 6v3.5c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5V16c2.1-1.22 3.5-3.47 3.5-6 0-4.52-3.48-8-7.5-8zM12 4c3.31 0 6 2.69 6 6 0 1.73-.75 3.29-2.05 4.36l-.45.38v3.76h-7v-3.76l-.45-.38C6.75 13.29 6 11.73 6 10c0-3.31 2.69-6 6-6z"/>
					</svg>
				</button>
			</div>
			<p class="text-gray-600 mb-4">{currentQuestion.indikator_deskripsi}</p>
		{/if}
	</div>

	<!-- Levels Section -->
	<div class="space-y-2 border rounded mb-4 p-4">
		{#each levels as level}
			<button
				on:click={() => handleLevelClick(level.id)}
				class="p-4 border rounded-lg cursor-pointer transition {selectedLevel === level.id ? 'bg-teal-600 text-white' : 'bg-white hover:bg-teal-600 hover:text-white'}"
				aria-label="Pilih level {level.level_nama}">
				<h3 class="font-semibold">{level.level_nama}</h3>
				<p class="text-gray-600">{level.level_penjelasan}</p>
			</button>
		{/each}
	</div>

	<!-- Rich Text Editor -->
	<div class="border rounded mb-4 p-4" style="height: 300px;">
		<h3 class="font-semibold">Penjelasan Bukti Dukung</h3>
		<Quill bind:value={content} on:text-change={(e: any) => handleContentChange(e.detail)} />
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

<!-- Modal -->
{#if isModalOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<div class="bg-white rounded-lg p-4 shadow-lg max-w-lg w-full">
			<button on:click={() => isModalOpen = false} class="text-red-500 float-right">&times;</button>
			<div class="mt-4">
				<h2 class="text-lg font-semibold mb-2">Informasi Indikator</h2>
				<pre class="whitespace-pre-wrap">{summaryContent}</pre>
			</div>
		</div>
	</div>
{/if}

<!-- Sidebar Placeholder -->
{#if isSidebarOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex">
		<div class="bg-white w-64 h-full p-4">
			<button on:click={toggleSidebar} class="text-red-500 float-right">&times;</button>
			<h3 class="font-semibold mb-4">Ringkasan</h3>
			<!-- Add sidebar content -->
			{#each QUESTION_IDS as id}
				<button on:click={() => handleMenuClick(id)} class="block w-full text-left p-2 hover:bg-gray-200 {currentPage === id ? 'bg-teal-600 text-white' : ''}">
					Indikator {id}
				</button>
			{/each}
		</div>
	</div>
{/if}

<Footer />