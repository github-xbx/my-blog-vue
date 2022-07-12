<template>
  <div>
    <div class="comment">
      <div class="comment-left">
        <Image :src="myHeader" class="avatar"></Image>
      </div>
      <div class="comment-right">
        <input
          type="text"
          id="commentReply"
          class="comment-edit"
          name="comment"
          v-model="commentMessage"
        />
        <button @click="sendComment">发表评论</button>
      </div>
    </div>

    <div
      v-for="(item, i) in comments"
      :key="i"
      class="author-title reply-father"
    >
      <!-- <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar> -->
      <Image :src="item.headImg" class="avatar"></Image>
      <div class="author-info">
        <span class="author-name">{{ item.name }}</span>
        <span class="author-time">{{ item.time }}</span>
      </div>
      <div class="icon-btn">
        <span @click="showReplyInput(i, '0', item.name, item.id)">
          <!-- <i class="iconfont el-icon-s-comment"></i> -->
          <MessageOutlined />
          {{ item.commentNum }}
        </span>
        <!-- <span  @click="addlikeNumber(i, item.from, item.id)">
        <i class="iconfont el-icon-caret-top"></i>
        {{ item.like }}
        </span> -->
        <span class="xin" @click="countlikeNumber('1', i, item.id)">
          <!-- <i class="iconfont el-icon-caret-top" v-if="item.isLike">&#xe607;</i>
          <i class="iconfont el-icon-caret-top" v-else>&#xe68b;</i> -->
          &nbsp;
          <LikeOutlined />
          {{ item.like }}
        </span>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{ item.comment }}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
          <Image :src="reply.fromHeadImg" class="avatar"></Image>

          <div class="author-info">
            <span class="author-name">{{ reply.from }}</span>
            <span class="author-time">{{ reply.time }}</span>
          </div>
          <div class="icon-btn">
            <span @click="showReplyInput(i, j, reply.from, reply.id)">
              <MessageOutlined />
              {{ reply.commentNum }}
            </span>
            <span @click="countlikeNumber('2', i, j, reply)">
              &nbsp;
              <LikeOutlined />
              {{ reply.like }}
            </span>
          </div>
          <div class="talk-box">
            <p>
              <span>回复 {{ reply.to }}:</span>
              <span class="reply">{{ reply.comment }}</span>
            </p>
          </div>
          <div class="reply-box"></div>
        </div>
      </div>

      <div class="comment my-comment-reply" v-show="_inputShow(i)">
        <div class="comment-left">
          <Image :src="myHeader" class="avatar"></Image>
        </div>
        <div class="comment-right">
          <input
            type="text"
            id="commentReply"
            class="comment-edit"
            name="comment"
            v-model="commentMessageReply"
          />
          <button @click="sendCommentReply(i)">发表回复</button>
        </div>
      </div>
     
    </div>
  </div>
</template>


<script>
import Image from "@/components/image/image";
import { MessageOutlined, LikeOutlined } from "@ant-design/icons-vue";
import Notification from "@/components/notification/index.js";

const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: "CommentMain",
  components: {
    Image,
    MessageOutlined,
    LikeOutlined,
    // eslint-disable-next-line vue/no-unused-components
    Notification,
  },
  data() {
    return {
      commentMessage: "",
      commentMessageReply:"",
      btnShow: false,
      index: "0",
      // replyComment: "",
      subIndex: "0",
      myName: "Lana Del Rey",
      myHeader:
        "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
      myId: 19870621,
      to: "",
      toId: -1,
      comments: [
        {
          name: "Lana Del Rey",
          id: 19870621,
          headImg:
            "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
          comment: "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",
          time: "2019年9月16日 18:43",
          commentNum: 2,
          like: 15,
          isLike: false,
          likeListId: [], //存放已点赞用户的id
          inputShow: false,
          reply: [
            {
              from: "Taylor Swift",
              fromId: 19891221,
              fromHeadImg:
                "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "我很喜欢你的新专辑！！",
              time: "2019年9月16日 18:43",
              commentNum: 1,
              like: 15,
              isLike: false,
              likeListId: [],
              inputShow: false,
            },
            {
              from: "Ariana Grande",
              fromId: 1123,
              fromHeadImg:
                "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "别忘记宣传我们的合作单曲啊",
              time: "2019年9月16日 18:43",
              commentNum: 0,
              like: 5,
              isLike: false,
              likeListId: [],
              inputShow: false,
            },
          ],
        },
        {
          name: "Taylor Swift",
          id: 19891221,
          headImg:
            "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
          comment: "我发行了我的新专辑Lover",
          time: "2019年9月16日 18:43",
          commentNum: 1,
          like: 5,
          likeListId: [],
          inputShow: false,
          reply: [
            {
              from: "Lana Del Rey",
              fromId: 19870621,
              fromHeadImg:
                "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
              to: "Taylor Swift",
              toId: 19891221,
              comment: "新专辑和speak now 一样棒！",
              time: "2019年9月16日 18:43",
              commentNum: 25,
              like: 5,
              isLike: false,
              likeListId: [],
              inputShow: false,
            },
          ],
        },
        {
          name: "Norman Fucking Rockwell",
          id: 20190830,
          headImg:
            "https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/touxaing.jpg",
          comment: "Plz buy Norman Fucking Rockwell on everywhere",
          time: "2019年9月16日 18:43",
          commentNum: 0,
          like: 5,
          isLike: false,
          likeListId: [],
          inputShow: false,
          reply: [],
        },
      ],
    };
  },
  directives: { clickoutside },
  methods: {
    inputFocus() {
      var replyInput = document.getElementById("replyInput");
      replyInput.style.padding = "8px 8px";
      replyInput.style.border = "2px solid blue";
      replyInput.focus();
    },
    showReplyBtn() {
      this.btnShow = true;
    },
    hideReplyBtn() {
      this.btnShow = false;

      this.replyInput.style.padding = "10px";
      this.replyInput.style.border = "none";
    },
    showReplyInput(i, j, name, id) {
      this.comments[this.index].inputShow = false;
      this.index = i;
      this.comments[i].inputShow = true;
      this.to = name;
      this.toId = id;
      this.subIndex = j == "0" ? "0" : j;
    },
    addlikeNumber(i, id) {
      let list = this.comments[i].likeListId;
      // console.log(i, name, id)
      if (list.length === 0) {
        //在已经点赞的列表中未找到userId
        this.comments[i].isLike = true;
        this.comments[i].like += 1;
        this.comments[i].likeListId.push(id);
        console.log(
          "点赞+1",
          this.comments[i].isLike,
          this.comments[i].like,
          this.comments[i].likeListId
        );
      } else {
        const index = list.indexOf(this.myId);
        this.comments[i].isLike = false;
        this.comments[i].like -= 1;
        this.comments[i].likeListId.splice(index, 1);
        console.log(
          "点赞-1",
          this.comments[i].isLike,
          this.comments[i].likeListId
        );
      }
    },
    countlikeNumber(type, i, j, id) {
      const text = type === "1" ? this.comments[i] : this.comments[i].reply[j];
      let list = text.likeListId;
      if (list.length === 0) {
        //在已经点赞的列表中未找到userId
        text.isLike = true;
        text.like += 1;
        text.likeListId.push(id);
        console.log("点赞+1", text.isLike, text.like, text.likeListId);
      } else {
        const index = list.indexOf(this.myId);
        text.isLike = false;
        text.like -= 1;
        text.likeListId.splice(index, 1);
        console.log("点赞-1", text.isLike, text.likeListId);
      }
    },
    _inputShow(i) {
      return this.comments[i].inputShow;
    },
    sendComment() {
      if (this.commentMessage === "") {
        Notification.warning({
          message: "评论不能为空",
          //description: error.response.data.message,
        });
      } else {
        let a = {};
        let timeNow = new Date().getTime();
        let time = this.dateStr(timeNow);
        a.name = this.myName;
        a.comment = this.commentMessage;
        a.headImg = this.myHeader;
        a.time = time;
        a.commentNum = 0;
        a.like = 0;
        a.id = this.myId;
        (a.reply = []),
          (a.isLike = false),
          (a.likeListId = []),
          this.comments.push(a);
        this.commentMessage = "";
      }
    },
    sendCommentReply(i) {
      if (this.commentMessageReply === "") {
        Notification.warning({
          message: "回复不能为空"+i,
          //description: error.response.data.message,
        });
      } else {
        let a = {};
        let timeNow = new Date().getTime();
        let time = this.dateStr(timeNow);
        a.from = this.myName;
        a.to = this.to;
        a.fromHeadImg = this.myHeader;
        a.comment = this.commentMessageReply;
        a.time = time;
        a.commentNum = 0;
        a.like = 0;
        a.isLike = false;
        a.likeListId = [];
        
        if (this.subIndex === "0") {
          this.comments[i].commentNum += 1;
        } else {
          this.comments[i].reply[this.subIndex].commentNum += 1;
        }
        this.comments[i].reply.push(a);
        this.commentMessageReply = "";
        
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date) {
      //获取js 时间戳
      var time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000);
      //存储转换值
      var s;
      if (time < 60 * 10) {
        //十分钟内
        return "刚刚";
      } else if (time < 60 * 60 && time >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        var date1 = new Date(parseInt(date));
        return (
          date1.getFullYear() +
          "/" +
          (date1.getMonth() + 1) +
          "/" +
          date1.getDate()
        );
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.comment {
  display: flex;
  padding: 10px;
  .comment-left {
    width: 5%;
    //margin-right: 10px;
  }
  .comment-right {
    width: 95%;
    display: flex;
    .comment-edit {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 20px;
    }
    input {
      border: 2px solid #1890ff;
      border-radius: 15px 0px 0px 15px;
    }
    button {
      width: 10%;
      font-size: 14px;
      border: 0px solid #1890ff;
      background: #1890ff;
      color: #fff;
      border-radius: 0px 15px 15px 0px;
    }
  }
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.my-reply {
  padding: 10px;
  background-color: #fafbfc;

  .reply-info {
    display: inline-block;
    margin-left: 5px;
    width: 86%;
    //根据屏幕宽度自适应
    @media screen and(max-width:1200px) {
      width: 80%;
    }
    .reply-input {
      //min-height: 20px;
      //line-height: 22px;
      padding: 10px 10px;
      color: #ccc;
      background-color: #fff;
      border-radius: 5px 0 0 5px;
      // &:empty::before{
      //   content attr(placeholder);
      // }
      &:empty:before {
        content: attr(placeholder);
      }
      &:focus:before {
        content: none;
      }
      &:focus {
        // padding: 8px 8px;
        border: 2px solid #1890ff;
        box-shadow: none;
        outline: none;
      }
    }
  }
  .reply-btn-box {
    height: 42px;
    // margin: 10px 0;
    display: inline-block;
    .reply-btn {
      // position: relative;
      // float: right;
      //margin-left: 15px;
      // margin-right: 15px;
      width: 80px;
      height: 42px;
      border-radius: 0px 5px 5px 0px;
      border: 2px #1890ff;
      padding: 4px;
      background: #1890ff;
      color: #fff;
    }
  }
}
.my-comment-reply {
  margin-left: 50px;
  .reply-input {
    width: flex;
  }
}
.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(74, 136, 199, 0.3);
}
.reply-father {
  padding: 10px;

  .author-info {
    display: inline-block;
    margin-left: 5px;
    width: 60%;
    height: 40px;
    line-height: 20px;
    span {
      display: block;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .author-name {
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }
    .author-time {
      font-size: 14px;
    }
  }
  .icon-btn {
    width: 30%;
    padding: 0 !important ;
    float: right;
    @media screen and (max-width: 1200px) {
      width: 20%;
      padding: 7px;
    }
    span {
      cursor: pointer;
    }
    .iconfont {
      margin: 0 5px;
    }
  }
  .talk-box {
    margin: 0 50px;
    p {
      margin: 0;
    }
    .reply {
      font-size: 16px;
      color: #000;
    }
  }
  .reply-box {
    margin: 10px 0 0 50px;
    background-color: #efefef;
  }
}
</style>






