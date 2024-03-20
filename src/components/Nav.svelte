<script>
    import { onMount } from 'svelte';
    import MediaQuery from '../utils/MediaQuery.svelte';
    import { fly, fade } from 'svelte/transition';
    import ToolTip from './Tooltip.svelte'

    export let onNewsPage = false;

    let showMobile = false;
    let transitionFinished = true;
    let hasNotifications = true;

    onMount(() => {
        //check for notifications
    })

    $: {
        if (showMobile) {
           if (typeof window != 'undefined' && window.document) {
                document.body.style.overflow = 'hidden';
                transitionFinished = false;
            }
        } else {
            if (typeof window != 'undefined' && window.document) {
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    transitionFinished = true;
                }, 450)
            }
        }
    }

</script>

<nav>
        <MediaQuery query="(min-width: {onNewsPage ? 780 : 700}px)" let:matches>
            {#if matches}
            <div class="logo">
                <h1>Space News 🚀</h1>
            </div>
            <div class="links">
                {#if !onNewsPage}
                <a href="/"><button>Feed</button></a>
                {/if}
                <button><i class="fa-solid fa-plus"></i> New Post</button>
                <ToolTip text={"Notifications"} isPointingDown={false}>
                    <a href="notifications"><button><i class="fa-regular fa-bell"><span id= {hasNotifications && "notification"}></span></i></button></a>
                </ToolTip>
                <a href="login"><button>Log In <i class="fa-solid fa-right-to-bracket"></i></button></a>
            </div>
            {:else}
                {#if showMobile}
                    <div class="mobile" transition:fly={{ delay: 250, duration: 200, y: -300, opacity: 0.5 }}>
                        <i class="fa-solid fa-x" on:click={() => showMobile = false}></i>
                        <div class="logo">
                            <h1>Space News 🚀</h1>
                        </div>
                        {#if !onNewsPage}
                        <a href="/"><button>Feed</button></a>
                        {/if}
                        <button><i class="fa-solid fa-plus"></i> New Post</button>
                        <a href="notifications"><button><i class="fa-regular fa-bell"><span id= {hasNotifications && "notification"}></span></i></button></a>
                        <a href="login"><button>Log In <i class="fa-solid fa-right-to-bracket"></i></button></a>
                    </div>
                {:else}
                    {#if transitionFinished}
                         <div class="logo">
                            <h1>Space News 🚀</h1>
                        </div>
                        <i class="fa-solid fa-bars" on:click={() => showMobile = true}></i>
                    {/if}
                {/if}
            {/if}
        </MediaQuery>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        background-color: #0E1217;
        border-bottom: 1px solid grey;
        padding: 0.5rem 2rem;
    }

    h1 {
        color: white;
        font-size: 32px;
        font-weight: bold;
        margin: 0;
    }

    .links {
        display: flex;
        gap: 1rem;
    }

    button {
        color: white;
        background-color: inherit;
        font-size: 18px;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        border: 2px solid gray;
    }

    button:hover {
        transition: 300ms ease;
        background-color: #23262e;
    }

    .fa-bars {
        color: white;
        font-size: 32px;
    }

    .mobile {
        display: flex;
        align-items: center;
        position: relative;
        flex-direction: column;
        background-color: inherit;
        gap: 3rem;
        width: 84.5%;
        height: 100vh;
        z-index: 99;
        padding: 3rem;
    }

    .fa-x {
        color: white;
        font-size: 32px;
        position: absolute;
        top: 15px;
        right: 0;
    }

    .fa-bell {
        position: relative;
    }
    
    #notification {
        position: absolute;
        top: -2px;
        left: 9px;
        height: 10px;
        aspect-ratio: 1;
        background-color: red;
        border-radius: 50%;
    }
</style>