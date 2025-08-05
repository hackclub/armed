<script>
    let currentStep = $state(0);
    
    const steps = [
         `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl"> To start us off,
             this is the editor we'll be using, 
             it's called <a href="https://peterhigginson.co.uk/ARMlite/" 
             class="p hover:underline hover:text-fuchsia-800">ArmLite</a> </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl"> There are a few main 
            parts of the editor, in the middle are 
            the registers, labelled R0-R12, to the right is the memory, 
            and to the left is the program editor.</p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            Think of the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">registers</b> as the CPU's workspace,
            they hold the data that the CPU is currently working on,
            and can be used to hold temporary values.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            In contrast, the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Memory</b> is like the notes app of the CPU,
            it holds data that the CPU doesn't need right now,
            and can be used to store larger amounts of data,
            such as complex variables that aren't currently in use.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            You also might have noticed a few unusual registers, like the ones labelled
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">PC</b>, 
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">LR</b>, and 
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">SP</b>.
            </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">PC</b> stands for the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Program Counter</b>,
            it holds the address of the next instruction to be executed
            </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            Wait, but that's interesting, I thought that the Memory was where my variable data was stored?
            </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            Well yes it is, but modern computers follow the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Von Neumann</b> architecture,
            which means that the program code is stored in the same memory as the data,
            and is not physically seperate in any way.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            This architecture is helpful due to its <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">simplicity</b> 
            and <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">efficiency</b>,
            as it allows the CPU to access both the program code and data from the same memory space
            without needing to switch between different memory areas.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            However, it also means that downloaded data can be executed as code,
            which can lead to <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">security vulnerabilities</b>
            if not handled properly.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            But going back, the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">
                LR</b> is the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Link Register</b>
                which holds the return address for function calls.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            And the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">
                SP</b> is the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Stack Pointer</b>
                which points to the top of the CPU's function call stack that consists of stack frames.
        </p>`,
        
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            The <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Program Editor</b> is where you write your code,
            it's where you'll be spending most of your time. To edit, scroll down in the window and click <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Edit</b>
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            To start us off we're going to look at the <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">MOV</b>
            instruction.
            `,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">MOV</b> is used to
            assign values to registers, for example
            <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">MOV R0, 5</b>
            will assign the value <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">5</b> to 
            the register <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">R0</b>. Enter that into the editor.</p>`,

        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            Now, if you press <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">submit</b>, press <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">play</b>, 
            and look at the registers, you'll see that <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">R0</b>
            now has <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">5</b> in it.-- It may be in binary or hex, 
            you can change this in the bottom right.</p> `,
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