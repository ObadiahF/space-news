<svelte:head>
    <title>Settings</title>
</svelte:head>

<script>
    import '@fortawesome/fontawesome-free/css/all.min.css';

    import Toasts from "../../components/toast/Toasts.svelte";
    import { addToast, clearToasts } from "../../components/toast/toaststore";
    import { onMount } from 'svelte';

    onMount(() => {
      
    });

    let modalShowing = false;
</script>

<Toasts />
<main class="container">
    <div class="settings-section">
      <h1 class="section-title">Settings</h1>
      <p class="section-description">Manage your account settings.</p>
    </div>
    <div class="settings-section">
      <h2 class="subsection-title">Profile Picture</h2>
      <div class="option">
        <div class="profile-picture">JP</div>
        <button class="change-button" on:click={() => addToast({ message: "Posted Successfully!", type: "success", dismissible: true, timeout: 0 })}>
            <i class="fa-solid fa-file-arrow-up"></i>
            Change
        </button>
      </div>
    </div>
    <div class="settings-section">
      <h2 class="subsection-title">Username</h2>
      <div class="option">
        <input type="text" id="username" class="input-field" value="jaredpalmer">
        <button class="save-button">Save</button>
      </div>
    </div>
    <div class="settings-section">
      <h2 class="subsection-title">Email</h2>
      <div class="option">
        <input type="email" id="email" class="input-field" value="jared@example.com">
        <button class="save-button">Save</button>
      </div>
    </div>
    <div class="settings-section">
      <h2 class="subsection-title">Password</h2>
      <div class="option">
        <input type="password" id="password" class="input-field" value="********">
        <button class="save-button">Save</button>
      </div>
    </div>

    <div class="option">
        <button id="delete">Delete Account</button>
    </div>
  </main>

<style>
    .container {
  margin: 0 auto;
  padding: 20px;
  color: white;
}

.settings-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}


.section-description {
  color: #f0e7e7;
  margin-bottom: 2rem;
  margin-top: 0rem;
}

.subsection-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 1rem;
}

.option {
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-right: 10px;
}

.input-field {
  outline: none;
        padding: 1rem 0.5rem;
        background-color:#23262e;
        color: whitesmoke;
        border: 1px solid grey;
        border-radius: 8px;
        width: 70%;
        margin-right: 1rem;
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

#delete {
    background-color: red;
    border: none;
    width: 22rem;
}

#delete:hover {
    transition: 300ms ease;
    background-color: rgb(233, 45, 45);
}

@media screen and (max-width: 460px) {
    .option {
        flex-direction: column;
        align-items: start;
        gap: 1rem;
    }

    .input-field {
        width: 95%;
    }

    #delete {
        width: 18rem;
    }
}
</style>