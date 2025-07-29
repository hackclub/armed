<script lang="ts">
	import '../app.css';
	import '../lib/terminal.css';
	let { children } = $props();

	let epilepsyWarning = $state(true);
	let epilepsySafeMode = $state(false);

	function epilepsyWarningDismiss() {
		epilepsyWarning = false;
	}

	function EpilepsySafeMode() {
		epilepsyWarning = false;
		epilepsySafeMode = true;
	}

</script>

{#if epilepsyWarning}
	<div class="epilepsy-warning">
		<p><b>Warning:</b> <u>This site contains flashing images that may trigger seizures for people with photosensitive epilepsy. Proceed with caution.</u></p>
		<button onclick={epilepsyWarningDismiss} class="buttonProceed">I understand, proceed</button>
		<button onclick={EpilepsySafeMode} class="buttonSafe">Turn on Epilepsy Safe Mode</button>
	</div>
{:else}
	{#if epilepsySafeMode}
		<div class="overlayES" style="z-index: 0"></div>
		<div class="scanline" style="z-index: 0"></div>
	{:else}
		<div class="overlay" style="z-index: 0"></div>
		<div class="scanline" style="z-index: 0"></div>
	{/if}
	<div class="wrapper">
		{@render children()}
	</div>
{/if}