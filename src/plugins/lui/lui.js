import Modal from './components/modal.vue';
import SidePanel from './components/SidePanel.vue';
import Dropdown from './components/Dropdown.vue';
import Dropmenu from './components/Dropmenu.vue';
import Carousel from './components/Carousel.vue';

import { Collapsible } from './directives/Collapsible.js';

export default {
    install(app, options) {
        app.component('Modal', Modal);
        app.component('SidePanel', SidePanel);
        app.component('Dropdown', Dropdown);
        app.component('Dropmenu', Dropmenu);
        app.component('Carousel', Carousel);
        app.directive('collapsible', new Collapsible());
    }
}