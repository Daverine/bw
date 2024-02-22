<script>
import Shareables from './Shareables.vue';
import SvgIcon from './SvgIcon.vue';

export default {
    props: ['details', 'isSaved'],
    methods: {
        nextOpenDay(hours) {
            let ex = new Date().getDay() === 6 ? 0 : new Date().getDay() + 1, i = 1, result;
            for (; i < 6; i++) {
                if (hours[ex > 5 ? -1 + i : ex + i][0] > -1) {
                    result = ex > 5 ? -1 + i : ex + i;
                    break;
                }
            }
            return result;
        },
        whatDay(index) {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index];
        }
    },
    components: { SvgIcon, Shareables }
}
</script>
<template>
	<div class="fluid item-card card open-modal" :data-type="details.type" data-target="sc-details">
		<template v-if="details.type === 'product'">
			<div class="itm-display">
				<div class="itm-media">
					<canvas :style="`background-image: url(${details.displayImg})`"></canvas>
				</div>
			</div>
			<div class="itm-content">
				<a class="itm-title" :title="details.title">{{ details.title }}</a>
				<div class="itm-gap">
					<div>
						<span class="h5 bold 0-margined" style="color: var(--primary);">{{ details.price }}&nbsp;</span>
						<SvgIcon name="handshake" class="l-spaced small" v-if="details.negotiable" title="Negotiable" />
					</div>
					<div v-if="details.labels" class="labels" style="display: flex; gap: 0.5em;">
						<span v-for="label in details.labels" class="label">{{ label }}</span>
					</div>
				</div>
				<div class="itm-gap">
					<div class="truncate">
						<SvgIcon name="verified" v-if="details.verified" title="Verified" class="r-spaced mini green-text" />
						<a :href="details.bizUrl" target="_blank" :title="details.bizName" class="small semibold" style="color: var(--secondary);">{{ details.bizName }}</a>
					</div>
					<span :title="details.location.address" class="truncate" style="color: var(--on-surface-variant);">
						<SvgIcon name="location_on" class="mini r-spaced" />
						<span class="small semibold">{{ `${details.location.city }, ${details.location.state}` }}</span>
					</span>
				</div>
				<div class="itm-gap">
					<span class="small semibold" style="text-transform: capitalize; color: var(--on-surface-variant);">{{ details.type }}</span>
					<span v-if="details.rating" class="semibold" title="Average Rate (Number of raters)">
						<SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
						<span class="small">{{ `${details.rating.rate} (${details.rating.raters})` }}</span>
					</span>
				</div>
			</div>
		</template>
		<template v-else-if="details.type === 'service'">
			<div class="itm-display">
				<div class="itm-media">
					<canvas :style="`background-image: url(${details.displayImg})`"></canvas>
				</div>
			</div>
			<div class="itm-content">
				<a class="itm-title" :title="details.title">{{ details.title }}</a>
				<div class="itm-gap">
					<div>
						<span class="0-margined h6" style="font-weight: var(--bold-weight);">{{ details.priceDefinition }}&nbsp;</span>
						<span class="h5 bold 0-margined" style="color: var(--primary);">{{ details.price }}</span>
					</div>
					<div class="truncate" style="color: var(--on-surface-variant);">
						<SvgIcon name="timelapse" class="mini r-spaced" />
						<span class="small semibold">Deliver in {{ details.deliveryTime }} time.</span>
					</div>
				</div>
				<div class="itm-gap">
					<div class="truncate">
						<SvgIcon name="verified" v-if="details.verified" title="Verified" class="mini green-text r-spaced" />
						<a :href="details.bizUrl" target="_blank" :title="details.bizName" class="small semibold" style="color: var(--secondary);">{{ details.bizName }}</a>
					</div>
					<span :title="details.location.address" class="truncate" style="color: var(--on-surface-variant);">
						<SvgIcon name="location_on" class="mini r-spaced" />
						<span class="small semibold">{{ `${details.location.city }, ${details.location.state}` }}</span>
					</span>
				</div>
				<div class="itm-gap">
					<span class="small semibold" style="text-transform: capitalize; color: var(--on-surface-variant);">{{ details.type }}</span>
					<span v-if="details.rating" class="semibold" title="Average Rate (Number of raters)">
						<SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
						<span class="small">{{ `${details.rating.rate} (${details.rating.raters})` }}</span>
					</span>
				</div>
			</div>
		</template>
		<template v-else-if="details.type === 'business'">
			<div class="itm-display">
				<img :src="details.logo" class="image" />
				<SvgIcon v-if="details.verified" name="verified_sp" title="Verified" class="small green-text" style="position: absolute; bottom: 0px; right: 0px;" />
			</div>
			<div class="itm-content">
				<a class="itm-title">{{ details.bizName }}</a>
				<div class="itm-gap">
					<span class="small semibold">{{ details.mainCategory }}</span>
					<span :title="details.location.address" class="truncate" style="color: var(--on-surface-variant);">
						<SvgIcon name="location_on" class="mini r-spaced" />
						<span class="small semibold">{{ `${details.location.city }, ${details.location.state}` }}</span>
					</span>
				</div>
				<div class="semibold itm-gap">
					<span v-if="details.rating" class="semibold" title="Average Rate (Number of raters)">
						<SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
						<span class="small">{{ `${details.rating.rate} (${details.rating.raters})` }}</span>
					</span>
					<span :title="details.hours[new Date().getDay()][0] < 0 ? 'Did not open today at all.' : `Open today by ${details.hours[new Date().getDay()][0]}:00 and closes by ${details.hours[new Date().getDay()][1]}:00.`">
						<SvgIcon name="today" class="mini r-spaced" />
						<span class="small">
							<template v-if="details.hours[new Date().getDay()][0] < 0 || details.hours[new Date().getDay()][0] > new Date().getHours() || details.hours[new Date().getDay()][1] <= new Date().getHours()">
								<span class="negative-text">Closed.</span>
								<span v-if="details.hours[new Date().getDay()][0] > new Date().getHours()">Opens {{ details.hours[new Date().getDay()][0] }}</span>
								<span else>
									Opens
									{{
										details.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0] > -1
											? `${details.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0]}:00 Tomorrow`
											: `${details.hours[nextOpenDay(details.hours)][0]} on ${whatDay(nextOpenDay(details.hours))}`
									}}</span>
							</template>
							<template v-else>
								<span v-if="details.hours[new Date().getDay()][1] - new Date().getHours() < 2" class="caution-text">Closes soon. </span>
								<span v-else class="positive-text">Open. </span>
								<span>Closes {{ `${details.hours[new Date().getDay()][1]}:00` }}</span>
							</template>
						</span>
					</span>
				</div>
				<div class="itm-gap">
					<span class="small semibold" style="text-transform: capitalize; color: var(--on-surface-variant);">{{ details.type }}</span>
				</div>
			</div>
		</template>
		<template v-else-if="details.type === 'post'">
			<div class="itm-display">
				<div class="itm-media">
					<canvas :style="`background-image: url(${details.displayImg})`"></canvas>
				</div>
			</div>
			<div class="itm-content">
				<a class="itm-title">{{ details.textContent }}</a>
				<div class="itm-gap">
					<div class="truncate">
						<SvgIcon name="verified" v-if="details.verified" title="Verified" class="mini green-text r-spaced" />
						<a :href="details.bizUrl" target="_blank" :title="details.bizName" class="small semibold" style="color: var(--secondary);">{{ details.bizName }}</a>
					</div>
				</div>
				<div class="itm-gap">
					<span class="small semibold" style="text-transform: capitalize; color: var(--on-surface-variant);">{{ details.type }}</span>
				</div>
			</div>
		</template>
		<Shareables v-if="isSaved" name="isSaved_menu" />
	</div>
</template>

<style lang="scss">
	.item-card {
		--display-width: 11rem;
		--logo-width: 4.25rem;
		--itm-gap: 0.5rem;

		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: 100%;
		gap: var(--itm-gap);
		padding: 0.5rem;
		cursor: pointer;

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
			flex: 1 1 auto;
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

		@media only screen and (max-width : 500px) {
			.item-card {
				--display-width: 8rem;
			}
		}
	}
  </style>