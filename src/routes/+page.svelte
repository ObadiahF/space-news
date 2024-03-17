<script>
    import { onMount } from 'svelte'
    import Article from '../components/Article.svelte';
    import Skeleton from '../components/Skeleton.svelte';
    import Modal from '../components/Modal.svelte';

    let articles = [];
    let nextUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';
    let showModal = false;
    let postInfo = {};

    onMount(() => {
        getNewsArticles();
    });

    const getNewsArticles = async () => {
        const res = await fetch(nextUrl);

        const data = await res.json();
        const news = data.results;
        nextUrl = data.next;
        //Rounds down to the nearest 10, getting rid of old skeletons
        articles.length = Math.floor(articles.length / 10) * 10;

        const numOfSkeletons = howManySkeletonsNeeded(articles.length + news.length);
        const skeletons = Array.from({ length: numOfSkeletons }, () => ({}));
        articles = [...articles ,...news, ...skeletons];
    }

    const howManySkeletonsNeeded = (currentNumOfArticles) => {
        const howFarAwayFromAMultipleOf3 = currentNumOfArticles % 3;

        if (howFarAwayFromAMultipleOf3 === 0) return 0;

        return 3 - howFarAwayFromAMultipleOf3;
        
    };

    const showModalData = (e) => {
        postInfo = e.detail;
        showModal = !showModal;
    }
</script>

<body>
    <section class="articles-container">
        {#each articles as article}
        {#if !article.url}
                <Skeleton />
            {:else}
                <Article 
                url={article.url} 
                title={article.title} 
                image_url={article.image_url}
                articleId={article.id},
                summary={article.summary}
                on:comment={showModalData}
                on:share={showModalData}
                />
        {/if}
        {/each}
    </section>

    <button on:click={getNewsArticles}>Grab new Articles</button>
    <Modal bind:showModal postInfo={postInfo}/>
</body>

<style>
    body {
        background-color: #0E1217;
        margin: 0;
        padding: 2rem;
        box-sizing: border-box;
    }

    .articles-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
    }

    .scroll-lock {
        overflow-y: hidden;
    }

        @media screen and (max-width: 868px) {
            body {
                padding: 1rem;
            }
        }

    @media screen and (max-width: 768px) {
    .articles-container {
        grid-template-columns: 1fr 1fr; 
    }
}

    @media screen and (max-width: 480px) {
        .articles-container {
            grid-template-columns: 1fr;
        }
    }
</style>