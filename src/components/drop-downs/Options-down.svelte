<script>
    import { onMount ,onDestroy, createEventDispatcher } from "svelte";

    export let showDropDown = false;
    export let dialog = undefined;
    export let postInfo;
    export let info = {};
    export let isNav = false;
    import { fly } from "svelte/transition";
    import ListItems from "./ListItems.svelte";
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
      if (!dialog) {
        document.addEventListener('click', handleClickOutside);
      } else {
        dialog.addEventListener('click', handleClickOutside);
      }
    });

    // Remove event listener when component unmounts
    onDestroy(() => {
      if (!dialog) {
        document.removeEventListener('click', handleClickOutside);
      } else {
        dialog.removeEventListener('click', handleClickOutside);
      }
    });
</script>

<div class="dropdown">
  {#if isNav}
        {#if showDropDown}
          <div class="dropdown-content option-drop-down nav" 
            transition:fly={{ delay: 10, duration: 100, y: 30, opacity: 0.5}}>
            <ListItems isNav={isNav} info={info}/>
          </div>
      {/if}
    {:else}
      {#if showDropDown}
        <div class="dropdown-content option-drop-down" 
          transition:fly={{ delay: 10, duration: 100, y: 30, opacity: 0.5}}>
          <ListItems />
        </div>
      {/if}
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
  box-shadow: 0 -8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
  top: 35px;
  right: -70px;
  border-radius: 4px;   
  border: 1px solid wheat;
  color: white;
}

.nav {
  top: 50px;
  right: -30px;
}
</style>