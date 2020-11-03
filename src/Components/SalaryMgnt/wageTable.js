import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
class WageTable extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:props.status,
            wages:props.tableData,
            FromDate:props.fromDate,
            ToDate:props.toDate,
            siteId:props.siteId,
            csvData:props.tableData
        }
    }
    
        exportCsv=()=>{
            var csvRow = [];
            var A = [['labourerid','name','desigination','skilltype','basic_pay','daily_allowence','dailyrate','OTrate','Ottype','insetiveamout',
                'retentionAmount','attendance','weekWagetotal','OTAmount','othours']];
            var re = this.state.csvData;
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
        }
    
    render(){
        const{isLoading,wages,FromDate,ToDate,siteId}=this.state
        return(
            <>
            <div className="WageSheet">
                <div>

                </div>
                <Table striped bordered hover>
                <thead>
                    <tr><td colSpan=""><b>LABOURER WAGE SHEET - {siteId} -- From {FromDate} To {ToDate}</b>
                    <Button size="sm" className="ml-5" onClick = {this.exportCsv}>Export</Button>
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
                </tr>
                </thead>
                <tbody>
                {(!isLoading)?(
                            wages.map(wage=>{
                                const{labourerid,name,desigination,skilltype,basic_pay,daily_allowence,dailyrate,OTrate,Ottype,insetiveamout,
                                retentionAmount,attendance,weekWagetotal,OTAmount,othours,labourer_category,sitename}=wage;
                                return(
                                    <tr>
                                    <td>{labourerid}</td>
                                    <td>{name}</td>
                                    <td>{desigination}</td>
                                    <td>{labourer_category}</td>
                                    <td>{sitename}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
                                    </tr>
                                );
                            })
                        ):(
                            <tr><td colSpan="21" className="text-center">No data available--!</td></tr>
                        )
                        }

                </tbody>
                </Table>
            </div>
            </>
        )
    }
}
export default WageTable