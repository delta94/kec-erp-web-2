import React ,{Component}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './MediaStyle.css';
import { BrowserRouter,Switch,Route} from 'react-router-dom'
import SignUp from './signUp'
import SignIn from './signIn'
import SalaryMgnt from './Components/SalaryMgnt/SalaryMgnt';
import SiteMgnt from './Components/SiteMgnt/SiteMgnt';
import StaffMgnt from './Components/StaffMgnt/StaffMgnt';
import Approvals from './Components/Approval/Approvals';
import Reports from './Components/Reports/Reports';
import Dashboard from './Components/Dashboard';
import Attendance from './Components/Attendance';
import Home from "./Home"
import UserMgnt from './Components/UserMgnt/UserMgnt';
export default class App extends Component{
  constructor(){
    super(); 
    this.state = {
      loggedInStatus :"not_logged_in ",
      user:{}
    }
  }
  render(){
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
     <Route exact path="/" render={props=>(<Home {...props} loggedInStatus={this.state.loggedInStatus}/>)} />
     <Route path="/signUp" component={SignUp}/>
     <Route path="/signIn" component={SignIn}/>
     <Route path="/dashboard" render={props=>(<Dashboard {...props} loggedInStatus={this.state.loggedInStatus}/>)}/>
     <Route path="/user-management" component={UserMgnt}/>
     <Route path="/staff-management" component={StaffMgnt}/>
     <Route path="/salary-management" component={SalaryMgnt}/>
     <Route path="/site-management" component={SiteMgnt}/>
     <Route path="/reports" component={Reports}/>
     <Route path="/attendance" component={Attendance}/> 
     <Route path="/approvals" component={Approvals}/>
     <Route path="/finance" render={props=>(<Dashboard {...props} loggedInStatus={this.state.loggedInStatus}/>)}/>
     </Switch> 
     </BrowserRouter>
    </div>
  )
  }
}

