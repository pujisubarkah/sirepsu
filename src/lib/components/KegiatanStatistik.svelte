<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let chartElement: HTMLElement;

	const options = {
		series: [
			{
				name: 'Capaian 2024 (%)',
				data: [85, 72, 68, 78, 81, 65]
			},
			{
				name: 'Target 2024 (%)',
				data: [90, 80, 75, 85, 85, 70]
			}
		],
		chart: {
			height: 350,
			type: 'radar',
			dropShadow: {
				enabled: true,
				blur: 1,
				left: 1,
				top: 1
			}
		},
		title: {
			text: 'Radar Chart - Capaian vs Target'
		},
		stroke: {
			width: 2
		},
		fill: {
			opacity: 0.1
		},
		markers: {
			size: 0
		},
		xaxis: {
			categories: ['Perencanaan Strategis', 'Pelaksanaan Program', 'Monitoring & Evaluasi', 'Pelaporan', 'Koordinasi', 'Inovasi']
		}
	};

	onMount(async () => {
		if (browser) {
			const ApexCharts = (await import('apexcharts')).default;
			const chart = new ApexCharts(chartElement, options);
			chart.render();
		}
	});

	// Placeholder data for display
	const activities = [
		{ name: 'Survei Kepuasan Masyarakat', type: 'Survei' },
		{ name: 'Kompilasi Data Kepegawaian', type: 'Data' },
		{ name: 'Analisis Data Statistik', type: 'Analisis' },
		{ name: 'Pelatihan Statistik', type: 'Pelatihan' }
	];
</script>

<div class="bg-white border border-[#c2E7F6] rounded-lg p-6 shadow-md">
	<h3 class="text-lg font-semibold text-blue-900 mb-6 text-center">ANALISIS RADAR KEGIATAN STATISTIK</h3>

	<div class="h-96 w-full mb-6" bind:this={chartElement}></div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="space-y-3">
			<h4 class="font-semibold text-blue-900 border-b border-[#c2E7F6] pb-2">Kegiatan Utama</h4>

			<div class="space-y-2">
				{#each activities as activity}
					<div class="flex items-center justify-between p-2 bg-gray-50 rounded">
						<span class="text-sm text-gray-700">{activity.name}</span>
						<span class="text-xs bg-[#c2E7F6] text-blue-900 px-2 py-1 rounded-full font-medium">{activity.type}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-3">
			<h4 class="font-semibold text-blue-900 border-b border-[#c2E7F6] pb-2">Ringkasan Capaian</h4>

			<div class="space-y-2">
				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-600">Rata-rata Capaian:</span>
					<span class="font-bold text-blue-900">74.8%</span>
				</div>

				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-600">Kategori Terbaik:</span>
					<span class="font-bold text-green-600">Perencanaan (85%)</span>
				</div>

				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-600">Perlu Perbaikan:</span>
					<span class="font-bold text-orange-600">Inovasi (65%)</span>
				</div>

				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-600">Status Overall:</span>
					<span class="font-bold text-blue-900">BAIK</span>
				</div>
			</div>

			<div class="mt-4 p-3 bg-[#c2E7F6] bg-opacity-20 rounded-lg">
				<p class="text-xs text-blue-900">
					<strong>Rekomendasi:</strong> Fokus pada peningkatan inovasi dan monitoring evaluasi untuk mencapai target yang lebih optimal.
				</p>
			</div>
		</div>
	</div>
</div>