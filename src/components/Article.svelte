<script>
    import { createEventDispatcher } from 'svelte';
    import ArticleBar from './ArticleBar.svelte'
    export let postInfo;
    let { url, title, image_url, id, summary } = postInfo
    export let index;
    export let preview = false;
    export let isUserMade = false;
    export let tags = [];

    const dispatch = createEventDispatcher();
</script>

<div class="article">
    <div class="header">
        <h3>{isUserMade ? "User Made": "Scraped"}</h3>
        <button
        on:click={() => dispatch("share", {
            id,
            section: "Share",
            url,
            title,
            image_url,
            summary
        })}
        ><i class="fa-solid fa-angle-down"></i> Read</button>
    </div>
    <h2>{title}</h2>
    <div class="img-container">
        <a href="{url}" target="_blank">
            <img src="{image_url}" alt="">
        </a>
    </div>
    <ArticleBar 
    index={index}
    postInfo={postInfo}
    isPreview={preview}
    on:comment={() => dispatch("comment", 
    {
        id,
        section: "Comment",
        url,
        title,
        image_url,
        summary,
        tags
    })} 
    on:share={() => dispatch("share", 
    {
        id,
        section: "Share",
        url,
        title,
        image_url,
        summary,
        tags
    })}/>
</div>

<style>
    .article {
        background-color: #1C1F26;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        height: 23rem;
        border: 1px solid grey;
        width: 20rem;
        padding: 2rem 1rem 0.5rem;
        gap: 1rem;
        color: white;
        transition: 300ms ease-in;
    }

    .article:hover {
        border: 1px solid wheat;
    }

    .img-container img {
        width: auto;
        max-height: 150px;
        max-width: 100%;
    }

    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .article h2 {
        color: white;
        font-size: 24px;
        font-weight: bold;
        white-space: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        height: 5rem;
    }

    .header {
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header button {
        color: white;
        background-color: inherit;
        font-size: 18px;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        border: 2px solid white;
    }

    .header button:hover {
        transition: 300ms ease;
        background-color: #23262e;
    }

    .header h3 {
        margin: 0;
    }

    @media screen and (max-width: 868px) {
        .article {
            width: 95%;
            height: auto;
        }

            .img-container img {
                max-height: 35vw;
            }
    }

</style>