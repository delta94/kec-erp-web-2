import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import Dashboardicon from "../images/dashboard.svg";
import staffmgnt from "../images/staffmgnt.svg";
import timesheet from "../images/timeSheet.svg";
import sitemgnt from "../images/sitemgnt.svg";
import salarymgnt from "../images/salarymgnt.svg";
import finance from "../images/finance.svg";
import reports from "../images/reports.svg";
import approval from "../images/approval.svg";
import groups from '../images/groups.svg';
class LeftNav extends Component{
   /* handleColorSet=(e)=>{
        let Id=e.target.id;
        console.log("ID: ",Id);
        document.getElementById(Id).style.color = "blue";
    }
    handleColorReset=(e)=>{
        let Id=e.target.id;
       // document.getElementById(Id).style.color="grey";
    }*/

    render(){
    return(
        <>
           <div className="sideNav">
               <ul>
                   <li><NavLink exact to="/dashboard" activeClassName="leftNavActive"><span><img src={Dashboardicon} alt=""/></span><span>Dashboard</span></NavLink></li>
                   <li><NavLink to="/user-management" activeClassName="leftNavActive"><span><img src={groups} alt=""/></span><span>User management</span></NavLink></li>
                   <li><NavLink to="/staff-management" activeClassName="leftNavActive"><span><img src={staffmgnt} alt=""/></span><span>Staff management</span></NavLink></li>
                   <li><NavLink to="/attendance" activeClassName="leftNavActive"><span><img src={timesheet} alt=""/></span><span>Attendance</span></NavLink></li>
                   <li><NavLink to="/site-management" activeClassName="leftNavActive"><span><img src={sitemgnt} alt=""/></span><span>Site management</span></NavLink></li>
                   <li><NavLink to="/salary-management" activeClassName="leftNavActive"><span><img src={salarymgnt} alt=""/></span><span>Salary management</span></NavLink></li>
                   <li><NavLink to="/finance" activeClassName="leftNavActive"><span><img src={finance} alt=""/></span><span>Finance</span></NavLink></li>
                   <li><NavLink to="/reports" activeClassName="leftNavActive"><span><img src={reports} alt=""/></span><span>Reports</span></NavLink></li>
                   <li><NavLink to="/approvals" activeClassName="leftNavActive"><span><img src={approval} alt=""/></span><span>Approval</span></NavLink></li>
                 {/*  <li><NavLink to="./" activeClassName="leftNavActive"><span><img src={settings} alt=""/></span><span>Settings</span></NavLink></li>*/}
               </ul>
           </div>
        </>            
    )}
}
export default LeftNav