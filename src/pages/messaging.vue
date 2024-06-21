<script>
import Shareables from '../components/Shareables.vue';

</script>

<template>
    <div class="as-page">
        <header>
            <div class="menu">
                <Shareables name="main_menu" />
            </div>
        </header>
        <div class="container" style="max-width: 1024px;">
            <div class="messaging-view">
                <div class="history-view">
                    <header style="display: flex; flex-flow: column nowrap; gap: 0.5em; border-bottom: 1px solid var(--outline); padding: 0.5em;">
                        <Dropdown class="selection" style="display: flex; align-items: center;">
                            <template #trailing>
                                <SvgIcon name="expand_more" class="trailing" />
                            </template>
                            <Dropmenu>
                                <div class="active item">
                                    <div class="lead avatar circular image mini" style="flex: 0 0 auto; background-color: #999;"></div>
                                    <div style="flex: 1 1 auto;">
                                        <div class="text l-aligned">
                                            <div class="semibold" style="font-size: 1.125em; line-height: 1.25;">Ayoola Folorunso</div>
                                            <div class="small aux-text">Personal Account</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="lead avatar circular image mini" style="flex: 0 0 auto; background-color: #999;"></div>
                                    <div style="flex: 1 1 auto;">
                                        <div class="text l-aligned">
                                            <div class="semibold" style="font-size: 1.125em; line-height: 1.25;">Emmadave Computers</div>
                                            <div class="small aux-text">Business Account</div>
                                        </div>
                                    </div>
                                </div>
                            </Dropmenu>
                        </Dropdown>
                        <div>
                            <form>
                                <label class="input fluid">
                                    <SvgIcon name="search" />
                                    <input type="text" class="subject" placeholder="Search" />
                                </label>
                            </form>
                        </div>
                    </header>
                    <div style="flex: 1 1 auto;">
                    </div>
                    <footer style="padding: 0.5em; border-top: 1px solid var(--outline);">
                        <button class="button primary fluid">
                            <SvgIcon name="chat_add_on" class="lead" />
                            New chat
                        </button>
                    </footer>
                </div>
                <div class="chat-view">
                    <header style="padding: 0em 0.5em; border-bottom: 1px solid var(--outline);">
                        <div class="icon-bar compact menu" style="border-radius: var(--radius-default);">
                            <div class="adaptable xhover item">
                                <div class="lead avatar circular image mini" style="flex: 0 0 auto; background-color: #999;"></div>
                                <div style="flex: 1 1 auto;">
                                    <div class="text l-aligned">
                                        <div class="semibold" style="font-size: 1.125em; line-height: 1.25;">Ayoola Folorunso</div>
                                        <div class="small aux-text">Online</div>
                                    </div>
                                </div>
                            </div>
                            <div class="r-aligned items">
                                <div class="item">
                                    <SvgIcon name="call" />
                                </div>
                                <div class="item">
                                    <SvgIcon name="video_call" />
                                </div>
                                <div class="item">
                                    <SvgIcon name="more_horiz" />
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="chats-box">

                    </div>
                    <footer class="messaging-box">
                        <div class="icon-bar compact transparent menu" style="border-radius: var(--radius-default);">
                            <div class="item">
                                <SvgIcon name="mood" />
                            </div>
                            <div class="item">
                                <SvgIcon name="add" />
                            </div>
                            <div class="adaptable xhover item 0-h-padding">
                                <input class="fluid" type="text" placeholder="Type your message"/>
                            </div>
                            <div class="item">
                                <SvgIcon name="mic" />
                            </div>
                        </div>
                    </footer>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .messaging-view {
        display: flex;
        position: relative;
        width: 100%;
        height: calc(100vh - 80px);
        border: 1px solid var(--outline);
        border-radius: var(--radius-default);
        // box-shadow: var(--z-depth-1);
        overflow: hidden;

        .history-view {
            width: 18rem;
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            border-right: 1px solid var(--outline);
        }

        .chat-view {
            display: flex;
            flex-flow: column nowrap;
            width: calc(100% - 20rem);
            flex: 1 1 auto;
            border-radius: inherit;

            .chats-box {
                flex: 1 1 0;
                overflow: hidden auto;
            }

            .messaging-box {
                padding: 0.5em;
                border-top: 1px solid var(--outline);
            }
        }
    }
</style>