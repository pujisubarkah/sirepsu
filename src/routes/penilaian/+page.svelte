<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { goto } from '$app/navigation';

	let showForm = false;
	let namaKegiatan = '';
	let tahunKegiatan = '';
	let subunitKerja = '';
	let jenisKegiatan = '';
	let deskripsi = '';
	let linkPendukung = '';

	// Placeholder data - in real app this would come from database
	let kegiatanList = [
		{
			id: 1,
			kegiatan_statistik: 'Survei Kepuasan Masyarakat',
			jenis_kegiatan: 'Survei',
			tahun: '2024',
			sub_unitkerja: 'Tim Survei',
			deskripsi: 'Survei untuk mengukur kepuasan masyarakat terhadap layanan LAN',
			link_pendukung: 'https://example.com/survei'
		},
		{
			id: 2,
			kegiatan_statistik: 'Kompilasi Data Kepegawaian',
			jenis_kegiatan: 'Kompilasi Data',
			tahun: '2024',
			sub_unitkerja: 'Tim Data',
			deskripsi: 'Pengumpulan dan pengolahan data kepegawaian LAN',
			link_pendukung: 'https://example.com/data'
		}
	];

	let totalIndicators = 25;
	let completedIndicators = 18;
	let ipsValue = 3.45;
	let unitKerja = 'Lembaga Administrasi Negara';

	function handleAddKegiatan() {
		if (namaKegiatan && tahunKegiatan && subunitKerja && jenisKegiatan) {
			const newKegiatan = {
				id: Date.now(),
				kegiatan_statistik: namaKegiatan,
				jenis_kegiatan: jenisKegiatan,
				tahun: tahunKegiatan,
				sub_unitkerja: subunitKerja,
				deskripsi: deskripsi,
				link_pendukung: linkPendukung
			};

			kegiatanList = [...kegiatanList, newKegiatan];

			// Reset form
			namaKegiatan = '';
			tahunKegiatan = '';
			subunitKerja = '';
			jenisKegiatan = '';
			deskripsi = '';
			linkPendukung = '';
			showForm = false;
		}
	}

	function handleDeleteKegiatan(id: number) {
		kegiatanList = kegiatanList.filter(kegiatan => kegiatan.id !== id);
	}

	function handleEditKegiatan(kegiatan: any) {
		namaKegiatan = kegiatan.kegiatan_statistik;
		tahunKegiatan = kegiatan.tahun;
		subunitKerja = kegiatan.sub_unitkerja;
		jenisKegiatan = kegiatan.jenis_kegiatan;
		deskripsi = kegiatan.deskripsi || '';
		linkPendukung = kegiatan.link_pendukung || '';
		showForm = true;
	}

	function handleCloseForm() {
		namaKegiatan = '';
		tahunKegiatan = '';
		subunitKerja = '';
		jenisKegiatan = '';
		deskripsi = '';
		linkPendukung = '';
		showForm = false;
	}

	function goToQuestionnaire() {
		// Navigate to the questionnaire page
		goto('/questionnaire');
	}
</script>

<Navbar />

<main class="min-h-screen">
	<!-- Hero Section -->
	<div class="relative bg-cover bg-center text-white p-6 mb-6" style="background-image: url('https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg')">
		<div class="absolute inset-0 bg-[#c2E7F6] opacity-75"></div>
		<div class="relative z-10 text-center">
			<h1 class="text-4xl font-bold text-blue-900">MAKARTIDAS</h1>
			<p class="text-2xl mt-2 text-blue-800">Sistem Informasi Reviu Penyelenggaraan Statistik Sektoral Unit Kerja</p>
			<p class="text-2xl mt-2 text-blue-800">Makarti 5.0 untuk Pembinaan Statistik dan Data Sektoral Internal LAN</p>
		</div>
	</div>

	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 text-blue-900">PENILAIAN MANDIRI</h1>

		<!-- Scrolling Text -->
		<div class="overflow-hidden w-full bg-red-500 text-white p-2 rounded mb-4">
			<div class="whitespace-nowrap animate-pulse">
				Penilaian Mandiri Statistik Sektoral Unit Kerja di Lingkungan Lembaga Administrasi Negara
			</div>
		</div>

		<!-- Completion Status -->
		<div class="p-4 rounded-md text-white mt-4 {completedIndicators === totalIndicators ? 'bg-green-600' : 'bg-[#c2E7F6]'}">
			{completedIndicators === totalIndicators ? 'Terima Kasih telah Mengisi Penilaian Statistik Sektoral' : 'Pengisian belum selesai'}
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
			<!-- Activities Section -->
			<div class="bg-white shadow-md p-4 md:col-span-2">
				<div class="space-y-4">
					<h2 class="text-lg font-semibold mb-4 text-blue-900">Kegiatan Statistik yang dilakukan</h2>

					{#each kegiatanList as kegiatan}
						<div class="border-b py-2 flex items-center justify-between">
							<div>
								<h3 class="font-medium flex items-center text-blue-900">
									{kegiatan.kegiatan_statistik}
									<button
										on:click={() => handleEditKegiatan(kegiatan)}
										class="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-400 ml-2 text-sm"
									>
										Edit
									</button>
									<button
										on:click={() => handleDeleteKegiatan(kegiatan.id)}
										class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-400 ml-2 text-sm"
									>
										Delete
									</button>
								</h3>
								<p class="text-gray-700">{kegiatan.jenis_kegiatan}</p>
								<p class="text-gray-500">
									{kegiatan.tahun} | {unitKerja} | {kegiatan.sub_unitkerja}
								</p>
								{#if kegiatan.deskripsi}
									<p class="text-gray-600 text-sm mt-1">{kegiatan.deskripsi}</p>
								{/if}
								{#if kegiatan.link_pendukung}
									<a href={kegiatan.link_pendukung} target="_blank" rel="noopener noreferrer" class="text-blue-600 text-sm hover:underline">
										Link Pendukung
									</a>
								{/if}
							</div>
						</div>
					{/each}

					<button
						on:click={() => showForm = true}
						class="bg-[#c2E7F6] text-blue-900 px-4 py-2 rounded-md hover:bg-blue-900 hover:text-white transition-colors mt-4"
					>
						Tambah Kegiatan Statistik
					</button>
				</div>
			</div>

			<!-- Progress Section -->
			<div class="bg-[#c2E7F6] text-blue-900 p-4 rounded-md shadow-md md:col-span-1">
				<h2 class="text-lg font-semibold mb-4">PROGRES PENILAIAN MANDIRI</h2>
				<div class="text-4xl font-semibold">{completedIndicators}/{totalIndicators}</div>
				<div>Indikator sudah dilengkapi</div>
				<div class="my-2 w-full bg-blue-200 h-2 rounded">
					<div
						class="bg-blue-900 h-full rounded transition-all duration-300"
						style="width: {totalIndicators > 0 ? `${(completedIndicators / totalIndicators) * 100}%` : '0%'}"
					></div>
				</div>
				<div class="text-sm">{Math.round((completedIndicators / totalIndicators) * 100)}% Completed</div>
			</div>
		</div>

		<!-- IPS Section -->
		<div class="bg-gray-300 p-4 rounded-md text-black font-bold mt-4 flex justify-between items-center">
			<span>Nilai Indeks Pembangunan Statistik (IPS) Unit Kerja: {ipsValue}</span>
			<button on:click={goToQuestionnaire} class="bg-[#c2E7F6] text-blue-900 px-10 py-2 rounded-md hover:bg-blue-900 hover:text-white transition-colors">
				Lihat Isian
			</button>
		</div>

		<!-- Components Section -->
		<div class="flex flex-col md:flex-row gap-4 mt-4">
			<div class="w-full md:w-3/4">
				<!-- KegiatanStatistik component removed due to SSR issues -->
				<div class="bg-white border border-[#c2E7F6] rounded-lg p-6 shadow-md">
					<h3 class="text-lg font-semibold text-blue-900 mb-6 text-center">ANALISIS KEGIATAN STATISTIK</h3>
					<p class="text-gray-500">Chart akan ditampilkan di sini (ApexCharts tidak kompatibel dengan SSR)</p>
				</div>
			</div>
			<div class="w-full md:w-1/4">
				<!-- Radar component removed due to SSR issues -->
				<div class="bg-white border border-[#c2E7F6] rounded-lg p-6 shadow-md">
					<h3 class="text-lg font-semibold text-blue-900 mb-4 text-center">RADAR CAPAIAN EPSS</h3>
					<p class="text-gray-500">Chart akan ditampilkan di sini (ApexCharts tidak kompatibel dengan SSR)</p>
				</div>
			</div>
		</div>
	</div>
</main>

<!-- Modal Form -->
{#if showForm}
	<div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
		<div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
			<h2 class="text-lg font-semibold mb-4 text-blue-900">Tambah Kegiatan Statistik</h2>
			<form on:submit|preventDefault={handleAddKegiatan}>
				<div class="mb-4">
					<label for="namaKegiatan" class="block text-gray-700 text-sm font-bold mb-2">
						Nama Kegiatan
					</label>
					<input
						type="text"
						id="namaKegiatan"
						bind:value={namaKegiatan}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div class="mb-4">
					<label for="tahunKegiatan" class="block text-gray-700 text-sm font-bold mb-2">
						Tahun Kegiatan
					</label>
					<input
						type="text"
						id="tahunKegiatan"
						bind:value={tahunKegiatan}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div class="mb-4">
					<label for="subunitKerja" class="block text-gray-700 text-sm font-bold mb-2">
						Tim Kerja/Poksi
					</label>
					<input
						type="text"
						id="subunitKerja"
						bind:value={subunitKerja}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>

				<div class="mb-4">
					<label for="jenisKegiatan" class="block text-gray-700 text-sm font-bold mb-2">
						Jenis Kegiatan
					</label>
					<select
						id="jenisKegiatan"
						bind:value={jenisKegiatan}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					>
						<option value="">Pilih Jenis Kegiatan</option>
						<option value="Kompilasi Data">Kompilasi Data</option>
						<option value="Survei">Survei</option>
					</select>
				</div>

				<div class="mb-4">
					<label for="deskripsi" class="block text-gray-700 text-sm font-bold mb-2">
						Deskripsi
					</label>
					<textarea
						id="deskripsi"
						bind:value={deskripsi}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						rows="3"
						placeholder="Deskripsi kegiatan statistik..."
					></textarea>
				</div>

				<div class="mb-4">
					<label for="linkPendukung" class="block text-gray-700 text-sm font-bold mb-2">
						Link Pendukung
					</label>
					<input
						type="url"
						id="linkPendukung"
						bind:value={linkPendukung}
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="https://example.com"
					/>
				</div>

				<div class="flex items-center justify-between">
					<button
						type="submit"
						class="bg-[#c2E7F6] text-blue-900 px-4 py-2 rounded-md hover:bg-blue-900 hover:text-white transition-colors"
					>
						Tambah
					</button>
					<button
						type="button"
						on:click={handleCloseForm}
						class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
					>
						Batal
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<Footer />