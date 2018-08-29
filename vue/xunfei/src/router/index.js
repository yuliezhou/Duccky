import Vue from 'vue'
import Router from 'vue-router'
import Skin from '../pages/skin/Skin.vue'
import Account from '../pages/account/Account.vue'
import Phiz from '../pages/phiz/Phiz.vue'
import Thesaurus from '../pages/thesaurus/Thesaurus.vue'
import Setup from '../pages/setup/Setup.vue'
import Tuijian from '../components/Tuijian'
import Ranking from '../components/Ranking'
import Local from '../components/Local'
Vue.use(Router)
export default new Router({
    routes: [
    {
        path: '/',
        name: 'Skin',
        component: Skin
    }, {
        path: '/Skin',
        name: 'Skin',
        component: Skin,
        children: [
            // 二级路由配置，path 不带斜线，roter-link处的 ‘to’ 属性值需跟上完整路径 ‘/1级路径名/2级路径名’
            {
                path: '/',
                name: 'Tuijian',
                component: Tuijian
            }, {
                path: 'Tuijian',
                name: 'Tuijian',
                component: Tuijian
            }, {
                path: 'Local',
                name: 'Local',
                component: Local
            }, {
                path: 'Ranking',
                name: 'Ranking',
                component: Ranking
            }
        ]
    }, {
        path: '/Account',
        name: 'Account',
        component: Account
    }, {
        path: '/Setup',
        name: 'Setup',
        component: Setup
    }, {
        path: '/Thesaurus',
        name: 'Thesaurus',
        component: Thesaurus
    }, {
        path: '/Phiz',
        name: 'Phiz',
        component: Phiz
    }]
})