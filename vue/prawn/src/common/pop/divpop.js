import vue from 'vue'

import pop from './pop.vue'

const popConstructor = vue.extend(pop)

function showPop(){
    const popDom = new popConstructor({
        el:document.createElement('div'),
        data(){
            return{

            }
        }
    })

    document.body.appendChild(popDom.$el)

}

function registryPop(){
    vue.prototype.$pop = showPop

}

export default registryPop