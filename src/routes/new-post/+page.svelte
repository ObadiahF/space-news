<script>
import Nav from '../../components/Nav.svelte'
import Article from '../../components/Article.svelte'
import Modal from '../../components/Modal.svelte';

let thumbnailInput;
let titleInput;

let bodyText = "";

let active = "post";
let inWritingMode = true;
let showModal = false;
let tagInputValue;
let errorMsg = "";
let postInfo = {url: "", title: "", image_url: "", id: "", summary: ""}
let tags = [];
let errorMsgEl;

$: {
    if (active) {
        errorMsg = "";
    };
}

const preview = () => {
    const title = titleInput.value;
    const thumbnail = postInfo.image_url;

    if (!title) {
        errorMsg = "Title Required."
        scroll()
        return;
    }
    if (!thumbnail) {
        errorMsg = "Thumbnail Required."
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

 const fileSelected = () => {
        const selectedFile = thumbnailInput.files[0];
        const twoMegaBytes = 1_000_000 * 2; 
        if (selectedFile.size > twoMegaBytes) {
            errorMsg = 'File must be smaller than 2 Megabytes';
            return;
        }

        if (selectedFile.type.split('/')[0] !== 'image') {
            errorMsg = 'File must be an image!';
            return;
        }

        if (selectedFile) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const dataURL = e.target.result;
            postInfo.image_url = dataURL;
            postInfo = postInfo;
        };

        reader.readAsDataURL(selectedFile);
    }
    };

    const showModalData = (e) => {
        showModal = !showModal;
    }

    const addTag = () => {
        if (!tagInputValue) return;

        tags = [...tags, tagInputValue]
        tagInputValue = "";
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

<Nav />

<main>
    <div class="container">
    <nav>
        <li 
        class={active === "post" && "active"}
        on:click={() => active = "post"}
        role="button"
        >New Post</li>
        
        <li 
        class={active === "share" && "active"}
        on:click={() => active = "share"}
        role="button"
        >Share a Link</li>
    </nav>
    {#if errorMsg}
            <p id="error" bind:this={errorMsgEl}>{errorMsg}</p>
    {/if}
        {#if active === "post"}
        <div class="post-container">
            <button class="img-btn" on:click={() => thumbnailInput.click()}>{postInfo.image_url ? "Thumbnail selected":"Thumbnail *"}</button>
            <input type="file" on:change={fileSelected} style="display: none;" accept="image/*" bind:this={thumbnailInput} max="1">
            <input type="text" placeholder="Post Title *" bind:this={titleInput}>
            <div class="write-container">
                <nav>
                    <li 
                    class={inWritingMode === true && "active"}
                    on:click={() => inWritingMode = true}
                    role="button"
                    >Write
                    </li>
    
                    <li 
                    class={inWritingMode === false && "active"}
                    on:click={preview}
                    role="button"
                    >Preview
                    </li>
                </nav>

                <div class="write">
                {#if inWritingMode}
                    <textarea id="write" placeholder="Post Body Text*" bind:value={bodyText}></textarea>
                    <div class="tags-container">
                        <input type="text" maxlength="30" placeholder="Tags" bind:value={tagInputValue}>
                        <button on:click={addTag}>Add Tag</button>
                        <div class="tags">
                            {#each tags as tag}
                            <div class="tag">#{tag}</div>
                            {/each}
                        </div>
                    </div>
                    <button>Save Draft</button>
                    <button>Post</button>
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
                </div>
            </div>
        </div>
        {:else}

        {/if}
    </div>
</main>
<Modal bind:showModal postInfo={postInfo} isComments={false} isPreview={true} userCreated={true}/>

<style>
    main {
        padding: 1rem 4rem;
        min-height: 70vh;
        display: flex;
        color: whitesmoke;
        flex-direction: column;
        gap: 3rem;
        align-items: center;
    }

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

    .container {
        width: 60%;
        border: 1px solid grey;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 3rem;
        padding: 1rem 2rem;
    }

    .post-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .write {
        margin-top: 1rem;
    }

    .preview {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #write {
        width: 100%;
        background-color: #23262e;
        outline: none;
        max-width: 56vw;
        color: whitesmoke;
        padding: 0.5rem;
        height: 10rem;
    }

    .img-btn {
        height: 6rem;
        border-radius: 2rem;
    }

    input {
        outline: none;
        padding: 1rem 0.5rem;
        background-color:#23262e;
        color: whitesmoke;
        border: 1px solid grey;
        border-radius: 8px;
    }

    .title {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        gap: 1rem;
    }

    .title h1 {
        font-size: 48px;
    }

    .subtitle {
        width: 70%;
        text-wrap:  balance;
    }

    .subtitle h4 {
        font-size: 24px;
        margin: 0;
    }

    .content {
        display: flex;
        gap: 3rem;
    }

    .panel {
        background-color: #1C1F26;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        height: 14rem;
        border: 1px solid grey;
        width: 40vw;
        padding: 2rem 1rem 1rem;
        gap: 1rem;
        color: white;
        transition: 300ms ease-in;
        text-wrap: balance;
    }

    .panel:hover {
        border: 1px solid wheat;
    }

    .panel h2 {
        margin: 0;
        font-size: 28px;
    }
    .tags-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
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
    }
    .btn {
        margin-top: auto;
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

    @media screen and (max-width: 775px) {
        button {
            width: 100%;
            margin-top: 1rem;
        }

        .container {
            width: 80%;
            border: none;
        }

        main {
            padding: 0;
        }

        #write {
            max-width: 95%;
        }

        .tags {
            width: 95%;
        }
    }
</style>