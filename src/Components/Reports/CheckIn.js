import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
class CheckIn extends Component{
    constructor() {
        super();
        this.state = {
            isLoading:true,
            Sites:[],
            Labourers:[],
            LabourerId:'',
            SiteId:'',
            InTime:'00:00:00',
            Date:'YYY-MM-DD',
            responseMessage:'',
            status:true,
            user:localStorage.getItem('role')
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    getSitesLabourer(){
      axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/',{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
      .then((response)=>{
        this.setState({
          Sites:response.data.data
        })
        console.log(response.data.data);
        
      }).catch(error=>this.setState({error,isLoading:false}));
      axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
      .then((response)=>{
        this.setState({
          Labourers:response.data.data,
          isLoading:false
        })
        console.log(response);
        console.log(this.Labourers);
      }).catch(error=>this.setState({error,isLoading:false}));
        
      }   
         componentDidMount(){
          this.getSitesLabourer();
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
          labourerid :this.state.LabourerId,
          siteid:this.state.SiteId,
          time:this.state.InTime+":00",
          date:this.state.Date
        };
        console.log(this.state.LabourerId);
        console.log(data);
       axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/attendancemanage/checkin',(data),{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
        .then(res => {
          if(res.data.status===true){
            this.setState({
              responseMessage:res.data.deatils+"!",
              status:false
            })
          }
          else{
            this.setState({
              responseMessage:res.data.deatils+"!",
              status:false
            })
          }

          
         
        })
       
    }
    render(){
        const{user,isLoading,Sites,Labourers,responseMessage,status} = this.state;
        return(
            <>
            {user === "admin" || "SiteOperator" ? (
                <div className="checkIn">
                <div className="checkInForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGridState">
                    <Form.Label>Labourer Id</Form.Label>
                    <Form.Control as="select" name="LabourerId" value={this.state.LabourerId} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            {!isLoading?(
										Labourers.map(Labourer=>{
											const{labourerid}=Labourer;
											return(
											<option value={labourerid}>{labourerid}</option>
											);
										})
									):(
										<option></option>
                            )}
                    </Form.Control>
                    </Form.Group>
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
                    <Form.Group controlId="formBasicInTime">
                    <Form.Label>In Time</Form.Label>
                    <Form.Control type="time" name="InTime" value={this.state.InTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDate">
                    <Form.Label> Date</Form.Label>
                    <Form.Control type="date" placeholder="Select any date" name="Date" value={this.state.Date} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                    
                </div>
                <div className="alertBox">
               {(!status)? <Alert variant="success">
                <Alert.Heading></Alert.Heading>
                <p>
                {responseMessage}
                </p>
                </Alert>:<div></div>}
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
export default CheckIn
/*
 {this.state.status ?<WageTable tableData={this.state.tableData} fromDate={this.state.fromDate} toDate={this.state.toDate} siteId={this.state.siteId}/> : null}
 */