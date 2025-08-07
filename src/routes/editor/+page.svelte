<script>
    let easyMode = $state(false);

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
</script>
<div class="min-h-screen flex justify-center items-center p-8 relative z-10">
    <a href="/">
        <button class="absolute top-5 right-10 hover:underline">
            [ Home ]
        </button>
    </a>
    <a href="https://submit.hackclub.com/armed">
        <button class="absolute top-5 left-10 hover:underline">
            [ Submit ]
        </button>
    </a>
    <button class="absolute top-5 right-40 hover:underline" onclick={toggleEasyMode}>
        {easyMode ? '[ Hard Mode ]' : '[ Easy Mode ]'}
    </button>
    <h1 class="absolute top-5 left-100 underline">Remember to Save your code as a .txt file using the save button, also screenshot the page and it's timer</h1>
    <div class="absolute top-5 right-150 text-white">{displayTime}</div>
    <button onclick={startStopwatch} class= "absolute top-5 right-125 hover:underline hover:text-white">[ Start ]</button>
    <button onclick={stopStopwatch} class= "absolute top-5 right-100 hover:underline hover:text-white">[ Stop ]</button>
    <button onclick={resetStopwatch} class= "absolute top-5 right-75 hover:underline hover:text-red-500">[ Reset ]</button>
    {#if !easyMode}
        <a href="https://peterhigginson.co.uk/ARMlite/Programming%20reference%20manual_v1_3.pdf">
            <button class="absolute top-5 left-40 hover:underline">
                [ Instructionset Guide ]
            </button>
        </a>
    {:else}
        <a href="https://pmt.physicsandmathstutor.com/download/Computer-Science/A-level/Past-Papers/AQA/AS-Paper-2/Assembly%20Language%20Instruction%20-%20Paper%202%20AQA%20Computer%20Science%20AS-level.pdf">
            <button class="absolute top-5 left-40 hover:underline">
                [ Instructionset Guide ]
            </button>
        </a>
    {/if}
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
        <div class="w-full max-w-8xl h-[900px] relative z-20">
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