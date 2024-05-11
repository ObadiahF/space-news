<script>
    import { onMount } from 'svelte'
    import Article from '../components/Article.svelte';
    import Skeleton from '../components/Skeleton.svelte';
    import Modal from '../components/Modal.svelte';
    import Nav from '../components/Nav.svelte'
    import NameModal from '../components/NameModal.svelte';
	export let data;

    let articles = [];
    let nextUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';
    let showModal = false;
    let postInfo = {};
    let isComments = false;
    let scrollIndicator;
    let skeletonsNeeded = 2;
    let firstTimeRendering = true;
    let nameModal = false;


    onMount( async () => {
        const skeletons = Array.from({ length: (10 + howManySkeletonsNeeded(10)) }, () => ({}));
        articles = [...skeletons];
        getNewsArticles();

        // show modal to set userName
        if (!data.userInfo.display_name) {
            nameModal = true;
        }
    });

    const getNewsArticles = async () => {
        let skeletons = [];
        let numOfSkeletons = skeletonsNeeded
        const news = await fetchNews()
        if (firstTimeRendering) {
            articles.length = 0;
            firstTimeRendering = false;
        } else {
            //Rounds down to the nearest 10, getting rid of old skeletons
            articles.length = Math.floor(articles.length / 10) * 10;
            numOfSkeletons = howManySkeletonsNeeded(articles.length + news.length);
        }

        skeletons = Array.from({ length: numOfSkeletons }, () => ({}));
        articles = [...articles ,...news, ...skeletons];
    }

    const fetchNews = async () => {
        const res = await fetch(nextUrl);

        const data = await res.json();
        nextUrl = data.next;
        return data.results;
    }

    const howManySkeletonsNeeded = (currentNumOfArticles) => {
        const howFarAwayFromAMultiple = currentNumOfArticles % 3;

        if (howFarAwayFromAMultiple === 0) return 0;

        return 3 - howFarAwayFromAMultiple;
        
    };

    const showModalData = (e) => {
        postInfo = e.detail;
        showModal = !showModal;
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

    onMount(() => {
        if (!scrollIndicator) return;
    const loadingObserver = new IntersectionObserver((entries) => {
      const element = entries[0];

      if (element.isIntersecting) {
        getNewsArticles()
      }
    });

    loadingObserver.observe(scrollIndicator);
  });
</script>

<Nav onNewsPage={true} session={data}/>
<main class={showModal && "modal-open"}>
    <section class="articles-container">
        {#each articles as article, i}
        {#if !article.url}
                <Skeleton />
            {:else}
                <Article 
                postInfo={article}
                index={i}
                tags={["Space"]}
                on:comment={(e) => {
                    isComments = true;
                    showModalData(e);
                }}
                on:share={(e) => {
                    isComments = false;;
                    showModalData(e);
                }}
                />
        {/if}
        {/each}
        <div bind:this={scrollIndicator} style="width: 0px;"></div>
    </section>
<!--
    <button on:click={getNewsArticles}>Grab new Articles</button>
-->

    <Modal bind:showModal postInfo={postInfo} isComments={isComments}/>
    <NameModal showModal={nameModal}/>
</main>

<style>
    main {
        background-color: #0E1217;
        margin: 0;
        padding: 2rem;
        box-sizing: border-box;
    }

    .modal-open {
        overflow-y: hidden;
        
    }

    .articles-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
    }

        @media screen and (max-width: 868px) {
            main {
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