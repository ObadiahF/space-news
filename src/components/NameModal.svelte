<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement
    let name;
    let displayNameInput;
    let errorMsg = ""

$: if (dialog && showModal) dialog.showModal();

const setName = async () => {
    const displayName = displayNameInput.value;

    if (!displayName.trim() || !name) {
        errorMsg = "Please enter all fields correctly."
        name = "";
        displayNameInput.value = "";
        return
    }
    
    try {
        const req = await fetch('/api/changeName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name,
                displayName: displayName
             }),
        });

        const res = await req.json();

        if (res.success) {
            dialog.close();
        } else {
            errorMsg = res.errorMsg
        }
            
        } catch (e) {
            console.log(e);
            errorMsg = "Error Connecting to Server"
        }
}

const handleNameInput = (e) => {
    displayNameInput.value = name;
    name = name.replace(/\s/g, "");
}

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal">
        <div class="modal-content">
            <div class="content">
                <div class="header">
                    <h1>Choose User Name (required)</h1>
                    {#if errorMsg}
                         <p style="color: red;">{errorMsg}</p>
                    {/if}
                </div>
                <div class="input-container">
                    <p>You can't change this later</p>
                    <input maxlength="35" bind:value={name} placeholder="User Name" on:input={handleNameInput}/>
                    <p>You can change this later</p>
                    <input maxlength="35" bind:this={displayNameInput} placeholder="Display Name"/>
                </div>
                <button on:click={setName}>Confirm</button>
              </div>
            </div>
    </div>
</dialog>

<style>
 
	dialog {
		border-radius: 16px;
		border: none;
        outline: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.9);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

  .modal {
    width: 70vw;
    position: relative;
    text-align: center;
	background-color: #0E1217;
    border: 1px solid wheat;
    border-radius: 16px;
    color: white;
    
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .input-container input {
    background-color: #2e313a;
    font-size: 16px;
    border: 1px solid grey;
    color: white;
    padding: 0.5rem;
    height: 1.5rem;
    resize: none;
    border-radius: 18px;
    width: 50%;
    margin: 0 auto;
  }

  .input-container input:focus {
    outline: none;
  }

  .input-container input:hover {
    transition: 300ms ease;
    border: 1px solid wheat;
  }

  button {
    font-size: 24px;
    background-color: rgb(12, 221, 12);
    border: 1px solid black;
    color: white;
    width: 20rem;
    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 16px;
    cursor: pointer;
  }

  button:hover {
    transition: 300ms ease;
    background-color: rgb(93, 235, 93);
  }

  @media screen and (max-width: 862px) {
    .content {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .header {
      text-wrap: pretty;
    }
  }
</style>