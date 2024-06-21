<template>
    <div class="as-page">
        <Shareables name="common_header" />
		<section id="firstSec" ref="main" class="container csection grid">
			<Shareables name="page_nav" />
            <slot />
            <Shareables name="ad_menu" />
        </section>
    </div>
</template>