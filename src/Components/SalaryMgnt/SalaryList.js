import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
class SalaryList extends Component {
    constructor(){
        super()
        this.state = {
            salaries:'',
            isLoading:true,
            isEdit:true,
            show:false,
            code:'',
            labourerClass:'',
            labourerCategory:'',
            gender:'',
            skillSet:'',
            grade:'',
            dailyRate:'',
            basic:'',
            DA:'',
            site:'',
            otRate:'',
            sundaywage:'',
            sw_c1:'',
            sw_c2:'',
            holidayWage:'',
            otType:'',
            retension:'',
            compensation:''
        }
    }
    handleClose = () => {
        this.setState({
            show:false
        })
    }
    handleShow = () => 
    {
        this.setState({
            show:true
        })
    }
    componentDidMount(){
        axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/SalaryStrutManage/salarycode',{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then((response)=>{
                this.setState({
                    salaries:response.data.data,
                    isLoading:false
                    });
                    console.log("salaries",this.state.salaries);
                   
    }).catch(error=>this.setState({error,isLoading:false}))
    }
    handleModel=(e)=>{
        console.log(e.target.id);
        axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/SalaryStrutManage/salarycode/'+e.target.id+'/',{headers:{
            'Authorization': `Token ${localStorage.getItem('token')}`
        }})
        .then((response)=>{
                this.setState({
                    editData:response.data.datas,
                    isEdit:false,
                    show:true,
                    code:response.data.datas.id,
                    labourerClass:response.data.datas.labourer_class,
                    labourerCategory:response.data.datas.labourer_category,
                    gender:response.data.datas.gender,
                    skillSet:response.data.datas.Skill_set,
                    grade:response.data.datas.Grade,
                    dailyRate:response.data.datas.daily_rate,
                    basic:response.data.datas.basic_pay,
                    DA:response.data.datas.daily_allowence,
                    site:response.data.datas.Site,
                    otRate:response.data.datas.OTrate,
                    sundaywage:response.data.datas.sunday_wage,
                    sw_c1:response.data.datas.SW_C1,
                    sw_c2:response.data.datas.SW_C2,
                    holidayWage:response.data.datas.holiday_wage,
                    otType:response.data.datas.OTtype,
                    retension:response.data.datas.rentation,
                    compensation:response.data.datas.compenratio
                    });
                    console.log("editData",this.state.editData);
                   
    }).catch(error=>this.setState({error,isEdit:false}))
    }
    handleChange=(event)=>{
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        })
       }
    handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            id:this.state.code,
            labourer_class:this.state.labourerClass,
            labourer_category:this.state.labourerCategory,
            gender:this.state.gender,
            Skill_set:this.state.skillSet,
            Grade:this.state.grade,
            daily_rate:this.state.dailyRate,
            basic_pay:this.state.basic,
            daily_allowence:this.state.DA,
            Site:this.state.site,
            OTrate:this.state.otRate,
            sunday_wage:this.state.sundaywage,
            SW_C1:this.state.sw_c1,
            SW_C2:this.state.sw_c2,
            holiday_wage:this.state.holidayWage,
            OTtype:this.state.otType,
            rentation:this.state.retension,
            compenratio:this.state.compensation
        }
        axios.post("http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/SalaryStrutManage/salarycode/edit",(data),{headers:{
         'Authorization': `Token ${localStorage.getItem('token')}`
     }})
        .then(
         response => {
             console.log(response);
             alert(response.data.messgae);
           });
    }
    render() {
        const{isLoading,salaries,isEdit}=this.state;
        return (
            <>
              <div className="viewSites">
                <div className="viewSitesTable">
                <Table striped bordered hover>   
                <thead>
                <tr>
                <th>Code</th>
                <th>Labour Class</th>
				<th>Category</th>
				<th>Gender</th>
				<th>Skill Set</th>
				<th>Grade</th>
				<th>Daily rate</th>
                <th>Basic</th>
                <th>DA</th>
                <th>Site</th>
                <th>OT Rate / Hr</th>
                <th>Sunday Wage</th>
				<th>SW-C1</th>
                <th>SW-C2</th>
                <th>Holiday wage</th>
                <th>OT Type</th>
                <th>Retension</th>
                <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading?(
                            salaries.map(salary=>{
                            var{id,labourer_class,labourer_category,gender,Skill_set,Grade,daily_rate,basic_pay,daily_allowence,Site,OTrate,sunday_wage,SW_C1,SW_C2,holiday_wage,OTtype,rentation}=salary;
                                if(sunday_wage){
                                    sunday_wage = "Yes";
                                }
                                else{
                                    sunday_wage = "No";
                                }
                                if(holiday_wage){
                                    holiday_wage = "Yes";
                                }
                                else{
                                    holiday_wage = "No";
                                }
                                if(rentation){
                                    rentation = "Yes";
                                }
                                else{
                                    rentation = "No";
                                }
                                return(
                                    <tr>
                                        <td>{id}</td>
                                        <td>{labourer_class}</td>
                                        <td>{labourer_category}</td>
                                        <td>{gender}</td>
                                        <td>{Skill_set}</td>
                                        <td>{Grade}</td>
                                        <td>{daily_rate}</td>
                                        <td>{basic_pay}</td>
                                        <td>{daily_allowence}</td>
                                        <td>{Site}</td>
                                        <td>{OTrate}</td>
                                        <td>{sunday_wage}</td>
                                        <td>{SW_C1}</td>
                                        <td>{SW_C2}</td>
                                        <td>{holiday_wage}</td>
                                        <td>{OTtype}</td>
                                        <td>{rentation}</td>
                                        <td style={{color:"blue"}}><b><span id={id} onClick={this.handleModel}>Edit</span></b></td>
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
                {!isEdit? 
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Salary</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.handleSubmit}>
                <Modal.Body>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Code</Form.Label>
                    <Form.Control type="text" name="code" value={this.state.code} disabled/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Labourer Class</Form.Label>
                    <Form.Control as="select" name="labourerClass" value={this.state.labourerClass} onChange={this.handleChange} required>
                            <option value="Kunnel">Kunnel</option>
                            <option value="Casual">Casual</option>
                            <option value="Union">Union</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="labourerCategory" value={this.state.labourerCategory} onChange={this.handleChange} required>
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
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleChange} required>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Skill Set</Form.Label>
                    <Form.Control as="select" name="skillType" value={this.state.skillType} onChange={this.handleChange} required>
                            <option value="Skilled">Skilled</option>
                            <option value="Unskilled">Unskilled</option>
                            <option value="Semiskilled">Semiskilled</option>
                            <option value="Foreman">Foreman</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Grade</Form.Label>
                    <Form.Control as="select" name="grade" value={this.state.grade} onChange={this.handleChange} required>
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
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Daily rate</Form.Label>
                    <Form.Control type="text" name="dailyRate" value={this.state.dailyRate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Basic</Form.Label>
                    <Form.Control type="text" name="basic" value={this.state.basic} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>DA</Form.Label>
                    <Form.Control type="text" name="DA" value={this.state.DA} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Site</Form.Label>
                    <Form.Control type="text" name="site" value={this.state.site} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>OT Rate / Hr</Form.Label>
                    <Form.Control type="text" name="otRate" value={this.state.otRate} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Sunday wage</Form.Label>
                    <Form.Control as="select" name="sundaywage" value={this.state.sundaywage} onChange={this.handleChange} required>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>SW-C1</Form.Label>
                    <Form.Control type="text" name="sw_c1" value={this.state.sw_c1} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>SW-C2</Form.Label>
                    <Form.Control type="text" name="sw_c2" value={this.state.sw_c2} onChange={this.handleChange} required/>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Holiday wage</Form.Label>
                    <Form.Control as="select" name="holidayWage" value={this.state.holidayWage} onChange={this.handleChange} required>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>OT Type</Form.Label>
                    <Form.Control as="select" name="otType" value={this.state.otType} onChange={this.handleChange} required>
                            <option value="Fixed">Fixed</option>
                            <option value="Double">Double</option>
                    </Form.Control>
                    </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGrid">
                    <Form.Label>Retension</Form.Label>
                    <Form.Control as="select" name="retension" value={this.state.retension} onChange={this.handleChange} required>
                            <option value="true">true</option>
                            <option value="false">false</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                    <Form.Label>Compensation</Form.Label>
                    <Form.Control type="text" name="compensation" value={this.state.compensation} placeholder="Enter the amount" onChange={this.handleChange} required/>                            
                    </Form.Group>
                    </Form.Row>   
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit">
                Update
                </Button>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                </Modal.Footer>
                </Form>
                </Modal>:null}
            </>
        )
    }
}
export default SalaryList
