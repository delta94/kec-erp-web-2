import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
class CreateSite extends Component{
    constructor(){
		super()
		this.state={
			name:'',
			address:'',
			clientName:'',
			projectManager:'',
			projectType:'',
			siteEngineer:'',
			startDate:'',
			endDate:'',
			lunchTime:'',
			startTime:'',
			endTime:'',
			bufferStartTime:'',
			bufferEndTime:'',
			salaryDayStructure:''
		}
	}
	
	handleChange =(event)=>{
		let target = event.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;
	
		this.setState({
		  [name]: value
		})
	}
	
	handleSubmit =(event)=>{
		event.preventDefault();
		const data={
			name:this.state.name,
			address:this.state.address,
			client_name:this.state.clientName,
			project_manager:this.state.projectManager,
			project_type:this.state.projectType,
			site_engineer:this.state.siteEngineer,
			start_date:this.state.startDate,
			end_date:this.state.endDate,
			lunch_time:this.state.lunchTime,
			start_time:this.state.startTime,
			end_time:this.state.endTime,
			start_buffer:this.state.bufferStartTime,
			end_buffer:this.state.bufferEndTime,
			salary_structure:this.state.salaryDayStructure
		};

		console.log(data);  
		axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/create/',(data),{headers:{
      'Authorization': `Token ${localStorage.getItem('token')}`
  }})
		.then(res => {
		  console.log(res);
		  alert(res.data.message);
		});

	}
    render(){
        return(
            <>
                <div className="createSite">
                <div className="createSiteForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>  
                    <Form.Group as={Col} controlId="formBasicName">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" name="address" value={this.state.address} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicClientName">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Client Name" name="clientName" value={this.state.clientName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicProjectManager">
                    <Form.Label>Project Manger</Form.Label>
                    <Form.Control type="text" placeholder="Enter Project Manger" name="projectManager" value={this.state.projectManager} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicTypeOfProject">
                    <Form.Label>Type Of Project</Form.Label>
                    <Form.Control type="text" placeholder="Enter Project Type" name="projectType" value={this.state.projectType} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicSiteEngineer">
                    <Form.Label>Site Engineer</Form.Label>
                    <Form.Control type="text" placeholder="Enter Site Engineer" name="siteEngineer" value={this.state.siteEngineer} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Start Date" name="startDate" value={this.state.startDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter End Date" name="endDate" value={this.state.endDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicLunchTime">
                    <Form.Label>Lunch Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter Lunch Time" name="lunchTime" value={this.state.lunchTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicStartTime">
                    <Form.Label>Shift Start Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter Start Time" name="startTime" value={this.state.startTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEndTime">
                    <Form.Label>Shift End Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter End Time" name="endTime" value={this.state.endTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicBufferStartTime">
                    <Form.Label>Buffer Start Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter Buffer Start Time" name="bufferStartTime" value={this.state.bufferStartTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBufferEndTime">
                    <Form.Label>Buffer End Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter Buffer End Time" name="bufferEndTime" value={this.state.bufferEndTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicSalaryDayStructure">
                    <Form.Label>Salary day structure</Form.Label>
                    <Form.Control type="text" placeholder="Enter Salary day structure" name="salaryDayStructure" value={this.state.salaryDayStructure} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                </div>
               </div>
            </>
        );
    }
}
export default CreateSite