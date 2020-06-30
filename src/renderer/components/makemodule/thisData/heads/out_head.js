import Head_424 from './head_424.vue';
import head_419 from './head_419.vue';
import head_ggcsxcjc from './head_ggcsxcjc.vue';
import head_ypcjysjlvb from './head_ypcjysjlvb.vue';
import head_wswjcysjl from './head_wswjcysjl.vue';
import head_ggcs from './head_ggcs.vue';
import head_sysjq from './head_sysjq.vue';
import divModel from '../divModel.vue';
import selectModel from '../selectModel.vue';
import timeModel from '../timeModel.vue';
import timepickerModel from '../timepickerModel.vue';

export default {
    install: function(Vue) {
        Vue.component('head_424', Head_424);
        Vue.component('Head_419', head_419);
        Vue.component('head_ggcsxcjc', head_ggcsxcjc);
        Vue.component('head_ypcjysjlvb', head_ypcjysjlvb);
        Vue.component('head_wswjcysjl', head_wswjcysjl);
        Vue.component('head_ggcs', head_ggcs);
        Vue.component('head_sysjq', head_sysjq);
        Vue.component('divModel', divModel);
        Vue.component('selectModel', selectModel);
        Vue.component('timeModel', timeModel);
        Vue.component('timePickerModel', timepickerModel);
    }
};