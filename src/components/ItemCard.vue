<script>
	import businessCard from './itemCards/businessCard.vue';
	import productCard from './itemCards/productCard.vue';
	import serviceCard from './itemCards/serviceCard.vue';
	import postCard from './itemCards/postCard.vue';

	export default {
		props: ['details', 'isSaved'],
		components: { businessCard, productCard, serviceCard, postCard },
	}
</script>
<template>
	<div class="fluid item-card card open-modal" :class="isSaved ? 'sav': ''" :data-type="details.cardType" data-target="sc-details">
		<businessCard v-if="details.cardType === 'business'" :details="details" />
		<productCard v-else-if="details.cardType === 'product'" :details="details" />
		<serviceCard v-else-if="details.cardType === 'service'" :details="details" />
		<postCard v-else-if="details.cardType === 'post'" :details="details" />

		<div v-if="isSaved" class="itm-opt ex-open-modal">
			<Dropdown :options="{directionPriority: {x: 'left', y: 'bottom'}}" class="icon circular transparent compact button">
				<SvgIcon name="more_vert" />
				<Dropmenu>
					<div class="item"><SvgIcon name="share" class="lead" /> Share</div>
					<div class="item"><SvgIcon name="bookmark_remove" class="lead" /> Unsave</div>
				</Dropmenu>
			</Dropdown>
		</div>
	</div>
</template>

<style lang="scss">
	.item-card {
		--display-width: 11rem;
		--logo-width: 4.25rem;
		--itm-gap: 0.5rem;

		display: flex;
		flex-flow: row wrap;
		align-items: center;
		width: 100%;
		gap: var(--itm-gap);
		padding: 0.5rem;
		cursor: pointer;
		position: relative;

		&.sav {
			padding-right: 2.5em;
		}

		.itm-opt {
			position: absolute;
			right: 0em;
			top: 1em;
		}

		.itm-display {
			position: relative;
			width: 100%;
			max-width: var(--display-width);
			flex: 0 0 auto;
			border-radius: inherit !important;
			
			.itm-media {
				position: relative;
				width: 100%;
				height: 0rem;
				padding-top: 75%;
				
				canvas {
					position: absolute;
					height: 100%;
					width: 100%;
					top: 0px;
					left: 0px;
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
			}
		}

		.itm-content {
			flex: 1 1 0;
			min-width: 55%;
			align-self: stretch;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-radius: inherit;
		}

		.itm-title {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			overflow: hidden;
			font-size: 1.125em;
			font-weight: var(--semibold-weight);
			color: var(--on-surface);
			line-height: 1.25 !important;
			width: 100%;
			padding-bottom: 0.125em;
			margin: 0 0 0.125em !important;
		}

		.itm-gap {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: center;
			gap: 0.5em;
		}

		&[data-type="business"] {
			.itm-display {
				width: var(--logo-width);
				height: var(--logo-width);
			}

			.itm-content {
				width: calc(100% - var(--logo-width) - var(--itm-gap)); /* 100% - itm-display width - gap width */
			}
		}

		&[data-type="post"] {
			.itm-title { -webkit-line-clamp: 3; }
		}

		@media only screen and (max-width : 500px) {
			.item-card {
				--display-width: 8rem;
			}
		}
	}
  </style>