import React,{Component} from 'react'
import axios from 'axios'
import LabourerForm from './LabourerForm'
class AddLabourer extends Component{
  
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
	console.log("formdata: ",formData);
	axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/labourermanage/labourer/',
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
  });
}

    render(){
        return(
            <>
                <LabourerForm/>
            </>
        );
    }
}
export default AddLabourer