<template>
  <div class="content-wrap" :style="myLoading ? 'padding-top:72px' : ''">
    <div class="skeleton" v-if="myLoading">
      <Skeleton
        class="concise container"
        v-for="item of 2"
        :key="'myloading' + item"
        active
      />
    </div>
    <div v-else class="content">
      <div class="header" v-if="true">
        <div
          class="cover"
          :style="article.bImg ? `background-image: url(${article.bImg})` : ''"
        ></div>
        <div class="info">
          <h4 class="title">{{ article.bTitle }}</h4>
          <p class="desc">
            <!-- 未做 -->
            <span><IdcardOutlined />{{ article.bDescription }}</span>
            <span><TagsOutlined />{{ article.classty }}</span>
            <span><FireOutlined />{{ article.view_count }}</span>
            <span><FieldTimeOutlined />{{ article.created_at }}</span>
          </p>
        </div>
        <div class="waves-area">
          <svg
            class="waves-svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
              ></path>
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="0"></use>
              <use xlink:href="#gentle-wave" x="48" y="3"></use>
              <use xlink:href="#gentle-wave" x="48" y="5"></use>
              <use xlink:href="#gentle-wave" x="48" y="7"></use>
            </g>
          </svg>
        </div>
      </div>
      <div class="body container concise">
        <Preview
          :content="article.bContent"
          :tocNav="true"
          :dompurify="false"
          @click-img="clickImg"
          :imgView="true"
          :scroolOffset="72"
          :markedOptions="options"
        />
        <!--article.share_show  -->
        <div class="share" v-if="true">
          <a :href="qzone" class="qzone" target="_blank">
            <svg
              t="1608004223546"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1956"
              width="32"
              height="32"
            >
              <path
                d="M955.728 428.224c8.385-8.785 3.76-23.536-8.073-25.753l-276.832-51.854c-4.838-0.906-9.02-3.987-11.38-8.383L525.873 93.229c-2.798-5.23-8.342-7.85-13.875-7.896-5.532 0.045-11.075 2.667-13.873 7.896L364.558 342.234c-2.36 4.396-6.543 7.477-11.381 8.383L76.345 402.471c-11.833 2.217-16.458 16.968-8.073 25.753L269.64 639.086c3.564 3.733 5.205 8.952 4.433 14.1l-46.015 282.032c-1.819 12.126 10.394 21.407 21.298 16.182L505 827.827a16.098 16.098 0 0 1 7-1.58 16.1 16.1 0 0 1 7.003 1.58L774.644 951.4c10.904 5.225 23.117-4.056 21.298-16.182l-46.88-287.298 206.666-219.696z"
                fill="#FFCD00"
                p-id="1957"
              ></path>
              <path
                d="M559.42 493.63c-4.517-3.772-110.987-40.332-273.968-16-3.16 0.47-5.913-0.394-8.04-1.992-0.717 4 3.587 7.152 8.988 7.527 115.064 8.021 179.42 54.987 199.492 71.501 40.78-28.923 71.882-50.606 73.063-51.527 3.668-2.856 3.695-6.811 0.465-9.51m135.65-29.972c-41.744 35.168-160.159 116.897-201.52 148.468-4.864 3.711-3.177 9.424 2.098 11.43 17.045 6.488 36.23 11.95 56.421 16.445l159.784-152.228c12.544-13.184 5.238-29.152-10.422-32.661-1.025 3.011-3.259 5.933-6.36 8.546M817.187 640l-0.101 0.045c-70.456 29.709-241.54 79.623-451.762 72.33-25.386-0.88-50.63-3.715-64.786-6.325-2.067-0.38-3.878-1.012-5.476-1.846-10.567 12.224 2.073 21.462 47.148 30.58 131.886 26.676 286.047 38.934 415.304 30.665l-8.884-54.324c43.727-31.431 64.996-58.546 67.524-62.57 2.899-4.616 1.033-8.555 1.033-8.555"
                fill="#F1A308"
                p-id="1958"
              ></path>
              <path
                d="M818.863 646.995c-53.31 5.137-215.894 3.686-311.826-33.167-5.107-1.962-6.834-7.566-2.129-11.194 40.025-30.84 154.62-110.68 195.014-145.035 7.872-6.696 9.95-15.437 0.375-22.542-18.36-13.623-83.168-36.203-158.198-36.816-107.373-0.88-212.858 29.498-259.133 54.09-10.983 5.837-4.392 21.221 6.83 19.495 164.223-25.24 271.495 12.756 276.045 16.67 3.255 2.798 3.074 6.906-0.5 9.715-3.036 2.389-199.263 143.36-258.23 193.11-9.286 7.834-6.845 24.246 8.35 27.018 14.152 2.582 39.406 5.412 64.784 6.284 210.173 7.214 381.314-42.24 451.755-71.63 0 0-2.148-7.057-13.137-5.998"
                fill="#FFFFFF"
                p-id="1959"
              ></path>
            </svg>
          </a>
          <a :href="qq" class="qq" target="_blank">
            <svg
              t="1608004173020"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1581"
              width="32"
              height="32"
            >
              <path
                d="M511.500488 512.499512m-511.500488 0a511.500488 511.500488 0 1 0 1023.000976 0 511.500488 511.500488 0 1 0-1023.000976 0Z"
                fill="#1BC1FA"
                p-id="1582"
              ></path>
              <path
                d="M784.234146 572.440976c8.178014 0 16.273108 0.253752 24.282287 0.728288-16.961436-38.434466-42.247742-69.886751-58.977405-90.331785 2.822244-8.482716 11.30496-56.536788-25.443153-90.453666v-2.827239c0-132.850263-96.103149-231.785647-214.822213-231.785647-118.717065 0-214.82521 96.107145-214.825209 231.785647v2.827239c-33.915879 33.915879-25.437159 81.969951-19.782681 90.453666-25.444152 28.265397-73.49223 87.62343-76.320469 155.461182 0 16.961436 2.827239 45.226833 11.305959 56.531794 11.305959 14.133198 39.570357-2.827239 62.186272-48.054073 5.650482 19.788675 19.78368 53.709549 50.876316 93.281905-50.876316 11.302962-65.009514 62.186271-48.049077 90.450669 11.305959 19.788675 39.570357 33.920874 87.624429 33.920874 78.496343 0 115.815899-19.378076 134.378771-35.711126C492.644901 814.680414 490.520976 800.136617 490.520976 785.233171c0-117.522232 131.500581-212.792195 293.71317-212.792195z"
                fill="#FFFFFF"
                p-id="1583"
              ></path>
              <path
                d="M514.925143 819.204995c5.654478 0 11.309955 2.82624 14.132199 5.649483 16.960437 16.960437 53.709549 39.575352 138.50674 39.575352 48.054072 0 76.320468-16.960437 87.625428-33.920874 16.960437-28.264398 2.827239-79.147707-48.054072-90.450669 31.092636-39.572355 45.225834-73.493229 50.881311-93.281905 19.787676 45.226833 50.881311 62.18727 62.186271 48.054073 2.827239-11.30496 5.650482-39.570357 5.650482-56.531794-1.93511-23.223321-8.508691-45.121936-17.337069-65.128398-8.009179-0.475536-16.104273-0.729288-24.282287-0.729287-162.212589 0-293.713171 95.269963-293.71317 212.792195 0 14.903446 2.123926 29.447243 6.147996 43.485533a88.18688 88.18688 0 0 0 4.122973-3.864226c2.827239-2.823243 8.481717-5.649483 14.133198-5.649483z"
                fill="#FFFFFF"
                opacity=".4"
                p-id="1584"
              ></path>
            </svg>
          </a>
          <a :href="weibo" class="weibo" target="_blank">
            <svg
              t="1608004259057"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2834"
              width="32"
              height="32"
            >
              <path
                d="M851.4 590.193c-22.196-66.233-90.385-90.422-105.912-91.863-15.523-1.442-29.593-9.94-19.295-27.505 10.302-17.566 29.304-68.684-7.248-104.681-36.564-36.14-116.512-22.462-173.094 0.866-56.434 23.327-53.39 7.055-51.65-8.925 1.89-16.848 32.355-111.02-60.791-122.395C311.395 220.86 154.85 370.754 99.572 457.15 16 587.607 29.208 675.873 29.208 675.873h0.58c10.009 121.819 190.787 218.869 412.328 218.869 190.5 0 350.961-71.853 398.402-169.478 0 0 0.143-0.433 0.575-1.156 4.938-10.506 8.71-21.168 11.035-32.254 6.668-26.205 11.755-64.215-0.728-101.66z m-436.7 251.27c-157.71 0-285.674-84.095-285.674-187.768 0-103.671 127.82-187.76 285.674-187.76 157.705 0 285.673 84.089 285.673 187.76 0 103.815-127.968 187.768-285.673 187.768z"
                fill="#E71F19"
                p-id="2835"
              ></path>
              <path
                d="M803.096 425.327c2.896 1.298 5.945 1.869 8.994 1.869 8.993 0 17.7-5.328 21.323-14.112 5.95-13.964 8.993-28.793 8.993-44.205 0-62.488-51.208-113.321-114.181-113.321-15.379 0-30.32 3.022-44.396 8.926-11.755 4.896-17.263 18.432-12.335 30.24 4.933 11.662 18.572 17.134 30.465 12.238 8.419-3.46 17.268-5.33 26.41-5.33 37.431 0 67.752 30.241 67.752 67.247 0 9.068-1.735 17.857-5.369 26.202a22.832 22.832 0 0 0 12.335 30.236l0.01 0.01z"
                fill="#F5AA15"
                p-id="2836"
              ></path>
              <path
                d="M726.922 114.157c-25.969 0-51.65 3.744-76.315 10.942-18.423 5.472-28.868 24.622-23.5 42.91 5.509 18.29 24.804 28.657 43.237 23.329a201.888 201.888 0 0 1 56.578-8.064c109.253 0 198.189 88.271 198.189 196.696 0 19.436-2.905 38.729-8.419 57.16-5.508 18.289 4.79 37.588 23.212 43.053 3.342 1.014 6.817 1.442 10.159 1.442 14.943 0 28.725-9.648 33.37-24.48 7.547-24.906 11.462-50.826 11.462-77.175-0.143-146.588-120.278-265.813-267.973-265.813z"
                fill="#F5AA15"
                p-id="2837"
              ></path>
              <path
                d="M388.294 534.47c-84.151 0-152.34 59.178-152.34 132.334 0 73.141 68.189 132.328 152.34 132.328 84.148 0 152.337-59.182 152.337-132.328 0-73.15-68.19-132.334-152.337-132.334zM338.53 752.763c-29.454 0-53.39-23.755-53.39-52.987 0-29.228 23.941-52.989 53.39-52.989 29.453 0 53.39 23.76 53.39 52.989 0 29.227-23.937 52.987-53.39 52.987z m99.82-95.465c-6.382 11.086-19.296 15.696-28.726 10.219-9.43-5.323-11.75-18.717-5.37-29.803 6.386-11.09 19.297-15.7 28.725-10.224 9.43 5.472 11.755 18.864 5.37 29.808z"
                fill="#040000"
                p-id="2838"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="footer"></div>
    </div>
    <div class="container desc">
      <div class="skeleton" v-if="myLoading">
        <Skeleton class="concise skeleton container" active />
      </div>
      <div v-else class="copyright concise">
        <div class="blog-info" v-if="true">
          <p>
            本文标题:
            <a href="">{{ article.bTitle }}</a>
          </p>
          <p>
            本文链接:
            <a href="">{{ url }}</a>
          </p>
          <p>
            版权所有:
            <a>{{ article.name }}</a
            >----
            <a
              rel="license"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              title="知识共享署名-非商业性使用 4.0 国际许可协议"
              >知识共享署名-非商业性使用 4.0 国际许可协议</a
            >
          </p>
        </div>

        <!--article.prevArticle  -->
        <div class="article-prev-next" v-if="article.prevArticle">
          <router-link :to="article.prevArticle[0].id + ''" class="prev">
            <DoubleLeftOutlined />
            <span>{{ article.prevArticle[0].title }}</span>
          </router-link>
          <router-link :to="article.nextrAticle[0].id + ''" class="next">
            <span>{{ article.nextrAticle[0].title }}</span>
            <DoubleRightOutlined />
          </router-link>
        </div>
      </div>
      <!-- <ImageView v-model:show="imgShow" :urlList="imgList" :url="imgSrc" /> -->
      <div class="skeleton" v-if="myLoading">
        <Skeleton class="concise container" active />
      </div>
      <!-- <template v-else>
        <Comment v-if="true" class="concise" @submit="submit" />
      </template> -->
      <!-- article.message_show -->
      <div
        class="message"
        v-infinite-scroll="getMess"
        :infinite-scroll-distance="20"
        :infinite-scroll-disabled="true"
        infinite-scroll-window="true"
      >
        <div class="concise">
          <CommentMain/>
        </div>
        <!-- <MessageCard
          @reply="reply"
          @delete="deleteMess"
          :item="item"
          v-for="(item) of list"
          :key="item.commentId"
          class="concise"
          
        /> -->
        
        <div class="skeleton" v-if="loading">
          <Skeleton
            v-for="item of 3"
            :key="'Skeleton' + item"
            :class="'message-list-item-bg-' + ((item + 1) % 4)"
            class="concise"
            avatar
            active
          ></Skeleton>
        </div>
        <p class="last" v-if="current_page == last_page">
          —— 我可是有底线的！( •̥́ ˍ •̀ू ) ——
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import http from "@/utils/httpindex.js";
import Skeleton from "@/components/skeleton/skeleton";

import {
  TagsOutlined,
  FireOutlined,
  FieldTimeOutlined,
  IdcardOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons-vue";
import Preview from "@/components/editor/preview";
//import ImageView from "@/components/image/image-view";
//import Comment from "../message/comment";
//import MessageCard from "../message/message-card";
import CommentMain from "../comment/main";
import { getMessList } from "../message/message.js";

export default {
  name: "BlogContent",
  components: {
    TagsOutlined,
    FireOutlined,
    FieldTimeOutlined,
    IdcardOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined,
    Preview,
   // ImageView,
    //Comment,
    //MessageCard,
    Skeleton,
    CommentMain,
  },
 
  
  setup() {
    
    const route = useRoute();
    // const article=reactive({})
    const article = ref({});
    const myLoading = ref(true);
    const name = route.name;
    const imgShow = ref(false);
    const imgSrc = ref("");
    const imgList = ref([]);
    const url = computed(() => {
      console.log(process.env);
      const url = process.env.VUE_APP_HOME_URL + "/blog/" + route.params.id;
      return url;
    });
    const options = {
      headerIds: false,
      breaks: true,
    };
    const logo = "https://p.pstatp.com/origin/137d10002a95149f1fef7";
    const desc = "Baymax•记录美好学习时光，分享学习点点滴滴";
    const getArticle = () => {
      const id = route.params.id;
      myLoading.value = true;
      http
        .post("/api/blog/article", id, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => {
          myLoading.value = false;
          article.value = res.object;
          //console.log("111111111111111s", article);
          document.title = res.object.bTitle + "-MyBlog";
          // document.querySelector('meta[name="keywords"]').setAttribute('content', res.data.label.toString())
          document
            .querySelector('meta[name="description"]')
            .setAttribute("content", res.object.bTid);
        });
    };
    getArticle();
    const {
      list,
      getMess,
      loading,
      current_page,
      last_page,
      messageAdd,
      replyAdd,
      deleteMess,
    } = getMessList(route.params.id);
    getMess();
    const submit = (content) => {
      const data = {
        message: content,
        article_id: route.params.id,
      };
      messageAdd(data);
    };
    const reply = (content) => {
      replyAdd(content);
    };
    const clickImg = (src, list) => {
      imgSrc.value = src;
      imgList.value = list;
      imgShow.value = true;
    };
    watch(
      () => route.params.id,
      (id) => {
        const newName = route.name;
        if (newName == name) {
          console.log(id);
          getArticle();
          getMess(id);
        }
      }
    );
    const qzone = computed(() => {
      return (
        "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
        url.value +
        "&title=" +
        article.value.title +
        "&desc=" +
        (article.value.desc ? article.value.desc : desc) +
        "&summary=" +
        article.value.title +
        "&site=" +
        article.value.source +
        "&pics=" +
        (article.value.image ? article.value.image : logo) +
        ""
      );
    });
    const qq = computed(() => {
      return (
        "http://connect.qq.com/widget/shareqq/index.html?url=" +
        url.value +
        "&title=" +
        article.value.title +
        "&source=" +
        article.value.source +
        "&desc=" +
        (article.value.desc ? article.value.desc : desc) +
        "&pics=" +
        (article.value.image ? article.value.image : logo) +
        '&summary="' +
        article.value.title +
        '"'
      );
    });
    const weibo = computed(() => {
      return (
        "https://service.weibo.com/share/share.php?url=" +
        url.value +
        "&title=" +
        article.value.title +
        "&pic=" +
        (article.value.image ? article.value.image : logo) +
        "&appkey=" +
        article.value.weibokey +
        ""
      );
    });
    return {
      article,
      options,
      submit,
      reply,
      list,
      getMess,
      loading,
      myLoading,
      current_page,
      last_page,
      deleteMess,
      clickImg,
      imgShow,
      imgSrc,
      imgList,
      url,
      qzone,
      qq,
      weibo,
    };
  },
};
</script>
<style lang="stylus" scoped>
.content-wrap {
  background-color: #f6f8f9;

  .content {
    padding-top: 0;
  }

  .header {
    position: relative;
    overflow: hidden;
    height: 80vh;
    min-height: 300px;
    max-height: 450px;
    border-radius: 20px;
    padding: 0 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 50%;
      background-size: cover;
      background-image: url('https://p6-tt-ipv6.byteimg.com/img/pgc-image/cca4898a577c49efb8cd22805444a629~tplv-obj.image'); // p.pstatp.com/origin/fede00031b9922f5244a);
      z-index: 0;
      transition: all 0.3s;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(-180deg, rgba(45, 58, 111, 0.5), rgba(0, 0, 0, 0.5));
      }
    }

    .info {
      position: relative;
      width: 100%;
      height: 100%;
      color: #fff;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      text-align: center;

      .title {
        color: #fff;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.5em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        margin: 10px 0;
      }

      .desc {
        font-size: 14px;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        span {
          margin: 0 10px;
        }
      }
    }
  }

  .body {
    .share {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;

      a {
        margin: 10px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }

      .qzone {
        &:hover {
          border: 2px solid rgba(255, 205, 0, 0.3);
          background: rgba(255, 205, 0, 0.2);
        }
      }

      .qq {
        &:hover {
          border: 2px solid rgba(27, 193, 250, 0.3);
          background: rgba(27, 193, 250, 0.2);
        }
      }

      .weibo {
        &:hover {
          border: 2px solid rgba(231, 31, 25, 0.3);
          background: rgba(231, 31, 25, 0.2);
        }
      }
    }
  }

  .copyright {
    .blog-info {
      border-left: 2px solid #bababa;
      padding-left: 10px;

      p {
        color: #bababa;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        a {
          color: #bababa;
          font-size: 14px;
        }
      }
    }

    .article-prev-next {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;

      .prev, .next {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        padding: 0 16px;
        position: relative;
        flex: 1;
        color: #3a8ee6;

        .anticon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .prev {
        .anticon {
          left: 0;
        }
      }

      .next {
        text-align: right;

        .anticon {
          right: 0;
        }
      }
    }
  }

  .concise {
    padding: 40px 32px;
    border-radius: 20px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: #fff;
    transition: box-shadow 0.3s;
  }

  .message {
    .last {
      text-align: center;
      color: #bababa;
      font-size: 14px;
      margin: 10px 0;
    }

    >>>.message-list-item-bg-0 {
      background: linear-gradient(180deg, #d2e5f9, #f8fbfe);
    }

    >>>.message-list-item-bg-1 {
      background: linear-gradient(180deg, #dcf4ff, #f4fcff);
    }

    >>>.message-list-item-bg-2 {
      background: linear-gradient(180deg, #fff0ce, #fffcf6);
    }

    >>>.message-list-item-bg-3 {
      background: linear-gradient(180deg, #ffe4cf, #fff7f1);
    }
  }
}

@media (max-width: 776px) {
  .content-wrap {
    .desc {
      padding: 0 10px;
      box-sizing: border-box;
    }

    .skeleton {
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
}

@media (max-width: 576px) {
  .content-wrap .concise {
    padding: 20px 10px;
  }
}
</style>