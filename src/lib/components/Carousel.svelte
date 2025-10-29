<script lang="ts">
	let current = 0;
	const slides = [
		{
			img: 'https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg',
			caption: 'Kegiatan EPSS LAN 2022'
		},
		{
			img: 'https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg',
			caption: 'Kegiatan EPSS LAN 2023'
		},
		{
			img: 'https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg',
			caption: 'Kegiatan EPSS LAN 2024'
		}
	];

	function prev() {
		current = (current - 1 + slides.length) % slides.length;
	}
	function next() {
		current = (current + 1) % slides.length;
	}
</script>

<div class="w-full max-w-2xl mx-auto my-8">
	<div class="relative rounded-lg overflow-hidden shadow-lg">
		<img src={slides[current].img} alt={slides[current].caption} class="w-full h-64 object-cover" />
		<div class="absolute bottom-0 left-0 right-0 bg-[#c2E7F6] bg-opacity-80 text-blue-900 p-2 text-center font-semibold">
			{slides[current].caption}
		</div>
		<button class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-blue-900 rounded-full p-2 shadow hover:bg-blue-900 hover:text-white transition-colors" on:click={prev} aria-label="Sebelumnya">
			&#8592;
		</button>
		<button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-blue-900 rounded-full p-2 shadow hover:bg-blue-900 hover:text-white transition-colors" on:click={next} aria-label="Berikutnya">
			&#8594;
		</button>
	</div>
	<div class="flex justify-center mt-2 gap-2">
		{#each slides as _, i}
			<button class="w-3 h-3 rounded-full border border-blue-900 {current === i ? 'bg-[#c2E7F6]' : 'bg-white'}" on:click={() => current = i} aria-label={`Pilih slide ${i + 1}`}></button>
		{/each}
	</div>
</div>
