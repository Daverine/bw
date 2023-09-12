<script>
    import { useMainStore } from '../stores';
	import { useUserStore } from '../stores/userStore';
    
    export default {
        props: ['name'],
        setup() {
			const
				mainStore = useMainStore(),
				userStore = useUserStore()
			;

			return { mainStore, userStore }
		},
        methods: {
            timeInDateJs(time) {
                time = time.split(':');
                let result = new Date();
                result.setHours(Number(time[0]));
                result.setMinutes(Number(time[1]));
                result.setSeconds(0);
                result.setMilliseconds(0);
                return result;
            }
        }
    }
</script>

<template>
    <Dropmenu v-if="name === 'profile_menu'" class="rounded">
        <div class="header centered item xhover">Welcome,<br /> Ayoola Folorunso</div>
        <router-link to="/profile" class="item"><SvgIcon name="person" class="lead" /> Profile</router-link>
        <router-link to="/feedback" class="item"><SvgIcon name="feedback" class="lead" /> Give feedback</router-link>
        <div class="item" @click="userStore.logout()"><SvgIcon name="logout" class="lead" /> Log out</div>
    </Dropmenu>
</template>