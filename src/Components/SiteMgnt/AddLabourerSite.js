import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
//import Modal from 'react-bootstrap/Modal'
//import Button from 'react-bootstrap/Button'
class ViewLabourer extends Component{
    constructor(){
		super()
	this.state={
        sites:[],
        SiteId:'',
        isLoading:true,
        isLabourer:true,
		errors:null,
        Labourers:'',
        LabourersToParse:[],
        check:false,
        user:localStorage.getItem('role')
	}
}
    handleSubmit=(e)=>{
        e.preventDefault();
        var data={
            siteid:this.state.SiteId,
            labourer:[e.target.id]
        }
        console.log(e.target.id);
        axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/addlabourer/',data,{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then(response => {
        alert(response.data.message);
        }).catch(error=>console.log(error));
    }
    
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }
	componentDidMount(){
		axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/',{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then(response => {
			this.setState({
                sites:response.data.data,
                SiteId:response.data.data[0].site_id,
				isLoading:false
			}); 
			console.log(response.data.data);
			console.log(this.sites);
		  })
          .catch(error=>this.setState({error,isLoading:false}));
          axios.get(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then(response => {
			this.setState({
				Labourers:response.data.data,
				isLabourer:false
			}); 
			console.log(response.data.data);
		  })
		  .catch(error=>this.setState({error,isLabourer:false}));
		}
	
      /*  handleSubmit=(e)=>{
            e.preventDefault();
            var data={
                siteid:this.state.siteIdToParse,
                labourer:this.state.LabourersToParse
            }
            console.log("data to send:", data);
            axios.post('https://kunnel-erp.herokuapp.com/sitemanage/addlabourer/',data)
            .then(response => {
            alert(response.data.message);
            this.setState({
                LabourersToParse:[]
            })
            })
            .catch(error=>console.log(error));
            }*/
    render(){
        const{user,isLoading,isLabourer,sites,Labourers} = this.state;
        return(
            <>
            {user === "admin"||"SiteOperator"||"SiteAssitent"?(
                <div className="viewLabourer">
                <div className="viewLabourerTable">
                <Form>
                <Form.Group controlId="formGridSiteId">
                    <Form.Label>Select any Site Id : </Form.Label>
                    <Form.Control as="select" name="SiteId" value={this.state.SiteId} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            {!isLoading?(
										sites.map(site=>{
											const{site_id}=site;
											return(
											<option value={site_id}>{site_id}</option>
											);
										})
									):(
                                        <option></option>
                                        )}
                    </Form.Control>
                    </Form.Group>
                <Table striped bordered hover>   
                <thead>
                <tr>
                <th>Sl No.</th>
				<th>Labourer Id</th>
                <th>Name</th>
				<th>Department</th>
				<th>Designation</th>
				<th>Labourer Type</th>
				<th>Skill Type</th>
				<th>Aadhar Number</th>
                <th>Salary Id</th>
                <th>Wage Code</th>
                <th>Site Id</th>
                <th>Add/Re-asign</th>
                </tr>
                </thead>
                <tbody>
                {!isLabourer?(
                            Labourers.map(Labourer=>{
                                const{id,labourerid,name,department,designation,labourerType,skillType,aadharNumber,salary_id,wagecode,site_id}=Labourer;
                                return(
                                    <tr>
                                        <td>{id}</td>
                                        <td>{labourerid}</td>
                                        <td>{name}</td>
                                        <td>{department}</td>
                                        <td>{designation}</td>
                                        <td>{labourerType}</td>
                                        <td>{skillType}</td>
                                        <td>{aadharNumber}</td>
                                        <td>{salary_id}</td>
                                        <td>{wagecode}</td>
                                        <td>{site_id}</td>
                                        <td style={{color:"blue"}}><span onClick={this.handleSubmit}><b id={labourerid} >Re-asign</b></span></td>
                                    </tr>
                                );
                            })
                        ):(
                            <tr></tr>
                        )
                        }

                </tbody>
                </Table>
                </Form>
                </div>
                </div>):(
                    <div>
                        <h4>
                            You are not authorized!
                        </h4>
                    </div>
                )}
                
            </>
        );
    }
}
export default ViewLabourer
/*
<Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Labourer to Sites</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formGridSiteId">
                    <Form.Label>Site ID</Form.Label>
                    <Form.Control type="text" name="siteIdToParse" value={this.state.siteIdToParse} disabled/>
                    </Form.Group>
                    <Form.Group controlId="labourerIds">
                    <Form.Label>Select Labourer ID :</Form.Label>
                    {Labourers.map(Labourer=>{
                        const{labourerid}=Labourer;
                        return(
                     <span><input type="checkbox" id={labourerid} onChange={this.handleChange}/><label for={labourerid}>{labourerid}</label></span>)
                     
                     })};  
                   
                    </Form.Group>   
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                <Button type="submit" variant="primary">
                Add
                </Button>
                </Modal.Footer>
                </Form>
                </Modal>
                */