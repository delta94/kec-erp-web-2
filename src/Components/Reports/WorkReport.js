import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
class WorkReport extends Component{
    constructor() {
        super();
        this.state = {
            isLoading:true,
            Sites:[],
            SiteId:'',
            ToDate:'YYYY-MM-DD',
            FromDate:'YYYY-MM-DD',
            Reports:[],
            status:true,
            user:localStorage.getItem('role')
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    getSites(){
    axios.get(/*'https://kunnel-erp.herokuapp.com*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/',{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
    .then((response)=>{
      this.setState({
        Sites:response.data.data,
            isLoading:false
      })
      console.log(response);
        console.log(this.Sites);
    }).catch(error=>this.setState({error,isLoading:false}));
    }   
       componentDidMount(){
        this.getSites();
    }
    
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const data={
          siteid:this.state.SiteId,
          fromdate:this.state.FromDate,
          todate:this.state.ToDate
          
        };
        console.log(data);
       axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/attendancemanage/report/?siteid='+this.state.SiteId+'&from_date='+this.state.FromDate+'&to_date='+this.state.ToDate,{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
        .then(res => {                                                                             
            this.setState({
              Reports:res.data.data,
              status:false
            });
          })
          .catch(error=>this.setState({error,status:false}));
       
    }
    
    render(){
        const{user,isLoading,Sites,status,Reports} = this.state;
        return(
            <>
            {user === "admin" || "SiteOperator"?(
                <div className="workReport">
                <div className="workReportForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGridSiteId">
                    <Form.Label>Site Id</Form.Label>
                    <Form.Control as="select" name="SiteId" value={this.state.SiteId} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            {!isLoading?(
										Sites.map(Site=>{
											const{site_id}=Site;
											return(
											<option value={site_id}>{site_id}</option>
											);
										})
									):(
                                        <option></option>
                                        )}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicDate">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control type="date" placeholder="Select any date" name="FromDate" value={this.state.FromDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDate">
                    <Form.Label>To Date</Form.Label>
                    <Form.Control type="date" placeholder="Select any date" name="ToDate" value={this.state.ToDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Get Report
                    </Button>
                    </Form>
                </div>
                <div className="workReportTable">
                <Table striped bordered hover>
                <thead>
                <tr><td colSpan="16"><b>Work Report</b></td></tr>
                </thead>    
                <thead>
                <tr>
                <th>Labourer Id</th>
                <th>Name</th>
                <th>Total OT</th>
                <th>Total Days</th>
                <th>Not Checkout Days</th>
                <th>Concrete Days</th>
                </tr>
                </thead>
                <tbody>
                {(!status)?(
                Reports.map(Report=>{
                    const{labourerid,name,totalOt,totaldays,notcheckoutdays,concretedays}=Report;
                    return(
                        <tr>
                        <td>{labourerid}</td>
                        <td>{name}</td>
                        <td>{totalOt}</td>
                        <td>{totaldays}</td>
                        <td>{notcheckoutdays}</td>
                        <td>{concretedays}</td>  
                    </tr>
                )
                    
                })
                ):(
                <tr><td colSpan="6" className="text-center">No datas available..!</td></tr>
                )
                }

                </tbody>
                </Table>
                </div>
                </div>):(
                    <div>
                        <h4>You are not authorized!</h4>
                    </div>
                )}
            </>
        );
    }
}
export default WorkReport
/*
 {this.state.status ?<WageTable tableData={this.state.tableData} fromDate={this.state.fromDate} toDate={this.state.toDate} siteId={this.state.siteId}/> : null}
 */