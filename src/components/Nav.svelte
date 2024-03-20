<script>
    import Media from '../utils/MediaQuery.svelte'
</script>

<nav>
    <div class="logo">
        <h1>Space News 🚀</h1>
    </div>
        
        <div class="links">
            <button><i class="fa-solid fa-plus"></i> New Post</button>
            <button><i class="fa-regular fa-bell"></i></button>
            <button>Log In <i class="fa-solid fa-right-to-bracket"></i></button>
        </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        background-color: #0E1217;
        border-bottom: 1px solid grey;
        padding: 0.5rem 2rem;
    }

    h1 {
        color: white;
        font-size: 32px;
        font-weight: bold;
        margin: 0;
    }

    .links {
        display: flex;
        gap: 1rem;
    }

    button {
        color: white;
        background-color: inherit;
        font-size: 18px;
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        border-radius: 8px;
        border: 2px solid gray;
    }

    button:hover {
        transition: 300ms ease;
        background-color: #23262e;
    }

    @media screen and (max-width: 690px) {

    }
</style>