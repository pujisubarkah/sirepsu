<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let chartElement: HTMLElement;

	const options = {
		series: [{
			name: 'Capaian (%)',
			data: [85, 70, 60, 75, 80]
		}],
		chart: {
			height: 320,
			type: 'radar'
		},
		xaxis: {
			categories: ['Perencanaan', 'Pelaksanaan', 'Evaluasi', 'Pelaporan', 'Monitoring']
		},
		yaxis: {
			tickAmount: 5,
			min: 0,
			max: 100
		}
	};

	onMount(async () => {
		if (browser) {
			const ApexCharts = (await import('apexcharts')).default;
			const chart = new ApexCharts(chartElement, options);
			chart.render();
		}
	});

	// Placeholder data
	const stats = [
		{ label: 'Rata-rata:', value: '74%', color: 'text-blue-900' },
		{ label: 'Tertinggi:', value: '85%', color: 'text-blue-900' },
		{ label: 'Terendah:', value: '60%', color: 'text-blue-900' },
		{ label: 'Status:', value: 'BAIK', color: 'text-green-600' }
	];
</script>

<div class="bg-white border border-[#c2E7F6] rounded-lg p-6 shadow-md">
	<h3 class="text-lg font-semibold text-blue-900 mb-4 text-center">RADAR CAPAIAN EPSS</h3>
	<div class="h-80 w-full" bind:this={chartElement}></div>

	<div class="mt-4 grid grid-cols-2 gap-2 text-sm">
		{#each stats as stat}
			<div class="flex justify-between">
				<span class="text-gray-600">{stat.label}</span>
				<span class="font-semibold {stat.color}">{stat.value}</span>
			</div>
		{/each}
	</div>
</div>