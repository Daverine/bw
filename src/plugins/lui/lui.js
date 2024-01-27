import Modal from './components/modal.vue';
import SidePanel from './components/SidePanel.vue';
import Dropdown from './components/Dropdown.vue';
import Dropmenu from './components/Dropmenu.vue';
import Carousel from './components/Carousel.vue';

import { Collapsible } from './directives/Collapsible.js';
import { Tooltip } from './directives/Tooltip.js';
import { Tab } from './directives/Tab.js';
import { scrollPin } from './directives/ScrollPin.js';

export default {
    install(app, options) {
        app.component('Modal', Modal);
        app.component('SidePanel', SidePanel);
        app.component('Dropdown', Dropdown);
        app.component('Dropmenu', Dropmenu);
        app.component('Carousel', Carousel);
        app.directive('collapsible', new Collapsible());
        app.directive('tooltip', new Tooltip());
        app.directive('tab', new Tab());
        app.directive('scrollPin', new scrollPin());
    }
}