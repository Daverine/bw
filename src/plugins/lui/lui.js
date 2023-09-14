import Modal from './modal.vue';
import SidePanel from './SidePanel.vue';
import Dropdown from './Dropdown.vue';
import Dropmenu from './Dropmenu.vue';

export default {
    install(app, options) {
        app.component('Modal', Modal);
        app.component('SidePanel', SidePanel);
        app.component('Dropdown', Dropdown);
        app.component('Dropmenu', Dropmenu);

    }
}