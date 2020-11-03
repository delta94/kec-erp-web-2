import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
class ViewSites extends Component{
    constructor(){
		super()
	this.state={
		sites:[],
		isLoading:true,
		errors:null,
		siteIdToParse:'',
        show:false,
        Labourers:[],
        LabourersToParse:[],
        check:false,
        showEdit:false,
        siteId:'',
        siteName:'',
        address:'',
        clientName:'',
        projectManager:'',
        projectType:'',
        siteEngineer:'',
        siteEngineerId:'',
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
    handleEditClose=()=>{
        this.setState({
            showEdit:false
        })
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    
    handleShow = (event) => 
    {
        this.setState({
            siteIdToParse:event.target.id,
            show:true
          })
        axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
      .then((response)=>{
        this.setState({
          Labourers:response.data.data
        })
        console.log(response);
        console.log(this.Labourers);
      }).catch(error=>console.log(error));
        
        console.log(event.target.id);
    }   
    handleChange=(e)=>{ 
        if(e.target.checked){
        this.state.LabourersToParse.push(e.target.id);
        }
        if(!e.target.checked){
            this.state.LabourersToParse.splice(this.state.LabourersToParse.indexOf(e.target.id),1);
        }
        this.setState({
            LabourersToParse:this.state.LabourersToParse
        })
    }
	getSites(){
		axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/',{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then(response => {    
			this.setState({
				sites:response.data.data,
				isLoading:false
			}); 
			console.log(response.data.data);
			console.log(this.sites);
		  })
		  .catch(error=>this.setState({error,isLoading:true}));
		}
		componentDidMount(){
			this.getSites();
        }
        handleSubmit=(e)=>{
            e.preventDefault();
            var data={
                siteid:this.state.siteIdToParse,
                labourer:this.state.LabourersToParse
            }
            console.log("data to send:", data);
            axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/addlabourer/',data,{headers:{
                'Authorization': `Token ${localStorage.getItem('token')}`
            }})
            .then(response => {
            alert(response.data.message);
            this.setState({
                LabourersToParse:[]
            })
            })
            .catch(error=>console.log(error));
            }
        handleSite=(e)=>{
            e.preventDefault();
            var id = e.target.id;
            axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/'+id+'/',{headers:{
                'Authorization': `Token ${localStorage.getItem('token')}`
            }})
            .then(response => {
                this.setState({
                    showEdit:true,
                    siteId:response.data.datas.site_id,
                    siteName:response.data.datas.name,
                    address:response.data.datas.address,
                    clientName:response.data.datas.client_name,
                    projectManager:response.data.datas.project_manager,
                    projectType:response.data.datas.project_type,
                    siteEngineer:response.data.datas.site_engineer,
                    siteEngineerId:response.data.datas.siteEng_id,
                    startDate:response.data.datas.start_date,
                    endDate:response.data.datas.end_date,
                    lunchTime:response.data.datas.lunch_time,
                    startTime:response.data.datas.start_time,
                    endTime:response.data.datas.end_time,
                    bufferStartTime:response.data.datas.start_buffer,
                    bufferEndTime:response.data.datas.end_buffer,
                    salaryDayStructure:response.data.datas.salary_structure
                }); 
                console.log("specific site data: ",response.data.data);
              
              })
              .catch(error=>this.setState({error,isLoading:true}));

        } 
        handleEditSubmit=(e)=>{
            e.preventDefault();
            var data = {
                site_id:this.state.siteId,
                name:this.state.siteName,
                address:this.state.address,
                client_name:this.state.clientName,
                project_manager:this.state.projectManager,
                project_type:this.state.projectType,
                site_engineer:this.state.siteEngineer,
                siteEng_id:this.state.siteEngineerId,
                start_date:this.state.startDate,
                end_date:this.state.endDate,
                lunch_time:this.state.lunchTime,
                start_time:this.state.startTime,
                end_time:this.state.endTime,
                start_buffer:this.state.bufferStartTime,
                end_buffer:this.state.bufferEndTime,
                salary_structure:this.state.salaryDayStructure
            }
            axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/edit',data,{headers:{
        'Authorization': `token ${localStorage.getItem('token')}`
    }})
    .then(function (response) {
        alert(response.data.messgae)
      })
      .catch(function () {
        alert('Error occured')
      });

        }   
    render(){
        const{isLoading,sites,Labourers} = this.state;
        return(
            <>
                <div className="viewSites">
                <div className="viewSitesTable">
                <Table striped bordered hover>   
                <thead>
                <tr>
                <th>Sl.No</th>
                <th>Site Id</th>
				<th>Name</th>
				<th>Client Name</th>
				<th>Site Engineer</th>
				<th>Project Type</th>
				<th>Project Manager</th>
                <th>Buffer Start Time</th>
                <th>Shift Start Time</th>
                <th>Lunch Time</th>
                <th>Shift End Time</th>
                <th>Buffer End Time</th>
				<th>Options</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading?(
                            sites.map(site=>{
                                const{id,site_id,name,client_name,site_engineer,project_type,project_manager,start_buffer,start_time,lunch_time,end_time,end_buffer}=site;
                                return(
                                    <tr>
                                        <td>{id}</td>
                                        <td>{site_id}</td>
                                        <td>{name}</td>
                                        <td>{client_name}</td>
                                        <td>{site_engineer}</td>
                                        <td>{project_type}</td>
                                        <td>{project_manager}</td>
                                        <td>{start_buffer}</td>
                                        <td>{start_time}</td>
                                        <td>{lunch_time}</td>
                                        <td>{end_time}</td>
                                        <td>{end_buffer}</td>
                                        <td style={{color:"blue"}}><b><span id={site_id} onClick={this.handleShow}>view </span><span name={site_id} id={id} onClick={this.handleSite}> Edit</span></b></td>
                                    </tr>
                                );
                            })
                        ):(
                            <tr></tr>
                        )
                        }

                </tbody>
                </Table>
                </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Labourer List</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formGridSiteId">
                    <Form.Label>Site ID</Form.Label>
                    <Form.Control type="text" name="siteIdToParse" value={this.state.siteIdToParse} disabled/>
                    </Form.Group>
                    <Form.Group controlId="labourerIds">
                    <Form.Label>Labourer List : </Form.Label>
                    <div className="siteLabourers">
                    {Labourers.map(Labourer=>{
                        if(Labourer.site_id===this.state.siteIdToParse){
                        const{labourerid}=Labourer;
                        return(
                     <span id={labourerid} style={{color:"blue"}}><li>{labourerid}</li></span>);
                     
                     }
                     return(<></>)
                     })}  
                    </div>
                    </Form.Group>   
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                </Modal.Footer>
                </Form>
                </Modal>
                
                <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
                <Modal.Header closeButton>
                <Modal.Title>Labourer List</Modal.Title>
                </Modal.Header>              
                <Modal.Body>
                    <Form onSubmit={this.handleEditSubmit}>
                    <Form.Row>
                    <Form.Group controlId="formGridSiteId">
                    <Form.Label>Site ID</Form.Label>
                    <Form.Control type="text" name="siteId" value={this.state.siteId} disabled/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicName">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control type="text" name="siteName" value={this.state.siteName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicClientName">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control type="text" name="clientName" value={this.state.clientName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicProjectManager">
                    <Form.Label>Project Manger</Form.Label>
                    <Form.Control type="text" name="projectManager" value={this.state.projectManager} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicTypeOfProject">
                    <Form.Label>Type Of Project</Form.Label>
                    <Form.Control type="text" name="projectType" value={this.state.projectType} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicSiteEngineer">
                    <Form.Label>Site Engineer</Form.Label>
                    <Form.Control type="text" name="siteEngineer" value={this.state.siteEngineer} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicSiteEngineer">
                    <Form.Label>Site Engineer ID</Form.Label>
                    <Form.Control type="text" name="siteEngineerId" value={this.state.siteEngineerId} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicLunchTime">
                    <Form.Label>Lunch Time</Form.Label>
                    <Form.Control type="time" name="lunchTime" value={this.state.lunchTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicStartTime">
                    <Form.Label>Shift Start Time</Form.Label>
                    <Form.Control type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEndTime">
                    <Form.Label>Shift End Time</Form.Label>
                    <Form.Control type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicBufferStartTime">
                    <Form.Label>Buffer Start Time</Form.Label>
                    <Form.Control type="time" name="bufferStartTime" value={this.state.bufferStartTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBufferEndTime">
                    <Form.Label>Buffer End Time</Form.Label>
                    <Form.Control type="time" name="bufferEndTime" value={this.state.bufferEndTime} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicSalaryDayStructure">
                    <Form.Label>Salary day structure</Form.Label>
                    <Form.Control type="text" name="salaryDayStructure" value={this.state.salaryDayStructure} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                    Update
                    </Button>
                    <Button variant="secondary" onClick={this.handleEditClose}>
                    Close
                    </Button>
                    </Form> 
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                </Modal>
            </>
        );
    }
}
                
export default ViewSites