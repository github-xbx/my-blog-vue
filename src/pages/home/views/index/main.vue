<template>
  <div class="index">
    
    <div class="blog container">
      <div class="picture_nav">
        <div class="picture_1">
          <!-- 左边轮播图 -->
          <el-carousel height="450px">
            <el-carousel-item v-for="item in picture" :key="item">
              <el-image :src="item.blogImg" :fit="cover">
                <template #placeholder>
                  <div class="image-slot">
                    Loading<span class="dot">...</span>
                  </div>
                </template>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="picture_2">
          <div class="picture_2_top">

            <el-image
              :src="pictureRecommend[0].blogImg"
              :fit="cover"
            >

              <template #placeholder>
                <div class="image-slot">
                  Loading<span class="dot">...</span>
                </div>
              </template>
            </el-image>
          </div>
          <div class="picture_2_bottom">
            <el-image
              :src="pictureRecommend[1].blogImg"
              :fit="cover"
            >
              <template #placeholder>
                <div class="image-slot">
                  Loading<span class="dot">...</span>
                </div>
              </template>
            </el-image>
          </div>
        </div>
      </div>
      <div class="content_root">
        <el-tabs class="tabs" @tab-click="handleClick">
          <el-tab-pane v-for="item in tabList" :key="item">
            <template #label>
              <PaperClipOutlined />

              <span>{{ item.name }}</span>
            </template>
          </el-tab-pane>
        </el-tabs>
        <div class="content_1">
          <div class="bloglist">
            <div
              class="article concise"
              v-for="item of list"
              :key="item.blogId"
            >
              <router-link :to="'/blog/article/' + item.blogId" class="title">
                <div class="header">
                  <span class="title">
                    {{ item.blogTitle }}
                  </span>
                  <!-- item.created_at.split(" ")[0] -->
                  <span class="date"
                    >{{ item.blogInsertTime }}<FieldTimeOutlined
                  /></span>
                </div>
                <div class="body">
                  <Image
                    class="image concise"
                    v-if="item.blogImg"
                    fit="cover"
                    :src="item.blogImg"
                    :lazy="true"
                  >
                    <template #placeholder>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="margin: auto"
                        width="200"
                        height="200"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        display="block"
                      >
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.9166666666666666s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(30 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.8333333333333334s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(60 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.75s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(90 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.6666666666666666s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(120 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.5833333333333334s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(150 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.5s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(180 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.4166666666666667s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(210 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.3333333333333333s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(240 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.25s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(270 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.16666666666666666s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(300 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="-0.08333333333333333s"
                            repeatCount="indefinite"
                          />
                        </rect>
                        <rect
                          x="47"
                          y="24"
                          rx="3"
                          ry="6"
                          width="6"
                          height="12"
                          fill="#93dbe9"
                          transform="rotate(330 50 50)"
                        >
                          <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1s"
                            begin="0s"
                            repeatCount="indefinite"
                          />
                        </rect>
                      </svg>
                    </template>
                    <template #error>
                      <img
                        style="width: 60%; margin: 0 20%"
                        src="https://iconfont.alicdn.com/s/e8a7a96a-7f80-4f07-bc88-c162da451fe1_origin.svg"
                      />
                    </template>
                  </Image>
                  <div class="content" v-html="item.blogDescription"></div>
                </div>
                <div class="footer">
                  <div class="info-arti">
                    <router-link :to="'/blog?class=' + item.seriesName"
                      ><TagsOutlined />{{ item.seriesName }}</router-link
                    >
                    <router-link
                      :to="'/blog?label=' + vlave.labelId"
                      v-for="(vlave, index) of item.label"
                      :key="index"
                      ><TagOutlined />{{ vlave.labelName }}</router-link
                    >
                  </div>
                  <div class="info-data">
                    <router-link :to="'/blog/' + item.blogId"
                      ><SketchOutlined />{{ item.clicks }}</router-link
                    >
                    <router-link :to="'/blog/' + item.blogId + '#comment'"
                      ><LikeOutlined /> {{ item.click }}</router-link
                    >
                    <router-link :to="'/blog/' + item.blogId"
                      ><MessageOutlined />{{ item.message_count }}</router-link
                    >
                  </div>
                </div>
              </router-link>
            </div>
            <template v-if="loading">
              <Skeleton
                v-for="item of 6"
                :key="'Skeleton' + item"
                class="concise"
                active
              ></Skeleton>
            </template>
            <p class="last" v-if="current_page == last_page">
              —— 我可是有底线的！( •̥́ ˍ •̀ू ) ——
            </p>
          </div>

          <div class="utils">
            <div class="concise">
              <div class="search">
                <input type="text" class="search_input" placeholder="检索……" />
                <span class="search-btn" title="搜索一下吧！">
                  <SearchOutlined />
                </span>
              </div>
            </div>

            <div class="label concise">
              <div>
                <el-tabs class="demo-tabs">
                  <el-tab-pane class="lable_title">
                    <template #label>
                      <TagsOutlined />
                      &nbsp;
                      <span>标签</span>
                    </template>
                  </el-tab-pane>
                </el-tabs>
              </div>
              <router-link
                :to="'/blog?label=' + item.labelId"
                class="label-item"
                :class="{ 'label-item-active': $route.query.label == item }"
                v-for="item of labelList"
                :key="item.labelId"
              >
                {{ item.labelName }}
              </router-link>
              <Skeleton v-if="labelLoading" active></Skeleton>
            </div>

            <div class="category concise">
              <div>
                <el-tabs class="demo-tabs">
                  <el-tab-pane class="lable_title">
                    <template #label>
                      <BarsOutlined />
                      &nbsp;
                      <span>分类</span>
                    </template>
                  </el-tab-pane>
                </el-tabs>
              </div>

              <router-link
                class="class-item"
                :to="'/blog?class=' + item.categoryId"
                :class="{
                  'class-item-active': $route.query.class == item.categoryId,
                }"
                v-for="item of categoryList"
                :key="item.categoryId"
              >
                {{ item.categoryName }}
              </router-link>
              <Skeleton v-if="classLoading" active></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
           
  </div>
</template>
<script>

import { useStore } from "vuex";
import {
  PaperClipOutlined,
  FieldTimeOutlined,
  TagOutlined,
  SketchOutlined,
  LikeOutlined,
  MessageOutlined,
  SearchOutlined,
  TagsOutlined,
  BarsOutlined,
} from "@ant-design/icons-vue";
import Image from "@/components/image/image";
import Skeleton from "@/components/skeleton/skeleton";
import http from '@/utils/httpindex.js'
import { getIndex } from "./main";
import {ref} from "vue";

export default {
  name: "Index",
  components: {
    PaperClipOutlined,
    FieldTimeOutlined,
    Image,
    TagOutlined,
    SketchOutlined,
    LikeOutlined,
    MessageOutlined,
    Skeleton,
    SearchOutlined,
    TagsOutlined,
    BarsOutlined,
    // eslint-disable-next-line vue/no-unused-components
    http
  },
  setup() {
    const tabList = [
      {
        name: "推荐",
        id: 1,
      },
      {
        name: "关注",
        id: 2,
      },
      {
        name: "收藏",
        id: 3,
      },
    ];

    // const picture = [
    //   {
    //     url: "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg",
    //   },
    //   {
    //     url: "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test2.jpg",
    //   },
    //   {
    //     url: "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg",
    //   },
    //   {
    //     url: "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test2.jpg",
    //   },
    // ];
    // const labelList = [
    //   {
    //     labelId: 1,
    //     labelName: "spring boot",
    //   },
    //   {
    //     labelId: 2,
    //     labelName: "mybatis",
    //   },
    // ];

    //const store = useStore();

    //store.dispatch("getCarousels");

    const list = ref([])
    const picture = ref([])
    const pictureRecommend = ref([])
    const categoryList = ref([])
    const labelList = ref([])


    const getIndex = () => {
      http.get("api/blog/queryBlogByIndexRecommend").then((res) => {
        picture.value = res.object[1] //轮播图
        pictureRecommend.value = res.object[2] //图片推荐
        list.value = res.object[3] //推荐列表

      })
    }
    getIndex();

    const getCategory = () => {
      http.get("api/blog/queryCategoryAll").then((res) => {
        categoryList.value = res.object
      })

    }
    getCategory();

    const getLabel = () => {
      http.get("api/blog/queryLabelAll").then((res) => {
        labelList.value = res.object
      })
    }
    getLabel();


    return {
      list,
      picture,
      tabList,
      labelList,
      categoryList,
      pictureRecommend,
      getIndex
    };
  },
  beforeCreate() {
    //this.list = getIndex()[3]
  }
};
</script>
<style lang="stylus">

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.index {
  background-color: #f6f8f9;
}

.blog {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 10px;
  padding-top: 72px;
  box-sizing: border-box;

  .picture_nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 450px;
    flex-wrap: wrap;
    margin-top: 10px

    .picture_1 {
      width: 69%;
      height: 100%;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }

    .picture_2 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 29%;
      height: 100%;

      .picture_2_top {
        height: 47%;

        .el-image {
          width: 100%;
          height: 100%;
        }
      }

      .picture_2_bottom {
        height: 47%;

        .el-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .content_root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs__active-bar {
      background-color: transparent !important;
    }

    .tabs {
      font-size: 2rem;
      padding-top: 2rem;

      span {
        margin: 10%;
      }
    }

    .content_1 {
      display: flex;
      justify-content: space-between;

      .bloglist {
        width: 70%;
        display: flex;
        flex-direction: column;

        .header {
          padding-bottom: 15px;
          position: relative;
          border-bottom: 1px solid #fafafa;

          .title {
            color: #336a99;
            font-size: 20px;
            font-weight: 500;
            line-height: 1.5em;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }

          .date {
            position: absolute;
            bottom: 0;
            right: 0;
            transform: translateY(50%);
            font-size: 14px;
            color: #bebebe;

            .anticon {
              margin-left: 10px;
            }
          }
        }

        .body {
          padding: 15px 0;
          overflow: hidden;
          border-bottom: 1px solid #fafafa;

          .image {
            width: 300px;
            // height 150px
            overflow: hidden;
            float: left;
            margin: 0 10px 10px 0;
            padding: 0;
          }

          .content {
            font-size: 14px;
            line-height: 24px;
            color: #bebebe;
            cursor: pointer;
            text-align: justify;
          }
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          padding-top: 15px;

          .info-arti, .info-data {
            a {
              margin: 0 5px;
              cursor: pointer;
              font-size: 14px;
              color: #bababa;

              span {
                margin-right: 4px;
              }
            }
          }
        }
      }
    }

    .utils {
      width: 28%;

      .search {
        display: flex;
        align-items: center;
        padding: 8px 0px 8px 15px;
        box-sizing: border-box;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 15px;

        .search_input {
          flex: 1 1 auto;
          outline: none;
          border: 0;
          height: 20px;
          color: rgba(0, 0, 0, 0.45);
        }

        .search-btn {
          color: #ccc;
          height: 30px;
          width: 30px;
          // border: 1px solid #ccc;
          box-sizing: border-box;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            background: linear-gradient(180deg, #dcf4ff, #f4fcff);
          }
        }
      }

      .label {
        width: 100%;

        .label-item {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 10px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin: 5px;
          background: linear-gradient(180deg, #dcf4ff, #f4fcff);

          &:hover {
            box-shadow: 0 0px 10px 5px rgba(46, 58, 89, 0.1);
          }
        }

        .label-item-active {
          background: linear-gradient(180deg, #fff0ce, #fffcf6);
        }
      }

      .category {
        width 100%
        
        .class-item {
          text-align: center;
          color: rgba(0, 0, 0, 0.45);
          display: block;
          padding: 6px 5px;
          border-bottom: 1px solid #fafafa;
          margin-top: 5px;
          font-size: 14px;
          border-radius: 10px;
          transition: all 0.3s;

          &:hover {
            background: linear-gradient(180deg, #fff0ce, #fffcf6);
          }
        }

        .class-item-active {
          background: linear-gradient(180deg, #dcf4ff, #f4fcff);
        }
      }
    }
  }
}
</style>
