<script>
    let currentStep = $state(0);
    
    const steps = [
        `<h1 class="text-6xl drop-shadow-fuchsia-600">So you want to learn Assembly?</h1><br>`,
         `<p> Okay fine. </p>`,

        `<p>To put it simply. Assembly is the lowest of the low, it's the language that every high level language 
         (think Python, Javascript, and C++) ultimately gets translated down to. It's so low that the only language
          below it is the actual binary machine code, that executes on your processor.
         </p>`,

         `<p>
            This means that Assembly is incredibly powerful, and if used properly, 
            can be used to create some of the most efficient programs possible. But 
            this also means its really hard. So I've got some doubts you'll even finish this tutorial.
         </p>`,

         `<p>
            But, if you do, you'll be able to write programs that are so efficient,
            that they can run on the most basic of computers, the smallest of microcontrollers, 
            and even the most powerful of supercomputers.
         </p>`,

        `<p>
            So, if you're ready to take on the challenge, let's get started.
        </p>`
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
        background: #383838;
    }
    
    /* Override animations only within this component */
    .assembly-guide :global(.content) {
        animation: none !important;
    }
    
    .assembly-guide :global(.wrapper) {
        animation: none !important;
    }
    
    .assembly-guide :global(.overlay) {
        display: none !important;
    }
    
    .assembly-guide :global(.scanline) {
        display: none !important;
    }
    
    .assembly-guide * {
        animation: none !important;
        transition: none !important;
    }
</style>

<div class="assembly-guide">
    <div class="min-h-screen flex flex-col justify-center items-center p-8 instant-text">
        <div class="max-w-4xl text-center mb-8">
            {@html steps[currentStep]}
        </div>
        
        <div class="flex gap-4 mt-8">
            <button 
                onclick={prevStep} 
                disabled={currentStep === 0}
                class="px-6 py-2 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            
            <span class="px-4 py-2 z-50 no-blink">
                {currentStep + 1} / {steps.length}
            </span>
            
            <button 
                onclick={nextStep} 
                disabled={currentStep === steps.length - 1}
                class="px-6 py-2 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    </div>
</div>