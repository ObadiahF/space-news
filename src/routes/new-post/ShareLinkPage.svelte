<script>
    import Article from "../../components/Article.svelte";
    import Modal from "../../components/Modal.svelte";
    let submittedLink = false;
    let bodyText;
    let tagInputValue;
    let tags = [];
    let inWritingMode = true;
    let showModal = false;
    let titleInput;
    let errorMsg = "";
    let postInfo = {url: "", title: "", image_url: "", id: "", summary: ""}

    const addTag = () => {
        if (!tagInputValue) return;

        tags = [...tags, tagInputValue]
        tagInputValue = "";
    }

    const deleteTag = (index) => {
        tags.splice(index, 1);
        tags = tags;
    };

    const showModalData = (e) => {
        showModal = !showModal;
    }

const preview = () => {
    const title = titleInput.value;

    if (!title) {
        errorMsg = "Title Required."
        scroll()
        return;
    }
    if (!bodyText) {
        errorMsg = "Body Text Required."
        scroll()
        return;
    }

    postInfo.title = title;
    postInfo.summary = bodyText;

    inWritingMode = false
}

const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            });
}

$: {
        if (showModal) {
           if (typeof window != 'undefined' && window.document) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            if (typeof window != 'undefined' && window.document) {
                document.body.style.overflow = 'auto';
            }
        }
    }

</script>

{#if errorMsg}
            <p id="error" style="margin-bottom: -4rem;">{errorMsg}</p>
{/if}

<div class="link-section" style="margin-bottom: -2rem;">
    <label for="">Link</label>
</div>
<div class="link-container">
            <input type="text" maxlength="200">
            <button style="padding: 0.7rem 1rem;" on:click={() => submittedLink = !submittedLink}>Get Link Info</button>
</div>
            {#if submittedLink}
            <nav>
                    <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li 
                        class={inWritingMode === true && "active"}
                        on:click={() => inWritingMode = true}
                        role="button"
                        >Edit
                    </li>
    
                    <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li 
                        class={inWritingMode === false && "active"}
                        role="button"
                        on:click={preview}
                        >Preview
                    </li>
                </nav>
                {#if inWritingMode}
                     
                
                <h1>Post Details</h1>
                <div class="link-section">
                    <label for="">Title</label>
                    <input type="text" maxlength="100" bind:this={titleInput}>
                </div>
                <div class="link-section">
                    <label for="">Summary</label>
                    <textarea id="write" bind:value={bodyText}></textarea>
                </div>
                <div class="tags-container">
                    <div class="link-section">
                        <label for="">Tags</label>
                    </div>
                    <form action="">
                        <input type="text" maxlength="30" bind:value={tagInputValue}>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <button on:click|preventDefault={addTag} type="submit">Add Tag</button>
                            <button on:click|preventDefault={() => tags = []}>Clear Tags</button>
                        </div>
                    </form>
                        <div class="tags">
                            {#each tags as tag, index}
                            <div class="tag" on:click={() => deleteTag(index)}>#{tag}</div>
                            {/each}
                        </div>
                    </div>
                    <div class="btn-container">
                        <button>Save Draft</button>
                        <button>Post</button>
                    </div>
                    {:else}
                        <div class="preview">
                            <Article 
                            postInfo={postInfo}
                            index={0}
                            preview={true};
                            isUserMade={true}
                                on:comment={(e) => {
                                showModalData(e);
                            }}
                            on:share={(e) => {
                                showModalData(e);
                            }}
                            />
                        </div>
                    {/if}
            {/if}
<Modal bind:showModal postInfo={postInfo} isComments={false} isPreview={true} userCreated={true}/>

<style>
    nav {
        display: flex;
        gap: 4rem;
        font-size: 24px;
        font-weight: bold;
        list-style-type: none;
        text-align: center;
    }

    li {
        cursor: pointer;
        padding: 0.5rem 1rem;
    }

    nav li {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        transition: 300ms ease;
        background-color: #23262e;
        border-radius: 30px;
    }

    #write {
        width: 100%;
        max-width: 40rem;
        background-color: #23262e;
        outline: none;
        color: whitesmoke;
        padding: 0.5rem;
        height: 10rem;
    }

    input {
        outline: none;
        padding: 1rem 0.5rem;
        background-color:#23262e;
        color: whitesmoke;
        border: 1px solid grey;
        border-radius: 8px;
        width: 100%;
    }
    .tags-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
        width: 100%;
    }

    .tags {
        width: 100%;
        display: flex;
        gap: 1rem;
        background-color: #23262e;
        align-items: center;
        min-height: 3rem;
        border-radius: 8px;
        flex-wrap: wrap;
        padding: 0.5rem;
    }

    .tag {
        background-color: #1C1F26;
        color: whitesmoke;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
    }

    .tag:hover {
        text-decoration: line-through;
    }

    button {
        color: white;
        background-color: inherit;
        font-size: 18px;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        border: 2px solid gray;
        width: 12rem;
    }

    button:hover {
        transition: 300ms ease;
        background-color: #23262e;
    }

    #error {
        color: rgb(248, 62, 62);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .link-container {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .link-section {
        font-weight: bold;
        font-size: 24px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .btn-container {
        width: 100%;
        display: flex;
        gap: 1rem;
    }

    @media screen and (max-width: 775px) {
        button {
            width: 100%;
        }

        .link-container {
            flex-direction: column;
        }

        #write {
            max-width: 80vw;
        }

        .tags {
            width: 95%;
        }
    }

    @media screen and (max-width: 500px) {
        .btn-container {
            flex-direction: column;
            margin-top: -2rem;
        }
    }
</style>