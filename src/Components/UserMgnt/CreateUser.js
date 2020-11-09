import React,{ Component} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

class SignUp extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
           Username:'',
           Firstname:'',
           Lastname:'',
           Email:'',
           Usertype:'',
           Password1:'',
           Password2:'',
           Userrole:'',
           roles:[]
        };
    }
    handleChange=(e)=> {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    componentDidMount=()=>{
      axios.get('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/app1/permission',{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
        .then(res => {
          console.log(res);
          console.log("roles:",res.data);
          this.setState({
            roles:res.data
          })
         
        }).catch(error=>{
          alert("Error occured:",error);
      });
    }
    handleSubmit=(e)=> {
        e.preventDefault();
        const data = {
          password:this.state.Password1,
          username:this.state.Username,
          user_type:this.state.Usertype,
          role:this.state.Userrole,
          emailid:this.state.Email,
          active:true,
          first_name:this.state.Firstname,
          last_name:this.state.Lastname
        };
      console.log(data);
       axios.post('http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/app1/user',(data),{headers:{
        'Authorization': `Token ${localStorage.getItem('token')}`
    }})
        .then(res => {
          console.log(res);
          console.log(res.data.satus);
          alert(res.data.message);
         
        }).catch(error=>{
          alert("Error occured:",error);
      });
      
       }
    render(){
      const {roles} = this.state
        return(
          
            <>
             <div className="createSite">
                <div className="createSiteForm">
            
                <Form onSubmit={this.handleSubmit} action=""> 
               
                <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name="Username" value={this.state.Username} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" placeholder="Enter firstname" name="Firstname" value={this.state.Firstname} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" placeholder="Enter lastname" name="Lastname" value={this.state.Lastname} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="Email" value={this.state.Email} onChange={this.handleChange} required/>
               
                </Form.Group>
               
                <Form.Group controlId="formBasicUsertype">
                <Form.Label>User type</Form.Label>
                <Form.Control type="text" placeholder="Enter usertype" name="Usertype" value={this.state.Usertype} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicUserrole">
                <Form.Label>User Role</Form.Label>
                <Form.Control as="select" value={this.state.Userrole} name="Userrole" onChange={this.handleChange} required>
                {roles.length?(roles.map(role=>{
                return(
                        <option key={role.id} value={role.role}>{role.role}</option>
                    );
                })
                ):(
                    <option></option>
                )
                }
                </Form.Control>
                </Form.Group> 
                <Form.Group controlId="formBasicPassword1">
                <Form.Label>Create password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="Password1" value={this.state.Password1} onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Re-enter password" name="Password2" value={this.state.Password2} onChange={this.handleChange} required/>
                </Form.Group>
                
                <Button type="submit">
                Add User
                </Button>
                </Form>
                </div>
                </div>
            </>
        )
    }
}
export default SignUp