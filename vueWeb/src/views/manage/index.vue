<template>
    <div class="manage tc">
      <el-select v-model="customerValue" filterable  @change="customerChange($event)">
        <el-option value="*">*</el-option>
        <el-option v-for="item in selectData" :value="item.customer" :label="item.customer">

        </el-option>
      </el-select>
      <el-select v-model="deviceValue" filterable  id="device"  clearable @change="deviceChange($event)">
        <el-option value="*">*</el-option>
        <el-option v-for="item in deviceData" :value="item" :label="item" >

        </el-option>
      </el-select>
      <el-select v-model="lotValue" filterable  id="lot"  clearable @change="lotChange($event)">
        <el-option value="*">*</el-option>
        <el-option v-for="item in lotData" :value="item.lot" :label="item.lot" >

        </el-option>
      </el-select>
      <el-select v-model="cpValue" filterable  id="cp"  clearable @change="cpChange($event)">
        <el-option value="*">*</el-option>
        <el-option v-for="item in cpData" :value="item" :label="item" >

        </el-option>
      </el-select>
      <el-select v-model="waferValue" filterable  id="wafer"  clearable>
        <el-option value="*">*</el-option>
        <el-option v-for="item in waferData" :value="item" :label="item" >

        </el-option>
      </el-select>
      <el-button class="el-button" @click="showTable()">显示</el-button>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" border>
      <el-table-column type="expand" label="Details" fixed="left" width="80">
       <template slot-scope="props">
         <el-form label-position="left" inline class="demo-table-expand">
           <el-form-item label="operator">
             <span>{{props.row.oprator}}</span>
           </el-form-item>
           <el-form-item label="program">
             <span>{{props.row.testerProgram}}</span>
           </el-form-item>
           <el-form-item label="MapCols">
             <span>{{props.row.mapCols}}</span>
           </el-form-item>
           <el-form-item label="MapRows">
             <span>{{props.row.mapRows}}</span>
           </el-form-item>
           <el-form-item label="MinX">
             <span>{{props.row.minX}}</span>
           </el-form-item>
           <el-form-item label="MinY">
             <span>{{props.row.minY}}</span>
           </el-form-item>
           <el-form-item label="PidName">
             <span>{{props.row.pidName}}</span>
           </el-form-item>
           <el-form-item label="PidVersion">
             <span>{{props.row.pidVersion}}</span>
           </el-form-item>
         </el-form>
       </template>
      </el-table-column>
      <el-table-column label="Device" prop="device"  width="100">

      </el-table-column>
      <el-table-column label="Lot" prop="lotId" width="100">

      </el-table-column>
      <el-table-column label="CP" prop="cpStep"  width="100">

      </el-table-column>
      <el-table-column label="Wafer" prop="waferNo"  width="100">

      </el-table-column>
      <el-table-column label="Gross" prop="grossDie" width="100">

      </el-table-column>
      <el-table-column label="Pass" prop="passDie" width="100">

      </el-table-column>
      <el-table-column label="Fail" prop="failDie" width="100">

      </el-table-column>
      <el-table-column label="Yield" prop="yield" width="100">

      </el-table-column>
      <el-table-column label="Tester" prop="testerId" width="100">

      </el-table-column>
      <el-table-column label="Prober" prop="proberId" width="100">

      </el-table-column>
      <el-table-column label="ProberCard" prop="proberCardId" width="150">

      </el-table-column>
      <el-table-column label="StartTime" prop="startTime" width="200">

      </el-table-column>
      <el-table-column label="EndTime" prop="endTime" width="200">

      </el-table-column>
    </el-table>
      <el-pagination align='center'
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[1,5,10,20]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      >
      </el-pagination>
    </div>
</template>

<script>
  function getUrl(customer,device,lot,wafer,cp){
    var url="?customer";
    if(customer=="*")
    {
      return "*";
    }else
    {
      url=url+"="+customer;
    }
    if (device=="*")
    {
      return url;
    }else
    {
      url=url+"&device="+device;
    }
    if (lot=="*")
    {
      return url;
    }else
    {
      url=url+"&lot="+lot;
    }
    if (cp=="*")
    {
      return url;
    }else
    {
      url=url+"&cp="+cp;
    }
    if (wafer=="*")
    {
      return url;
    }else
    {
      url=url+"&waferId="+wafer;
    }
    return url;

  }
  import moment from 'moment'
  import FooterNav from '../../components/footer'
  export default {
    components:{
      FooterNav
    },
    created(){
      this.init()
    },
    data(){
      return{
         tableData:[],
        selectData:[],
        deviceData:[],
        lotData:[],
        cpData:[],
        waferData:[],
        currentPage: 1,
        pageSize: 5,
        customerValue:'*',
        deviceValue:'*',
        value:'',
        lotValue:'*',
        cpValue:'*',
        waferValue:'*'
      }
    },
    methods:{
      init(){
        var selectData=this.selectData;
        var token=localStorage.getItem("Authorization")
        this.$axios({
          methods: 'get',
          url:"http://192.168.10.191:20400/customerAndDevices",
          headers:{'Accept': 'application/json','Authorization':token}
        }).then(response=>{
          $.each(response.data,function (i,item) {
            selectData.push(item)
          })
        })
      },
      handleSizeChange:function(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange:function(val) {
        this.currentPage = val;
      },
      customerChange:function(e){
        this.customerValue=e;
        this.deviceValue='*';
        this.lotValue='*';
        this.cpValue='*';
        this.waferValue='*';
        let deviceData=this.deviceData;
        deviceData.splice(0,deviceData.length)
        $.each(this.selectData,function (i,item) {
          if(e===item.customer){
            $.each(item.device,function (j,issue) {
              deviceData.push(issue)
            })
          }
        })
      },
      deviceChange:function (e) {
        this.deviceValue=e;
        this.lotValue='*';
        this.cpValue='*';
        this.waferValue='*';
        let lotData=this.lotData;
        lotData.splice(0,lotData.length)
        let token=localStorage.getItem("Authorization");
        this.$axios({
          methods: 'get',
          url:"http://192.168.10.191:20400/lotAndCps?customer="+this.customerValue+"&device="+e,
          headers:{'Accept': 'application/json','Authorization':token}
        }).then(response=>{
          $.each(response.data,function (i,item) {
            lotData.push(item)
          })
        })
      },
      lotChange:function (e) {
           this.lotValue=e;
           this.cpValue='*';
        this.waferValue='*';
           let cpData=this.cpData;
           cpData.splice(0,cpData.length);
        $.each(this.lotData,function (i,item) {
          if(e===item.lot){
            $.each(item.cp,function (j,issue) {
              cpData.push(issue)
            })
          }
        })
      },
      cpChange:function (e) {
         this.cpValue=e;
         this.waferValue='*';
         let waferData=this.waferData;
         waferData.splice(0,waferData.length);
        let token=localStorage.getItem("Authorization");
        this.$axios({
          methods: 'get',
          url:"http://192.168.10.191:20400/waferIds?customer="+this.customerValue+"&device="+this.deviceValue+"&lot="+this.lotValue+"&cp="+e,
          headers:{'Accept': 'application/json','Authorization':token}
        }).then(response=>{
          $.each(response.data,function (i,item) {
            waferData.push(item)
          })
        })
      },
      showTable:function () {
        var tableData=this.tableData;
        tableData.splice(0,tableData.length);
        let customer=this.customerValue;
        let device=this.deviceValue;
        let lot=this.lotValue;
        let cp=this.cpValue;
        let wafer=this.waferValue;
        var token=localStorage.getItem("Authorization");
        if(customer==="*"){
          alert("please choose one customer!")
        }
        const url = "http://192.168.10.191:20400/qureyInfors"+getUrl(customer,device,lot,wafer,cp);
        this.$axios({
          methods: 'get',
          url:url,
          headers:{'Accept': 'application/json','Authorization':token}
        }).then(response=>{
          $.each(response.data,function (i,item) {
            item.startTime=moment(item.startTime).format('YYYY-MM-DD hh:mm:ss')
            item.endTime=moment(item.endTime).format('YYYY-MM-DD hh:mm:ss')
            tableData.push(item)
          })
        })
      }

    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
