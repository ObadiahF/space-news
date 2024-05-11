<script>
    import Article from "../../components/Article.svelte";
    import Modal from "../../components/Modal.svelte";
    import { createEventDispatcher, onMount } from 'svelte'
    import { addToast, clearToasts } from "../../components/toast/toaststore";

      const dispatch = createEventDispatcher()

      export let userInfo = {};
    let submittedLink = false;
    let bodyText;
    let tagInputValue;
    let tags = [];
    let inWritingMode = true;
    let showModal = false;
    let titleInput;
    let errorMsg = "";
    let postInfo = {url: "", title: "", image_url: "", summary: ""}
    let linkInput;

    let name = "";
    let display_name = "";

    onMount(() => {
        clearToasts()
        name = userInfo.user_name;
        display_name = userInfo.display_name
    })

     const fail = (isFromTitle) => {
        errorMsg = isFromTitle ? "Title Required." : "Thumbnail Required."
        scroll()
        dispatch("loading", false);
    }

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
    errorMsg = "";
    const title = titleInput;

    if (!title) {
        fail(true)
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

const submitLink = async () => {
    errorMsg = "";
    const link = linkInput.value;
    if (!link || link.length < 3) {
        errorMsg = "Please enter valid link."
        return;
    }
    dispatch("loading", true);
    try {
        const res = await fetch('/api/parselink', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ link: link }),
            });
            
            const { info }  = await res.json();
            //console.log(info);
            if (Object.values(info).length === 0 && info.constructor === Object) {
                addToast({ message: "Error: No info found from link.", type: "error", dismissible: true, timeout: 0 })
                scroll()
                dispatch("loading", false)
                linkInput.value = "";
            }
            
            postInfo = {
                url: link,
                title: info.title ?? "",
                image_url: info.image ?? "",
                summary: info.description ?? ""
            }
            submittedLink = true;
            titleInput = info.title ?? "";
            bodyText = info.description ?? "";

    } catch (e) {
        submittedLink = true;
        console.log(e);
        addToast({ message: "Error: Please try again later!", type: "error", dismissible: true, timeout: 0 })
    } finally {
        dispatch("loading", false)
    }

};

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

const post = async (isDraft) => {
    dispatch("loading", true);
    postInfo.title = titleInput
    postInfo.summary = bodyText
    const { title} = postInfo;
    if (!title) {
        fail(true)
        return;
    }
    try {
        const res = await fetch('/api/post', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        postInfo,
                        isDraft,
                        name,
                        display_name,
                        tags
                    }),
            });
            
            const data  = await res.json();
            if (data.success) {
                addToast({ message: "Posted Successfully!", type: "success", dismissible: true, timeout: 0 })
                linkInput.value = "";
                titleInput = "";
                bodyText = "";
                tags = [];
            } else {
                addToast({ message: "Error: Please try again later!", type: "error", dismissible: true, timeout: 0 })
            }
            scroll();

    } catch (e) {
        console.log(e);
        addToast({ message: "Error: Please try again later!", type: "error", dismissible: true, timeout: 0 })
    } finally {
        dispatch("loading", false)
    }
}

</script>

{#if errorMsg}
    <p id="error" style="margin-bottom: -2rem;">{errorMsg}</p>
{/if}

<div class="link-section" style="margin-bottom: -2rem;">
    <label for="">Link</label>
</div>
    <form class="link-container">
        <input type="text" maxlength="200" bind:this={linkInput} name="link">
        <button style="padding: 0.7rem 1rem;" on:click|preventDefault={submitLink}>Get Link Info</button>
    </form>
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
                    <input type="text" maxlength="100" bind:value={titleInput}>
                </div>
                <div class="link-section">
                    <label for="">Summary</label>
                    <textarea id="write" bind:value={bodyText}></textarea>
                </div>
                <div class="tags-container">
                    <div class="link-section">
                        <label for="">Tags</label>
                    </div>
                    <form action="" class="tags-form">
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
                        <button on:click={() => post(true)}>Save Draft</button>
                        <button on:click={() => post(false)}>Post</button>
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

    .tags-form {
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