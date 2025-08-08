<script>
    import { onMount } from 'svelte';
    
    let easyMode = $state(false);
    let tutorial = $state(false);
    let showTutorial = $state(false);

    function toggleEasyMode() {
        easyMode = !easyMode;
    }

    function completeTutorial() {
        tutorial = true;
        markTutorialCompleted();
    }

    // Cookie functions
    function setCookie(name, value, days = 365) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function hasCompletedTutorial() {
        const completed = getCookie('tutorialCompleted');
        return completed === 'true';
    }

    function markTutorialCompleted() {
        setCookie('tutorialCompleted', 'true');
        showTutorial = false;
    }

    function shouldShowTutorial() {
        return !hasCompletedTutorial();
    }

    // Initialize tutorial state on mount
    onMount(() => {
        showTutorial = shouldShowTutorial();
    });

    class StopwatchAPI {
        constructor() {
            this.startTime = 0;
            this.elapsedTime = 0;
            this.isRunning = false;
            this.intervalId = undefined;
        }

        start() {
            if (!this.isRunning) {
                this.startTime = Date.now() - this.elapsedTime;
                this.isRunning = true;
                this.intervalId = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                }, 10);
            }
        }

        stop() {
            if (this.isRunning && this.intervalId) {
                clearInterval(this.intervalId);
                this.isRunning = false;
            }
        }

        reset() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.startTime = 0;
            this.elapsedTime = 0;
            this.isRunning = false;
        }

        getTime() {
            return this.elapsedTime;
        }

        getFormattedTime() {
            const totalMs = this.elapsedTime;
            const hours = Math.floor(totalMs / 3600000);
            const minutes = Math.floor((totalMs % 3600000) / 60000);
            const seconds = Math.floor((totalMs % 60000) / 1000);
            const milliseconds = Math.floor((totalMs % 1000) / 10);
            
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        }

        isActive() {
            return this.isRunning;
        }
    }

    let stopwatch = new StopwatchAPI();
    let displayTime = $state('00:00:00.00');

    $effect(() => {
        const interval = setInterval(() => {
            displayTime = stopwatch.getFormattedTime();
        }, 10);

        return () => clearInterval(interval);
    });

    function startStopwatch() {
        stopwatch.start();
    }

    function stopStopwatch() {
        stopwatch.stop();
    }

    function resetStopwatch() {
        stopwatch.reset();
        displayTime = stopwatch.getFormattedTime();
    }

    // Tutorial for Hackatime setup
    let currentStep = $state(0);
    
    const steps = [
        `<h1 class="text-4xl  mb-4">New Hackatime Setup Required</h1>
            <p class="text-white mb-4">Please install and configure it before using the editor.</p>`,
         `<h1 class="text-4xl mb-4">You need to install the </h1><p><a href="https://wakatime.com/chrome" class="text-fuchsia-400 hover:underline"> Wakatime Browser extension. </a> </p>`,
        `<h1 class="text-4xl mb-4">After installing the extension, you need to configure it.</h1>
            <p class="text-white mb-4">Click the extensions button, and then click the wakatime icon.</p>`,
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
<div class="min-h-screen flex justify-center items-center p-8 relative z-10 overflow-hidden">
    {#if showTutorial}
        <!-- Tutorial placeholder -->
        <div class="text-center">
            <div class="max-w-4xl text-center mb-8">
            {@html steps[currentStep]}
            </div>
            <button onclick={completeTutorial} class="absolute top-5 right-10 hover:text-white hover:underline hover:cursor-pointer rounded">
                Skip Tutorial
            </button>
            <button 
                onclick={prevStep} 
                disabled={currentStep === 0}
                class="px-6 py-2 text-fuchsia-400   hover:text-white hover:cursor-pointer hover:underline  disabled:cursor-not-allowed"
            >
                Previous
            </button>
            
            <span class="px-4 py-2 z-50 no-blink">
                {currentStep + 1} / {steps.length}
            </span>
            {#if currentStep < steps.length - 1}
                <button 
                onclick={nextStep} 
                class="px-6 py-2 text-fuchsia-600  hover:cursor-pointer hover:underline hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
            {:else}
            
                <button 
                    class="px-6 py-2 text-fuchsia-600  hover:cursor-pointer hover:underline hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onclick={completeTutorial}
                    >
                    Continue
                </button>
    
            {/if}
        </div>
    {:else}
        {#if easyMode}
        <div class="w-full max-w-4xl relative z-20">
            <iframe 
                src="https://www.peterhigginson.co.uk/AQA/?F5=06-Aug-25_17:58:56" 
                class="w-full h-[700px] border-2 border-fuchsia-800 rounded-lg relative z-30" 
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
                style="transform-origin: center; transform: scale(0.9);"
            ></iframe>
            
            <!-- Buttons positioned below iframe container -->
            <div class="mt-0 relative z-40">
                <div class="flex flex-wrap gap-0 justify-between items-center">
                    <div class="flex gap-4">
                        <a href="https://submit.hackclub.com/armed">
                            <button class="hover:underline">
                                [ Submit ]
                            </button>
                        </a>
                        <a href="https://pmt.physicsandmathstutor.com/download/Computer-Science/A-level/Past-Papers/AQA/AS-Paper-2/Assembly%20Language%20Instruction%20-%20Paper%202%20AQA%20Computer%20Science%20AS-level.pdf">
                            <button class="hover:underline">
                                [ Instructionset Guide ]
                            </button>
                        </a>
                    </div>
                    
                    <div class="flex gap-4 items-center">
                        <div class="text-white">{displayTime}</div>
                        <button onclick={startStopwatch} class="hover:underline hover:text-white">[ Start ]</button>
                        <button onclick={stopStopwatch} class="hover:underline hover:text-white">[ Stop ]</button>
                        <button onclick={resetStopwatch} class="hover:underline hover:text-red-500">[ Reset ]</button>
                    </div>
                    
                    <div class="flex gap-4">
                        <button class="hover:underline" onclick={toggleEasyMode}>
                            {easyMode ? '[ Hard Mode ]' : '[ Easy Mode ]'}
                        </button>
                        <a href="/">
                            <button class="hover:underline">
                                [ Home ]
                            </button>
                        </a>
                    </div>


                <h1 class="mt-2 underline text-m justify-center">Remember to Save your code as a .txt file using the save button and screenshot the page</h1>
                </div>
            </div>
        </div>
    {:else}
        <div class="w-full max-w-8xl relative z-20">
            <iframe 
                src="https://peterhigginson.co.uk/ARMlite/" 
                class="w-full h-[700px] border-2 border-fuchsia-800 rounded-lg relative z-30" 
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
                style=" transform: scale(1);"
            ></iframe>
            
            <!-- Buttons positioned below iframe container -->
            <div class="mt-0 relative z-40">
                <div class="flex flex-wrap gap-1 justify-between items-center">
                    <div class="flex gap-4">
                        <a href="https://submit.hackclub.com/armed">
                            <button class="hover:underline">
                                [ Submit ]
                            </button>
                        </a>
                        <a href="https://peterhigginson.co.uk/ARMlite/Programming%20reference%20manual_v1_3.pdf">
                            <button class="hover:underline">
                                [ Instructionset Guide ]
                            </button>
                        </a>
                    </div>
                    
                    <div class="flex gap-2 items-center">
                        <div class="text-white">{displayTime}</div>
                        <button onclick={startStopwatch} class="hover:underline hover:text-white">[ Start ]</button>
                        <button onclick={stopStopwatch} class="hover:underline hover:text-white">[ Stop ]</button>
                        <button onclick={resetStopwatch} class="hover:underline hover:text-red-500">[ Reset ]</button>
                    </div>
                    
                    <div class="flex gap-4">
                        <button class="hover:underline" onclick={toggleEasyMode}>
                            {easyMode ? '[ Hard Mode ]' : '[ Easy Mode ]'}
                        </button>
                        <a href="/">
                            <button class="hover:underline">
                                [ Home ]
                            </button>
                        </a>
                    </div>
                </div>
                
                <h1 class="mt-1 underline text-xl text-white">Remember to Save your code as a .txt file using the save button and screenshot the page</h1>
            </div>
        </div>
        {/if}
    {/if}
</div>