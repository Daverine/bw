<script>
	export default {
		data() {
			return {
				allItemFiltered: false,
				allItemSelected: false
			}
		},
		methods: {
			dm_console(e) {
				if (e.detail === 'on allItemFiltered') this.allItemFiltered = true;
				else if (e.detail === 'off allItemFiltered') this.allItemFiltered = false;
				else if (e.detail === 'on allItemSelected') this.allItemSelected = true;
				else if (e.detail === 'off allItemSelected') this.allItemSelected = false;
			}
		},
		mounted() {
			this.$refs.dropMenu.addEventListener('dmconsole', this.dm_console);
		}
	}
</script>

<template>
	<div ref="dropMenu" class="drop menu">
		<slot></slot>
		<div v-if="allItemFiltered" class="ed-msg">No result found.</div>
		<div v-if="allItemSelected" class="ed-msg">All available items are selected.</div>
	</div>
</template>