<template>
  <!-- 分类/阅读 -->
  <div class="read">
    <!-- 日期选择 -->
    <div class="top">
      <van-cell
        :title="defaultDate"
        @click="showPopup"
        style="text-align: center; border: 0; padding: 0; color: #999"
        key="read"
      />
      <van-popup v-model:show="showDateDialog">
        <van-date-picker
          v-model="currentDate"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          :columns-type="columnsType"
          @confirm="selectDate"
          @cancel="escDate"
        />
      </van-popup>
    </div>
    <!-- 列表组件 -->
    <list :currentDate="currentDate" @updateDate="updateDate"></list>
  </div>
</template>

<script setup lang="ts" name="read">
/* 分类/阅读 */
import { ref, reactive, onMounted, computed } from "vue";
import list from "./components/list";

/* 日期选择弹窗 */
//1.显示弹窗
let showDateDialog = ref(false);
let showPopup = () => {
  showDateDialog.value = true;
};
//2.选择日期
let currentDate = reactive(["2024", "12"]);
let defaultDate = ref("2024年12月");
let columnsType = ["year", "month"];
let minDate = new Date(2020, 0, 1);
let maxDate = new Date(2025, 5, 1);
let formatter = (type: any, option: any) => {
  if (type === "year") {
    option.text += "年";
  }
  if (type === "month") {
    option.text += "月";
  }
  return option;
};
let selectDate = () => {
  defaultDate.value = `${currentDate[0]}年${currentDate[1] - 0}月`;

  showDateDialog.value = false;
};
let escDate = () => {
  showDateDialog.value = false;
};

/* 2.修改日期 */
let updateDate = (date: any) => {
  currentDate = date;
  defaultDate.value = `${currentDate[0]}年${currentDate[1] - 0}月`;
};
</script>

<style scoped>
.read {
  width: 375rem;
  padding: 75rem 0;
  .top {
    width: 100%;
    margin-bottom: 10rem;
    position: fixed;
    top: 45rem;
    z-index: 5;
  }
  .van-popup {
    width: 100%;
    padding: 0 !important;
  }
  .van-popup--center {
    top: 154rem;
    max-width: 375rem;
  }
  .van-picker__columns {
    height: 250rem !important;
  }
}
</style>
