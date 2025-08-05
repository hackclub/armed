<script>
    let currentStep = $state(0);
    
    const steps = [
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            Now that you know how to load a value into a register, 
            Let's have a look at a proper project!
            </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            First we're going to load up the project by typing
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">demo</b> into the editor,
            and pressing <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Submit</b>.
            </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            This should load up <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">
            Conway's Game of Life</b> into the emulator, and it should start running automatically.
            </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            What we're going to look at first are the different addressing methods
             used in ARM Assembly</p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            The first one is <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Immediate Addressing</b>,
            which is used to load a value directly. Immediate addressing can be used by placing a
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">#</b> symbol before the value.
            You can see this in line 4 where we add the value 
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">#12288</b> to the
            register <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">R1</b>, and store the result in
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">R3</b>
            </p>`,
       ];

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
        }
    }
</script>
<style>
     .assembly-guide {
        overflow: hidden;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }
</style>
<div class="assembly-guide">
    <div class="min-h-screen flex flex-col justify-center items-center p-8 instant-text">
        <div class="max-w-4xl text-center mb-8">
            {@html steps[currentStep]}
        </div>

        <div class="w-full max-w-4xl h-[525px]">
            <iframe 
                src="https://peterhigginson.co.uk/ARMlite/" 
                class="w-full h-full border-2 border-fuchsia-800 rounded-lg" 
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
            ></iframe>
        </div>
        
        <div class="flex gap-4 mt-8">
            <button 
                onclick={prevStep} 
                disabled={currentStep === 0}
                class="px-6 py-2 text-fuchsia-400  hover:bg-fuchsia-400 hover:text-white  disabled:cursor-not-allowed"
            >
                Previous
            </button>
            
            <span class="px-4 py-2 z-50 no-blink">
                {currentStep + 1} / {steps.length}
            </span>
            
            {#if currentStep < steps.length - 1}
                <button 
                onclick={nextStep} 
                class="px-6 py-2 text-fuchsia-600  hover:bg-fuchsia-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
            {:else}
            <a href="/">
                <button 
                    class="px-6 py-2 text-fuchsia-600  hover:bg-fuchsia-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Home
                </button>
            </a>
            {/if}
        </div>
    </div>
</div>