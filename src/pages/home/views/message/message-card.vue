<template>
  <MessCard class="message-list-card concise">
    <template #actions>
      <div class="actions">
        <span class="time">{{ item.commentTime }}</span>
        <!-- <span>{{ formatAddress(item.address) }}</span> -->
        <MessageOutlined class="reply" @click="show('message', item.commentId)" />
        <DeleteOutlined
          class="delete"
          v-if="
            (user.id == item.user_id && user.id > 0) || user.is_admin == 1
          "
          @click="deleteMess('message', item.commentId)"
        />
      </div>
      <Comment
        @submit="reply"
        v-if="commentID == 'message' + item.id && commentShow"
      ></Comment>
    </template>
    <template #author>
      <a>{{ item.user ? item.user.name : item.tourist }}</a>
      <span v-if="item.user ? item.user.is_admin : false" class="blogger"
        >博主</span
      >
    </template>
    <template #avatar>
       <Image
            :src="
              item.user
                ? item.user.avatar_url
                : item.qq
                ? 'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=100'
                : ''
            "
            class="user">
            
              <template #placeholder>
                <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/4inn.png"/>
              </template><template #error>
                <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/b72d.png"/>
              </template>
          </Image>
    </template>
    <template #content>
      <Preview :content="format(item.message)" />
    </template>
    <template v-if="item.reply&&item.reply.length">
      <MessCard v-for="item of item.reply" :key="'reply' + item.id" class="message-list-card" style="padding:0;margin:0;">
        <template #actions>
          <div class="actions">
            <span class="time">{{ formatDate(item.created_at) }}</span>
            <span>{{ formatAddress(item.address) }}</span>
            <MessageOutlined class="reply" @click="show('reply', item.id)" />
            <DeleteOutlined
              class="delete"
              v-if="
                (user.id == item.user_id && user.id > 0) || user.is_admin == 1
              "
              @click="deleteMess('reply', item.id)"
            />
          </div>
          <Comment
            @submit="reply($event, item.id)"
            v-if="commentID == 'reply' + item.id && commentShow"
          ></Comment>
        </template>
        <template #author>
          <a>{{ item.user ? item.user.name : item.tourist }}</a>
          <span v-if="item.user ? item.user.is_admin : false" class="blogger"
            >博主</span
          >
        </template>
        <template #avatar>
          <Image
             :src="
              item.user
                ? item.user.avatar_url
                : item.qq
                ? 'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=100'
                : ''
            "
            class="user">
            
              <template #placeholder>
                <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/4inn.png"/>
              </template><template #error>
                <img style="width: 100%;height: 100%;" src="https://bit-images.bj.bcebos.com/bit-new/file/20210323/b72d.png"/>
              </template>
          </Image>
        </template>
        <template #content>
          <p class="mess-reply"  v-if="item.mess_reply[0]">
            <span>回复@{{item.mess_reply[0].user.name}}</span>
            <Preview :content="format(item.mess_reply[0].reply)" />
          </p> 
          <Preview :content="format(item.reply)" /> 
        </template>
      </MessCard>
    </template>
  </MessCard>
</template>
<script>
import MessCard from "@/components/comment/comment";
import Preview from "@/components/editor/preview";
import Image from "@/components/image/image";
import { MessageOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import Comment from "./comment";
import emoji from "./emoji.json";
// import { replyAdd, deleteMess } from "./message.js";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    item: Object,
  },
  components: {
    MessCard,
    Preview,
    Image,
    Comment,
    MessageOutlined,
    DeleteOutlined,
  },
  
  setup(props, context) {
    const commentID = ref("");
    const commentShow = ref(false);
    const store = useStore();
    const user = computed(() => store.state.user.user);
    // type:切换类型。id:切换id
    const show = (type, id) => {
      console.log("1111111111",type,id);
      if (commentID.value != type + id) {
        commentShow.value = true;
      } else {
        commentShow.value = !commentShow.value;
      }
      //console.log( commentShow.value)
      commentID.value = type + id;
    };
    const emotion = (re) => {
      if (emoji[re]) {
        return `![${re.slice(1, -1)}](${emoji[re]})`;
      }
      return re;
    };
    const format = (content) => {
      console.log(content);
      return content.replace(/#(.){0,8}?;/gi, emotion);
    };
    const reply = (cont, id) => {
      const info = {
        mess_id: props.item.id,
        reply: cont,
      };
      if (id) {
        info["mess_reply_id"] = id;
      }
      context.emit("reply", info);
      console.log(info);
      // replyAdd(info);
    };
    const deleteMess = (type, id) => {
      context.emit("delete", {
        type,
        id,
      });
    };
    const formatDate = (dateTimeStamp) => {
      dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi, "/"));
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      //   const halfamonth = day * 15;
      const month = day * 30;
      const now = new Date().getTime();
      const diffValue = now - dateTimeStamp;
      if (diffValue < 0) {
        return;
      }
      const monthC = diffValue / month;
      const weekC = diffValue / (7 * day);
      const dayC = diffValue / day;
      const hourC = diffValue / hour;
      const minC = diffValue / minute;
      let result = "";
      if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    };
    const formatAddress = (address) => {
      if (!address) return;
      let adds = address.split("-");
      let province = adds[1].split("省")[0];
      let city = adds[2].split("市")[0];
      return `${province} • ${city}`;
    };
    return {
      format,
      commentID,
      commentShow,
      show,
      reply,
      deleteMess,
      formatDate,
      formatAddress,
      user,
    };
  },
};
</script>
<style lang="stylus" scoped>
.message-list-card {
  animation: fadeTop 0.4s ease-in 0s 1 normal backwards;

  .blogger {
    padding: 2px 4px;
    margin: 0 4px;
    background: #fff;
    border-radius: 4px;
  }
  .mess-reply{
    color #3da8f5
    border 2px solid  rgba(246 ,248 ,249, .8)
    background rgba(255,255,255,.4)
    padding: 4px 6px;
    border-radius: 10px;
    &>span {
      margin-right 5px
    }
    >>>.write p{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
     

  }
  .user{
    border: 2px solid rgba(223,223,223,0.3);
    box-sizing border-box
    width 48px
    height 48px
    background: #fff;
    line-height: 44px;
    border: 2px solid rgba(223,223,223,0.3);
    box-sizing: border-box;
    border-radius: 50%;
    color: #c4c4c4;
  }

  .actions {
    .time {
      margin-right: 3px;
    }

    .reply, .delete {
      float: right;
      font-size: 18px;
      margin: 0 5px;
      cursor: pointer;
      outline: none;
    }
  }
}
@keyframes fadeTop {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>