<script lang="ts">
	import '../app.css';
	import '../lib/terminal.css';
	let { children } = $props();

	let epilepsyWarning = $state(true);

	function epilepsyWarningDismiss() {
		epilepsyWarning = false;
	}

</script>

{#if epilepsyWarning}
	<div class="epilepsy-warning">
		<p>This site contains flashing images that may trigger seizures for people with photosensitive epilepsy. Proceed with caution.</p>
		<button onclick={epilepsyWarningDismiss}>I understand, proceed</button>
	</div>
{:else}
	<div class="overlay" style="z-index: 0"></div>
	<div class="scanline" style="z-index: 0"></div>
	<div class="wrapper">
		{@render children()}
	</div>
{/if}