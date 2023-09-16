import Modal from '@/plugins/lui/components/modal.vue';
import SidePanel from './components/SidePanel.vue';
import Dropdown from './components/Dropdown.vue';
import Dropmenu from './components/Dropmenu.vue';

export default {
    install(app, options) {
        app.component('Modal', Modal);
        app.component('SidePanel', SidePanel);
        app.component('Dropdown', Dropdown);
        app.component('Dropmenu', Dropmenu);

    }
}