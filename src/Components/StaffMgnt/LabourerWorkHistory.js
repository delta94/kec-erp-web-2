import React,{Component} from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
class WorkHistory extends Component{
    constructor(props){
        super(props)
    this.state={
        workDatas:[],
        isLoading:true,
        isLoadData:true,
        Labourers:[],
        fromDate:'',
        toDate:'',
        errors:null,
        labourerName:'',
        date:[],
        siteid:''
       
    }
    
    }

   handleChange=(event)=>{
        let target = event.target; 
        let value = target.value;
        let name = target.name;
    
        this.setState({
        [name]: value 
        },()=>{
            this.updatetableData(this.state.labourerId,this.state.fromDate,this.state.toDate);
        });
    }
        
    componentWillMount(){
        console.log("inside component will mount");
    axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',{headers:{
        'Authorization': `token ${localStorage.getItem('token')}`
    }})
    .then((response)=>{
            this.setState({
                Labourers:response.data.data,
                isLoading:false,
                labourerId:response.data.data[0].labourerid,
                fromDate:new Date().getFullYear()+ "-"+(parseInt(new Date().getMonth()+1)<10?'0'+(1+new Date().getMonth()):new Date().getMonth()+1) +"-"+(parseInt(new Date().getDate()+1)<10?'0'+(new Date().getDate()):new Date().getDate()+1),
                toDate:new Date().getFullYear()+ "-"+(parseInt(new Date().getMonth()+1)<10?'0'+(1+new Date().getMonth()):new Date().getMonth()+1) +"-"+(parseInt(new Date().getDate()+1)<10?'0'+(new Date().getDate()):new Date().getDate()+1) 
                });
                this.updatetableData(this.state.labourerId,this.state.fromDate,this.state.toDate);
                console.log("sitesresponse",response);
                console.log("sites",this.state.Labourers);
                console.log("siteid",this.state.labourerId);
               
}).catch(error=>this.setState({error,isLoading:false}))
}
updatetableData=(x,y,z)=>{
    console.log("inside update table data function");
    const data = {
    labourerid :x,
    fromdate : y,
    todate:z
    }
    axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/attendancemanage/labourerweek',data,{headers:{
        'Authorization': `token ${localStorage.getItem('token')}`
    }})
    .then(response => {
    if((response.data.status === false)){ 
        this.setState({
            workDatas:"",
            isLoadData:true
        })
    }
    else{
        this.setState({
            workDatas:response.data.data[2],
            labourerName:response.data.data[1],
            isLoadData:false
            });
            console.log("Labourer work history response",response.data.data);
            console.log("Labourer work history response data",response.data.data);
            console.log("Labourer work",this.state.workDatas);    
    }
  

    }).catch(error=>this.setState({error,isLoadData:false}));
}
componentWillUpdate(){
    console.log("inside component will update!");
    
    
}

componentDidUpdate(prevProps,prevState){
  if(prevState.workDatas!==this.state.workDatas){
      this.setState({
          workhour:this.state.workDatas
      })
  }

}
    render(){
        console.log("inside render method!");
        const{isLoading,Labourers,isLoadData,workDatas}=this.state;
      
        return(
            <>
                <div className="content">
                <div className="attendanceTable">
            <Form>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Labourer Id</Form.Label>
                <Form.Control as="select" value={this.state.labourerId} name="labourerId" onChange={this.handleChange}>
                {!isLoading ?(Labourers.map(Labourer=>{
                const{labourerid}=Labourer;
                return(
                        <option key={labourerid} value={labourerid}>{labourerid}</option>
                    );
                })
                ):(
                    <option></option>
                )
                }
                </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>From Date</Form.Label>
                <Form.Control type="date" value={this.state.fromDate} name="fromDate" onChange={this.handleChange}>
                </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>To Date</Form.Label>
                <Form.Control type="date" value={this.state.toDate} name="toDate" onChange={this.handleChange}>
                </Form.Control>
                </Form.Group>
                </Form.Row>
                </Form>
                <Table striped bordered hover>  
                <thead>
                    <tr><td colSpan="7"><b>Labourer Name : {this.state.labourerName}</b></td></tr>
                </thead>
                <thead>
                <tr>
                <th>Date</th>
                <th>Site Id</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Work Hours</th>
                <th>OT Hours</th>
                <th>Concrete Days</th>
                </tr>
                </thead>
                <tbody>
                {(!isLoadData)?(
                workDatas.map(workData=>{
                const{date,siteid,intime,outtime,workhours,othours,concreteday}=workData;
                return(
                <tr>
                <td>{date}</td>
                <td>{siteid}</td>
                <td>{intime}</td>
                <td>{outtime}</td>
                <td>{workhours}</td>
                <td>{othours}</td>
                <td>{concreteday}</td>
                </tr>
                    );
                })
                ):(
                <tr><td colSpan="4" className="text-center">No data available..!</td></tr>
                )
                }
                </tbody>
                </Table>
                </div>
                </div>   
           
            </>
        )
    }
}
export default WorkHistory;
      