<template>
  <div class="rca-topo-table">
    <div class="topo-table-tabs">
      <div class="topo-table-tab" :class="{active: activeType === 0}" @click="switchTab(0)">{{$t('lang.unaffirm')}}  {{unconfirm_count}}</div>
      <div class="topo-table-tab" :class="{active: activeType}" @click="switchTab(1)">{{$t('lang.affirm')}}  {{confirm_count}}</div>
    </div>
    <TopoTable :isunConfirmed="activeType === 0" :tableData="tabData" @updateCount="updateConfirmCount"></TopoTable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import TopoTable from "../Table/TopoTable.vue";
import TableData from "./tableData.json";
import { AlarmData, EventType } from '@/types/type';
import { generateUUID } from '@/util/util';
import bus from '@/util/bus';

@Component({
  components: {
    TopoTable
  }
})
export default class StaticsBoard extends Vue {
  @Provide() private activeType: number = 0;
  @Provide() private tabData: AlarmData[] = [];
  @Provide() private confirm_count: number = 0;
  @Provide() private unconfirm_count: number = 0;
  @State((state) => state.app.isNoneTopoData) private isNoneTopoData!: boolean;
  @State((state) => state.app.isNoneTableData) private isNoneTableData!: boolean;
  @State((state) => state.app.alarmDatas) private alarmDatas!: AlarmData[];
  @State((state) => state.app.pageData) private pageData!: AlarmData[];
  @State((state) => state.app.selectAlarm) private selectAlarm!: string;
  @State((state) => state.app.needSave) private needSave!: boolean;
  @Watch('alarmDatas')
  public watchAlarmDatas(val: AlarmData[]) {
    this.activeType = 0;
    this.changeTableData()
    this.updateConfirmCount();
  }
  @Watch('pageData')
  public watchPageData(val: AlarmData[]) {
    this.tabData = [...val];
  }
  @Watch('activeType')
  private watchType(val: string, oval: string) {
    this.changeTableData();
  }
  @Watch('selectAlarm')
  public watchSelectAlarm(val: string) {
    if (val) {
      this.skipPage();
    }
  }
  public changeTableData() {
    let filt: boolean = !!this.activeType;
    const tableData: AlarmData[] = this.alarmDatas.filter((alarmData: AlarmData) => alarmData.isConfirmed === filt);
    this.$store.commit('SET_TABLEDATA', tableData);
  }
  public switchTab(conType: number) {
    if (this.needSave) {
      bus.$emit(EventType.ERRORVISIBLE, {
        title: 'Error',
        content: '<p>The current result is not saved. Are you sure you want to leave?</p>',
        confirmCallback: () => {
          this.$store.commit('SET_NEEDSAVE', false);
          this.activeType = conType;
        },
        saveCallback: () => {
          bus.$emit(EventType.SAVEDATA);
        }
      });
    } else {
      this.activeType = conType;
    }
  }
  // 联动跳转到当前页
  public skipPage() {
    const filt: boolean = !!this.activeType;
    const tableData: AlarmData[] = this.alarmDatas.filter((alarmData: AlarmData) => alarmData.isConfirmed === filt);
    const target = tableData.some((alarmData) => alarmData.alarmSourceName === this.selectAlarm);
    if (!target) {
      this.activeType = ~this.activeType + 2;
    }
  }
  public updateConfirmCount() {
    this.confirm_count = this.alarmDatas.filter((alarmData: AlarmData) => alarmData.isConfirmed).length;
    this.unconfirm_count = this.alarmDatas.length - this.confirm_count;
    this.changeTableData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.rca-topo-table {
  padding: 0 0px 0 0px;
  .topo-table-tab {
    color: #282828;
    cursor: pointer;
    padding: 0 40px;
    &.active {
      font-weight: 600;
      color: #4a96ff;
      border-bottom:4px solid #4a96ff;
    }
  }
  .topo-table-tabs {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
    padding-left: 20px;
  }
}
</style>
