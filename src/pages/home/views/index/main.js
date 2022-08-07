import http from '@/utils/httpindex.js'
import {ref} from 'vue'
import Notification from '@/components/notification/index.js';


async function getIndex() {
    //let indexRecommend = ref({})
    let indexRecommend =
        await http.get("api/blog/queryBlogByIndexRecommend").then();
    console.log(indexRecommend.object)
    return indexRecommend.object
}

export {
    getIndex
}