<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
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

	<!-- EPSS Evaluation Section -->
	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 text-blue-900">EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL LAN</h1>
		<p class="mb-4 text-gray-700">
			Kegiatan ini merupakan salah satu bentuk Penguatan tata kelola data pemerintah untuk menghasilkan data yang akurat, mutakhir, terpadu, dapat dipertanggungjawabkan, mudah diakses dan dibagi-pakaikan antar Instansi Pemerintah, selain itu Penguatan Sistem Statistik Nasional (SSN) melalui penyelenggaraan statistik dasar, statistik sektoral, dan statistik khusus untuk menghasilkan data statistik berkualitas serta Pencapaian sasaran RB Nasional "Birokrasi yang bersih dan akuntabel" melalui pembangunan data pemerintah untuk digunakan dalam penyusunan kebijakan berbasis data/fakta.
		</p>
		<p class="mb-4 text-gray-700">
			Tujuan dari Evaluasi Penyelenggaran Statistik Sektoral LAN adalah Mengukur capaian kinerja penyelenggaraan Satu Data LAN dan data statistik sektoral pada unit kerja di Lingkungan LAN, mendapatkan satu ukuran terpenuhinya prasyarat penyelenggaraan Satu Data dan statistik serta digunakan untuk menyusun strategi pembinaan data oleh Walidata pada unit kerja di lingkungan LAN.
		</p>
	</div>

	<!-- IPS LANRI Section -->
	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 text-blue-900">INDEKS PEMBANGUNAN STATISTIK LANRI</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
			<div class="border border-[#c2E7F6] p-4 rounded-lg text-center">
				<iframe src="https://drive.google.com/file/d/16Tf1IhyLZWk2GiXx89eFQC17_-nzvyyk/preview" width="100%" height="480" allow="autoplay" class="w-full rounded" title="Preview IPS LANRI 2023"></iframe>
				<p class="mt-4 text-center">IPS LANRI 2023: 2.22, Kategori: <span class="font-semibold">CUKUP</span></p>
				<a href="https://drive.google.com/uc?export=download&id=16Tf1IhyLZWk2GiXx89eFQC17_-nzvyyk" class="mt-2 inline-block bg-[#c2E7F6] text-blue-900 text-center py-2 px-4 rounded hover:bg-blue-900 hover:text-white transition-colors">Unduh EPSS LAN 2023</a>
			</div>
			<div class="border border-[#c2E7F6] p-4 rounded-lg text-center">
				<iframe src="https://drive.google.com/file/d/1g3MbdEEPtLP7pUeX9SCuNLv8GGXv8Bb1/preview" width="100%" height="480" allow="autoplay" class="w-full rounded" title="Preview IPS LANRI 2024"></iframe>
				<p class="mt-4 text-center">IPS LANRI 2024: 3.35, Kategori: <span class="font-semibold">BAIK</span></p>
				<a href="https://drive.google.com/uc?export=download&id=1g3MbdEEPtLP7pUeX9SCuNLv8GGXv8Bb1" class="mt-2 inline-block bg-[#c2E7F6] text-blue-900 text-center py-2 px-4 rounded hover:bg-blue-900 hover:text-white transition-colors">Unduh EPSS LAN 2024</a>
			</div>
		</div>
		<Carousel />
	</div>
</main>

<Footer />