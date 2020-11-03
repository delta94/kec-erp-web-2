import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
class CreateSalaryStructForm extends Component{
   constructor(){
       super();
       this.state={
        labourerClass:'',
        labourerCategory:'',
        gender:'',
        skillType:'',
        grade:'',
        dailyRate:'',
        basicPay:'',
        dailyAllowance:'',
        site:'',
        OTrate:'',
        sundayWage:'',
        SWC1:'',
        SWC2:'',
        holidayWage:'',
        OTtype:'',
        retension:'',
        compensation:''
       }
   }
   handleChange=(event)=>{
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    })
   }
   handleSubmit=(event)=>{
       event.preventDefault();
       const data={
           labourer_class:this.state.labourerClass,
           labourer_category:this.state.labourerCategory,
           gender:this.state.gender,
           Skill_set:this.state.skillType,
           Grade:this.state.grade,
           daily_rate:this.state.dailyRate,
           basic_pay:this.state.basicPay,
           daily_allowence:this.state.dailyAllowance,
           Site:this.state.site,
           OTrate:this.state.OTrate,
           sunday_wage:this.state.sundayWage,
           SW_C1:this.state.SWC1,
           SW_C2:this.state.SWC2,
           holiday_wage:this.state.holidayWage,
           OTtype:this.state.OTtype,
           rentation:this.state.retension,
           compenratio:this.state.compensation
       }
       axios.post(/*"https://kunnel-erp.herokuapp.com/*/"http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/SalaryStrutManage/salarycode",(data),{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
       .then(
        res => {
            console.log(res);
            alert(res.data.satus);
          });
  
   }
    render(){
        return(
            <>
                <div className="salaryStructure">
                <div className="salaryStructureForm">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Row>        
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Labourer Class</Form.Label>
                    <Form.Control as="select" name="labourerClass" value={this.state.labourerClass} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="Kunnel">Kunnel</option>
                            <option value="Casual">Casual</option>
                            <option value="Union">Union</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Labourer Category</Form.Label>
                    <Form.Control as="select" name="labourerCategory" value={this.state.labourerCategory} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="Hindi labour">Hindi Labour</option>
                            <option value="Malayalee Labour">Malayalee Labour</option>
                            <option value="Union Labour">Union Labour</option>
                            <option value="Tamil Labour">Tamil Labour</option>
                            <option value="Operator">Operator</option>
                            <option value="Town crane Driver / Skilled operator">Tower Crane Driver / Skilled operator</option>
                            <option value="Bobcat Driver">Bobcat Driver</option>
                            <option value="Batching Plant Operator">Batching Plant Operator</option>
                            <option value="Foreman">Foreman</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Skill Type</Form.Label>
                    <Form.Control as="select" name="skillType" value={this.state.skillType} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="Skilled">Skilled</option>
                            <option value="Unskilled">Unskilled</option>
                            <option value="Semiskilled">Semiskilled</option>
                            <option value="Foreman">Foreman</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control as="select" name="grade" value={this.state.grade} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicDailyRate">
                    <Form.Label>Daily Rate</Form.Label>
                    <Form.Control type="text" placeholder="Enter the amount" name="dailyRate" value={this.state.dailyRate} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBasicPay">
                    <Form.Label>Basic Pay</Form.Label>
                    <Form.Control type="text" placeholder="Enter the amount" name="basicPay" value={this.state.basicPay} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicBasicDailyAllowance">
                    <Form.Label>Daily Allowance</Form.Label>
                    <Form.Control type="text" placeholder="Enter the amount" name="dailyAllowance" value={this.state.dailyAllowance} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBasicSite">
                    <Form.Label>Site</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Site" name="site" value={this.state.site} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicBasicOTRate">
                    <Form.Label>OT Rate</Form.Label>
                    <Form.Control type="text" placeholder="Enter the OT rate" name="OTrate" value={this.state.OTrate} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Sunday Wage</Form.Label>
                    <Form.Control as="select" name="sundayWage" value={this.state.sundayWage} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Holiday Wage</Form.Label>
                    <Form.Control as="select" name="holidayWage" value={this.state.holidayWage} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicSWC1">
                    <Form.Label>SW-C1</Form.Label>
                    <Form.Control type="text" placeholder="Enter here" name="SWC1" value={this.state.SWC1} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicSWC2">
                    <Form.Label>SW-C2</Form.Label>
                    <Form.Control type="text" placeholder="Enter here" name="SWC2" value={this.state.SWC2} onChange={this.handleChange}/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formBasicBasicOTtype">
                    <Form.Label>OT Type</Form.Label>
                    <Form.Control as="select" name="OTtype" value={this.state.OTtype} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Double">Double</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Retension</Form.Label>
                    <Form.Control as="select" name="retension" value={this.state.retension} onChange={this.handleChange} required>
                            <option value="">Choose...</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridState">
                    <Form.Label>Compensation</Form.Label>
                    <Form.Control type="text" name="compensation" value={this.state.compensation} placeholder="Enter the amount" onChange={this.handleChange} required/>                            
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
export default CreateSalaryStructForm