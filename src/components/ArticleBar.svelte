<script>
    import { createEventDispatcher } from 'svelte'
    import '@fortawesome/fontawesome-free/css/all.min.css';

    let karma = 0;
    let numOfComments = 4;
    let vote = 0;
    let isSaved = false;

    const btnClicked = createEventDispatcher();

    const upvoteOrDownvote = (val) => {
        if (!vote) {
            vote = val;
            addKarma(val);
            return;
        }
        
        if (vote === val) {
            if (vote === 1) {
                addKarma(-1);
            } else {
                addKarma(1);
            }
            vote = 0
        } else {
            vote = val
            addKarma(val * 2);
        }
    };

    const addKarma = (val) => {
        const newKarma = karma + val;
        karma = newKarma;
        return;
    }

    const save = () => {
        isSaved = !isSaved
    }

</script>

<main>
    <div class="icon-group">
        <div class="icon">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <i class="fa-solid fa-arrow-up  vote {vote === 1 && "reacted"}"
            type="button"
            on:click={() => upvoteOrDownvote(1)}
            ></i>    
        </div>
        <div class="karma">
            <p>{karma}</p>
        </div>
        <div class="icon">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <i class="fa-solid fa-arrow-down vote {vote === -1 && "reacted"}"
                type="button"
                on:click={() => upvoteOrDownvote(-1)}
            ></i>    
        </div>
    </div>
    <div class="icon-group icon-hover" role="button" on:click={() => btnClicked("comment")}>
        <div class="icon">
            <i class="fa-regular fa-comment"></i>
        </div>

        <div class="icon">
                <p>{numOfComments}</p>
        </div>
    </div>

    
    
    <div class="icon-group icon-hover" role="button" on:click={() => btnClicked("share")}>
        <div class="icon">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        gap: 0.2rem;
    }

    .icon {
        font-size: 32px;
        color: wheat;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.5rem;
    }

    .icon-group {
        display: flex;
        background-color: #23262e;
        padding: 0.3rem;
        border-radius: 30px;
    }

    .karma {
        font-size: 24px;
        color: wheat;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.5rem;
    }

    .vote:hover {
        transition: 300ms ease;
        color: blueviolet;
        cursor: pointer;
    }

    .reacted {
        color: blueviolet;
    }

    .reacted:hover {
        color: rgb(150, 98, 199);
    }

    .icon-hover:hover {
        transition: 300ms ease;
        background-color: #2e313a;
        cursor: pointer;
    }
</style>