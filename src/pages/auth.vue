<script setup>
    const userStore = useUserStore();
</script>
<template>
    <header>
        <div class="menu" style="height: 64px;">
            <div class="container items auto-margined" style="border-radius: var(--radius-default)">
                <div class="item as-icon open-sidepanel" v-tooltip.unblocking data-tooltip="Menu" data-target="msidepanel">
                    <SvgIcon name="menu" />
                </div>
                <router-link :to="userStore.auth ? '/home' : '/'" class="xhover item as-icon">
                    <img src="/images/logo_sqr.png" alt="site logo" class="logo-lg site-logo">
                </router-link>
            </div>
        </div>
    </header>

    <div v-if="$route.path === '/register'" class="grid" style="gap: 1.5rem; max-width: 650px; margin: 2rem auto;">
        <div class="col" style="background-image: linear-gradient(rgb(48 187 48), rgb(10 81 194)); filter: blur(5px);"></div>
        <div class="col">
            <div class="header" style="margin-bottom: 1rem;">
                <div class="bold">
                    Join BizWorld
                </div>
            </div>
            <div class="content">
                <div class="field">
                    <button class="left-labeled fluid button">
                        <SvgIcon name="login" class="label" />
                        Continue with Google
                    </button>
                </div>
                <form @submit.prevent="userStore.signup()">
                    <div class="field 0-margined">
                        <label>Names</label>
                        <div class="2-fields">
                            <div class="field">
                                <input type="text" placeholder="First name" class="fluid" />
                            </div>
                            <div class="field">
                                <input type="text" placeholder="Last name" class="fluid" />
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input type="text" placeholder="Email address" />
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input type="text" placeholder="Password" />
                    </div>
                    <div class="field">
                        <label>Country</label>
                        <input type="text" placeholder="Select country" />
                    </div>
                    <div class="field">
                        <p>By signing up, you agree to our <a href="#">terms of use</a> & <a href="#">privacy policy</a></p>
                        <button class="fluid primary button">Create Account</button>
                    </div>
                    <hr />
                    <div class="field centered">
                        <p>Already have an account? <router-link to="/login">Login</router-link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div v-else class="grid" style="gap: 1.5rem; max-width: 650px; margin: 2rem auto;">
        <div class="col" style="background-image: linear-gradient(rgb(48 187 48), rgb(10 81 194)); filter: blur(5px);"></div>
        <div class="col">
            <div class="header" style="margin-bottom: 1rem;">
                <div class="bold">
                    Login to BizWorld
                </div>
            </div>
            <div class="content">
                <div class="field">
                    <button class="left-labeled fluid button">
                        <SvgIcon name="login" class="label" />
                        Continue with Google
                    </button>
                </div>
                <form @submit.prevent="userStore.login()">
                    <div class="field">
                        <label>Email</label>
                        <input type="text" placeholder="Email address" />
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input type="text" placeholder="Password" />
                    </div>
                    <div class="field">
                        <button class="fluid primary button">Continue</button>
                    </div>
                    <hr />
                    <div class="field centered">
                        <p>New to BizWorld? <router-link to="/register">Sign up</router-link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
