<script>
    import { onMount } from "svelte";
    import ToolTip from "../../components/Tooltip.svelte";
    import { goto } from "$app/navigation";
    export let data;
    export let form;

    let emailInput;
    let passwordInput;
    let errorMsg = "";
    let successMsg = "";
    let isLoggedIn = false;
    onMount(() => {
        isLoggedIn = data.session !== null && true;

        if (isLoggedIn) {
            goto('/')
        }
    })

    const signin = (event) => {
    //reset error msg
    errorMsg = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Input validation
    if (!email) {
        errorMsg = 'Email is required';
    } else if (!isValidEmail(email)) {
        errorMsg = 'Please enter a valid email address';
    } else if (!password) {
        errorMsg = 'Password is required';
    } else if (password.length < 6) {
        errorMsg = 'Password must be at least 6 characters';
    }

    if (errorMsg) {
        event.preventDefault();
        return;
    };
    event.target.submit();
};

$: {
    if (form?.success === false) {
        errorMsg = form.message;
    }
}


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
};
</script>


<div class="login-container">
    <div class="login-form">
        <div class="title-container">
            <h1>Login</h1>
            <ToolTip text={"Go Back"}>
            <a href="/"><i class="fa-solid fa-x"></i></a>
            </ToolTip>
        </div>
        <form action="?/login" method="POST" on:submit={signin}>
                <span class="error good">{successMsg}</span>
                <span class="error">{errorMsg}</span>
            <div class="form-group">
                <label for="username">Email</label>
                <input type="text"
                    id="Email" 
                    name="email" 
                    placeholder="Enter your Email" 
                    maxlength="50" 
                    bind:this={emailInput}
                >
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                    id="password"
                    name="password" 
                    placeholder="Enter your password" 
                    maxlength="150" 
                    bind:this={passwordInput}
                >
            </div>

            <div class="form-group link">
                <a href="/signup"><span>Don't have an account?</span></a>
            </div>

            <div class="form-group">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</div>

<style>
    /* Styles for Login Form */
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #000000;
        background-image: url('https://plus.nasa.gov/wp-content/uploads/2023/08/uk-france-night-2016-EARTH1116-2c03d786e8824e13ad10758aa8bd832f.jpg');
        background-size: cover;
    }

    .login-form {
        background-color: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
        width: 20rem;
    }

    h1 {
        color: #ffffff;
        margin: 0;
        font-size: 42px;
        margin-bottom: 20px;
    }

    .form-group {
        flex-direction: column;
        margin-top: 1rem;
    }

    label {
        display: block;
        color: #ffffff;
        font-size: 18px;
        margin-bottom: 5px;
        text-align: left;
    }

    input {
        width: 90%;
        padding: 0.7rem 1rem;
        border-radius: 5px;
        border: none;
        background-color: rgba(255, 255, 255, 0.3);
        color: #ffffff;
        font-size: 16px;
    }

    button[type="submit"] {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: blueviolet;
        color: #ffffff;
        font-size: 18px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    input:focus {
        outline: none;
    }

    button[type="submit"]:hover {
        transition: 300ms ease-in;
        background-color: rgb(159, 81, 233);
    }

    span {
        color: blue;
        text-align: left;
        cursor: pointer;
    }

    .link {
        margin-top: 2rem;
    }

    .error {
        color: rgb(255, 0, 0);
        font-weight: bold;
        font-size: 16px;
    }

    .good {
        color: rgb(3, 240, 3);
    }

    .title-container {
        display: flex;
        justify-content: space-between;
    }

    .title-container i {
        font-size: 32px;
        color: #ffffff;
        padding: 0.5rem;
    }

    .title-container i:hover {
        transition: 300ms ease;
        color: blueviolet;
        cursor: pointer;
    }

    @media screen and (max-width: 415px) {
        .login-form {
            width: 15rem;
        }

        input {
            width: auto;
        }
    } 
</style>
