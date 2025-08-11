<script lang="ts">
	import '../app.css';
	import '../lib/terminal.css';
	import { onMount } from 'svelte';
	let { children } = $props();

	let epilepsyWarning = $state(true);
	let epilepsySafeMode = $state(false);
    let mobileDevice = $state(false);
	
	function epilepsyWarningDismiss() {
		epilepsyWarning = false;
	}

    function checkWindowSize() {
        if (typeof window !== 'undefined') {
            mobileDevice = window.innerWidth <= (0.9 * 1486);
        }
    }

	function EpilepsySafeMode() {
		epilepsyWarning = false;
		epilepsySafeMode = true;
	}

    onMount(() => {
        // Check window size on initial load
        checkWindowSize();
        
        // Add event listener to check window size on resize
        const handleResize = () => checkWindowSize();
        window.addEventListener('resize', handleResize);
        
        // Cleanup event listener on component destroy
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

</script>

{#if mobileDevice}
	<div class="epilepsy-warning">
		<p><b>Warning:</b> <u>This site is not optimized for mobile devices. For the best experience, please use a desktop or laptop computer.</u></p>
	</div>
{:else}
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
{/if}