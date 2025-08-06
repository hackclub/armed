<script lang="ts">
    import type { PageData } from './$types'
    
    let { data }: { data: PageData } = $props()
    
    let time = $state(0)
    let isRunning = $state(false)
    let intervalId: ReturnType<typeof setInterval> | null = null
    
    function startStopwatch() {
        isRunning = true
        intervalId = setInterval(() => {
            time += 1
        }, 1000)
    }
    
    function stopStopwatch() {
        isRunning = false
        if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
        }
    }
    
    function formatTime(seconds: number): string {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
    <a href="https://peterhigginson.co.uk/ARMlite/Programming%20reference%20manual_v1_3.pdf">
        <button class="absolute top-5 left-80 hover:underline">
            [ Instructionset Guide ]
        </button>
    </a>
    
    <div class="w-full max-w-8xl h-[1000px] relative z-20">
        <iframe 
            src="https://peterhigginson.co.uk/ARMlite/" 
            class="w-full h-full border-2 border-fuchsia-800 rounded-lg relative z-30" 
            title="ArmLite"
            allow="fullscreen"
            loading="lazy"
        ></iframe>
    </div>
    
    <!-- Auth and Stopwatch Controls -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-fuchsia-600">
        {#if !data.session}
            <a href="/auth/signin/slack" class="px-6 py-2 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white border border-fuchsia-600 rounded transition-colors">
                Sign in with Slack
            </a>
        {:else}
            <span class="text-fuchsia-400 text-sm">Welcome, {data.session.user?.name || 'User'}!</span>
            
            <div class="text-fuchsia-300 font-mono text-lg min-w-20 text-center">
                {formatTime(time)}
            </div>
            
            {#if !isRunning}
                <button onclick={startStopwatch} class="px-4 py-2 text-green-400 hover:bg-green-400 hover:text-white border border-green-400 rounded transition-colors">
                    Start
                </button>
            {:else}
                <button onclick={stopStopwatch} class="px-4 py-2 text-red-400 hover:bg-red-400 hover:text-white border border-red-400 rounded transition-colors">
                    Stop
                </button>
            {/if}
            
            <a href="/auth/signout" class="px-4 py-2 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white border border-fuchsia-600 rounded transition-colors text-sm">
                Sign out
            </a>
        {/if}
    </div>
</div>