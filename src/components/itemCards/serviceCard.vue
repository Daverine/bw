<script>
    export default {
        props: ['details'],
        data() {
            return {
                template: {
					cardId: 'ser39884',
					cardType: 'service',
					title: 'Create, design and format a document in Word, Powerpoint, Excel and CorelDRAW',
					media: [{ type: 'image', source: '/images/product.jpeg', alt: 'pic' }],
					priceDefinition: 'From',
					price: 'N100,000',
					currency: 'Naira',
					duration: '2 days',
					rating: { rate: 4.6, raters: 3440 },
					bizDetails: {
						name: 'Emmadave Computer Technology Services',
						url: 'https://www.edtech.com',
						place: {
							address: '3, Nepa road, beside Igbagboyemi Pharmacy,Isabo 111102',
							city: 'Abeokuta',
							state: 'Ogun state',
							map: 'https://goo.gl/mapsy9ExQLSq37FL6EHm6'
						},
						verify: true
					}
				},
            }
        }
    }
</script>
<template>
    <div class="itm-display">
        <div class="itm-media">
            <canvas :style="`background-image: url(${details.media.filter(el => el.type === 'image')[0].source})`"></canvas>
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
                <span class="small semibold">Deliver in {{ details.duration }} time.</span>
            </div>
        </div>
        <div class="itm-gap">
            <div class="truncate">
                <SvgIcon name="verified" v-if="details.bizDetails.verify" title="Verified" class="mini green-text r-spaced" />
                <a :href="details.bizDetails.url" target="_blank" :title="details.bizDetails.name" class="small aux-text semibold">{{ details.bizDetails.name }}</a>
            </div>
            <span :title="details.bizDetails.place.address" class="truncate" style="color: var(--on-surface-variant);">
                <SvgIcon name="location_on" class="mini r-spaced" />
                <span class="small semibold">{{ `${details.bizDetails.place.city }, ${details.bizDetails.place.state}` }}</span>
            </span>
        </div>
        <div class="itm-gap">
            <span class="small semibold" style="color: var(--on-surface-variant);">Service</span>
            <span v-if="details.rating" class="semibold" title="Average Rate (Number of raters)">
                <SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
                <span class="small">{{ `${details.rating.rate} (${details.rating.raters})` }}</span>
            </span>
        </div>
    </div>
</template>