<script>

</script>

<button><slot /></button>

<style>
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
</style>