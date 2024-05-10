<script>
    import { onMount } from 'svelte';
    import MediaQuery from '../utils/MediaQuery.svelte';
    import { fly, fade } from 'svelte/transition';
    import ToolTip from './Tooltip.svelte'
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import { userInfo as userInfoStore } from '../stores/userInfo'
    import Button from './Button.svelte';
    import ProfileDropDown from './drop-downs/ProfileDropDown.svelte';
    export let session = null;
    export let onNewsPage = false;
    let userInfo = {};

    let showMobile = false;
    let transitionFinished = true;
    let hasNotifications = true;
    let isLoggedIn = false;
    onMount(() => {
        isLoggedIn = session.session !== null && true

        userInfoStore.subscribe(async (val) => {
            if (!val) {
                const res = await fetch('/api/getUserInfo');
                const data = await res.json();
                userInfo = data.userInfo[0];
            }
            console.log(val)
        })
        //check for notifications
    });

    

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
        <MediaQuery query="(min-width: {onNewsPage ? 780 : 850}px)" let:matches>
            {#if matches}
            <a href="/">
                <div class="logo">
                    <h1>Space News 🚀</h1>
                </div>
            </a>
            <div class="links">
                {#if !onNewsPage}
                <a href="/"><Button>Feed</Button></a>
                {/if}
                <a href="new-post"><Button><i class="fa-solid fa-plus"></i> New Post</Button></a>
                <ToolTip text={"Notifications"} isPointingDown={false}>
                    <a href="notifications"><Button><i class="fa-regular fa-bell"><span id= {hasNotifications && "notification"}></span></i></Button></a>
                </ToolTip>
                {#if isLoggedIn}
                    <ProfileDropDown userInfo={userInfo}/>
                {:else}
                     <a href="login"><Button>Log In <i class="fa-solid fa-right-to-bracket"></i></Button></a>
                {/if}
            </div>
            {:else}
                {#if showMobile}
                    <div class="mobile" transition:fly={{ delay: 250, duration: 200, y: -300, opacity: 0.5 }}>
                        <i class="fa-solid fa-x" on:click={() => showMobile = false}></i>
                        <a href="/">
                            <div class="logo">
                                <h1>Space News 🚀</h1>
                            </div>
                        </a>
                        {#if !onNewsPage}
                        <a href="/"><Button>Feed</Button></a>
                        {/if}
                        <a href="new-post"><Button><i class="fa-solid fa-plus"></i> New Post</Button></a>
                        <a href="notifications"><Button>Notifications<i class="fa-regular fa-bell" style="margin-left: 0.5rem;"><span id= {hasNotifications && "notification"}></span></i></Button></a>
                        {#if isLoggedIn}
                            <a href="user/{userInfo.user_name ?? ""}"><Button><i class="fa-solid fa-user"></i> Profile</Button></a>
                            <a href="settings"><Button><i class="fa-solid fa-gear"></i> Settings</Button></a>
                            <a href="logout"><Button><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</Button></a>
                        {:else}
                            <a href="login"><Button>Log In <i class="fa-solid fa-right-to-bracket"></i></Button></a>
                        {/if}
                    </div>
                {:else}
                    {#if transitionFinished}
                         <a href="/">
                            <div class="logo">
                                <h1>Space News 🚀</h1>
                            </div>
                        </a>
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
        text-align: center;
    }

    .links {
        display: flex;
        gap: 1rem;
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

    .logo:hover {
        cursor: pointer;
        transition: 300ms ease;
        opacity: 0.7;
    }

    a {
        text-decoration: none;
    }
</style>