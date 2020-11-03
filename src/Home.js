import React,{Component} from 'react';
import SignIn from "./signIn";
export default class Home extends Component{
    constructor(props){
        super(props);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this); 
    }
    handleSuccessfulAuth(data){
          this.props.history.push("/dashboard")
    }
    render(){
        return(
            <>
               <SignIn handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </>
        )
    }
}