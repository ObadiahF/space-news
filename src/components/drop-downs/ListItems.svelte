<script>
    import { downvote, report, save } from './handleButtonClick'
    export let isNav = false;
    const userName = "test";
</script>

{#if isNav}
    <a href="user/{userName}"><li role="button" class="nav"><i class="fa-solid fa-user"></i> Profile</li></a>
    <a href="settings"><li role="button" class="nav"><i class="fa-solid fa-gear"></i> Settings</li></a>
    <a href="logout"><li role="button" class="nav"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</li></a>
    

{:else} 
 
 
  <li role="button" on:click={() => downvote(postInfo)}><i class="fa-solid fa-arrow-down"></i> Downvote</li>
  <li role="button" on:click={() => report(postInfo)}><i class="fa-regular fa-flag"></i> Report</li>
  <li role="button" on:click={() => save(postInfo)}><i class="fa-regular fa-bookmark"></i> Save</li>
{/if}

<style>
li {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
li:hover {
  transition: 300ms ease;
  background-color: #2c2f38;

}

a {
  text-decoration: none;
  color: inherit;
}

.nav {
  font-size: 24px;
}
</style>