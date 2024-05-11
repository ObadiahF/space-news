<script>
    import { onMount } from 'svelte';
    import Nav from '../../components/Nav.svelte'
    export let data;
    let notifications = [];
    notifications.length = 9
    onMount(() => {

    })
</script>
<main class="{notifications.length === 0 && "none"}">
    {#if notifications.length === 0}
    <h1 class="none">No Notifications!</h1>
    <h6>Try commenting or posting something...</h6>
    <a href="/"><button class="go">Go to Feed</button></a>
    {:else}
    <section>
        <div class="title-container">
            <h1>{notifications.length} Unread Notification{notifications.length > 1 ? "s" : ""}</h1>
            <button id="mark">Mark All as Read</button>
        </div>

        {#each notifications as note}
             <div class="notification">
                This is a notification
             </div>
        {/each}
    </section>
    {/if}
    </main>
    <style>
* {
    color: white;
}

main {
    padding: 4rem;
    min-height: 70vh;
    display: flex;
    justify-content: center;
}

.none {
    align-items: center;
    font-size: 48px;
    margin: 0;
    flex-direction: column;
}

button {
    color: white;
    background-color: inherit;
    font-size: 32px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid gray;
    }

button:hover {
    transition: 300ms ease;
    background-color: #23262e;
}

#mark {
    font-size: 16px;
    max-height: 3rem;
}

h6 {
    margin: 1rem;
}

.title-container {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

section {
    border: 1px solid whitesmoke;
    width: 60%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 14px;
}

h1 {
    font-weight: bold;
}

.notification {
    border: 1px solid gray;
    border-radius: 14px;
    background-color: #1C1F26;
    padding: 1.5rem 1rem;
}

@media screen and (max-width: 755px) {
    section {
        width: 90%;
    }
}

@media screen and (max-width: 470px) {
    section {
        width: 100%;
        border: none;
    }

    main {
        padding: 0.5rem;
    }

   .title-container {
    flex-direction: column;
   }

   button {
    font-size: 42px;
    margin-bottom: 2rem;
   }
}
</style>