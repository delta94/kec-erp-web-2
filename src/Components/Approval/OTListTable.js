import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
class OTListTable extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:props.status,
            date:props.date,
            datas:props.tableData
        }
    }
    render(){
        const{isLoading,date,datas}=this.state
        return(
            <>
            <div className="OtApproval">

                <Table striped bordered hover>
                <thead>
                    <tr><td colSpan="16"><b>OT LIST - {date}</b></td></tr>
                </thead>    
                <thead>
                <tr>
                <th>Labourer Id</th>
                <th>OT Taken Date</th>
                <th>OT Hours</th>
                <th>OT Approve</th>
                <th>Add to second shift</th>
                <th>No OT</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading?(
                            datas.map(data=>{
                                const{labourerid,date,othours}=data;
                                return(
                                    <tr>
                                    <td>{labourerid}</td>
                                    <td>{date}</td>
                                    <td>{othours}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>             
                                    </tr>
                                );
                            })
                        ):(
                            <tr><td colSpan="6" className="text-center">No datas available..!</td></tr>
                        )
                        }

                </tbody>
                </Table>
            </div>
            </>
        )
    }
}
export default OTListTable