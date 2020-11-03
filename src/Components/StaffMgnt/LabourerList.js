import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
class LabourerList extends Component {
    constructor(){
        super()
        this.state = {
            isData : true,
            labourerList : [],
            show : false,
            labourerData : [],
            showEdit : false,
            id:'',
            name: '',
            address:'',
            aadharNumber:'',
            department:'',
            fatherName:'',
            accountNumber:'',
            branchName:'',
            IFSCCode:'',
            contactNumber:'',
            bloodGroup:'',
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
            labourerid:'',
            compensationDate:'',
            monitorDate:'',
            blockStatus:'',
            retension:'',
            compensation:'',
            siteId:'',
            wageCode:'',
            isLoading:true,
            sites:'',
            isSites:true,
            wages:'',
            isWages:true,
            ID:'',
            photo:'',
            aadharPhoto:''
        }
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
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleEditClose = () => {
        this.setState({
            showEdit:false
        })
    }
    handleShow = (event) => 
    {
        axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/'+event.target.id,{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
      .then((response)=>{
        console.log("LabourerData : ",response.data.datas);
        this.setState({
          labourerData : response.data.datas,
          show:true
        })
        
      }).catch(error=>console.log(error));
        
    }   
    handleShowEdit = (e) =>{
        this.setState({
            ID:e.target.id
        })          
              axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/'+e.target.id,{headers:{
                'Authorization': `Token ${localStorage.getItem('token')}`
              }})
              .then((response)=>{
                      this.setState({
                          showEdit:true,
                          name:response.data.datas.name,
                          address:response.data.datas.address,
                          aadharNumber:response.data.datas.aadharNumber,
                          department:response.data.datas.department,
                          fatherName:response.data.datas.fatherName,
                          accountNumber:response.data.datas.ACNumber,
                          branchName:response.data.datas.branchName,
                          IFSCCode:response.data.datas.IFSCNumber,
                          contactNumber:response.data.datas.contact,
                          bloodGroup:response.data.datas.bloodGroup,
                          salaryStructure:response.data.datas.salary_id,
                          labourerType:response.data.datas.labourerType,
                          skillType:response.data.datas.skillType,
                          designation:response.data.datas.designation,
                          bankName:response.data.datas.bankName,
                          wifeName:response.data.datas.wifeName,
                          childrenNumber:response.data.datas.children_number,
                          dependedFather:response.data.datas.depended_father,
                          dependedMother:response.data.datas.depended_mother,
                          siteId:response.data.datas.site_id,
                          wageCode:response.data.datas.wagecode,
                          labourerId:response.data.datas.labourerid,
                          photo:response.data.photo,
                          aadharPhoto:response.data.aadhrPhoto,
                          monitorDate:response.data.datas.monitorDate,
                          compensationDate:response.data.datas.compnDate,
                          blockStatus:response.data.datas.block_status,
                          retension:response.data.datas.retention,
                          compensation:response.data.datas.compensation

                      })
                       
          });
          
         
    }
    componentWillMount(){
        axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',{headers:{
        'Authorization': `token ${localStorage.getItem('token')}`
    }})
    .then((response)=>{
            this.setState({
                labourerList : response.data.data,
                isData:false
                });
               
               
}).catch(error=>this.setState({error,isData:false}));
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
    handleEdit=(event)=>{
        const target = event.target;
        //console.log("target",target);
        target.setAttribute('contenteditable',true);

    }
    blockStatus=()=>{
        if(this.state.blockStatus==="true"){
            this.setState({
                blockStatus:true
            })
        }
        else{
            this.setState({
                blockStatus:false
            })
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
      /*  var data = {
            name:this.state.name,
            address:this.state.address,
            aadharNumber:this.state.aadharNumber,
            department:this.state.department,
            fatherName:this.state.fatherName,
            ACNumber:this.state.accountNumber,
            branchName:this.state.branchName,
            IFSCNumber:this.state.IFSCCode,
            contact:this.state.contactNumber,
            bloodGroup:this.state.bloodGroup,
            employeeCode:this.state.employeeCode,
            salary_id:this.state.salaryStructure,
            labourerType:this.state.labourerType,
            skillType:this.state.skillType,
            designation:this.state.designation,
            bankName:this.state.bankName,
            wifeName:this.state.wifeName,
            children_number:this.state.childrenNumber,
            depended_father:this.state.dependedFather,
            depended_mother:this.state.dependedMother,
            site_id:this.state.siteId,
            wagecode:this.state.wageCode,
            labourerid:this.state.labourerId,
            id:this.state.ID
        }*/
    this.blockStatus();
    var data={
    labourerid:this.state.labourerId,  
	name:this.state.name,
	address:this.state.address,
	aadharNumber:this.state.aadharNumber,
	department:this.state.department,
	fatherName:this.state.fatherName,
	ACNumber:this.state.accountNumber,
	branchName:this.state.branchName,
	IFSCNumber:this.state.IFSCCode,
	contact:this.state.contactNumber,
	bloodGroup:this.state.bloodGroup,
	salary_id:this.state.salaryStructure,
	labourerType:this.state.labourerType,
    skillType:this.state.skillType,
    wifeName:this.state.wifeName,
    children_number:this.state.childrenNumber,
    depended_father:this.state.dependedFather,
    depended_mother:this.state.dependedMother,
    site_id:this.state.siteId,
    wagecode:this.state.wageCode,
    designation:this.state.designation,
    bankName:this.state.bankName,
    compnDate:this.state.compensationDate,
    monitorDate:this.state.monitorDate,
    block_status:this.state.blockStatus,
    retention:this.state.retension,
    compensation:this.state.compensation
    }
        axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/edit',data,{headers:{
        'Authorization': `token ${localStorage.getItem('token')}`
    }})
    .then(function (response) {
        alert(response.data.message)
      })
      .catch(function () {
        alert('Error occured')
      });
/*
let formData = new FormData();
    this.blockStatus();
    formData.append("labourerid",this.state.labourerId);      
	formData.append("name",this.state.name);
	formData.append("address",this.state.address);
	formData.append("aadharNumber",this.state.aadharNumber);
	formData.append("department",this.state.department);
	formData.append("fatherName",this.state.fatherName);
	formData.append("ACNumber",this.state.accountNumber);
	formData.append("branchName",this.state.branchName);
	formData.append("IFSCNumber",this.state.IFSCCode);
	formData.append("contact",this.state.contactNumber);
	formData.append("bloodGroup",this.state.bloodGroup);
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
  formData.append("compnDate",this.state.compensationDate);
  formData.append("monitorDate",this.state.monitorDate);
  formData.append("block_status",this.state.blockStatus);
  formData.append("retention",this.state.retension);
  formData.append("compensation",this.state.compensation);
  /*formData.append("photo",this.state.photo);
  formData.append("aadhrPhoto",this.state.aadharPhoto);
	console.log("formdata: ",formData);
	axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/edit',
	formData,{
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
  });*/
    }
    render() {
        const{isData,labourerList,labourerData,isLoading,salaries,isSites,sites,isWages,wages} = this.state
        return (
            <>
            <div className="content">
                <div className="attendanceTable">
                <Table striped bordered hover>  
                <thead>
                <tr>
                <th>Sl.No.</th>
                <th>Labourer Id</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Labourer Type</th>
                <th>Skill Type</th>
                <th>Site Id</th>
                <th>Salary Id</th>
                <th>Wage Code</th>
                <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {(!isData)?(
                labourerList.map(data=>{
                const{id,labourerid,name,department,designation,labourerType,skillType,site_id,salary_id,wagecode}=data;
                return(
                <tr>
                <td>{labourerList.indexOf(data)+1}</td>
                <td>{labourerid}</td>
                <td>{name}</td>
                <td>{department}</td>
                <td>{designation}</td>
                <td>{labourerType}</td>
                <td>{skillType}</td>
                <td>{site_id}</td>
                <td>{salary_id}</td>
                <td>{wagecode}</td>
                <td style={{color:"blue"}}><b><span id={id} onClick={this.handleShow}>view</span></b><b><span className="m-5" id={id} onClick={this.handleShowEdit}>Edit</span></b></td>
                </tr>
                    );
                })
                ):(
                <tr><td colSpan="10" className="text-center">No data available..!</td></tr>
                )
                }
                </tbody>
                </Table>
                </div>
                </div>   
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Labourer Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table striped bordered hover>  
                <tbody>
                <tr>
                    <td><b>Labourer Id : </b></td><td>{labourerData.labourerid}</td>
                    <td><b>Name : </b></td><td>{labourerData.name}</td>
                </tr>
                <tr>
                    <td><b>Department : </b></td><td>{labourerData.department}</td>
                    <td><b>Designation : </b></td><td>{labourerData.designation}</td>
                </tr>
                <tr>
                    <td><b>Site Id : </b></td><td>{labourerData.site_id}</td>
                    <td><b>Labourer Type : </b></td><td>{labourerData.labourerType}</td>
                </tr>
                <tr>
                    <td><b>Skill Type : </b></td><td>{labourerData.skillType}</td>
                    <td><b>Employee Code : </b></td><td>{labourerData.employeeCode}</td>
                </tr>
                <tr>
                    <td><b>Salary Id : </b></td><td>{labourerData.salary_id}</td>
                    <td><b>Wage Code : </b></td><td>{labourerData.wagecode}</td>
                </tr>
                <tr>
                    <td><b>Address : </b></td><td>{labourerData.address}</td>
                    <td><b>Father Name : </b></td><td>{labourerData.fatherName}</td>
                </tr>
                <tr>
                    <td><b>Depended Father : </b></td><td>{labourerData.depended_father}</td>
                    <td><b>Depended Mother : </b></td><td>{labourerData.depended_mother}</td>
                </tr>
                <tr>
                    <td><b>Wife Name : </b></td><td>{labourerData.wifeName}</td>
                    <td><b>No.of Children : </b></td><td>{labourerData.children_number}</td>
                </tr>
                <tr>
                    <td><b>Blood group : </b></td><td>{labourerData.bloodGroup}</td>
                    <td><b>Contact Number : </b></td><td>{labourerData.contact}</td>
                </tr>
                <tr>
                    <td><b>Name of Bank : </b></td><td>{labourerData.bankName}</td>
                    <td><b>Account Number : </b></td><td>{labourerData.ACNumber}</td>
                </tr>
                <tr>
                    <td><b>IFSC Code : </b></td><td>{labourerData.IFSCNumber}</td>
                    <td><b>Branch Name : </b></td><td>{labourerData.branchName}</td>
                </tr>
                <tr>
                    <td><b>Aadhar Number : </b></td><td>{labourerData.aadharNumber}</td>
                </tr>
                </tbody>
                </Table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                </Modal.Footer>
                </Modal>
                <Modal show={this.state.showEdit} onHide={this.handleEditClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Labourer Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicName">
                    <Form.Label>Labourer Id</Form.Label>
                    <Form.Control type="text" name="labourerId" value={this.state.labourerId} disabled/>
                    </Form.Group>        
                    <Form.Group as={Col} controlId="formBasicName">
                    <Form.Label>Labourer Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                    </Form.Group>
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
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Department</Form.Label>
                    <Form.Control as="select" name="department" value={this.state.department} onChange={this.handleSelect} required>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Plumbing">Plumbing</option>    
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicDesignation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control type="text" placeholder="Enter designation" name="designation" value={this.state.designation} onChange={this.handleChange} required/>
                    </Form.Group>
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
                    <Form.Group as={Col} controlId="formBasicContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Contact number" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Control as="select" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleSelect} required>
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
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Labourer Type</Form.Label>
                    <Form.Control as="select" name="labourerType" value={this.state.labourerType} onChange={this.handleSelect} required>
                            <option value="Hindi labourer">Hindi Labourer</option>
                            <option value="Malayalee Labourer">Malayalee Labourer</option>
                            <option value="Union Labourer">Union Labourer</option>
                            <option value="Operator">Operator</option>
                            <option value="Town crane Driver / Skilled operator">Tower Crane Driver / Skilled operator</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Skill Type</Form.Label>
                    <Form.Control as="select" name="skillType" value={this.state.skillType} onChange={this.handleSelect} required>
                            <option value="Skilled">Skilled</option>
                            <option value="Unskilled">Unskilled</option>
                            <option value="Semiskilled">Semiskilled</option>
                            <option value="Foreman">Foreman</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Compensation Date</Form.Label>
                    <Form.Control type="date" name="compensationDate" value={this.state.compensationDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicGridState">
                    <Form.Label>Monitor Date</Form.Label>
                    <Form.Control type="date" name="monitorDate" value={this.state.monitorDate} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Block Status</Form.Label>
                    <Form.Control as="select" name="blockStatus" value={this.state.blockStatus} onChange={this.handleSelect} required>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Compensation</Form.Label>
                    <Form.Control type="text" name="compensation" value={this.state.compensation} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Retension</Form.Label>
                    <Form.Control type="text" name="retension" value={this.state.retension} onChange={this.handleChange} required/>
                    </Form.Group>
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
        )
    }
}
export default LabourerList