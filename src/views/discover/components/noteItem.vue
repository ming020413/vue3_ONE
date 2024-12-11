<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="50"
    >
      <!-- 日签组件 -->
      <div v-for="(data, index) in noteListData.dataArr" :key="index" class="note">
        <span class="date">{{ data.date }}月</span>
        <div class="content">
          <div v-for="(item, i) in data.value" :key="i" class="item">
            <van-image
              :src="`${item.cover}` + '?imageView2/1/w/145/h/100/q/75'"
            ></van-image>
            <div class="note-date">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="noteItem">
import { ref, reactive, onMounted, computed, watch, toRefs } from "vue";
import { getNoteListData } from "@/api/discover";
import { showToast } from "vant";
/* 接受父组件数据 */
let props = defineProps({
  currentDate: {
    type: Array,
  },
});
let $emits = defineEmits(["updateDate"]);

onMounted(() => {
  getNoteListDataFn();
});
/* 1.获取页面数据 */
let mouth = ref(props.currentDate[1] - 0);
let year = ref(props.currentDate[0] - 0);
let noteListData = reactive({
  dataArr: [],
});
let getNoteListDataFn = async () => {
  let data = {
    date: mouth.value,
    value: [],
  };
  if (mouth.value < 10) {
    data.value = (await getNoteListData(`${year.value}-0${mouth.value}`)).data;
  } else {
    data.value = (await getNoteListData(`${year.value}-${mouth.value}`)).data;
  }
  noteListData.dataArr.push(data);
};

/* 监听日期改变 */
watch(
  () => props.currentDate,
  (newValue, oldValue) => {
    year.value = newValue[0] - 0;
    mouth.value = newValue[1] - 0;
    noteListData.dataArr = [];
    getNoteListDataFn(); // 获取阅读列表
    finished.value = false; // 重置 finished 为 false，以便重新获取数据
    loading.value = false; // 重置 loading 为 false，以便重新获取数据
  },
  { deep: true }
);

/* 下拉刷新 */
//#region
let onRefresh = () => {
  setTimeout(() => {
    showToast("刷新成功");
    loading.value = false;
    //获取上一个月的数据
    unshiftData();
  }, 1000);
};
let unshiftData = async () => {
  //进行数据判断
  mouth.value = mouth.value += 1;
  if (mouth.value > 12) {
    if (year.value >= 2024) {
      showToast("已经是最新数据了！");
      return;
    }
    mouth.value = 1;
    year.value += 1;
  }
  // console.log(mouth.value, year.value);
  let data = {
    date: mouth.value,
    value: [],
  };
  let newDayStr = mouth.value < 10 ? `0${mouth.value}` : mouth.value;
  console.log(newDayStr);
  data.value = (await getNoteListData(`${year.value}-${newDayStr}`)).data;
  noteListData.dataArr.unshift(data);
  //通知父组件更新数据
  $emits("updateDate", [`${year.value}`, `${mouth.value}`]);
};
//#endregion

/* 滑动加载 */
//#region
let loading = ref(false);
let finished = ref(false);
let onLoad = async () => {
  mouth.value -= 1;
  let addData = {
    date: mouth.value,
    value: [],
  };
  if (mouth.value < 10) {
    addData.value = (await getNoteListData(`2024-0${mouth.value}`)).data;
  } else {
    addData.value = (await getNoteListData(`2024-${mouth.value}`)).data;
  }

  if (!addData.value.length) {
    loading.value = true;
    finished.value = true;
    return;
  }
  noteListData.dataArr.push(addData);
  loading.value = false;
};
//#endregion
</script>

<style scoped>
.note {
  width: 345rem;
  margin: 15rem 15rem 0 15rem;
  padding: 15rem 10rem 0 10rem;
  border-top: 1px solid #e6e5e5;
  position: relative;
  overflow: hidden;
  .date {
    position: absolute;
    top: -14rem;
    left: 155rem;
    padding: 5rem;
    background-color: #fff;
    font-size: 12rem;
    color: #999;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    padding-top: 5rem;
  }
  .item {
    width: 145rem;
    height: 135rem;
    border-radius: 5rem;
    overflow: hidden;
    box-shadow: 1rem 1rem 1rem #ccc;
    /* border: 1rem solid #e6e4e4; */
    margin-bottom: 30rem;
    .van-image {
      width: 145rem;
      height: 100rem;
      background-size: cover;
      background-position: center;
      border-radius: 10px;
      transition: transform 0.3s;
      border-radius: 5rem;
    }
    .note-date {
      height: 25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14rem;
      color: #ccc;

      /* background-color: pink; */
    }
  }
  .item:nth-child(2n-1) {
    margin-right: 35rem;
  }
}
</style>
