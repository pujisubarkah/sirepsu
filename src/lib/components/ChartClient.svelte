<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Props: series and options follow ApexCharts API shape
  export let series: any[] = [{ name: 'Series 1', data: [10, 20, 15, 30, 20] }];
  export let options: any = {
    chart: { id: 'client-chart', toolbar: { show: false }, zoom: { enabled: false } },
    xaxis: { categories: ['A', 'B', 'C', 'D', 'E'] },
    stroke: { curve: 'smooth' }
  };
  export let type: string = 'line';
  export let height: number | string = 320;

  let container: HTMLDivElement | null = null;
  let chart: any = null;

  onMount(async () => {
    // ApexCharts is not SSR-friendly (references window/document). Dynamically import on client only.
    try {
      const mod = await import('apexcharts');
      const ApexCharts = (mod as any).default ?? mod;

      // Merge series/options for instantiation
      const cfg = {
        series,
        chart: { ...(options?.chart || {}), type, height },
        ...options
      };

      if (!container) return;

      chart = new ApexCharts(container, cfg);
      await chart.render();
    } catch (err) {
      // If import fails, leave the fallback message in place and log error
      // Common reasons: package not installed or blocked by bundler
      // eslint-disable-next-line no-console
      console.error('Failed to load ApexCharts on client:', err);
    }
  });

  onDestroy(() => {
    try {
      chart?.destroy?.();
    } catch (e) {
      // ignore
    }
  });
</script>

<div class="chart-wrapper">
  {#if !chart}
    <!-- Fallback shown during SSR or if chart hasn't been initialized yet -->
    <div class="text-sm text-gray-600">Chart akan ditampilkan di sini (ApexCharts tidak kompatibel dengan SSR)</div>
  {/if}
  <div bind:this={container}></div>
</div>

<style>
  .chart-wrapper {
    display: block;
    width: 100%;
    min-height: 160px;
  }
</style>
