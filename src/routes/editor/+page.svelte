<script>
    let easyMode = $state(false);

    function toggleEasyMode() {
        easyMode = !easyMode;
    }
</script>
<div class="min-h-screen flex justify-center items-center p-8 relative z-10">
    <a href="/">
        <button class="absolute top-5 right-10 hover:underline">
            [ Home ]
        </button>
    </a>
    <a href="/submit">
        <button class="absolute top-5 left-10 hover:underline">
            [ Submit ]
        </button>
    </a>
    <button class="absolute top-5 right-80 hover:underline" on:click={toggleEasyMode}>
        {easyMode ? '[ Hard Mode ]' : '[ Easy Mode ]'}
    </button>
    <a href="https://peterhigginson.co.uk/ARMlite/Programming%20reference%20manual_v1_3.pdf">
        <button class="absolute top-5 left-80 hover:underline" target="_blank">
            [ Instructionset Guide ]
        </button>
    </a>
        {#if easyMode}
        <div class="w-full max-w-4xl h-[900px] relative z-20">
         <iframe 
            src="https://www.peterhigginson.co.uk/AQA/?F5=06-Aug-25_17:58:56" 
            class="w-full h-full border-2 border-fuchsia-800 rounded-lg relative z-30" 
            title="ArmLite"
            allow="fullscreen"
            loading="lazy"
        ></iframe>
         </div>
        {:else}
        <div class="w-full max-w-8xl h-[1000px] relative z-20">
        <iframe 
            src="https://peterhigginson.co.uk/ARMlite/" 
            class="w-full h-full border-2 border-fuchsia-800 rounded-lg relative z-30" 
            title="ArmLite"
            allow="fullscreen"
            loading="lazy"
        ></iframe>
         </div>
        {/if}
   
</div>