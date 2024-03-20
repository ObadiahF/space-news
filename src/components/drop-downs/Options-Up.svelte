<script>
    import { onMount ,onDestroy, createEventDispatcher } from "svelte";
    import ListItems from "./ListItems.svelte";
    export let showDropDown = false;
    export let index;
    export let postInfo;
    import { fly } from "svelte/transition";
    const dispatch = createEventDispatcher();

    const handleClickOutside = (event) => {
            const dropdown = document.querySelector('.dropdown-content');
            const buttons = document.querySelectorAll('.options-btn');
            if (dropdown && !dropdown.contains(event.target) && !buttons[index].contains(event.target)) {
                dispatch("closeDropDown")
            }
    };

    // Add event listener when component mounts
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
    });

    // Remove event listener when component unmounts
    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<div class="dropdown">
  {#if showDropDown}
     <div class="dropdown-content" 
     transition:fly={{ delay: 10, duration: 100, y: 30, opacity: 0.5}}>
      <ListItems />
     </div>
  {/if}
</div>

<style>

/* Style the dropdown container */
.dropdown {
  position: relative;
  display: inline-block;
  text-align: center;
  
}

/* Style the dropdown content */
.dropdown-content {
  position: absolute;
  background-color: #1C1F26;
  width: 20rem;
  box-shadow: 0 -8px 16px 0 rgba(0,0,0,0.2); /* Change the box-shadow to display above */
  z-index: 5;
  top: -150px; /* Adjust this value to position the dropdown content above */
  border-radius: 4px;   
  border: 1px solid wheat;
  color: white;
}
</style>