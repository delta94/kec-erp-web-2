import React,{ Component} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {NavLink} from 'react-router-dom';
import axios from 'axios'
class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Username:'',
            Password:'',
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        })
    }
    componentDidMount(){
        localStorage.clear();
    }
    handleSubmit(e) {
        e.preventDefault();
        const data={
          username :this.state.Username,
          password:this.state.Password
        };
        console.log(data);
       axios.post(/*'https://kunnel-erp.herokuapp.com/app1/login'*/'http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/app1/login',(data),{withCredentials:true})
        .then(response => {
          console.log(response);
          //alert(response.data.status);
          if(response.data.status===true){
          this.props.handleSuccessfulAuth(response.data)
          localStorage.setItem("username",response.data.user);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("usertype",response.data.usertype);
          }
         /* axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/app1/permission',{
            headers:{
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
          }).then(response=>{
              alert(response.data);
          })*/
        })
        .catch(error=>{
            console.log("login error",error)
        })
    }
    render(){
        return( 
            <>
            <section className="homeContainer">
            <div className="homeBodyContainer">
            <div className="homeLeftSection">
                <h1><b>BUILD SOLID</b></h1>
                <h5><b>with men,materials and machines with tandem</b></h5>
            </div>
             <div className="homeRightSection">
                <div className="signInForm">
                <div className="signInFormHead">
                 <div className="logo"></div>   
                <span>Kunnel Engineers & Contractors (P) Ltd.</span>
                </div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                <Form.Label><b>Username</b></Form.Label>
                <Form.Control type="text" name="Username" placeholder="Enter username" value={this.state.Username} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                <Form.Label><b>Password</b></Form.Label>
                <Form.Control type="password" name="Password" placeholder="Password" value={this.state.Password} onChange={this.handleChange} required/>
                </Form.Group>
                <Button type="submit">
                Submit
                </Button>
                </Form>
                <NavLink to="signUp" className="signInNav">Create an account?</NavLink>
                </div>
            </div>
            </div>
            </section>
            </>
        );
    }
}
export default SignIn