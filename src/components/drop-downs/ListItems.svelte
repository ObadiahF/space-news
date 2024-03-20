<script>
    import { downvote, report, save } from './handleButtonClick'

</script>

    <li role="button" on:click={() => downvote(postInfo)}><i class="fa-solid fa-arrow-down"></i> Downvote</li>
    <li role="button" on:click={() => report(postInfo)}><i class="fa-regular fa-flag"></i> Report</li>
    <li role="button" on:click={() => save(postInfo)}><i class="fa-regular fa-bookmark"></i> Save</li>

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
</style>