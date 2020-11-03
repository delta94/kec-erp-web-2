import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
class OTList extends Component{
    constructor(){
        super()
    this.state={
       date:'',
       datas:'',
       isLoading:true
    }
}
    handleChange = (e)=>{
        let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;
	
		this.setState({
		  [name]: value
        });
    
    }
  
    handleSubmit=(e)=>{
        e.preventDefault();
        const data = {
            date:this.state.date
        };
        console.log(data);  
		axios.post('https://kunnel-erp.herokuapp.com/approvals/Otlist/',(data))
		.then(res => {
          console.log(res.data.message);
          if(res.data.status===true){
          this.setState({
              date:this.state.date,
              datas:res.data.data,
              isLoading:false
          });
        }
        else(alert(res.data.message))
        })
    }
    render(){
        const{isLoading,date,datas}=this.state
        return(
            <>
                <div className="otList">
                <div className="otListForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicDate">
                    <Form.Label>Enter date to show approvals</Form.Label>
                    <Form.Control type="date" placeholder="Select any date" name="date" value={this.state.date} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                </div>
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
                        </div>
            </>
        );
    }
}
export default OTList
/*
{this.state.status ?<OTListTable tableData={this.state.tableData} fromDate={this.state.date}/> : null}
*/