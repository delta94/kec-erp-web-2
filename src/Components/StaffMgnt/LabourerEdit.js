import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
class LabourerEdit extends Component {
    constructor(props){
        super(props)
        this.state={
            show : true,
            id:this.props.id,
            /*name: '',
        address:'',
        aadharNumber:'',
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
        dependedMother:'',*/
        isLoading:true,
        sites:'',
       /* siteId:'',*/
        isSites:true,
        wages:'',
       /* wageCode:'',*/
        isWages:true
        }
        console.log("iniside labourer edit id : ",this.props.id);
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
	
    handleClose = (e) => {
        this.setState({
        show :false,
        })
        window.location.reload();
    }   
    componentDidMount(){
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
        console.log("inside component will mount");
   /* axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/'+this.state.id,{headers:{
      'Authorization': `Token ${localStorage.getItem('token')}`
    }})
    .then((response)=>{
          console.log(response);
         if(response.status === true){
            this.setState({
                name:response.data.datas.name,
                address:response.data.datas.address,
                aadharNumber:response.data.datas.aadharNumber,
                department:response.data.datas.department,
                fatherName:response.data.datas.fatherName,
                accountNumber:response.data.datas.ACNumber,
                branchName:response.data.datas.branchName,
                IFSCCode:response.data.datas.IFSCCode,
                contactNumber:response.data.datas.contact,
                bloodGroup:response.data.datas.bloodGroup,
                employeeCode:response.data.datas.employeeCode,
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
            })
         }
               
    });*/
}
    render() {
        const{isLoading,salaries,isSites,sites,isWages,wages}=this.state;
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Labourer Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>    
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
                    </Form.Row>
                    <Button variant="primary" type="submit">
                    Update
                    </Button>
                    <Button variant="secondary" onClick={this.handleClose}>
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
export default LabourerEdit