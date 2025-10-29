<script lang="ts">
	import { Chart, Title, Tooltip, Legend, Filler, RadarController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
	import { Radar } from 'svelte-chartjs';

	// Register Chart.js components
	Chart.register(Title, Tooltip, Legend, Filler, RadarController, RadialLinearScale, PointElement, LineElement);

	const radarData = {
		labels: [
			'Perencanaan Strategis',
			'Pelaksanaan Program',
			'Monitoring & Evaluasi',
			'Pelaporan',
			'Koordinasi',
			'Inovasi'
		],
		datasets: [
			{
				label: 'Capaian 2024 (%)',
				data: [85, 72, 68, 78, 81, 65],
				backgroundColor: 'rgba(194, 231, 246, 0.3)',
				borderColor: '#c2E7F6',
				borderWidth: 3,
				pointBackgroundColor: '#1e40af',
				pointBorderColor: '#ffffff',
				pointHoverBackgroundColor: '#1e40af',
				pointHoverBorderColor: '#ffffff',
				pointRadius: 6,
				pointHoverRadius: 8
			},
			{
				label: 'Target 2024 (%)',
				data: [90, 80, 75, 85, 85, 70],
				backgroundColor: 'rgba(30, 64, 175, 0.1)',
				borderColor: '#1e40af',
				borderWidth: 2,
				borderDash: [5, 5],
				pointBackgroundColor: '#dc2626',
				pointBorderColor: '#ffffff',
				pointRadius: 4,
				pointHoverRadius: 6
			}
		]
	};

	const radarOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom' as const,
				labels: {
					usePointStyle: true,
					padding: 20,
					font: {
						size: 12
					}
				}
			},
			tooltip: {
				backgroundColor: 'rgba(30, 64, 175, 0.9)',
				titleColor: '#ffffff',
				bodyColor: '#ffffff',
				borderColor: '#c2E7F6',
				borderWidth: 1,
				cornerRadius: 8,
				displayColors: true
			}
		},
		scales: {
			r: {
				angleLines: {
					color: '#e5e7eb',
					lineWidth: 1
				},
				grid: {
					color: '#f3f4f6',
					lineWidth: 1
				},
				pointLabels: {
					color: '#374151',
					font: {
						size: 11
					},
					padding: 15
				},
				ticks: {
					color: '#6b7280',
					font: {
						size: 10
					},
					stepSize: 20,
					backdropColor: 'transparent'
				},
				suggestedMin: 0,
				suggestedMax: 100
			}
		},
		elements: {
			line: {
				tension: 0.2
			}
		}
	};
</script>

<div class="bg-white border border-[#c2E7F6] rounded-lg p-6 shadow-md">
	<h3 class="text-lg font-semibold text-blue-900 mb-6 text-center">ANALISIS RADAR KEGIATAN STATISTIK</h3>

	<div class="h-96 w-full mb-6">
		<Radar data={radarData} options={radarOptions} />
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div class="space-y-3">
			<h4 class="font-semibold text-blue-900 border-b border-[#c2E7F6] pb-2">Kegiatan Utama</h4>

			<div class="space-y-2">
				<div class="flex items-center justify-between p-2 bg-gray-50 rounded">
					<span class="text-sm text-gray-700">Survei Kepuasan Masyarakat</span>
					<span class="text-xs bg-[#c2E7F6] text-blue-900 px-2 py-1 rounded-full font-medium">Survei</span>
				</div>

				<div class="flex items-center justify-between p-2 bg-gray-50 rounded">
					<span class="text-sm text-gray-700">Kompilasi Data Kepegawaian</span>
					<span class="text-xs bg-[#c2E7F6] text-blue-900 px-2 py-1 rounded-full font-medium">Data</span>
				</div>

				<div class="flex items-center justify-between p-2 bg-gray-50 rounded">
					<span class="text-sm text-gray-700">Analisis Data Statistik</span>
					<span class="text-xs bg-[#c2E7F6] text-blue-900 px-2 py-1 rounded-full font-medium">Analisis</span>
				</div>

				<div class="flex items-center justify-between p-2 bg-gray-50 rounded">
					<span class="text-sm text-gray-700">Pelatihan Statistik</span>
					<span class="text-xs bg-[#c2E7F6] text-blue-900 px-2 py-1 rounded-full font-medium">Pelatihan</span>
				</div>
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