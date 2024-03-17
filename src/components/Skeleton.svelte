<script>
</script>

<div class="article">
    <div class="header loader">
        
    </div>
    <div class="title loader">

    </div>
    <div class="title short loader">

    </div>
    <div class="img-container loader">
        
    </div>
    <div class="icons">
        <div class="icon-group">
            <div class="icon">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <i class="fa-solid fa-arrow-up bye"
                type="button"
                ></i>    
            </div>
            <div class="karma bye">
                <p>0</p>
            </div>
            <div class="icon">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <i class="fa-solid fa-arrow-down vote bye"
                type="button"
                ></i>    
            </div>
        </div>
        <div class="icon-group icon-hover">
            <div class="icon">
                <i class="fa-regular fa-comment bye"></i>
            </div>

        <div class="icon bye">
                <p>0</p>
        </div>
    </div>
    
    <div class="icon-group icon-hover">
        <div class="icon">
            <i class="fa-solid fa-arrow-up-from-bracket bye"></i>
        </div>
    </div>
</div>
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


    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0E1217;
        height: 150px;
    }


    .header {
        height: 2rem;
        background-color: #0E1217;
    }

    .title {
        background-color: #0E1217;
        height: 2rem;
        width: 95%;
    }

    .short {
        width: 50%;
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

    .icons {
        display: flex;
        gap: 0.2rem;
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

    .bye {
        opacity: 0;
    }

    .loader {
      background: linear-gradient(90deg, #0E1217 15%, #23262E 50%);
      background-size: 200% 100%;
      animation: loading 3s infinite;
    }

    @keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>