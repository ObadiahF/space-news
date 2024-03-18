<script>
    import CommentNav from "./CommentNav.svelte";


</script>
<a href="#">

    <main>
        <div class="top">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/68/NoxttonBot.png" alt="">
            <div class="user-info">
                <h3>Name</h3>
                <span>The@</span>
            </div>
        </div>
        <p>This is the message</p>
        <div class="bottom">
            <CommentNav />
        </div>
    </main>
</a>
<style>

    main {
        margin-top: 1rem;
        border-radius: 8px;
        border: 1px solid wheat;
        padding: 0.5rem;
        width: 95%;
    }
    .top {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .top img {
        border-radius: 16px;
        aspect-ratio: 1;
        height: 3rem;
    }

    .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-info h3 {
    margin: 0;
    font-size: 18px;
  }

  .user-info span {
    color: lightgray
  }

 h3 {
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>