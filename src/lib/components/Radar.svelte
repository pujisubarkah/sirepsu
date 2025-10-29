<script lang="ts">
	import { Chart, Title, Tooltip, Legend, Filler, RadarController, RadialLinearScale, PointElement, LineElement } from 'chart.js';
	import { Radar } from 'svelte-chartjs';

	// Register Chart.js components
	Chart.register(Title, Tooltip, Legend, Filler, RadarController, RadialLinearScale, PointElement, LineElement);

	const data = {
		labels: ['Perencanaan', 'Pelaksanaan', 'Evaluasi', 'Pelaporan', 'Monitoring'],
		datasets: [
			{
				label: 'Capaian (%)',
				data: [85, 70, 60, 75, 80],
				backgroundColor: 'rgba(194, 231, 246, 0.2)',
				borderColor: '#c2E7F6',
				borderWidth: 2,
				pointBackgroundColor: '#1e40af',
				pointBorderColor: '#ffffff',
				pointHoverBackgroundColor: '#1e40af',
				pointHoverBorderColor: '#ffffff'
			}
		]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				backgroundColor: '#1e40af',
				titleColor: '#ffffff',
				bodyColor: '#ffffff'
			}
		},
		scales: {
			r: {
				angleLines: {
					color: '#e5e7eb'
				},
				grid: {
					color: '#e5e7eb'
				},
				pointLabels: {
					color: '#374151',
					font: {
						size: 12
					}
				},
				ticks: {
					color: '#6b7280',
					stepSize: 20
				},
				suggestedMin: 0,
				suggestedMax: 100
			}
		}
	};
</script>

<div class="bg-white border border-[#c2E7F6] rounded-lg p-6 shadow-md">
	<h3 class="text-lg font-semibold text-blue-900 mb-4 text-center">RADAR CAPAIAN EPSS</h3>
	<div class="h-80 w-full">
		<Radar {data} {options} />
	</div>

	<div class="mt-4 grid grid-cols-2 gap-2 text-sm">
		<div class="flex justify-between">
			<span class="text-gray-600">Rata-rata:</span>
			<span class="font-semibold text-blue-900">74%</span>
		</div>
		<div class="flex justify-between">
			<span class="text-gray-600">Tertinggi:</span>
			<span class="font-semibold text-blue-900">85%</span>
		</div>
		<div class="flex justify-between">
			<span class="text-gray-600">Terendah:</span>
			<span class="font-semibold text-blue-900">60%</span>
		</div>
		<div class="flex justify-between">
			<span class="text-gray-600">Status:</span>
			<span class="font-semibold text-green-600">BAIK</span>
		</div>
	</div>
</div>