<script lang="ts">
	import '../app.css';
	import '../lib/terminal.css';
	let { children } = $props();
</script>

<div class="overlay"></div>
<div class="scanline"></div>
<div class="wrapper">

{@render children()}

</div>