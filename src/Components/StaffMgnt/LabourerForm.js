import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
export default class LabourerForm extends Component {
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
        accountNumber:'',
        branchName:'',
        IFSCCode:'',
        contactNumber:'',
        bloodGroup:'',
        employeeCode:'',
        salaryStructure:'',
        labourerType:'',
        skillType:'',
        salaries:'',
        designation:'',
        bankName:'',
        wifeName:'',
        childrenNumber:'',
        dependedFather:'',
        dependedMother:'',
        isLoading:true,
        sites:'',
        siteId:'',
        isSites:true,
        wages:'',
        wageCode:'',
        isWages:true,
        DOB:''
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
	
	handlePhotoUpload=(e)=>{
		this.setState({photo:e.target.files[0]})
    document.getElementsByClassName("custom-file-label")[0].innerText = e.target.files[0].name;
	}
	handleAadharPhotoUpload=(e)=>{
    this.setState({aadharPhoto:e.target.files[0]})
    console.log(e.target.files[0].name);
		document.getElementsByClassName("custom-file-label")[1].innerText=e.target.files[0].name;
    }

    componentWillMount(){
        
        console.log("inside component will mount");
    axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/SalaryStrutManage/salarycode',{headers:{
      'Authorization': `Token ${localStorage.getItem('token')}`
    }})
    .then((response)=>{
            this.setState({
                salaries:response.data.data,
                salaryStructure:response.data.data[0].id,
                isLoading:false
                });
                console.log("salaries",this.state.salaries);
               
    }).catch(error=>this.setState({error,isLoading:false}));
    axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/',{headers:{
      'Authorization': `Token ${localStorage.getItem('token')}`
    }})
        .then((response)=>{
                this.setState({
                    sites:response.data.data,
                    siteId:response.data.data[0].site_id,
                    isSites:false
                    });
                    console.log("sites",this.state.sites);
                   
    }).catch(error=>this.setState({error,isSites:false}));
    axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/wagemanage/wagelist',{headers:{
      'Authorization': `Token ${localStorage.getItem('token')}`
    }})
        .then((response)=>{
          if(response.data.status===true){
            if(response.data.data!==[]){
           this.setState({
                    wages:response.data.data,
                    wageCode:response.data.data[0].wagecode,
                    isWages:false
                    });
           console.log("Wages",this.state.wages);
                  }
                  else{
                    this.setState({
                      wages:'',
                      isWages:true 
                    })
                  }
                  }       
    }).catch(error=>this.setState({error,isWages:false}));
    }
    handleSubmit=(e)=>{
      e.preventDefault();
    console.log("AadharPhoto : ",this.state.aadharPhoto);
  
    let formData = new FormData();
    formData.append("name",this.state.name);
    formData.append("address",this.state.address);
    formData.append("photo",this.state.photo);
    formData.append("aadharNumber",this.state.aadharNumber);
    formData.append("aadhrPhoto",this.state.aadharPhoto);
    formData.append("department",this.state.department);
    formData.append("fatherName",this.state.fatherName);
    formData.append("ACNumber",this.state.accountNumber);
    formData.append("branchName",this.state.branchName);
    formData.append("IFSCNumber",this.state.IFSCCode);
    formData.append("contact",this.state.contactNumber);
    formData.append("bloodGroup",this.state.bloodGroup);
    formData.append("employeeCode",this.state.employeeCode);
    formData.append("salary_id",this.state.salaryStructure);
    formData.append("labourerType",this.state.labourerType);
    formData.append("skillType",this.state.skillType);
    formData.append("wifeName",this.state.wifeName);
    formData.append("children_number",this.state.childrenNumber);
    formData.append("depended_father",this.state.dependedFather);
    formData.append("depended_mother",this.state.dependedMother);
    formData.append("site_id",this.state.siteId);
    formData.append("wagecode",this.state.wageCode);
    formData.append("designation",this.state.designation);
    formData.append("bankName",this.state.bankName);
    formData.append("DOB",this.state.DOB);
    console.log("formdata: ",formData);
    axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',
    formData,{
      headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Token ${localStorage.getItem('token')}`
      }
    }
    ).then(function (response) {
      console.log("labourer add res:",response);
    alert(response.data.message);
    window.location.reload();
    })
    .catch(function () {
    alert('Error occured')
    });
  }
    render() {
        const{isLoading,salaries,isSites,sites,isWages,wages}=this.state;
        return (
            <div>
                 <div className="addLabourer">
                <div className="addLabourerForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>    
                    <Form.Group as={Col} controlId="formBasicName">
                    <Form.Label>Labourer Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="DOB" value={this.state.DOB} onChange={this.handleChange} required/>
                    </Form.Group> 
                    <Form.Group as={Col} controlId="formBasicPhoto">
                    <Form.Label>Labourer Photo</Form.Label>
                    <Form.File id="custom-file" label="Choose Photo" custom name="photo"  onChange={(e)=>this.handlePhotoUpload(e)} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicFatherName">
                    <Form.Label>Name Of Father</Form.Label>
                    <Form.Control type="text" placeholder="Enter name of Father" name="fatherName" value={this.state.fatherName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter your address" name="address" value={this.state.address} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <span className="text-red" id="aadharError">*Enter valid Aadhar number!</span>
                    <Form.Row>    
                    <Form.Group as={Col} controlId="formBasicAadharNum">
                      
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter aadhar number" name="aadharNumber" onKeyUp={this.handleValidate} value={this.state.aadharNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicAadharPhoto">
                    <Form.Label>Aadhar Photo</Form.Label>
                    <Form.File id="custom-file" label="Choose Photo" custom name="aadharPhoto"  onChange={this.handleAadharPhotoUpload} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicWifeName">
                    <Form.Label>Name Of Wife</Form.Label>
                    <Form.Control type="text" placeholder="Enter name of Wife" name="wifeName" value={this.state.wifeName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicChildren">
                    <Form.Label>No. of Children</Form.Label>
                    <Form.Control type="text" placeholder="Enter Number" name="childrenNumber" value={this.state.childrenNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicDependenFather">
                    <Form.Label>Depended Father</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="dependedFather" value={this.state.dependedFather} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicDependedMother">
                    <Form.Label>Depended Mother</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="dependedMother" value={this.state.dependedMother} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select" name="department" value={this.state.department} onChange={this.handleSelect} required>
                            <option value="">Choose...</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Plumbing">Plumbing</option>    
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicDesignation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control type="text" placeholder="Enter designation" name="designation" value={this.state.designation} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBankName">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Bank name" name="bankName" value={this.state.bankName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicAccountNumber">
                    <Form.Label>Bank account number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Bank account number" name="accountNumber" value={this.state.accountNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBranchName">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Branch Name" name="branchName" value={this.state.branchName} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicIFSCCode">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter IFSC code" name="IFSCCode" value={this.state.IFSCCode} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Contact number" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
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
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmployeeCode">
                    <Form.Label>Employee Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Employee code" name="employeeCode" value={this.state.employeeCode} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>salary structure</Form.Label>
                    <Form.Control as="select" value={this.state.salaryStructure} name="salaryStructure" onChange={this.handleChange} required>
                {!isLoading?(salaries.map(salary=>{
                const{id}=salary;
                return(
                        <option key={id} value={id}>{id}</option>
                    );
                })
                ):(
                    <option></option>
                )
                }
                </Form.Control>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Site ID</Form.Label>
                <Form.Control as="select" value={this.state.siteId} name="siteId" onChange={this.handleChange} required>
                {!isSites?(sites.map(site=>{
                const{id,site_id}=site;
                return(
                <option key={id} value={site_id}>{site_id}</option>
                );
                })
                ):(
                <option></option>
                )
                }
                </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Wage Code</Form.Label>
                <Form.Control as="select" value={this.state.wageCode} name="wageCode" onChange={this.handleChange} required>
                {!isWages?(wages.map(wage=>{
                const{id,wagecode}=wage;
                return(
                <option key={id} value={wagecode}>{wagecode}</option>
                );
                })
                ):(
                <option></option>
                )
                }
                </Form.Control>
                </Form.Group>
                </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Labourer Type</Form.Label>
                    <Form.Control as="select" name="labourerType" value={this.state.labourerType} onChange={this.handleSelect} required>
                            <option value="">Choose...</option>
                            <option value="Hindi labourer">Hindi Labourer</option>
                            <option value="Malayalee Labourer">Malayalee Labourer</option>
                            <option value="Union Labourer">Union Labourer</option>
                            <option value="Operator">Operator</option>
                            <option value="Town crane Driver / Skilled operator">Tower Crane Driver / Skilled operator</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Skill Type</Form.Label>
                    <Form.Control as="select" name="skillType" value={this.state.skillType} onChange={this.handleSelect} required>
                            <option value="">Choose...</option>
                            <option value="Skilled">Skilled</option>
                            <option value="Unskilled">Unskilled</option>
                            <option value="Semiskilled">Semiskilled</option>
                            <option value="Foreman">Foreman</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                    </Form>
                </div>
               
                </div>
            </div>
        )
    }
}
