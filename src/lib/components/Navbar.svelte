<script lang="ts">
	let isOpen = false;
	let showLogin = false;
	let email = '';
	let password = '';
	let errorMsg = '';

	function toggleMenu() {
		isOpen = !isOpen;
	}
	function openLogin() {
		showLogin = true;
	}
	function closeLogin() {
		showLogin = false;
		errorMsg = '';
		email = '';
		password = '';
	}
	function handleLogin(event?: Event) {
		if (event) event.preventDefault();
		if (!email || !password) {
			errorMsg = 'Email dan password wajib diisi.';
			return;
		}
		// TODO: Integrasi login Supabase
		errorMsg = '';
		showLogin = false;
		// ...proses login
	}
</script>

<nav class="flex justify-between items-center p-4 bg-linear-to-r from-blue-900 to-blue-800 shadow-lg border-b-2 border-blue-700">
	<div class="flex items-center">
		<img src="/lanri.png" alt="Logo LANRI" class="h-10 w-auto mr-3" />
		<div class="flex flex-col">
			<span class="text-white font-bold text-xl">MAKARTIDAS</span>
			<span class="text-white text-sm opacity-90">Makarti Statistik dan Data Sektoral</span>
			<span class="text-blue-200 text-xs italic">"Dari Data Menuju Aksi — ASN Cerdas, Bangsa Kuat."</span>
		</div>
	</div>

	<!-- Desktop Menu -->
	<ul class="hidden md:flex gap-6 list-none font-open-sans text-lg text-white items-center">
		<li>
			<a href="/" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded">
				Beranda
			</a>
		</li>
		<li>
			<a href="/epss" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded">
				EPSS LAN
			</a>
		</li>
		<li>
			<button onclick={openLogin} class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition">Login</button>
		</li>
	</ul>

	<!-- Mobile Menu Button -->
	<div class="md:hidden">
		<button
			onclick={toggleMenu}
			class="text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:text-blue-200 focus:bg-blue-700 transition p-2 rounded"
			aria-label="Toggle menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				{#if isOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				{/if}
			</svg>
		</button>
	</div>
</nav>

<!-- Mobile Menu -->
{#if isOpen}
	<div class="md:hidden bg-linear-to-r from-blue-900 to-blue-800 shadow-lg border-b-2 border-blue-700">
		<div class="flex flex-col px-4 py-2">
			<a href="/" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded" onclick={toggleMenu}>
				Beranda
			</a>
			<a href="/epss" class="text-white no-underline hover:text-blue-200 hover:bg-blue-700 transition p-2 rounded" onclick={toggleMenu}>
				EPSS LAN
			</a>
			<button onclick={() => { toggleMenu(); openLogin(); }} class="bg-blue-700 text-white px-4 py-2 rounded mt-2 hover:bg-blue-900 transition">Login</button>
		</div>
	</div>
{/if}

<!-- Modal Login -->
{#if showLogin}
	<!-- Backdrop -->
	<div class="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
		<!-- Modal Container -->
		<div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
			<!-- Header -->
			<div class="text-center mb-6">
				<div class="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
					</svg>
				</div>
				<h2 class="text-2xl font-bold text-gray-800 mb-2">Selamat Datang</h2>
				<p class="text-gray-600 text-sm">Masuk ke akun MAKARTIDAS Anda</p>
			</div>

			<!-- Error Message -->
			{#if errorMsg}
				<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
					<svg class="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
					</svg>
					{errorMsg}
				</div>
			{/if}

			<!-- Login Form -->
			<form onsubmit={handleLogin} class="space-y-6">
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
						Email
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
							</svg>
						</div>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
							placeholder="nama@domain.com"
							required
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
						Password
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
							</svg>
						</div>
						<input
							type="password"
							id="password"
							bind:value={password}
							class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
							placeholder="Masukkan password"
							required
						/>
					</div>
				</div>

				<!-- Remember Me & Forgot Password -->
				<div class="flex items-center justify-between text-sm">
					<label class="flex items-center">
						<input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
						<span class="ml-2 text-gray-600">Ingat saya</span>
					</label>
					<button type="button" class="text-blue-600 hover:text-blue-800 font-medium" onclick={() => alert('Fitur lupa password akan segera hadir')}>
						Lupa password?
					</button>
				</div>

				<!-- Action Buttons -->
				<div class="space-y-3">
					<button
						type="submit"
						class="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
					>
						Masuk
					</button>

					<button
						type="button"
						onclick={closeLogin}
						class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
					>
						Batal
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}