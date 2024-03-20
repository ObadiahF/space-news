<script>
    import { onMount ,onDestroy, createEventDispatcher } from "svelte";
    import { downvote, report } from './handleButtonClick'

    export let showDropDown = false;
    export let dialog;
    export let postInfo;
    import { fly } from "svelte/transition";
    const dispatch = createEventDispatcher();

    const handleClickOutside = (event) => {
            const dropdown = document.querySelector('.option-drop-down');
            const button = document.querySelector('.jarvis');
            if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
                dispatch("closeDropDown")
            }
    };

    // Add event listener when component mounts
    onMount(() => {
        dialog.addEventListener('click', handleClickOutside);
    });

    // Remove event listener when component unmounts
    onDestroy(() => {
        dialog.removeEventListener('click', handleClickOutside);
    });
</script>

<div class="dropdown">
  {#if showDropDown}
     <div class="dropdown-content option-drop-down" 
     transition:fly={{ delay: 10, duration: 100, y: 30, opacity: 0.5}}>
       <li role="button" on:click={() => downvote(postInfo)}><i class="fa-solid fa-arrow-down"></i> Downvote</li>
       <li role="button" on:click={() => report(postInfo)}><i class="fa-regular fa-flag"></i> Report</li>
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
  min-width: 16rem;
  box-shadow: 0 -8px 16px 0 rgba(0,0,0,0.2); /* Change the box-shadow to display above */
  z-index: 1;
  top: 35px; /* Adjust this value to position the dropdown content above */
  right: -70px;
  border-radius: 4px;   
  border: 1px solid wheat;
  color: white;
}

/* Style the links inside the dropdown */
.dropdown-content li {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
.dropdown-content li:hover {
  transition: 300ms ease;
  background-color: #2c2f38;

}



</style>