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
                    <div class="dm-media"></div>
                </div>
                <div style="padding: 1em 1.5em;">
                    <div class="dm-gap">
                        <div class="dm-logo" :style="`background-image: url('${details.logo}')`">
                            <SvgIcon v-if="details.verified" name="verified_sp" title="Verified" class="small green-text" style="position: absolute; bottom: 0px; right: 0px;" />
                        </div>
                        <div class="dm-heading">
                            <h4 class="dm-title">{{ details.bizName }}</h4>
                            <div style="color: var(--secondary)">{{ details.mainCategory }}</div>
                        </div>
                    </div>
                    <div class="dm-gap">
                        <div class="semibold" title="Average Rate (Number of raters)">
                            <SvgIcon name="star_filled" class="yellow-text small r-spaced" />
                            <span>{{ `${(details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)} (${details.reviews.length})` }}</span>
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
                        <div class="centered">
                            <button class="button">
                                <SvgIcon name="rate_review" class="lead" />
                                Write a review
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div class="dm-gap">
                            <div class="sub heading">Reviews</div>
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
            </div>
            <div class="footer auto-t-bordered grid" style="gap: 0.5em;">
                <button class="primary rounded button">Visit Business Page</button>
                <button class="circular button"><SvgIcon name="direction_filled" /></button>
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
                    <div class="dm-media"></div>
                </div>
                <div style="padding: 1em 1.5em;">
                    <div class="dm-heading">
                        <span :title="details.location.address" class="truncate" style="color: var(--on-surface-variant);">
                            <SvgIcon name="location_on" class="mini r-spaced" />
                            <span class="small semibold">{{ `${details.location.city }, ${details.location.state}` }}</span>
                        </span>
                        <h4 class="dm-title">{{ details.title }}</h4>
                        <div class="dm-gap">
                            <div title="Average Rate (Number of raters)">
                                <SvgIcon name="star_filled" class="yellow-text small r-spaced" />
                                <span class="semibold">{{ `${(details.reviews.reduce((n, i) => n + i.rating, 0)/details.reviews.length).toFixed(1)} (${details.reviews.length})` }}</span>
                            </div>
                            <div>
                                <span class="h5 bold 0-margined" style="color: var(--primary);">{{ details.price }}&nbsp;</span>
                                <SvgIcon name="handshake" class="l-spaced small" v-if="details.negotiable" title="Negotiable" />
                            </div>
                        </div>
                    </div>
                    <hr ref="divider" />
                    <div v-collapsible data-collapsible="scd-sec" class="sub heading a-block active">
                        <SvgIcon name="overview" class="lead icon" />
                        Overview
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        <p>This product is suitable for office use and it also presentable. It has a long lasting battery and its capable of handling comming computer daily tasks.</p>
                    </div>
                    <div v-collapsible data-collapsible="scd-sec" class="sub heading a-block">
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
                    <div v-collapsible data-collapsible="scd-sec" class="sub heading a-block">
                        <SvgIcon name="local_shipping" class="lead icon" />
                        Delivery
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">

                    </div>
                    <div v-collapsible data-collapsible="scd-sec" class="sub heading a-block">
                        <SvgIcon name="security" class="lead icon" />
                        Warranty
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        
                    </div>
                    <div v-collapsible data-collapsible="scd-sec" class="sub heading a-block">
                        <SvgIcon name="store" class="lead icon" />
                        Seller's Information
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        
                    </div>
                    <div v-collapsible data-collapsible="scd-sec" class="sub heading a-block">
                        <SvgIcon name="reviews" class="lead icon" />
                        Reviews
                        <i class="viewbox trailing icon">
                            <SvgIcon name="chevron_left" class="n-view" />
                            <SvgIcon name="expand_more" class="a-view" />
                        </i>
                    </div>
                    <div class="collapsible">
                        
                    </div>                    
                </div>
            </div>
            <div class="footer auto-t-bordered grid" style="gap: 0.5em;">
                <button class="primary rounded button">Visit Business Page</button>
                <button class="circular button"><SvgIcon name="direction_filled" /></button>
                <button class="circular button"><SvgIcon name="share_filled" /></button>
                <button class="outlined circular button" style="margin-left: auto;"><SvgIcon name="bookmark" /></button>
            </div>
        </template>
        <template v-else-if="details.type === 'service'">
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
            background-color: antiquewhite;
            
            .dm-media {
                position: relative;
                width: 100%;
                height: 0rem;
                
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
                padding-top: calc(100% / 9 * 5); // 9:5 aspect ratio
            }
        }

        &[data-type="product"] {
            .dm-media {
                padding-top: calc(100% / 4 * 3); // 4:3 aspect ratio
            }
        }
    }
</style>