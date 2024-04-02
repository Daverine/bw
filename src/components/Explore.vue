<template>
    <div class="dialog self-scroll">
        <div class="header grid">
            <div class="bold">
            </div>
            <button class="circular text button as-text exit-modal" style="margin-left: auto;">
                <SvgIcon name="close" />
            </button>
        </div>
        <div class="content">
            <div class="centered"><button class="button"><SvgIcon name="trending_up" class="small lead" /> Trending</button></div>
            <div class="heading">Business categories</div>
            <div class="grid">
                <button class="chip"><SvgIcon name="restaurant" class="small lead" /> Restaurants</button>
                <button class="chip"><SvgIcon name="local_bar" class="small lead" /> Bars</button>
                <button class="chip"><SvgIcon name="local_parking" class="small lead" /> Parks</button>
                <button class="chip"><SvgIcon name="hotel" class="small lead" /> Hotels</button>
                <button class="chip"><SvgIcon name="shopping_cart" class="small lead" /> Groceries</button>
                <button class="chip"><SvgIcon name="local_gas_station" class="small lead" /> Filling stations</button>
                <button class="chip"><SvgIcon name="local_pharmacy" class="small lead" /> Pharmacies</button>
                <button class="chip"><SvgIcon name="local_hospital" class="small lead" /> Hospitals and clinics</button>
                <button class="chip"><SvgIcon name="more_horiz" class="small lead" /> More</button>
            </div>
            <div class="heading">Product categories</div>
            <div class="grid">
                <button class="chip"><SvgIcon name="restaurant" class="small lead" /> Vehicles</button>
                <button class="chip"><SvgIcon name="local_bar" class="small lead" /> Property</button>
                <button class="chip"><SvgIcon name="local_parking" class="small lead" /> Mobile Phones & Tablets</button>
                <button class="chip"><SvgIcon name="hotel" class="small lead" /> Electronics</button>
                <button class="chip"><SvgIcon name="shopping_cart" class="small lead" /> Home Funiture & Appliances</button>
                <button class="chip"><SvgIcon name="local_gas_station" class="small lead" /> Health & Beauty</button>
                <button class="chip"><SvgIcon name="local_pharmacy" class="small lead" /> Fashion</button>
                <button class="chip"><SvgIcon name="local_hospital" class="small lead" /> Arts</button>
                <button class="chip"><SvgIcon name="local_hospital" class="small lead" /> Food & Beverage</button>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
    .grid {
        justify-content: center;
        gap: 0.5em;
    }
    .chip {
        margin-bottom: 0.25em;
    }
</style>