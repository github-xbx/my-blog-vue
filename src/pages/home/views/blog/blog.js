import { ref } from 'vue'
import { useRoute } from "vue-router";
import http from '@/utils/httpindex.js'

function getArticleList() {
    const current_page = ref(0)
    const last_page = ref(1)
    const list = ref([])
    const loading = ref(false)
    const route = useRoute()
    const getBlog = () => {
        let type = ""
        if (route.query.label) {
            type = '&label=' + route.query.label
        } else if (route.query.class) {
            type = '&class=' + route.query.class
        } else if (route.query.search) {
            type = '&search=' + route.query.search
        }
        console.log(type)
        if (current_page.value < last_page.value) {
            current_page.value += 1
            loading.value = true
            //获取博客信息请求
            http.get(`/api/blog/getBlogPage/${current_page.value}${type}`)
                .then(function(res) {
                    
                    if (res.object.list.length != 0) {
                        if (current_page.value == 1) {
                            list.value = res.object.list
                            //console.log("test",list.value[1].bTitle)
                        } else {
                            list.value = list.value.concat(res.object.list)
                        }
                        loading.value = false
                        current_page.value = res.object.pageNum
                        //console.log("test",current_page)
                        last_page.value = res.object.nextPage
                        //console.log("test",last_page.value)
                    }
                })
        }
    }
    return {
        current_page,
        last_page,
        list,
        loading,
        getBlog
    }

}

function getClasList() {
    const classList = ref([])
    const classLoading = ref(true)
    http.get("/api/blog/allSeries")
        .then(function(res) {
            classLoading.value = false
            //console.log("11111111111111",res.object)
            classList.value = res.object

        })
    return {
        classList,
        classLoading
    }
}

function getLabelList() {
    const labelList = ref([])
    const labelLoading = ref(true)
    http.post('/api/blog/queryLabelAll')
        .then(function(res) {
            labelLoading.value = false
            labelList.value = res.object
        })
    return {
        labelList,
        labelLoading
    }

}

function getBlogInfo() {
    const count = ref(0)
    http.get("/api/blog/blogCount")
        .then(function(res) {
            count.value = res.data;
        })
    return {
        count
    }
}
export {
    getArticleList,
    getClasList,
    getLabelList,
    getBlogInfo
}