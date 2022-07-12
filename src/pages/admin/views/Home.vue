<template>
  <el-container
    class="content"
    :class="{ 'is-left': !isMenu, 'is-margin': isMenu }"
  >
    <!-- <el-scrollbar style="height: 100%;"> -->
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isMenu"
      router
      style="overflow-y: auto; overflow-x: hidden"
    >
      <el-menu-item
        index="/home/index"
        class="logo"
        style="padding: 0px; text-align: center"
        @click="select(-1)"
      >
        <i v-if="isMenu">LOGO</i>
        <template #title>
          <span>
            <img src="~@/assets/logo.svg" height="40" />
          </span>
        </template>
      </el-menu-item>

      <el-submenu v-for="(item,index) of homeList" :key="item.id" :index="item.id">
        <template #title>
          <i class="icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(value,chilIndex) of item.children"
          :key="value.id"
          :index="value.url"
          @click="select(index,chilIndex)"
        >
          <span :class="{ active: $route.path == value.url }">
            <i :class="value.icon"></i>
            {{ value.name }}
          </span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-container>
      <el-header class="header">
        <span class="navbar-toggle-btn" @click="toggleMenu">
            <p class="menu" :class="{ 'menu-active': !isMenu }"></p>
        </span>
        <div class="admin">
          <el-popover placement="bottom" width="50" trigger="hover">
            <div class="admin-ul">
              <a>上次登录时间</a>
              <a>{{ $store.state.user.user.updated_at }}</a>
              <router-link
                to="/home/user/info"
                :class="{ active: $route.path == '/home/user/info' }"
                >
                <span @click="select(-2)" style="display: block;
    width: 100%;
    height: 100%;">
                  个人信息
                </span>
                </router-link
              >
              <a @click="logOut">退出</a>
            </div>
            <template #reference>
              <el-avatar :size="40" fit="cover" :src="adminImg"></el-avatar>
            </template>
          </el-popover>
        </div>
      </el-header>

      <el-container>
        <el-main style="padding-top: 80px">
          <el-breadcrumb separator="/" style="margin-bottom:20px">
            <el-breadcrumb-item @click="select(-1)" :to="{ path: '/home/index' }"><i class="el-icon-s-home"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) of navList" :key="`nav-${index}`"><i :class="item.icon"></i>{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="container-cont"></router-view>
        </el-main>
        <el-footer>
          <p>Copyright © 2020 - 现在 云墨白. All Rights Reserved.</p>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      // adminImg:this.$store.state.user.admin.avatar_url||'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      isCollapse: false,
      isMenu: false,
      navList:[],
      homeList: [
        {
          id: "1",
          name: "文章管理",
          icon: "el-icon-document",
          children: [
            {
                id:"1-1",
                icon: "el-icon-edit-outline",
                name: "文章审核",
                url:"/home/articles/add"
            },
            // {
            //   id: "1-1",
            //   icon: "el-icon-edit-outline",
            //   name: "发表文章",
            //   url: "/home/articles/add",
            // },
            {
              id: "1-2",
              icon: "el-icon-tickets",
              name: "文章列表",
              url: "/home/articles/list",
            },
          ],
        },
        {
          id: "2",
          name: "用户管理",
          icon: "el-icon-user",
          children: [
            {
              id: "2-1",
              icon: "el-icon-edit-outline",
              name: "用户列表",
              url: "/home/user/list",
            },
          ],
        },
        // {
        //   id: "3",
        //   name: "友情链接",
        //   icon: "el-icon-link",
        //   children: [
        //     {
        //       id: "3-1",
        //       icon: "el-icon-edit-outline",
        //       name: "友链列表",
        //       url: "/home/link/list",
        //     },
        //   ],
        // },
        // {
        //   id: "4",
        //   name: "成长路线",
        //   icon: "el-icon-location-outline",
        //   children: [
        //     {
        //       id: "4-1",
        //       icon: "el-icon-edit-outline",
        //       name: "路线列表",
        //       url: "/home/route/list",
        //     },
        //   ],
        // },
        {
          id: "5",
          name: "留言管理",
          icon: "el-icon-chat-dot-round",
          children: [
            {
              id: "5-1",
              icon: "el-icon-edit-outline",
              name: "所有评论",
              url: "/home/message/list",
            },
          ],
        },
        {
          id: "6",
          name: "网站管理",
          icon: "el-icon-setting",
          children: [
            {
              id: "6-1",
              icon: "el-icon-edit-outline",
              name: "网站公告",
              url: "/home/sysmess/list",
            },
            {
              id: "6-2",
              icon: "el-icon-edit-outline",
              name: "主页轮播",
              url: "/home/show/list",
            },
            // {
            //   id: "6-3",
            //   icon: "el-icon-edit-outline",
            //   name: "音乐列表",
            //   url: "/home/music/list",
            // },
          ],
        },
      ],
    };
  },
  computed: {
    adminImg() {
      return (
        this.$store.state.user.user.avatar_url ||
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      );
    },
  },
  methods: {
    toggleMenu() {
      this.isMenu = !this.isMenu;
    },
    // 退出
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(selectPare, selectChil){
      console.log(selectPare)
      if(selectPare==-1){
        this.navList=[]
        return
      }else if(selectPare==-2){
        this.navList=[{
          name:'个人信息',
          icon:'el-icon-s-custom'
        }]
        return
      }
     const list=[this.homeList[selectPare],this.homeList[selectPare].children[selectChil]]
     this.navList=list
    }
  },
  created() {
    if (!this.$store.state.user.token) {
      this.$store.dispatch("logOut");
      this.$router.push("/login");
    }
  },
  mounted() {},
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

.logo >>> .el-tooltip {
  padding: 0px !important;
}

>>>.v-note-wrapper.fullscreen {
  z-index: 1700 !important;
}

.admin {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 30px;
  top: 10px;
}

.admin-ul a {
  display: block;
  height: 35px;
  text-align: center;
  line-height: 35px;
  transition: all 0.3s;
  color: #666;
  font-size: 13px;
}

.admin-ul a:hover {
  cursor: pointer;
  color: #1b9aee;
}

.el-header, .el-footer {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}

.el-header {
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
}

.el-footer {
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-menu-vertical-demo::-webkit-scrollbar {
  width: 8px;
  border-radius: 4px;
}

.el-menu-vertical-demo::-webkit-scrollbar-thumb {
  width: 8px;
  border-radius: 8px;
  background-color: #dadada;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu-item, .el-submenu__title {
  font-size: 13px;
  color: #666;
}

.el-menu-item.is-active {
  background-color: #e6f7ff;
  color: #1890ff;
}
>>>.el-submenu.is-active  {
  .el-submenu__title,.icon{
    color: #1890ff;
    }
}
.content {
  margin: 0;
  transition: all 0.4s;
  margin-left: 64px;
}

.container-cont {
  background: #ffffff;
  padding: 30px 20px;
  border-radius: 10px;
  box-sizing: border-box;
}

.navbar-toggle-btn {
  position: relative;
  display: block;
  width: 48px;
  height: 48px;
  padding: 0;
  text-align: center;
  align-items: center;
  cursor: pointer;
  background: #fff;
  line-height: 44px;
  border: 2px solid rgba(223, 223, 223, 0.3);
  box-sizing: border-box;
  border-radius: 50%;
  color: #c4c4c4;
  margin: 6px 0;
  margin-left: 64px;
  transition: all 0.4s;

  .menu {
    width: 16px;
    height: 16px;
    position: relative;
    margin: 14px auto;
    &:before, &:after {
      content: '';
      display: block;
      width: 16px;
      height: 2px;
      background: rgba(223, 223, 223, 0.8);
      border-radius: 1px;
      position: absolute;
      left: 0;
      transition: all 0.15s ease-in-out;
    }
    &:before {
      top: 2px;
      box-shadow: 0 5px rgba(223, 223, 223, 0.8);
    }
    &:after {
      bottom: 2px;
    }
  }

  .menu-active {
    &:before, &:after {
      background: #f974a1;
    }

    &:before {
      top: 7px;
      box-shadow: none;
      transform: rotate(225deg);
    }

    &:after {
      bottom: 7px;
      transform: rotate(135deg);
    }
  }
}
.el-menu-vertical-demo {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1600;
}

.el-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1550;
  width: 100%;
}

.is-left {
  transition: all 0.4s;
  margin-left: 200px;
}

.is-left .navbar-toggle-btn {
  margin-left: 200px;
}

@media (max-width: 768px) {
  .el-menu--collapse {
    width: 0px !important;
    overflow: hidden;
  }
  .is-left{
    margin 0
  }

  /* .content{
  } */
  .is-margin {
    transition: all 0.4s;
    margin-left: 0px !important;
  }

  .navbar-toggle-btn {
    margin-left: 0;
    transition: all 0.4s;
  }
}
@media (max-width:776px) {
  .el-main{
    padding-left:0
    padding-right:0
  }
}
</style>
