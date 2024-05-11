<script>
    import { invalidateAll } from '$app/navigation';
    import { supabaseClient } from '$lib/supabase';
    import { page } from '$app/stores';  
    import Nav from '../components/Nav.svelte';
    import { onMount } from 'svelte';
    export let data;

    let isOnNewsPage = true;

    onMount(() => {
        const {
            data: { subscription }
        } = supabaseClient.auth.onAuthStateChange(() => {
            invalidateAll();
        });

        return () => {
            subscription.unsubscribe();
        };
    });

    $: {
        if ($page.url.pathname === "/") {
            isOnNewsPage = true;
        } else {
            isOnNewsPage = false;
        }
    }
</script>
<Nav session={data} onNewsPage={isOnNewsPage}/>
<slot />