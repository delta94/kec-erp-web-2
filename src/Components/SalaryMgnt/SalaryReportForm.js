import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class SalaryReportForm extends Component{
    constructor(){
        super();
        this.state={
            SiteId:'',
            FromDate:'',
            ToDate:'',
            wages:'',
            status:true,
            //:[],
            sendData:[],
            wagecal:'',
            Sites:'',
            isLoading:true,
            trailaArray:[]
        }
    }
    handleEdit=(event)=>{
        const target = event.target;
        //console.log("target",target);
        target.setAttribute('contenteditable',true);

    }
    saveData=()=>{
        const tbody=document.querySelector('tbody');
        const trs=tbody.querySelectorAll('tr');
        console.log("trs",trs);
        trs.forEach(element=>{
            var tds= element.querySelectorAll('td');
            console.log("tds",tds);
           // this.state.saveData.length=0;
           /*this.setState({
               saveData:(this.state.saveData.length=0)
           })*/
           var saveData = [];
            tds.forEach(td=>{
                saveData.push(td.innerText)
            })
            console.log("saveData",saveData);
            this.state.sendData.push({
                "labourerid": saveData[0],
                "name": saveData[1],
                "desigination":saveData[2],
                "labourer_category":saveData[3],
                "sitename":saveData[4],
                "concrete":saveData[5],
                "Holidaywage":saveData[6],
                "FAdeduction":saveData[7],
                "SAdeduction":saveData[8],
                "WAdeduction":saveData[9],
                "sundaywage":saveData[10],        
                "skilltype":saveData[11],
                "basic_pay":saveData[12],
                "daily_allowence":saveData[13],
                "dailyrate":saveData[14],
                "OTrate":saveData[15],
                "Ottype":saveData[16],
                "insetiveamout":saveData[17],
                "retentionAmount":saveData[18],
                "attendance":saveData[19],
                "weekWagetotal":saveData[20],
                "OTAmount":saveData[21],
                "othours":saveData[22],
                "sundayManday":saveData[26],
                "adjAmount":saveData[27],
                "rent":saveData[28]
         });

        });
            console.log("sendData",this.state.sendData);
            axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/wagemanage/wagecal',(this.state.sendData),{headers:{
                'Authorization': `Token ${localStorage.getItem('token')}`
            }})
            .then(res => {
              console.log(res.status);
              if(res.data.status===true){
                this.setState({
                    wagecal:res.data.data,
                    wages:res.data.data
                });/*,()=>{
                    this.exportCsv();
                })*/
                alert("Wage calculation completed!")
              }
              else{
                alert(res.data.message);
              }
              console.log(this.state.wagecal);
              this.setState({
                  sendData:[]
              })
            }).catch(error=>{
                alert(error);
            }) 
    }

    handleChange=(event)=>{
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const data={
            siteid :this.state.SiteId,
            fromdate:this.state.FromDate,
            todate:this.state.ToDate
          };
          console.log(data);
         axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/wagemanage/weekWage',(data),{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
          .then(res => {
            console.log(res.status);
            if(res.data.status===true){
                if(res.data.data===null){
                    alert(res.data.message);
                    this.setState({
                        wages:[],
                        status:true
                    })
                }
                else{
                this.setState({
                    wages:res.data.data,
                    status:false,
                    fromDate:data.fromdate,
                    toDate:data.todate,
                    siteId:this.state.SiteId
                })
                console.log("wages:",this.state.wages);
            }
            }
            else{
                
                this.setState({
                    wages:[],
                    status:true
                })
                alert(res.data.message);
            }
           console.log(this.state.siteId);
          }).catch(error=>{
              alert(error);
              this.setState({
                  status:false,
                  wages:[]
              })
          });
    }
    componentWillMount(){
        console.log("inside component will mount");
    axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/',{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
    .then((response)=>{
            this.setState({
                Sites:response.data.data,
                SiteId:response.data.data[0].site_id,
                isLoading:false
                });
                console.log("sites",this.state.Sites);
               
}).catch(error=>this.setState({error,isLoading:true}))
}
   /* exportCsv=()=>{
        var csvRow = [];
        var A = [['labourerid','name','desigination','skilltype','basic_pay','daily_allowence','dailyrate','OTrate','Ottype','insetiveamout',
            'retentionAmount','attendance','weekWagetotal','OTAmount','othours']];
        var re = this.state.wagecal;
        console.warn(A);
        for(var item=0;item<re.length;item++)
        {
            A.push([re[item].labourerid,re[item].name,re[item].desigination,re[item].skilltype,re[item].basic_pay,re[item].daily_allowence,
                re[item].dailyrate,re[item].OTrate,re[item].Ottype,re[item].insetiveamout,re[item].retentionAmount,re[item].attendance,
                re[item].weekWagetotal,re[item].OTAmount,re[item].othours]);
        }    
        console.warn(A);
        for(var i=0;i<A.length;i++)
        {
            csvRow.push(A[i].join(","));
        }
        console.warn(csvRow);
        var csvString = csvRow.join("%0A");
        console.warn(csvString);
        var a = document.createElement("a");
        a.href = 'data:attachment/csv,'+csvString;
        a.target = "_Blank";
        a.download = this.state.siteId+"-["+this.state.FromDate+"/"+this.state.ToDate+"].csv";
        document.body.appendChild(a);
        a.click();
    }*/

    render(){
        const{status,wages,FromDate,ToDate,siteId,Sites,isLoading}=this.state
        return(
            <>
                <div className="salaryReport">
                <div className="SalaryReportForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicSiteId">
                    <Form.Label>Site Id</Form.Label>
                    <Form.Control as="select" value={this.state.SiteId} name="SiteId" onChange={this.handleChange}>
                {!isLoading ?(Sites.map(Site=>{
                const{id,site_id}=Site;
                return(
                        <option key={id} value={site_id}>{site_id}</option>
                    );
                })
                ):(
                    <option></option>
                )
                }
                </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicFromDate">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control type="date" placeholder="Select any date" name="FromDate" value={this.state.FromDate} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicToDate">
                    <Form.Label> Date</Form.Label>
                    <Form.Control type="date" placeholder="Select any date" name="ToDate" value={this.state.ToDate} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                </div>
                <div className="WageSheet">
                <Table striped bordered hover>
                <thead>
                <tr><td colSpan="33"><b>LABOURER WAGE SHEET - {siteId} -- From {FromDate} To {ToDate}</b>
                   <Button size="sm" className="ml-5" onClick = {this.saveData}>Save Changes</Button>
                   <ExcelFile element={<Button size="sm" className="ml-5">Download Wage Sheet</Button>} filename={this.state.siteId}>
                <ExcelSheet data={this.state.wagecal} name={this.state.siteId+"-"+this.state.fromDate+"---"+this.state.toDate}>
                    <ExcelColumn label="Labourer Id" value="labourerid"/>
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Designation" value="desigination"/>
                    <ExcelColumn label="Category" value="labourer_category"/>
                    <ExcelColumn label="Site Name" value="sitename"/>
                    <ExcelColumn label="Concrete" value="concrete"/>
                    <ExcelColumn label="Holiday wage" value="Holidaywage"/>
                    <ExcelColumn label="FAdeduction" value="FAdeduction"/>
                    <ExcelColumn label="SAdeduction" value="SAdeduction"/>
                    <ExcelColumn label="WAdeduction" value="WAdeduction"/>
                    <ExcelColumn label="Sunday wage" value="sundaywage"/>
                    <ExcelColumn label="Skill type" value="skilltype"/>
                    <ExcelColumn label="Basic Pay" value="basic_pay"/>
                    <ExcelColumn label="Daily Allowance" value="daily_allowence"/>
                    <ExcelColumn label="Daily Rate" value="dailyrate"/>
                    <ExcelColumn label="OT Rate" value="OTrate"/>
                    <ExcelColumn label="OT Type" value="Ottype"/>
                    <ExcelColumn label="Incentive Amount" value="insetiveamout"/>
                    <ExcelColumn label="Retention Amount" value="retentionAmount"/>
                    <ExcelColumn label="Attendance" value="attendance"/>
                    <ExcelColumn label="Week Wage Total" value="weekWagetotal"/>
                    <ExcelColumn label="OT Amount" value="OTAmount"/>
                    <ExcelColumn label="OT Hour" value="othours"/>
                    <ExcelColumn label="Gross Wage" value="groesswage"/>
                    <ExcelColumn label="Net Wage" value="netwage"/>
                    <ExcelColumn label="Total Deduction" value="totaldeduction"/>
                    <ExcelColumn label="Sunday Manday" value="sundayManday"/>
                    <ExcelColumn label="Adj.Amount" value="adjAmount"/>
                    <ExcelColumn label="Rent" value="rent"/>
                    <ExcelColumn label="Wages From" value={FromDate}/>
                    <ExcelColumn label="Wages To" value={ToDate}/>
                    <ExcelColumn label="Date of payment" value=""/>
                    <ExcelColumn label="HOLD/PAID Status" value=""/>
                </ExcelSheet>
                </ExcelFile>
                </td></tr>
                </thead>    
                <thead>
                <tr>
                <th>Labourer Id</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Category</th>
                <th>Site Name</th>
                <th>Concrete</th>
                <th>Holiday wage</th>
                <th>FAdeduction</th>
                <th>SAdeduction</th>
                <th>WAdeduction</th>
                <th>Sunday wage</th>
                <th>Skill type</th>
                <th>Basic Pay</th>
                <th>Daily Allowance</th>
                <th>Daily Rate</th>
                <th>OT Rate</th>
                <th>OT Type</th>
                <th>Incentive Amount</th>
                <th>Retention Amount</th>
                <th>Attendance</th>
                <th>Week Wage Total</th>
                <th>OT Amount</th>
                <th>OT Hour</th>
                <th>Gross Wage</th>
                <th>Net Wage</th>
                <th>Total Deduction</th>
                <th>Sunday Manday</th>
                <th>Adj.Amount</th>
                <th>Rent</th>
                <th>Wages From</th>
                <th>Wages To</th>
                <th>Date of payment</th>
                <th>HOLD/PAID Status</th>
                </tr>
                </thead>
                <tbody>
                {(!status)?(
                            wages.map(wage=>{
                                const{labourerid,name,desigination,skilltype,basic_pay,daily_allowence,dailyrate,OTrate,Ottype,insetiveamout,
                                retentionAmount,attendance,weekWagetotal,OTAmount,othours,groesswage,netwage,totaldeduction,labourer_category,sitename}=wage;
                                return(
                                    <tr>
                                    <td>{labourerid}</td>
                                    <td>{name}</td>
                                    <td>{desigination}</td>
                                    <td>{labourer_category}</td>
                                    <td>{sitename}</td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td>{skilltype}</td>
                                    <td>{basic_pay}</td>
                                    <td>{daily_allowence}</td>
                                    <td>{dailyrate}</td>
                                    <td>{OTrate}</td>
                                    <td>{Ottype}</td>
                                    <td>{insetiveamout}</td>
                                    <td>{retentionAmount}</td>
                                    <td>{attendance}</td>
                                    <td>{weekWagetotal}</td>
                                    <td>{OTAmount}</td>
                                    <td>{othours}</td>
                                    <td>{groesswage}</td> 
                                    <td>{netwage}</td>
                                    <td>{totaldeduction}</td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>
                                    <td>{FromDate}</td>
                                    <td>{ToDate}</td>
                                    <td onClick={this.handleEdit}></td>
                                    <td onClick={this.handleEdit}></td>                 
                                    </tr>
                                );
                            })
                        ):(
                            <tr><td colSpan="33" className="text-center">No data available--!</td></tr>
                        )
                        }

                </tbody>
                </Table>
                </div>
                </div>
            </>
        );
    }
}
export default SalaryReportForm
/* <Button size="sm" className="ml-5" onClick = {this.saveData}>Take Wage Sheet</Button>*/
/* <tr><td colSpan="21"><b>LABOURER WAGE SHEET - {siteId} -- From {FromDate} To {ToDate}</b>
                   <Button size="sm" className="ml-5" onClick = {this.saveData}>Save Changes</Button>
                   <ExcelFile element={<Button size="sm" className="ml-5">Download Wage Sheet</Button>} filename={this.state.siteId}>
                <ExcelSheet data={this.state.wagecal} name={this.state.siteId+"-"+this.state.fromDate+"---"+this.state.toDate}>
                    <ExcelColumn label="Labourer ID" value="labourerid"/>
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Designation" value="desigination"/>
                    <ExcelColumn label="Concrete" value="concrete"/>
                    <ExcelColumn label="Holiday wage" value="Holidaywage"/>
                    <ExcelColumn label="FAdeduction" value="FAdeduction"/>
                    <ExcelColumn label="SAdeduction" value="SAdeduction"/>
                    <ExcelColumn label="WAdeduction" value="WAdeduction"/>
                    <ExcelColumn label="Sunday wage" value="sundaywage"/>
                    <ExcelColumn label="Skill type" value="skilltype"/>
                    <ExcelColumn label="Basic Pay" value="basic_pay"/>
                    <ExcelColumn label="Daily Allowance" value="daily_allowence"/>
                    <ExcelColumn label="Daily Rate" value="dailyrate"/>
                    <ExcelColumn label="OT Rate" value="OTrate"/>
                    <ExcelColumn label="OT Type" value="Ottype"/>
                    <ExcelColumn label="Incentive Amount" value="insetiveamout"/>
                    <ExcelColumn label="Retention Amount" value="retentionAmount"/>
                    <ExcelColumn label="Attendance" value="attendance"/>
                    <ExcelColumn label="Week Wage Total" value="weekWagetotal"/>
                    <ExcelColumn label="OT Amount" value="OTAmount"/>
                    <ExcelColumn label="OT Hour" value="othours"/>
                </ExcelSheet>
                </ExcelFile>
                    </td></tr>*/