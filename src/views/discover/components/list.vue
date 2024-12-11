<template>
  <!-- 列表组件 -->
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="50"
    >
      <div v-for="(data, index) in readListData.dataArr" :key="index" class="list">
        <span class="date">{{ data.date }}月</span>
        <div v-for="(item, index) in data.value" :key="index" class="item">
          <!-- 图片 -->
          <div class="img">
            <van-image :src="item.cover" lazy-load radius="12rem">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
          <!-- 信息 -->
          <div class="info">
            <div class="title">{{ item.title }}</div>
            <div class="author">{{ item.subtitle }}</div>
          </div>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts" name="list">
import { ref, reactive, onMounted, computed, watch, toRefs } from "vue";
import { getReadListData } from "@/api/read.ts";
import { showToast } from "vant";
/* props/emits */
let props = defineProps({
  currentDate: {
    type: Array,
  },
});
let $emits = defineEmits(["updateDate"]);

onMounted(() => {
  getReadListDataFn(); // 获取阅读列表
});

/* 日期 */
let mouth = ref(props.currentDate[1] - 0);
let year = ref(props.currentDate[0] - 0);

/* 获取阅读列表 */
let readListData = reactive({
  dataArr: [],
});
let getReadListDataFn = async () => {
  let data = {
    date: mouth.value,
    value: [],
  };
  if (mouth.value < 10) {
    data.value = (await getReadListData(`${year.value}-0${mouth.value}`)).data;
  } else {
    data.value = (await getReadListData(`${year.value}-${mouth.value}`)).data;
  }

  readListData.dataArr.push(data);
};
/* 监听日期改变 */
watch(
  () => props.currentDate,
  (newValue, oldValue) => {
    year.value = newValue[0] - 0;
    mouth.value = newValue[1] - 0;
    readListData.dataArr = [];
    getReadListDataFn(); // 获取阅读列表
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
  data.value = (await getReadListData(`${year.value}-${newDayStr}`)).data;
  readListData.dataArr.unshift(data);
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
    addData.value = (await getReadListData(`2024-0${mouth.value}`)).data;
  } else {
    addData.value = (await getReadListData(`2024-${mouth.value}`)).data;
  }

  if (!addData.value.length) {
    loading.value = true;
    finished.value = true;
    return;
  }
  readListData.dataArr.push(addData);
  loading.value = false;
};
//#endregion
</script>

<style scoped>
.list {
  width: 345rem;
  margin: 15rem 15rem 0 15rem;
  padding-top: 15rem;
  border-top: 1px solid #e6e5e5;
  position: relative;
  .date {
    position: absolute;
    top: -14rem;
    left: 155rem;
    padding: 5rem;
    background-color: #fff;
    font-size: 12rem;
    color: #999;
  }
  .item {
    display: flex;
    margin-bottom: 15rem;
    .van-image {
      width: 65rem;
      height: 65rem;
      border-radius: 25%;
    }
    .info {
      margin-left: 25rem;
      .title {
        margin-bottom: 15rem;
      }
      .author {
        color: #999;
        font-size: 12rem;
      }
    }
  }
}
</style>
