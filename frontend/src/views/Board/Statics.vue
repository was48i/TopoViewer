<template>
  <div class="rca-statics-board" :class="{'rca-statics-view': isCheckStatics}" v-show="!isCheckStatics">
    <div class="statics-board">
      <p class="statics-title">{{$t('lang.rcaResultStatics')}}</p>
      <el-row class="statics-board-row">
        <el-col :span="11" class="board-col board-left">
          <div class="board-col-item">
            <span class="board-count orange-text">{{total_count}}</span>
            <span>{{$t('lang.totalAlarm')}}</span>
          </div>
          <div class="board-col-item">
            <span class="board-count">{{p_count}}</span>
            <span>{{$t('lang.pAlarm')}}</span>
          </div>
          <div class="board-col-item">
            <span class="board-count">{{c_count}}</span>
            <span>{{$t('lang.cAlarm')}}</span>
          </div>
          <div class="board-col-item statics-none-item">
            <span class="board-count">{{x_count}}</span>
            <span>{{$t('lang.xAlarm')}}</span>
          </div>
        </el-col>
        <el-col :span="13" class="board-col">
          <div class="board-col-item">
            <span class="board-count">{{group_count}}</span>
            <span>{{$t('lang.groupNumber')}}</span>
          </div>
          <div class="board-col-item">
            <span class="board-count blue-text">{{confirmed_count}}</span>
            <span>{{$t('lang.confirmed')}}</span>
          </div>
          <div class="board-col-item">
            <span class="board-count" style="color: #ff686f">{{unconfirmed_count}}</span>
            <span>{{$t('lang.unconfirmed')}}</span>
          </div>
          <div class="board-col-item board-precision">
            <span class="board-count">{{accuracy}}</span>
            <span>{{$t('lang.accuracy')}}</span>
          </div>
          <div class="board-col-item" @click="checkStatics">
            <i class="el-icon-arrow-right board-viewer-icon"></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { State } from 'vuex-class';
import { AnalyzeRes, AlarmData } from '@/types/type';
import { generateUUID, generateDateByTimestamp } from '@/util/util';

@Component
export default class StaticsBoard extends Vue {
  @State((state) => state.app.isCheckStatics) private isCheckStatics!: boolean;
  @State((state) => state.project.total_count) private total_count!: number;
  @State((state) => state.project.p_count) private p_count!: number;
  @State((state) => state.project.c_count) private c_count!: number;
  @State((state) => state.project.group_count) private group_count!: number;
  @State((state) => state.project.confirmed_count) private confirmed_count!: number;
  @State((state) => state.project.unconfirmed_count) private unconfirmed_count!: number;
  @State((state) => state.project.accuracy) private accuracy!: string;
  @State((state) => state.project.x_count) private x_count!: number;
  @State((state) => state.app.alarmDatas) public alarmDatas!: AlarmData[];
  @State((state) => state.app.isCheckNone) private isCheckNone!: boolean;
  public checkStatics() {
    this.$store.commit('SET_ISCHECKSTATICS', true);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.rca-statics-board {
  font-size: 16px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 4px 6px 0 rgba(186, 186, 186, 0.5);
  background-color: #ffffff;
  .rca-dec {
    cursor: pointer;
    padding: 0 15px;
  }
  .statics-board {
    width: 100%;
    .statics-title {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #dfdfdf;
    }
    .statics-board-row {
      padding: 25px 20px 20px;
      max-width: 1440px;
      margin: 0 auto;
      .board-left {
        border-right: 1px solid #dfdfdf;
      }
      .board-col {
        display: flex;
        justify-content: space-around;
        .board-col-item{
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .board-count {
          font-size: 26px;
          font-weight: 500;
          padding-bottom: 10px;
        }
        .board-viewer-icon {
          line-height: 50px;
          font-size: 36px;
          color: #979797;
          cursor: pointer;
        }
      }
    }
  }
}
.rca-waring-dec {
  border-bottom: 1px solid #338AFF;
}
.rca-statics {
  display: inline-block;
  transition: opacity 0.3;
}
.dec-group {
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #338AFF;
  }
}
.statics-precision {
  padding-right: 5px;
  color: #282828;
}
.rca-statics-view {
  margin-top: 10px!important;
  line-height: 40px;
  background-color: transparent;
  box-shadow: none;
}
</style>
