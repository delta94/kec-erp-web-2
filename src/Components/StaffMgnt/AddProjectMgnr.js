import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
class AddProjectManager extends Component{
    constructor(){
		super()
		this.state={
		name: '',
        address:'',
        photo:null,
        aadharNumber:'',
        aadharPhoto:null,
        department:'',
        fatherName:'',
        contactNumber:'',
        bloodGroup:'',
        employeeCode:''
		};
	}
	handleSelect=(e)=>{
		let target = e.target;
		let value = target.value;
		let name = target.name;
	
		this.setState({
		  [name]: value
		})
	}
	handleChange=(e)=>{
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;
	
		this.setState({
		  [name]: value
		})
	}
	handleValidate=(e)=>{
    e.preventDefault();
		let regex= /^\d{12}$/;
		if(regex.test(e.target.value)){
    document.getElementById("aadharError").style.visibility='hidden';
    }
    if(e.target.value===""){
      document.getElementById("aadharError").style.visibility='hidden';
    }
    if(!(regex.test(e.target.value))){
    document.getElementById("aadharError").style.visibility='visible';
    }
	
	}
/*	onFormSubmit=(e)=>{
		e.preventDefault() // Stop form submit
    	this.handleSubmit();
    
	}*/
  handlePhotoUpload=(e)=>{
		this.setState({photo:e.target.files[0]})
    document.getElementsByClassName("custom-file-label")[2].innerText = e.target.files[0].name;
	}
	handleAadharPhotoUpload=(e)=>{
    this.setState({aadharPhoto:e.target.files[0]})
    console.log(e.target.files[0].name);
		document.getElementsByClassName("custom-file-label")[3].innerText=e.target.files[0].name;
	}
	
	handleSubmit=(e)=>{
    e.preventDefault();
	//if(document.getElementById("aadharNumber").className==="valid"){	
  
	console.log("AadharPhoto : ",this.state.aadharPhoto);

	let formData = new FormData();
	formData.append("name",this.state.name);
	formData.append("address",this.state.address);
	formData.append("photo",this.state.photo);
	formData.append("aadharNumber",this.state.aadharNumber);
	formData.append("aadhrPhoto",this.state.aadharPhoto);
	formData.append("department",this.state.department);
	formData.append("fatherName",this.state.fatherName);
	formData.append("contact",this.state.contactNumber);
	formData.append("bloodGroup",this.state.bloodGroup);
	formData.append("employeeCode",this.state.employeeCode);
	console.log("formdata: ",formData);
	axios.post(/*'https://kunnel-erp.herokuapp.com/*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',
	formData, {
	  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Token ${localStorage.getItem('token')}`
	  }
	}
  ).then(function (response) {
	alert(response.data.message)
  })
  .catch(function () {
	alert('Error occured')
  });
}
/*else{
		alert('Enter proper datas!')
}*/
    render(){
        return(
            <>
                <div className="addProjectManager">
                <div className="addProjectManagerForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>    
                    <Form.Group as={Col} controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicPhoto">
                    <Form.Label>Photo</Form.Label>
                    <Form.File id="custom-file" label="Choose Photo" custom name="photo"  onChange={(e)=>this.handlePhotoUpload(e)} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter your address" name="address" value={this.state.address} onChange={this.handleChange} required/>
                    </Form.Group>
                    <span className="text-red" id="aadhar1Error">*Enter valid Aadhar number!</span>
                    <Form.Row>    
                    <Form.Group as={Col} controlId="formBasicAadharNum">
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter aadhar number" name="aadharNumber" onKeyUp={this.handleValidate} value={this.state.aadharNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicAadharPhoto">
                    <Form.Label>Aadhar Photo</Form.Label>
                    <Form.File id="custom-file" label="Choose Photo" custom name="aadharPhoto" onChange={this.handleAadharPhotoUpload} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formBasicFatherName">
                    <Form.Label>Name Of Father</Form.Label>
                    <Form.Control type="text" placeholder="Enter name of Father" name="fatherName" value={this.state.fatherName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select" name="department" value={this.state.department} onChange={this.handleSelect} required>
                            <option value="">Choose...</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Plumbing">Plumbing</option>    
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Contact number" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Control as="select" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleSelect} required>
                            <option value="">Choose...</option>
                            <option value="A-">A-</option>
                            <option value="A+">A+</option>
                            <option value="B-">B-</option>
                            <option value="B+">B+</option>
                            <option value="AB-">AB-</option>
                            <option value="AB+">AB+</option>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                            <option value="A1+">A1+</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmployeeCode">
                    <Form.Label>Employee Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Employee code" name="employeeCode" value={this.state.employeeCode} onChange={this.handleChange} required/>
                    </Form.Group>
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
export default AddProjectManager