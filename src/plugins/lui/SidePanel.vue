<script>
import utils from './utils';
import panel from './panel';

export default {
	mixins: [utils, panel],
	data() {
		return {
			default: {
				namespace: 'sidepanel',
				toBeConsidered: ':scope .panel, :scope .sp-control',
				triggerer: '.open-sidepanel',
				setHighlightRange: true,
				setTabRange: true,
				closeOnEsc: true,
				closeOnWrapperClick: true,
				dismissible: true,
				dismisser: '.exit-sidepanel',
				lockScreen: true,
				inDuration: 500,
				outDuration: 500
			}
		}
	}
}
</script>
<template>
	<div ref="panel" class="sidepanel" :id="id" tabindex="-1">
		<slot></slot>
	</div>
</template>