<script lang="ts">
	let isOpen = false;
	let showLogin = false;
	let username = '';
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
		username = '';
		password = '';
	}
	function handleLogin(event?: Event) {
		if (event) event.preventDefault();
		if (!username || !password) {
			errorMsg = 'Username dan password wajib diisi.';
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
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"></div>

		<!-- Modal Container -->
		<div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 transform transition-all duration-350 motion-safe:animate-fade-in" style="backdrop-filter: blur(6px);">
			<!-- Close Button -->
			<button onclick={closeLogin} class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-2 rounded-full hover:bg-gray-100" aria-label="Close">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>

			<!-- Decorative header -->
			<div class="flex items-center gap-4 mb-4">
				<div class="w-14 h-14 rounded-full flex items-center justify-center bg-linear-to-br from-blue-600 to-indigo-700 shadow-md">
					<img src="/lanri.png" alt="logo" class="w-8 h-8" />
				</div>
				<div>
					<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Selamat Datang di MAKARTIDAS</h2>
					<p class="text-sm text-gray-500 dark:text-gray-300">Masuk untuk mengakses fitur dan data statistik</p>
				</div>
			</div>

			<!-- Social login (visual only) -->
			<div class="flex gap-3 mb-4">
				<button type="button" onclick={() => alert('Login dengan Google belum diimplementasikan')} class="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:shadow-sm bg-white">
					<img src="/icons/google.svg" alt="google" class="w-4 h-4" />
					<span class="text-sm text-gray-700">Masuk dengan Google</span>
				</button>
				<button type="button" onclick={() => alert('Login dengan SSO LAN belum diimplementasikan')} class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3z"></path></svg>
					<span class="text-sm">SSO LAN</span>
				</button>
			</div>

			<div class="flex items-center gap-3 mb-4">
				<div class="flex-1 h-px bg-gray-200"></div>
				<div class="text-xs text-gray-400">atau</div>
				<div class="flex-1 h-px bg-gray-200"></div>
			</div>

			<!-- Error Message -->
			{#if errorMsg}
				<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-3 flex items-center">
					<svg class="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
					</svg>
					{errorMsg}
				</div>
			{/if}

			<!-- Login Form -->
			<form onsubmit={handleLogin} class="space-y-4">
				<!-- Email Field -->
				<div>
					<label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Username</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
							</svg>
						</div>
						<input
							type="text"
							id="username"
							bind:value={username}
							class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-150 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
							placeholder="username_anda"
							required
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
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
							class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-150 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-100"
							placeholder="Masukkan password"
							required
						/>
					</div>
				</div>

				<!-- Remember Me & Forgot Password -->
				<div class="flex items-center justify-between text-sm">
					<label class="flex items-center">
						<input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
						<span class="ml-2 text-gray-600 dark:text-gray-300">Ingat saya</span>
					</label>
					<button type="button" class="text-indigo-600 hover:text-indigo-800 font-medium" onclick={() => alert('Fitur lupa password akan segera hadir')}>
						Lupa password?
					</button>
				</div>

				<!-- Action Buttons -->
				<div class="grid gap-3">
					<button
						type="submit"
						class="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-transform duration-150 transform hover:-translate-y-0.5 shadow-lg"
					>
						Masuk
					</button>

					<button
						type="button"
						onclick={closeLogin}
						class="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50"
					>
						Batal
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}