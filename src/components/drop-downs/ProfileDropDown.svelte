<script>
    import { onMount ,onDestroy, createEventDispatcher } from "svelte";
    import OptionsDown from "./Options-down.svelte";
    let showModal = false;
</script>


<div class="container jarvis" on:click={() => showModal = !showModal}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Sin_cara.png" alt="">
</div>
<OptionsDown 
        showDropDown={showModal}
        on:closeDropDown={() => showModal = false}
        isNav={true}
/>

<style>
    .container {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-content: center;
        border-radius: 50%;
        position: relative;
    }

    .container:hover {
        transition: 300ms ease;
        opacity: 0.8;
    }

    img {
        height: 2.5rem;
        border-radius: inherit;
    }
</style>