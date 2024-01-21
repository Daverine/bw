<script>
    export default {
        props: ['details'],
        data() {
            return  {
                activeFixedMenu: false
                // details: {
                //     "type": "business",
                //     "logo": "images/logo-sq.png",
                //     "bizName": "Emmadave Computer Technology Services",
                //     "bizUrl": "https://www.edtech.com",
                //     "description": "We offer technical services on laptop and desktop. We offer computer tech training We also do web development.",
                //     "contacts": {
                //         "tel": "08157483233",
                //         "email": "contact_us@edtech.com"
                //     },
                //     "location": {
                //         "address": "3 Nepal road, beside Igbagboyemi Pharmacy, Isabo 111102",
                //         "city": "Abeokuta",
                //         "state": "Ogun State",
                //         "url": "https://goo.gl/maps/y9ExQLSq37FL6EHm6"
                //     },
                //     "verified": true,
                //     "mainCategory": "Computer repair services",
                //     "rating": { "rate": 3.5, "raters": 30 },
                //     "reviews": [
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 4,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 3,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 3,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 2,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 2,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 2,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 4,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 4,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 4,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 4,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         },
                //         {
                //             "userid": "e8e34",
                //             "username": "daverine",
                //             "userpic": "images/profile_pic.jpg",
                //             "anonymous": false,
                //             "timestamp": 1694061107318,
                //             "rating": 4,
                //             "review": "I enjoy my experience doing business with you guys. keep it up."
                //         }
                //     ],
                //     "hours": [
                //         [-1],
                //         ["8:30", "18:30"],
                //         ["8:30", "18:30"],
                //         ["15:30", "18:30"],
                //         ["8:30", "18:30"],
                //         [-1],
                //         ["8:30", "18:30"]
                //     ],
                //     "template": {
                //         "userid": "e8e34",
                //         "username": "daverine",
                //         "userpic": "images/profile_pic.jpg",
                //         "anonymous": false,
                //         "timestamp": 1694061107318,
                //         "rating": 4,
                //         "review": "I enjoy my experience doing business with you guys. keep it up."
                //     }
                // }
            }
        },
        computed: {
            maxCol() {
                let cols = [];

                for(let i = 1; i < 24; i++) {
                    cols.push(this.todaySch.filter(el => el.includes(i)).length);
                }

                return Math.max(...cols);
            }
        },
        methods: {
            nextOpenDay(hours) {
                let
                    ex = new Date().getDay() === 6 ? 0 : new Date().getDay() + 1,
                    i = 1,
                    result
                ;

                for(; i < 6; i++) {
                    if (hours[ex > 5 ? -1+i : ex+i][0] !== -1) {
                        result = ex > 5 ? -1+i : ex+i;
                        break;
                    }
                }

                return result;
            },
            getMinutes(time) {
                time = time.split(':');
                return Number(time[0]) * 60 + Number(time[1]);
            },
            to12hrsTime(time) {
                time = time.split(':');
                return `${(Number(time[0]) % 12) || 12}:${time[1]}${Number(time[0]) >= 12 ? 'PM' : 'AM'}`;
            },
            whatDay(index) {
                return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][index];
            },
            handleScroll() {
				if (this.$refs.divider.getBoundingClientRect().top <= 210) {
					this.activeFixedMenu = true;
				}
				else { this.activeFixedMenu = false; } 
			}
        },
        updated() {
            if (this.details) this.$refs.dgContent.dispatchEvent(new Event("scroll"));
        }
    }
</script>

<template>
    <div v-if="details" class="dialog self-scroll rounded sc-dialog" :data-type="details.type">
        <template v-if="details.type === 'business'">
            <div class="header dm-header a-block grid" :class="{ active: activeFixedMenu }">
                <div class="content h6 semibold 0-margined truncate">{{ details.bizName }}</div>
                <button class="circular button trailing icon exit-modal">
                    <SvgIcon name="close" />
                </button>
            </div>
            <div ref="dgContent" class="content 0-padding" @scroll="handleScroll">
                <div class="dm-display">
                    <div class="dm-media" :style="`background-image: url('${details.coverPic}')`"></div>
                </div>
                <div style="padding: 1em 1.5em;">
                    <div class="dm-gap">
                        <div class="dm-logo" :style="`background-image: url('${details.logo}')`">
                            <SvgIcon v-if="details.verified" name="verified_sp" title="Verified" class="green-text" style="position: absolute; bottom: -3px; right: -5px;" />
                        </div>
                        <div class="dm-heading">
                            <h4 class="dm-title">{{ details.bizName }}</h4>
                            <div style="color: var(--secondary)">{{ details.mainCategory }}</div>
                        </div>
                    </div>
                    <div class="dm-gap">
                        <div class="semibold" title="Average Rate (Number of raters)">
                            <SvgIcon name="star_filled" class="yellow-text small r-spaced" />
                            <span>{{ `${(details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)} (${details.reviews.length} reviews)` }}</span>
                        </div>
                        <div :title="details.hours[new Date().getDay()][0] === -1 ? 'Did not open today at all.' : `Open today by ${to12hrsTime(details.hours[new Date().getDay()][0])} and closes by ${to12hrsTime(details.hours[new Date().getDay()][1])}.`">
                            <SvgIcon name="today" class="small r-spaced" />
                            <span class="semibold">
                                <template v-if="details.hours[new Date().getDay()][0] === -1 || getMinutes(details.hours[new Date().getDay()][0]) > getMinutes(`${new Date().getHours()}:${new Date().getMinutes()}`) || getMinutes(details.hours[new Date().getDay()][1]) <= getMinutes(`${new Date().getHours()}:${new Date().getMinutes()}`)">
                                    <span class="negative-text">Closed.</span>
                                    <span v-if="typeof(details.hours[new Date().getDay()][0]) === 'string' && getMinutes(details.hours[new Date().getDay()][0]) > getMinutes(`${new Date().getHours()}:${new Date().getMinutes()}`)">Opens {{ to12hrsTime(details.hours[new Date().getDay()][0]) }} Today</span>
                                    <span v-else>
                                        Opens
                                        {{
                                            details.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0] !== -1
                                                ? `${to12hrsTime(details.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0])} Tomorrow`
                                                : `${to12hrsTime(details.hours[nextOpenDay(details.hours)][0])} on ${whatDay(nextOpenDay(details.hours))}`
                                        }}
                                    </span>
                                </template>
                                <template v-else>
                                    <span v-if="getMinutes(details.hours[new Date().getDay()][1]) - getMinutes(`${new Date().getHours()}:${new Date().getMinutes()}`) <= 60" class="caution-text">Closes soon. </span>
                                    <span v-else class="positive-text">Open. </span>
                                    <span>Closes {{ details.hours[new Date().getDay()][1] }}</span>
                                </template>
                            </span>
                            <SvgIcon name="info" class="mini l-spaced" style="color: var(--on-surface-variant);" title="Note that the given detail is generated using your system time relative to the Business location timezone." />
                        </div>
                    </div>
                    <hr ref="divider" />
                    <div>
                        <table class="dm-info table borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <SvgIcon name="domain" />
                                    </td>
                                    <td>{{ details.description }} <a :href="`${details.bizUrl}/about_us`" target="_blank">Learn more.</a></td>
                                </tr>
                                <tr>
                                    <td>
                                        <SvgIcon name="location_on" />
                                    </td>
                                    <td>{{ `${details.location.address}, ${details.location.city}, ${details.location.state}.` }}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <SvgIcon name="call" />
                                    </td>
                                    <td>{{ details.contacts.tel }}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <SvgIcon name="public" />
                                    </td>
                                    <td class="link">
                                        <a :href="details.bizUrl" target="_blank">{{ details.bizUrl }}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SvgIcon name="today" />
                                    </td>
                                    <td>
                                        <table class="table compact clear 0-margined">
                                            <tbody>
                                                <tr v-for="(hour, i) in details.hours" :key="i" :class="{'active': new Date().getDay() === i}">
                                                    <td>{{ whatDay(i) }}</td>
                                                    <td>{{ hour[0] === -1 ? 'Closed' : `${to12hrsTime(hour[0])} - ${to12hrsTime(hour[1])}` }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div>
                        <div class="sub heading">Review Summary</div>
                        <div class="grid" style="flex-direction: row-reverse;">
                            <div class="col 12-width md-4-width">
                                <div class="centered" :set="rating = (details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)">
                                    <div class="semibold" style="font-size: 3em;">{{ (details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1) }}</div>
                                    <div class="rating small yellow-text">
                                        <SvgIcon v-for="i in Math.floor(rating)" name="star_filled" />
                                        <SvgIcon v-if="rating - Math.floor(rating) >= 0.5" name="star_half" />
                                        <SvgIcon v-for="i in (5 - Math.round(rating))" name="star" />
                                    </div>
                                    <div>{{ `${details.reviews.length} reviews` }}</div>
                                </div>
                            </div>
                            <div class="col 12-width md-8-width">
                                <table class="table compact borderless 0-margined">
                                    <tbody>
                                        <tr v-for="i in 5" :set="(n = 6 - i)">
                                            <td style="width: 15px;">{{ n }}</td>
                                            <td>
                                                <div class="progress-bar">
                                                    <div class="determinate" :style="`width: ${details.reviews.filter((elem) => elem.rating === n).length * 100/details.reviews.length}%;`"></div>
                                                </div>
                                            </td>
                                            <td style="width: 15px; text-align: right;">{{ `(${details.reviews.filter((elem) => elem.rating === n).length})` }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="centered small semibold italic">
                            Patronize {{ this.details.bizName }} to write a review.
                            <!-- <button class="button">
                                <SvgIcon name="rate_review" class="lead" />
                                Write a review
                            </button> -->
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div class="dm-gap">
                            <div class="sub heading">Latest Reviews</div>
                            <!-- <Dropdown class="outlined small fully-rounded button">
                                <SvgIcon name="sort" class="lead" />
                                Sort
                                <Dropmenu class="rounded">
                                    <div class="item">Newest</div>
                                    <div class="item">Highest</div>
                                    <div class="item">Lowest</div>
                                </Dropmenu>
                            </Dropdown> -->
                        </div>
                        <div class="dm-reviews">
                            <div v-for="a in Math.min(5, details.reviews.length)" class="dm-review" :set="review = details.reviews[a - 1]">
                                <header>
                                    <div class="avatar image"><span class="huge">{{ review.username.split('')[0].toUpperCase() }}</span></div>
                                    <div class="content">
                                        <div class="bold">{{ review.username }}</div>
                                        <div class="dm-gap" style="gap: 0.5em;">
                                            <div class="rating mini yellow-text" :set="rating = review.rating">
                                                <SvgIcon v-for="i in Math.floor(rating)" name="star_filled" />
                                                <SvgIcon v-if="rating - Math.floor(rating) >= 0.5" name="star_half" />
                                                <SvgIcon v-for="i in (5 - Math.round(rating))" name="star" />
                                            </div>
                                            <div>Render Time here.</div>
                                        </div>
                                    </div>
                                    <Dropdown>
                                        <SvgIcon name="more_vert" />
                                        <Dropmenu class="small">
                                            <div class="item"><SvgIcon name="flag" class="lead" /> Report</div>
                                        </Dropmenu>
                                    </Dropdown>
                                </header>
                                <article>{{ review.review }}</article>
                            </div>
                            <div v-if="details.reviews.length > 5" class="centered"><a href="#" class="text primary button">More reviews ({{ details.reviews.length - 5 }})</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer auto-t-bordered grid" style="gap: 0.5em;">
                <button class="primary rounded button">Visit Business Page</button>
                <button class="secondary circular button"><SvgIcon name="direction_filled" /></button>
                <button class="circular button"><SvgIcon name="share_filled" /></button>
                <button class="outlined circular button" style="margin-left: auto;"><SvgIcon name="bookmark" /></button>
            </div>
        </template>
        <template v-else-if="details.type === 'product'">
            <div class="header dm-header grid a-block" :class="{ active: activeFixedMenu }">
                <div class="content h6 semibold 0-margined truncate">{{ details.title }}</div>
                <button class="circular button trailing icon exit-modal">
                    <SvgIcon name="close" />
                </button>
            </div>
            <div ref="dgContent" class="content 0-padding" @scroll="handleScroll">
                <div class="dm-display">
                    <div class="dm-media">
                        <Carousel class="dm-dps" :options="{slidesHeight: 'inherit'}">
                            <div v-for="slide in details.media" class="cs-slide">
                                <img v-if="slide[0] === 'pic'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" :style="`width: 100%; height: 100%; background-image: url(${slide[1]}); background-size: contain; background-repeat: no-repeat; background-position: center;`"/>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div style="padding: 1em 1.5em;">
                    <div class="dm-heading">
                        <span :title="details.bizData.location.address" class="truncate" style="color: var(--on-surface-variant);">
                            <SvgIcon name="location_on" class="mini r-spaced" />
                            <span class="small semibold">{{ `${details.bizData.location.city }, ${details.bizData.location.state}` }}</span>
                        </span>
                        <h4 class="dm-title">{{ details.title }}</h4>
                        <div class="dm-gap">
                            <div title="Average Rate (Number of raters)">
                                <SvgIcon name="star_filled" class="yellow-text small r-spaced" />
                                <span class="semibold">{{ `${(details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)} (${details.reviews.length} reviews)` }}</span>
                            </div>
                            <div>
                                <span class="h5 bold 0-margined" style="color: var(--primary);">{{ details.price }}&nbsp;</span>
                                <SvgIcon name="handshake" class="l-spaced small" v-if="details.negotiable" title="Negotiable" />
                            </div>
                        </div>
                    </div>
                    <hr ref="divider" />
                    <div v-collapsible class="sub heading a-block active">
                        <SvgIcon name="overview" class="lead icon" />
                        Product Overview
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <p>This product is suitable for office use and it also presentable. It has a long lasting battery and its capable of handling comming computer daily tasks.</p>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="list_alt" class="lead icon" />
                        Specifications
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <table class="basic definition table">
                            <tr v-for="(value, key) in details.specifications">
                                <td>{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                        </table>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="local_shipping" class="lead icon" />
                        Delivery
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <a href="https://www.bw.net/thirdparty-delivery" target="_blank" class="caution rounded compact action note">
                            <SvgIcon name="local_shipping" class="lead huge" />
                            <div class="content">
                                <div class="heading">Third-party Delivery</div>
                                <div class="aux">Click here to check our list of third-party delivery providers.</div>
                            </div>
                            <SvgIcon name="chevron_right" class="trailing" />
                        </a>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="security" class="lead icon" />
                        Buyer's Protection
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <div class="rounded compact positive note">
                            <div class="lead">
                                <SvgIcon name="verified_user" class="huge" />
                            </div>
                            <div class="content">
                                <div class="heading">Escrow Payment</div>
                                <div class="aux">The seller receives escrow payment. So you can be assured to get your ordered product.</div>
                            </div>
                        </div>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="reviews" class="lead icon" />
                        Ratings and Reviews
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <section>
                            <div class="grid" style="flex-direction: row-reverse;">
                                <div class="col 12-width md-4-width">
                                    <div class="centered" :set="rating = (details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)">
                                        <div class="semibold" style="font-size: 3em;">{{ (details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1) }}</div>
                                        <div class="rating small yellow-text">
                                            <SvgIcon v-for="i in Math.floor(rating)" name="star_filled" />
                                            <SvgIcon v-if="rating - Math.floor(rating) >= 0.5" name="star_half" />
                                            <SvgIcon v-for="i in (5 - Math.round(rating))" name="star" />
                                        </div>
                                        <div>{{ `${details.reviews.length} reviews` }}</div>
                                    </div>
                                </div>
                                <div class="col 12-width md-8-width">
                                    <table class="table compact borderless 0-margined">
                                        <tbody>
                                            <tr v-for="i in 5" :set="(n = 6 - i)">
                                                <td style="width: 15px;">{{ n }}</td>
                                                <td>
                                                    <div class="progress-bar">
                                                        <div class="determinate" :style="`width: ${details.reviews.filter((elem) => elem.rating === n).length * 100/details.reviews.length}%;`"></div>
                                                    </div>
                                                </td>
                                                <td style="width: 15px; text-align: right;">{{ `(${details.reviews.filter((elem) => elem.rating === n).length})` }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="centered">
                                <span class="small semibold italic">Patronize {{ details.bizData.bizName }} to write a review.</span>
                                <!-- <button class="button">
                                    <SvgIcon name="rate_review" class="lead" />
                                    Write a review
                                </button> -->
                            </div>
                        </section>
                        <hr />
                        <div>
                            <div class="dm-gap">
                                <div style="font-weight: var(--semibold-weight)">Reviews</div>
                                <Dropdown class="outlined small fully-rounded button">
                                    <SvgIcon name="sort" class="lead" />
                                    Sort
                                    <Dropmenu class="rounded">
                                        <div class="item">Newest</div>
                                        <div class="item">Highest</div>
                                        <div class="item">Lowest</div>
                                    </Dropmenu>
                                </Dropdown>
                            </div>
                            <div class="dm-reviews">
                                <div v-for="a in Math.min(5, details.reviews.length)" class="dm-review" :set="review = details.reviews[a - 1]">
                                    <header>
                                        <div class="avatar image"><span class="huge">{{ review.username.split('')[0].toUpperCase() }}</span></div>
                                        <div class="content">
                                            <div class="bold">{{ review.username }}</div>
                                            <div class="dm-gap" style="gap: 0.5em;">
                                                <div class="rating mini yellow-text" :set="rating = review.rating">
                                                    <SvgIcon v-for="i in Math.floor(rating)" name="star_filled" />
                                                    <SvgIcon v-if="rating - Math.floor(rating) >= 0.5" name="star_half" />
                                                    <SvgIcon v-for="i in (5 - Math.round(rating))" name="star" />
                                                </div>
                                                <div>Render Time here.</div>
                                            </div>
                                        </div>
                                        <Dropdown>
                                            <SvgIcon name="more_vert" />
                                            <Dropmenu class="small">
                                                <div class="item"><SvgIcon name="flag" class="lead" /> Report</div>
                                            </Dropmenu>
                                        </Dropdown>
                                    </header>
                                    <article>{{ review.review }}</article>
                                </div>
                                <div v-if="details.reviews.length > 5" class="centered"><a href="#" class="text primary button">More reviews ({{ details.reviews.length - 5 }})</a></div>
                            </div>
                        </div>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="store" class="lead icon" />
                        Seller's Information
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="a-block collapsible">
                        <div class="lead" style="position: relative; align-self: center;">
                            <img :src="details.bizData.logo" class="loose avatar image" />
                            <SvgIcon name="verified_sp" title="Verified" class="small green-text" style="position: absolute; bottom: 0px; right: 0px;" />
                        </div>
                        <div class="content">
                            <a href="#" style="font-weight: var(--bold-weight);">{{ details.bizData.bizName }}</a>
                            <div class="sc-gap">
                                <span class="small semibold">{{ details.bizData.mainCategory }}</span>
                                <span :title="details.bizData.location.address" class="truncate" style="color: var(--on-surface-variant);">
                                    <SvgIcon name="location_on" class="mini r-spaced" />
                                    <span class="small semibold">{{ `${details.bizData.location.city }, ${details.bizData.location.state}` }}</span>
                                </span>
                            </div>
                            <div class="semibold sc-gap">
                                <span v-if="details.bizData.rating" class="semibold" title="Average Rate (Number of raters)">
                                    <SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
                                    <span class="small">{{ `${details.bizData.rating.rate} (${details.bizData.rating.raters})` }}</span>
                                </span>
                                <span :title="details.bizData.hours[new Date().getDay()][0] < 0 ? 'Did not open today at all.' : `Open today by ${details.bizData.hours[new Date().getDay()][0]}:00 and closes by ${details.bizData.hours[new Date().getDay()][1]}:00.`">
                                    <SvgIcon name="today" class="mini r-spaced" />
                                    <span class="small">
                                        <template v-if="details.bizData.hours[new Date().getDay()][0] < 0 || details.bizData.hours[new Date().getDay()][0] > new Date().getHours() || details.bizData.hours[new Date().getDay()][1] <= new Date().getHours()">
                                            <span class="negative-text">Closed.</span>
                                            <span v-if="details.bizData.hours[new Date().getDay()][0] > new Date().getHours()">Opens {{ details.bizData.hours[new Date().getDay()][0] }}</span>
                                            <span else>
                                                Opens
                                                {{
                                                    details.bizData.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0] > -1
                                                        ? `${details.bizData.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0]}:00 Tomorrow`
                                                        : `${details.bizData.hours[nextOpenDay(details.bizData.hours)][0]} on ${whatDay(nextOpenDay(details.bizData.hours))}`
                                                }}</span>
                                        </template>
                                        <template v-else>
                                            <span v-if="details.bizData.hours[new Date().getDay()][1] - new Date().getHours() < 2" class="caution-text">Closes soon. </span>
                                            <span v-else class="positive-text">Open. </span>
                                            <span>Closes {{ `${details.bizData.hours[new Date().getDay()][1]}:00` }}</span>
                                        </template>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="footer auto-t-bordered grid" style="gap: 0.5em;">
                <button class="primary rounded button">Send Inquiry</button>
                <button class="secondary circular button"><SvgIcon name="call" /></button>
                <button class="circular button"><SvgIcon name="share_filled" /></button>
                <button class="outlined circular button" style="margin-left: auto;"><SvgIcon name="bookmark" /></button>
            </div>
        </template>
        <template v-else-if="details.type === 'service'">
            <div class="header dm-header grid a-block" :class="{ active: activeFixedMenu }">
                <div class="content h6 semibold 0-margined truncate">{{ details.title }}</div>
                <button class="circular button trailing icon exit-modal">
                    <SvgIcon name="close" />
                </button>
            </div>
            <div ref="dgContent" class="content 0-padding" @scroll="handleScroll">
                <div class="dm-display">
                    <div class="dm-media">
                        <Carousel class="dm-dps" :options="{slidesHeight: 'inherit'}">
                            <div v-for="slide in details.media" class="cs-slide">
                                <img v-if="slide[0] === 'pic'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" :style="`width: 100%; height: 100%; background-image: url(${slide[1]}); background-size: contain; background-repeat: no-repeat; background-position: center;`"/>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div style="padding: 1em 1.5em;">
                    <div class="dm-heading">
                        <span :title="details.bizData.location.address" class="truncate" style="color: var(--on-surface-variant);">
                            <SvgIcon name="location_on" class="mini r-spaced" />
                            <span class="small semibold">{{ `${details.bizData.location.city }, ${details.bizData.location.state}` }}</span>
                        </span>
                        <h4 class="dm-title">{{ details.title }}</h4>
                        <div class="dm-gap">
                            <div title="Average Rate (Number of raters)">
                                <SvgIcon name="star_filled" class="yellow-text small r-spaced" />
                                <span class="semibold">{{ `${(details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)} (${details.reviews.length} reviews)` }}</span>
                            </div>
                            <div>
                                <span class="0-margined h6" style="font-weight: var(--bold-weight);">From &nbsp;</span>
                                <span class="h5 bold 0-margined" style="color: var(--primary);">{{ details.price }}&nbsp;</span>
                            </div>
                        </div>
                    </div>
                    <hr ref="divider" />
                    <div v-collapsible class="sub heading a-block active">
                        <SvgIcon name="overview" class="lead icon" />
                        Service Details
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <p>We are deeply committed to crafting professional logo designs that align with your specific requirements.</p>

                        <p>Our Pledge:</p>
                        <ul>
                            <li>You will retain complete ownership rights of the final designs.</li>
                            <li>We ensure swift delivery, by your timeline. 1st round in 24-48 Hours. Followed by daily updates.</li>
                            <li>You can take advantage of unlimited revisions until your desired design is achieved.</li>
                        </ul>

                        <p>Our Experience:</p>
                        <ul>
                            <li>As a top-rated freelancer, we maintain a flawless 100% job success rate.</li>
                            <li>Our Upwork track record includes over 20,000 working hours across 10,000+ projects.</li>
                            <li>With over 17 years of expertise in graphic design, we bring a wealth of experience to every project.</li>
                        </ul>

                        <p>Your satisfaction is our priority, and we look forward to the opportunity to collaborate on your design needs.</p>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="list_alt" class="lead icon" />
                        Service Plans
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <div class="fillable-eq menu" v-tab>
                            <label class="flex-column item active" data-tab="basic-tier">
                                <input class="big" type="radio" checked name="tier">
                                <div>
                                    Basic <br>
                                    <span class="bold">$30</span>
                                </div>
                            </label>
                            <label class="flex-column item" data-tab="standard-tier">
                                <input class="big" type="radio" name="tier">
                                <div>
                                    Standard <br>
                                    <span class="bold">$30</span>
                                </div>
                            </label>
                            <label class="flex-column item" data-tab="premium-tier">
                                <input class="big" type="radio" name="tier">
                                <div>
                                    Premium <br>
                                    <span class="bold">$30</span>
                                </div>
                            </label>
                        </div>
                        <div class="tab-page" id="basic-tier">
                            <table class=table>
                                <tbody>
                                    <tr>
                                        <td>Delivery Time</td>
                                        <td>2 days</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Revisions</td>
                                        <td>4</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Initial Concepts</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Printable Resolution File</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Logo Transparency</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>3D Mockup</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Source Files</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Vector File</td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-page" id="standard-tier">
                            <table class=table>
                                <tbody>
                                    <tr>
                                        <td>Delivery Time</td>
                                        <td>2 days</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Revisions</td>
                                        <td>7</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Initial Concepts</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>Printable Resolution File</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Logo Transparency</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>3D Mockup</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Source Files</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Vector File</td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-page" id="premium-tier">
                            <table class=table>
                                <tbody>
                                    <tr>
                                        <td>Delivery Time</td>
                                        <td>2 days</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Revisions</td>
                                        <td>Unlimited</td>
                                    </tr>
                                    <tr>
                                        <td>Number of Initial Concepts</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Printable Resolution File</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Logo Transparency</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>3D Mockup</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Source Files</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Vector File</td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="security" class="lead icon" />
                        Client's Protection
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <div class="rounded compact positive note">
                            <div class="lead">
                                <SvgIcon name="verified_user" class="huge" />
                            </div>
                            <div class="content">
                                <div class="heading">Escrow Payment</div>
                                <div class="aux">The seller receives escrow payment. So you can be assured to get your ordered product.</div>
                            </div>
                        </div>
                        <table class="table">
                            <tr>
                                <td>Business Verification</td>
                                <td>True</td>
                            </tr>
                            <tr>
                                <td>Escrow Payment</td>
                                <td>True</td>
                            </tr>
                            <tr>
                                <td>Customer's Rating</td>
                                <td>4.0/5.0 (30,498 raters)</td>
                            </tr>
                        </table>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="reviews" class="lead icon" />
                        Reviews on this Service
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <section>
                            <div class="grid" style="flex-direction: row-reverse;">
                                <div class="col 12-width md-4-width">
                                    <div class="centered" :set="rating = (details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)">
                                        <div class="semibold" style="font-size: 3em;">{{ (details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1) }}</div>
                                        <div class="rating small yellow-text">
                                            <SvgIcon v-for="i in Math.floor(rating)" name="star_filled" />
                                            <SvgIcon v-if="rating - Math.floor(rating) >= 0.5" name="star_half" />
                                            <SvgIcon v-for="i in (5 - Math.round(rating))" name="star" />
                                        </div>
                                        <div>{{ `${details.reviews.length} reviews` }}</div>
                                    </div>
                                </div>
                                <div class="col 12-width md-8-width">
                                    <table class="table compact borderless 0-margined">
                                        <tbody>
                                            <tr v-for="i in 5" :set="(n = 6 - i)">
                                                <td style="width: 15px;">{{ n }}</td>
                                                <td>
                                                    <div class="progress-bar">
                                                        <div class="determinate" :style="`width: ${details.reviews.filter((elem) => elem.rating === n).length * 100/details.reviews.length}%;`"></div>
                                                    </div>
                                                </td>
                                                <td style="width: 15px; text-align: right;">{{ `(${details.reviews.filter((elem) => elem.rating === n).length})` }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="centered">
                                <span class="small semibold italic">Patronize {{ details.bizData.bizName }} to write a review.</span>
                                <!-- <button class="button">
                                    <SvgIcon name="rate_review" class="lead" />
                                    Write a review
                                </button> -->
                            </div>
                        </section>
                        <hr />
                        <div>
                            <div class="dm-gap">
                                <div style="font-weight: var(--semibold-weight)">Reviews</div>
                                <Dropdown class="outlined small fully-rounded button">
                                    <SvgIcon name="sort" class="lead" />
                                    Sort
                                    <Dropmenu class="rounded">
                                        <div class="item">Newest</div>
                                        <div class="item">Highest</div>
                                        <div class="item">Lowest</div>
                                    </Dropmenu>
                                </Dropdown>
                            </div>
                            <div class="dm-reviews">
                                <div v-for="a in Math.min(5, details.reviews.length)" class="dm-review" :set="review = details.reviews[a - 1]">
                                    <header>
                                        <div class="avatar image"><span class="huge">{{ review.username.split('')[0].toUpperCase() }}</span></div>
                                        <div class="content">
                                            <div class="bold">{{ review.username }}</div>
                                            <div class="dm-gap" style="gap: 0.5em;">
                                                <div class="rating mini yellow-text" :set="rating = review.rating">
                                                    <SvgIcon v-for="i in Math.floor(rating)" name="star_filled" />
                                                    <SvgIcon v-if="rating - Math.floor(rating) >= 0.5" name="star_half" />
                                                    <SvgIcon v-for="i in (5 - Math.round(rating))" name="star" />
                                                </div>
                                                <div>Render Time here.</div>
                                            </div>
                                        </div>
                                        <Dropdown>
                                            <SvgIcon name="more_vert" />
                                            <Dropmenu class="small">
                                                <div class="item"><SvgIcon name="flag" class="lead" /> Report</div>
                                            </Dropmenu>
                                        </Dropdown>
                                    </header>
                                    <article>{{ review.review }}</article>
                                </div>
                                <div v-if="details.reviews.length > 5" class="centered"><a href="#" class="text primary button">More reviews ({{ details.reviews.length - 5 }})</a></div>
                            </div>
                        </div>
                    </div>
                    <div v-collapsible class="sub heading a-block">
                        <SvgIcon name="store" class="lead icon" />
                        Service Manager Details
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="a-block collapsible">
                        <div class="lead" style="position: relative; align-self: center;">
                            <img :src="details.bizData.logo" class="loose avatar image" />
                            <SvgIcon name="verified_sp" title="Verified" class="small green-text" style="position: absolute; bottom: 0px; right: 0px;" />
                        </div>
                        <div class="content">
                            <a href="#" style="font-weight: var(--bold-weight);">{{ details.bizData.bizName }}</a>
                            <div class="sc-gap">
                                <span class="small semibold">{{ details.bizData.mainCategory }}</span>
                                <span :title="details.bizData.location.address" class="truncate" style="color: var(--on-surface-variant);">
                                    <SvgIcon name="location_on" class="mini r-spaced" />
                                    <span class="small semibold">{{ `${details.bizData.location.city }, ${details.bizData.location.state}` }}</span>
                                </span>
                            </div>
                            <div class="semibold sc-gap">
                                <span v-if="details.bizData.rating" class="semibold" title="Average Rate (Number of raters)">
                                    <SvgIcon name="star_filled" class="yellow-text mini r-spaced" />
                                    <span class="small">{{ `${details.bizData.rating.rate} (${details.bizData.rating.raters})` }}</span>
                                </span>
                                <span :title="details.bizData.hours[new Date().getDay()][0] < 0 ? 'Did not open today at all.' : `Open today by ${details.bizData.hours[new Date().getDay()][0]}:00 and closes by ${details.bizData.hours[new Date().getDay()][1]}:00.`">
                                    <SvgIcon name="today" class="mini r-spaced" />
                                    <span class="small">
                                        <template v-if="details.bizData.hours[new Date().getDay()][0] < 0 || details.bizData.hours[new Date().getDay()][0] > new Date().getHours() || details.bizData.hours[new Date().getDay()][1] <= new Date().getHours()">
                                            <span class="negative-text">Closed.</span>
                                            <span v-if="details.bizData.hours[new Date().getDay()][0] > new Date().getHours()">Opens {{ details.bizData.hours[new Date().getDay()][0] }}</span>
                                            <span else>
                                                Opens
                                                {{
                                                    details.bizData.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0] > -1
                                                        ? `${details.bizData.hours[new Date().getDay() === 6 ? 0 : new Date().getDay() + 1][0]}:00 Tomorrow`
                                                        : `${details.bizData.hours[nextOpenDay(details.bizData.hours)][0]} on ${whatDay(nextOpenDay(details.bizData.hours))}`
                                                }}</span>
                                        </template>
                                        <template v-else>
                                            <span v-if="details.bizData.hours[new Date().getDay()][1] - new Date().getHours() < 2" class="caution-text">Closes soon. </span>
                                            <span v-else class="positive-text">Open. </span>
                                            <span>Closes {{ `${details.bizData.hours[new Date().getDay()][1]}:00` }}</span>
                                        </template>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="footer auto-t-bordered grid" style="gap: 0.5em;">
                <button class="primary rounded button">Send Inquiry</button>
                <button class="secondary circular button"><SvgIcon name="call" /></button>
                <button class="circular button"><SvgIcon name="share_filled" /></button>
                <button class="outlined circular button" style="margin-left: auto;"><SvgIcon name="bookmark" /></button>
            </div>
        </template>
    </div>
    <div v-else class="dialog self-scroll rounded">
        <div class="progress-bar"></div>
    </div>
</template>

<style lang="scss">
    .sc-dialog {
        .dm-header {
            position: absolute;
            width: 100%;
            align-items: center;
            background-color: transparent;
            z-index: var(--z-level-3);
            transition: background-color ease 250ms;

            &.active {
                background-color: var(--surface);
                box-shadow: var(--z-depth-2);
            }

            & > .content {
                transition: opacity ease 250ms;
            }

            &:not(.active) > .content {
                opacity: 0;
            }

            & > .trailing.icon {
                height: 2em !important;
                width: 2em !important;
                background-color: transparent;
            }

            &:not(.active) > .trailing.icon {
                background-color: var(--surface);
                box-shadow: var(--z-depth-1);
            }
        }

        .dm-display {
            position: relative;
            width: 100%;
            max-width: var(--display-width);
            flex: 0 0 auto;
            border-radius: inherit !important;
            
            .dm-media {
                position: relative;
                width: 100%;
                height: 0rem;
                
                canvas, .dm-dps {
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

        .dm-gap {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
        }

        .dm-logo {
            position: relative;
            width: 4.25rem;
            height: 4.25rem;
            border-radius: 50%;
            background-color: #fff;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            border: 2px solid gray;
        }

        .dm-title {
            font-size: 1.375em;
            font-weight: var(--semibold-weight);
            color: var(--on-surface);
            line-height: 1.125 !important;
            width: 100%;
            padding-bottom: 0.125em;
            margin: 0 0 0.125em !important;
        }
        
        .dm-info td {
            vertical-align: top;

            &:first-child > i.icon {
                color: var(--primary);
            }
        }

        .dm-review {
            & > header {
                display: flex;
                gap: 1em;
                align-items: center;
                width: 100%;

                & > .avatar.image {
                    width: 2.5rem;
                    height: 2.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: var(--surface-v5);
                }

                & > .content {
                    flex: 1 1 auto;
                }
            }
        }

        &[data-type="business"] {
            .dm-heading {
                width: calc(100% - 4.25rem - 0.5rem);
            }

            .dm-media {
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                padding-top: calc(100% / 9 * 5); // 9:5 aspect ratio
            }
        }

        &[data-type="product"],
        &[data-type="service"] {
            .dm-media {
                padding-top: calc(100% / 4 * 3); // 4:3 aspect ratio
            }
        }
    }
</style>