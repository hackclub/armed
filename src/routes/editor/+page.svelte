<script lang="ts">
    import { onMount } from 'svelte';
    
    let easyMode = $state(false);
    let tutorial = $state(false);
    let showTutorial = $state(false);
    let currentTutorialStep = $state("");

    const Steps = [
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            Welcome to the ARM Assembly Editor! This guide will help you get started.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            First, let's load a sample project. Type <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">demo</b> into the editor and press <b class="text-stone-300 drop-shadow-stone-500 drop-shadow-xl">Submit</b>.
        </p>`,
        `<p class="drop-shadow-fuchsia-800 drop-shadow-xl text-3xl">
            This will load a project that demonstrates various ARM Assembly concepts.
        </p>`,
    ];

    function completeTutorial() {
        tutorial = true;
        markTutorialCompleted();
    }

    // Cookie functions
    function setCookie(name: string, value: string, days: number = 365) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    }

    function getCookie(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function hasCompletedTutorial(): boolean {
        const completed = getCookie('tutorialCompleted');
        return completed === 'true';
    }

    function markTutorialCompleted() {
        setCookie('tutorialCompleted', 'true');
        showTutorial = false;
    }

    function shouldShowTutorial(): boolean {
        return !hasCompletedTutorial();
    }

    // Initialize tutorial state on mount
    onMount(() => {
        showTutorial = shouldShowTutorial();
    });

    function toggleEasyMode() {
        easyMode = !easyMode;
    }

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

    function handleKeydown(event: KeyboardEvent) {
        console.log("Key pressed:", event.key);
        // Add your keydown logic here
        if (event.key === ' ') { // Spacebar example
            event.preventDefault();
            if (stopwatch.isActive()) {
                stopStopwatch();
            } else {
                startStopwatch();
            }
        } else if (event.key === 'r' || event.key === 'R') {
            event.preventDefault();
            resetStopwatch();
        }
    }

    function handleIframeKeydown(event: KeyboardEvent) {
        // Forward keydown events to the parent div
        const parentDiv = document.querySelector('div[role="application"]');
        if (parentDiv) {
            parentDiv.dispatchEvent(new KeyboardEvent('keydown', event));
        }
    }
</script>

<div class="min-h-screen flex justify-center items-center p-8 relative z-10" onkeydown={handleKeydown} tabindex="0" role="application" aria-label="ARM Assembly Editor">
    {#if showTutorial}
        <!-- Tutorial placeholder -->
        <div class="text-center">
            <h1 class="text-4xl text-fuchsia-600 mb-4">New Hackatime Extension Required</h1>
            <p class="text-white mb-4">Please complete this guide on how to install and configure it before using the editor.</p>
            <button onclick={completeTutorial} class="absolute top-5 right-20 px-6 py-2 text-fuchsia-600 hover:text-white rounded hover:underline">
                Skip Guide
            </button>
        </div>
    {:else}
        {#if easyMode}
        <div class="w-full max-w-4xl relative z-20">
            <iframe 
                src="https://www.peterhigginson.co.uk/AQA/?F5=06-Aug-25_17:58:56" 
                class="w-full h-[900px] border-2 border-fuchsia-800 rounded-lg relative z-30" 
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
            ></iframe>
            
            <!-- Buttons positioned below iframe container -->
            <div class="mt-4 relative z-40">
                <div class="flex flex-wrap gap-4 justify-between items-center">
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
                class="w-full h-[800px] border-2 border-fuchsia-800 rounded-lg relative z-30" 
                title="ArmLite"
                allow="fullscreen"
                loading="lazy"
                onkeydown={handleIframeKeydown}
                role="editor"
            ></iframe>
            
            <!-- Buttons positioned below iframe container -->
            <div class="mt-4 relative z-40">
                <div class="flex flex-wrap gap-4 justify-between items-center">
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
                </div>
                
                <h1 class="mt-2 underline text-xl text-white">Remember to Save your code as a .txt file using the save button and screenshot the page</h1>
            </div>
        </div>
        {/if}
    {/if}
</div>