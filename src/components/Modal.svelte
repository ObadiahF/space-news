<script>
    import { onMount, onDestroy } from "svelte";
    import Comment from "./Comment.svelte";
    import MediaQuery from '../utils/MediaQuery.svelte'
    import OptionsUp from "./drop-downs/Options-Up.svelte";
    import OptionsDown from "./drop-downs/Options-down.svelte";
	export let showModal; // boolean
    export let postInfo; // object
    export let isComments; //bool

	let dialog; // HTMLDialogElement
  let showingComments = false;
  let showModal1 = false;

  $: {
    if (isComments) {
      showingComments = true;
    } else {
      showingComments = false;
    }
  }

  
	$: if (dialog && showModal) dialog.showModal();

  $: {
    if (!showModal) {
      showModal1 = false;
    }
  }

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(postInfo.url);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => {
		dialog.close()
		}}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal">
        <div class="modal-content">
            <div class="content">
                <div class="article-info">
                        {#if showingComments}
                                <h1>Comments</h1>
                                <div class="input-container">
                                    <textarea cols="30" rows="10" maxlength="240" placeholder="Share your thoughts"></textarea>
                                    <button class="btn comment-btn">Comment</button>
                                </div>
                                <div class="comments">
                                  <Comment />
                                  <Comment />
                                  <Comment />
                                  <Comment />
                                  <Comment />
                                </div>
                        {:else}
                        <MediaQuery query="(max-width: 862px)" let:matches>
                          {#if matches}
                        <div class="nav mobile">
                            <a href={postInfo.url} target="_blank"><button><i class="fa-regular fa-share-from-square"></i> Read Post</button></a>
                            <div class="icons">
                                <div class="child jarvis" on:click={() => showModal1 = !showModal1}>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <OptionsDown showDropDown={showModal1} on:closeDropDown={() => showModal1 = false} dialog={dialog} postInfo={postInfo}/>
                                <div class="child">
                                    <span class="close-button" autofocus on:click={() => dialog.close()}>&times;</span></div>
                                </div>
                            </div>
                            {/if}
                        </MediaQuery>
                            <h1 class='header'>{postInfo.title}</h1>
                            <MediaQuery query="(max-width: 862px)" let:matches>
                            {#if matches}
                              <img src={postInfo.image_url} alt="">
                            {:else}
                              <a href={postInfo.url} target="_blank">
                                <img src={postInfo.image_url} alt="">
                              </a>
                            {/if}
                            </MediaQuery>
                            <div class="tags">
                                <div class="tag">
                                    <span>#Space</span>
                                </div>
                                <div class="tag">
                                    <span>#NASA</span>
                                </div>
                            </div>
                            <p>{postInfo.summary}</p>
                        {/if}
                </div>
                    <div class="user-actions">
                        <MediaQuery query="(min-width: 863px)" let:matches>
                          {#if matches}
                        <div class="nav">
                            <a href={postInfo.url} target="_blank"><button><i class="fa-regular fa-share-from-square"></i> Read Post</button></a>
                            <div class="icons">
                                <div class="child jarvis" on:click={() => showModal1 = !showModal1}>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                <OptionsDown showDropDown={showModal1} on:closeDropDown={() => showModal1 = false} dialog={dialog} postInfo={postInfo}/>
                                <div class="child">
                                    <span class="close-button" autofocus on:click={() => dialog.close()}>&times;</span></div>
                                </div>
                            </div>
                            {/if}
                        </MediaQuery>
                            <a href="#">
                                <div class="user-container">
                                    <div class="img-container">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/68/NoxttonBot.png" alt="">
                                    </div>
                                    <div class="user-info">
                                        <h3>Name</h3>
                                        <span>@tag</span>
                                    </div>
                                </div>
                            </a>

                            <div class="user-container share">
                                <h3>Share</h3>
                                <div class="icon" role="button" on:click={copy}>
                                    <i class="fa-regular fa-copy"></i>
                                    Copy
                                </div>
                                <a href="https://twitter.com/intent/tweet?text={postInfo.url}" target="_blank">
                                    <div class="icon">
                                        <i class="fa-brands fa-x-twitter"></i>
                                        X
                                    </div>
                                </a>

                            </div>
                            <button 
                            class="btn"
                            on:click={() => showingComments = !showingComments}
                            >
                            {showingComments ? "Show Article" : "View Comments"}
                            </button>
                </div>
              </div>
            </div>
    </div>
</dialog>

<style>
 
	dialog {
		border-radius: 16px;
		border: none;
        outline: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.9);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

  .modal {
    width: 70vw;
    position: relative;
    text-align: center;
	background-color: #0E1217;
    border: 1px solid wheat;
    border-radius: 16px;
    color: white;
    
  }

  .close-button {
    font-size: 3rem;
  }

  .tags {
    margin: 0.5rem 0;
    gap: 0.5rem;
    overflow: hidden;
    display: flex;
  }

  .tag {
    padding: 0.3rem 1rem;
    background-color: #23262e;
    color: white;
    border-radius: 30px;
    font-size: 14px;
    cursor: pointer;
  }

  .tag:hover {
    transition: 300ms ease;
    background-color: #2e313a;
    cursor: pointer;
  }

  .header {
    margin: 0;
    width: 90%;
    text-align: left;
    padding: 1rem 0;
    text-wrap: balance;
  }
  .content {
    display: flex;
    
  }

  .modal-content img {
    max-height: 200px;
    border-radius: 16px;
  }

  .article-info {
    width: 60%;
    text-align: left;
    padding-right: 0.3rem;
  }

  .user-actions {
    width: 40%;
    border-left: 1px solid wheat;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 1rem;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
  }

  .icons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 24px;
}

.icons .child {
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
  }

  .icons .child:hover {
    transition: 300ms ease;
    background-color: #2e313a;
  }

  .nav button, .btn {
    color: white;
    background-color: inherit;
    font-size: 18px;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid white;
  }

  .nav button:hover, .btn:hover {
    transition: 300ms ease;
    background-color: #23262e;
  }
  
  .user-container {
    display: flex;
    align-items: center;
    border: 1px solid white;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    gap: 2rem;
  }

  .user-container img {
    border-radius: 50%;
    height: 3rem;
    aspect-ratio: 1;
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

  .user-container h3 {
    font-weight: bold;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    height: 3rem;
    width: 3rem;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 18px;
  }

  .icon i {
    font-size: 1.5rem;
  }

  .icon:hover {
    transition: 300ms ease;
    background-color: #2e313a;
  }

  .share {
    gap: 0;
  }

  .share h3 {
    margin-right: 2rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-container textarea {
    background-color: #2e313a;
    font-size: 18px;
    border: 1px solid grey;
    color: white;
    padding: 0.5rem;
    width: 95%;
    height: 4rem;
    resize: none;
    border-radius: 18px;
  }

  .input-container textarea:focus {
    outline: none;
  }

  .input-container textarea:hover {
    transition: 300ms ease;
    border: 1px solid wheat;
  }

  .comment-btn {
    width: 98%;
  }

  .mobile {
    justify-content: space-between;
  }
  @media screen and (max-width: 862px) {
    .content {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .article-info {
      width: 100%;
    }

    .header {
      text-wrap: pretty;
    }

    .user-actions {
      width: 100%;
      border: none;
      border-top: 1px solid wheat;
      padding: 1rem 0.5rem;
    }

    .modal-content img {
          max-height: 39.5vw;
        }
  }
</style>