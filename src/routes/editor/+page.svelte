<script lang="ts">
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
        `<h1 class="text-4xl mb-4">This guide assumes you have Hackatime setup</h1>
            <p class="text-white mb-4">If you don't have it setup, click <a href="https://hackatime.hackclub.com/">here</a></p>`,
         `<h1 class="text-4xl mb-4">You need to install the </h1><p><a href="https://wakatime.com/chrome" class="text-fuchsia-400 hover:underline"> Wakatime Browser extension. </a> </p>`,
        `<h1 class="text-4xl mb-4">After installing the extension, you need to configure it.</h1>
            <p class="text-white mb-4">Click the extensions button, and then click the wakatime icon.</p>
            <div class="flex justify-center gap-4 mb-4 mt-4">
                <img src="/extensions.png" alt="Extensions" class="rounded-2xl" style="max-width: 300px;" />
                <p class="transform translate-y-20">-></p>
                <img src="/wakaext.png" alt="Wakatime" class="rounded-2xl" style="max-width: 600px;" />
            </div>`,
        `<h1 class="text-4xl mb-4">Open up the options menu.</h1>
        <img src="/wakamenu.png" alt="Extensions" class="rounded-2xl mt-4" style="max-width: 300px;" />`,
        `Now get your api key from the Config Section of <a href="https://hackatime.hackclub.com/settings"> Hackatime's Settings</a> page, and paste it into the Wakatime extension's options menu.
        <div class="flex justify-center gap-4 mb-4 mt-4">
                <img src="/hackatime_settings.png" alt="Hackatime Settings" class="rounded-2xl" style="max-width: 300px;" />
                <p class="transform translate-y-20">-></p>
                <img src="/wakaoptions.png" alt="Wakatime Options Menu" class="rounded-2xl" style="max-width: 300px;" />
        </div>`,
        `<h1 class="text-4xl mb-4">Change the Logging Style to Only Allowed Sites, and choose to include https://armed.hackclub.com</h1>
        <img src="/wakaoptions.png" alt="Wakatime Options Menu" class="rounded-2xl transform translate-x-80" style="max-width: 300px;" />`,
        `<h1 class="text-4xl mb-4">Finally, enter this API URL: https://hackatime.hackclub.com/api/hackatime/v1 and click save!</h1>
        <img src="/wakaoptions2.png" alt="Extensions" class="rounded-2xl mt-4 transform translate-x-50" style="max-width: 300px;" />
        <p>All done!</p>
            `,
            
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

    let iframeModified = $state(false);
    let windowHeight = $state(700);
    let windowWidth = $state(1200);

     function checkWindowHeight() {
        if (typeof window !== 'undefined') {
            iframeModified = window.innerHeight <= 800;
            if (iframeModified===true) {
                windowHeight = window.innerHeight * 0.8; // Adjust height for smaller screens
                windowWidth = window.innerWidth*0.94; // Adjust width for smaller screens
            } else {
                windowHeight = 700; // Default height for larger screens
                windowWidth = 1400; // Default width for larger screens
            }
        }
    }
    
    onMount(() => {
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        
        const handleResize = () => {
            windowHeight = window.innerHeight;
            windowWidth = window.innerWidth;
            checkWindowHeight();
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
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
            {#if iframeModified}
            <iframe 
                src="https://www.peterhigginson.co.uk/AQA/?F5=06-Aug-25_17:58:56" 
                class="border-2 border-fuchsia-800 rounded-lg relative z-30" 
                style="height: {windowHeight}px; transform-origin: center; transform: scale(0.9); width: {windowWidth}px;"
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
            ></iframe>
            {:else}
            <iframe 
                src="https://www.peterhigginson.co.uk/AQA/?F5=06-Aug-25_17:58:56" 
                class="w-full h-[700px] border-2 border-fuchsia-800 rounded-lg relative z-30" 
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
                style="transform-origin: center; transform: scale(0.9);"
            ></iframe>
            {/if}
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


                <h1 class="mt-2 underline text-m justify-center">Remember to Save your code as a .txt file using the save button and screenshot the page, If you have scaling issues zoom out (ctrl/cmd -)</h1>
                </div>
            </div>
        </div>
    {:else}
        <div class="w-full max-w-8xl relative z-20">
            {#if iframeModified}
            <iframe 
                src="https://peterhigginson.co.uk/ARMlite/" 
                class=" border-2 border-fuchsia-800 rounded-lg relative z-30" 
                style="height: {windowHeight}px; transform: scale(1); width: {windowWidth}px;"
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
            ></iframe>
            {:else}
            <iframe 
                src="https://peterhigginson.co.uk/ARMlite/" 
                class="w-full border-2 border-fuchsia-800 rounded-lg relative z-30" 
                style="height: 700px; transform: scale(1);"
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
            ></iframe>
            {/if}
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
                
                <h1 class="mt-1 underline text-xl text-white">Remember to Save your code as a .txt file using the save button and screenshot the page, If you have scaling issues zoom out (ctrl/cmd -)</h1>
            </div>
        </div>
        {/if}
    {/if}
</div>