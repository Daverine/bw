<script>
import utils from './utils';
import panel from './panel';

export default {
	mixins: [utils, panel],
	data() {
		return {
			default: {
				namespace: 'modal',
				toBeConsidered: ':scope .dialog, :scope .md-control',
				triggerer: '.open-modal',
				setHighlightRange: true,
				setTabRange: true,
				closeOnEsc: true,
				closeOnWrapperClick: true,
				dismissible: true,
				autoFocusEl: ':scope [md-autofocus]',
				dismisser: '.exit-modal',
				lockScreen: true,
				inDuration: 500,
				outDuration: 500
			}
		}
	}
}
</script>
<template>
	<div ref="panel" :id="id" class="modal" tabindex="-1">
		<slot></slot>
	</div>
</template>