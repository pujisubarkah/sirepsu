<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let activeTab = 'Rintisan';

	function renderContent() {
		switch (activeTab) {
			case 'Rintisan':
				return 'Proses penyelenggaraan Statistik Sektoral belum dilakukan oleh seluruh unit kerja.';
			case 'Terkelola':
				return 'Proses penyelenggaraan Statistik Sektoral telah dilakukan oleh seluruh unit kerja, namun masih menggunakan standar yang hanya berlaku di unit kerja itu sendiri. Jika standar yang digunakan juga diterapkan pada sebagian unit kerja lain dalam satu organisasi yang sama, maka masih berada di level ini.';
			case 'Terdefinisi':
				return 'Proses penyelenggaraan Statistik Sektoral telah diharmonisasi dan kemudian ditetapkan sebuah standar/pedoman oleh unit yang melaksanakan fungsi manajemen dan berlaku untuk seluruh unit kerja dalam organisasi.';
			case 'Terpadu dan Terukur':
				return 'Proses penyelenggaraan Statistik Sektoral telah dilakukan secara terpadu dan telah berkontribusi pada kinerja organisasi. Kinerja penyelenggaraan Statistik Sektoral dapat diukur melalui kegiatan reviu dan evaluasi pada setiap proses.';
			case 'Optimum':
				return 'Proses penyelenggaraan Statistik Sektoral telah dilakukan peningkatan kualitas secara berkesinambungan berdasarkan hasil reviu dan evaluasi.';
			default:
				return '';
		}
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

	<!-- EPSS Introduction -->
	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 text-blue-900">MENGENAL EPSS</h1>
		<p class="mb-4 text-gray-700">
			Badan Pusat Statistik (BPS) sebagai lembaga statistik nasional menjadi salah satu instansi penghasil data dan informasi statistik di Indonesia, berkomitmen untuk menyediakan statistik yang berkualitas. Di sisi lain BPS terus berupaya mewujudkan dan mengembangkan Sistem Statistik Nasional (SSN) berupa optimalisasi sumber daya dalam penyelenggaraan statistik agar tercipta SSN yang andal, efektif dan efisien. BPS harus meningkatkan perannya dalam aspek koordinasi, integrasi, sinkronisasi dan standardisasi (KISS) dengan seluruh penyelenggara kegiatan statistik, serta perannya sebagai Pembina dalam penyelenggaraan statistik sektoral.
		</p>
		<p class="mb-4 text-gray-700">
			Di Indonesia, institusi dan lembaga penghasil data atau informasi statistik bukan hanya BPS. Unit kerja pemerintahan seperti Kementerian, Lembaga Non Kementerian, Instansi Daerah juga bertanggung jawab terhadap tersedianya statistik sektoral berupa data dan informasi statistik yang berkualitas. Dalam posisinya sebagai Pembina statistik, BPS perlu mengetahui seberapa besar capaian pembangunan dalam bidang perstatistikan nasional seperti diamanatkan dalam UU No 16 Tahun 1997 tentang Statistik dan Perpres 39/2019 tentang Satu Data Indonesia.
		</p>
		<div class="bg-yellow-100 p-4 mb-4 border-l-4 border-yellow-400">
			<p class="text-lg font-bold text-orange-600">
				Indeks Pembangunan Statistik (IPS) menggambarkan tingkat kematangan (maturity level) dari pelaksanaan penyelenggaraan statistik sektoral di Instansi Pemerintah Pusat dan Pemerintah Daerah.
			</p>
		</div>
		<p class="text-gray-700">
			Pemantauan dan Evaluasi Penyelenggaraan Statistik Sektoral merupakan proses penilaian terhadap pelaksanaan penyelenggaraan statistik sektoral di Instansi Pemerintah Pusat dan Pemerintah Daerah untuk menghasilkan suatu nilai Indeks Pembangunan Statistik (IPS) yang menggambarkan tingkat kematangan (maturity level) dari pelaksanaan penyelenggaraan statistik sektoral di Instansi Pemerintah Pusat dan Pemerintah Daerah.
		</p>
	</div>

	<!-- Goals Section -->
	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 text-blue-900">TUJUAN EPSS</h1>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
			<div class="border border-[#c2E7F6] p-4 rounded-lg hover:shadow-lg transition-shadow">
				<p class="text-blue-900 font-bold">Mengukur capaian kemajuan</p>
				<p class="text-gray-700">penyelenggaraan Statistik Sektoral pada Instansi Pusat dan Pemerintahan Daerah</p>
			</div>
			<div class="border border-[#c2E7F6] p-4 rounded-lg hover:shadow-lg transition-shadow">
				<p class="text-blue-900 font-bold">Meningkatkan kualitas penyelenggaraan Statistik Sektoral</p>
				<p class="text-gray-700">pada Instansi Pusat dan Pemerintahan Daerah</p>
			</div>
			<div class="border border-[#c2E7F6] p-4 rounded-lg hover:shadow-lg transition-shadow">
				<p class="text-blue-900 font-bold">Meningkatkan kualitas pelayanan publik</p>
				<p class="text-gray-700">di bidang statistik pada Instansi Pusat dan Pemerintahan Daerah</p>
			</div>
		</div>

		<h2 class="text-xl font-bold mb-4 text-blue-900">Peraturan Terkait</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
			<div>
				<p class="text-blue-900 font-bold mb-2">PERATURAN BADAN PUSAT STATISTIK NOMOR 3 TAHUN 2022 TENTANG EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL (EPSS)</p>
				<p class="text-gray-700">
					Peraturan Badan Pusat Statistik Nomor 3 Tahun 2022 tentang Evaluasi Penyelenggaraan Statistik Sektoral merupakan wujud komitmen BPS dalam menghasilkan Indeks Pembangunan Statistik untuk mendukung Sistem Statistik Nasional yang andal, efektif, dan efisien. Perban tersebut juga berisi pedoman dalam rangka melaksanakan penilaian penyelenggaraan Statistik Sektoral pada Instansi Pusat dan Pemerintahan Daerah.
				</p>
			</div>
			<div class="border border-[#c2E7F6] p-4 rounded-lg">
				<iframe src="https://drive.google.com/file/d/1Y-rq3pgWlXC2Fe4tMeFEwO7ENI0MF0sE/preview" width="640" height="480" allow="autoplay" class="w-full rounded" title="Preview Peraturan Badan Pusat Statistik Nomor 3 Tahun 2022"></iframe>
			</div>
		</div>
	</div>

	<!-- Assessment Section -->
	<div class="container mx-auto p-6">
		<h1 class="text-2xl font-bold mb-4 text-blue-900">Penilaian</h1>
		<div class="flex flex-col lg:flex-row gap-6">
			<div class="lg:w-1/2">
				<p class="mb-4 text-gray-700">
					Dalam menilai perkembangan kapabilitas organisasi dalam penyelenggaraan Statistik Sektoral, Badan Pusat Statistik menggunakan <i>Capability Maturity Model</i> CMM. Model ini telah dikembangkan untuk mengukur berbagai tingkat kematangan lain, seperti tingkat kematangan tata kelola teknologi informasi dan komunikasi, tingkat kematangan manajemen pengetahuan, dan lain-lain.
				</p>
				<p class="mb-4 text-gray-700">
					Tingkat kematangan kapabilitas proses merupakan pengukuran kemampuan organisasi pada suatu proses yang digunakan untuk pengukuran tingkat kematangan kebijakan, tata kelola, dan manajemen penyelenggaraan Statistik Sektoral. Tingkat kematangan kapabilitas proses diukur dengan 5 lima tingkatan yaitu rintisan, terkelola, terdefinisi, terpadu dan terukur, dan optimum.
				</p>
			</div>
			<div class="lg:w-1/2 bg-[#c2E7F6] text-blue-900 rounded-lg p-4">
				<div class="flex flex-wrap mb-4 gap-1">
					<button
						class="py-2 px-3 text-sm {activeTab === 'Rintisan' ? 'bg-white text-blue-900 font-semibold rounded' : 'hover:bg-white hover:bg-opacity-50 rounded'} transition-colors"
						onclick={() => activeTab = 'Rintisan'}
					>
						Rintisan
					</button>
					<button
						class="py-2 px-3 text-sm {activeTab === 'Terkelola' ? 'bg-white text-blue-900 font-semibold rounded' : 'hover:bg-white hover:bg-opacity-50 rounded'} transition-colors"
						onclick={() => activeTab = 'Terkelola'}
					>
						Terkelola
					</button>
					<button
						class="py-2 px-3 text-sm {activeTab === 'Terdefinisi' ? 'bg-white text-blue-900 font-semibold rounded' : 'hover:bg-white hover:bg-opacity-50 rounded'} transition-colors"
						onclick={() => activeTab = 'Terdefinisi'}
					>
						Terdefinisi
					</button>
					<button
						class="py-2 px-3 text-sm {activeTab === 'Terpadu dan Terukur' ? 'bg-white text-blue-900 font-semibold rounded' : 'hover:bg-white hover:bg-opacity-50 rounded'} transition-colors"
						onclick={() => activeTab = 'Terpadu dan Terukur'}
					>
						Terpadu dan Terukur
					</button>
					<button
						class="py-2 px-3 text-sm {activeTab === 'Optimum' ? 'bg-white text-blue-900 font-semibold rounded' : 'hover:bg-white hover:bg-opacity-50 rounded'} transition-colors"
						onclick={() => activeTab = 'Optimum'}
					>
						Optimum
					</button>
				</div>
				<div class="bg-white text-blue-900 p-4 rounded-lg">
					{renderContent()}
				</div>
			</div>
		</div>
	</div>
</main>

<Footer />
