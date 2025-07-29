<script lang="ts">
	import '../app.css';
	import '../lib/terminal.css';
	let { children } = $props();

	let epilepsyWarning = $state(true);

	function epilepsyWarningDismiss() {
		epilepsyWarning = false;
	}

</script>

<style>
	.epilepsy-warning {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 9999;
		font-family: 'VT323', monospace;
		font-size: 1.5em;
		text-align: center;
		padding: 2rem;
	}

	.epilepsy-warning button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background: transparent;
		border: 2px solid #de0491;
		color: #de0491;
		font-family: 'VT323', monospace;
		font-size: 1.2em;
		cursor: pointer;
		text-transform: uppercase;
	}

	.epilepsy-warning button:hover {
		background: #de0491;
		color: black;
	}
</style>

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