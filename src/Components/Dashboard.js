import React,{Component} from 'react'
import Header from './Header'
import LeftNav from './LeftNav'
import Table from 'react-bootstrap/Table'
import {NavLink} from 'react-router-dom'
import AttendanceTable from './AttendanceTable'
import staffmgntnav from '../images/staffmgntnav.svg'
import approvalnav from '../images/approvalnav.svg'
import sitemgntnav from '../images/sitemgntnav.svg'
import salarymgntnav from '../images/salarymgntnav.svg'
class Dashboard extends Component{
    render(){
        return(
            <>
            <Header>
                <Header/>
            </Header>
            <main>
                <section className="mainContainer">
                        <LeftNav/>
                        <div className="rightContainer">
                            <div className="dashboardContainer">
                            <div className="dashboard">
                                <span className="text-secondary"><b>Dashboard</b></span>
                            </div>
                            <div className="navContent">
                               <div className="navCards">
                                 <div className="cards">
                                    <NavLink to="/staff-management"><span><img src={staffmgntnav} className="imgTopNav" alt=""/>Staff management</span></NavLink>
                                </div>
                                <div className="cards">
                                    <NavLink to="/approvals"><span><img src={approvalnav} className="imgTopNav" alt=""/>Approval</span></NavLink>
                                </div>
                                <div className="cards">
                                    <NavLink to="/site-management"><span><img src={sitemgntnav} className="imgTopNav" alt=""/>Site management</span></NavLink>
                                </div>
                                <div className="cards">
                                    <NavLink to="/salary-management"><span><img src={salarymgntnav} className="imgTopNav" alt=""/>Salary management</span></NavLink>
                                </div>
                               </div>
                            </div> 
                            <span className="text-secondary ml-5"><b>Timesheet / Attendance</b></span>
                            <AttendanceTable/> 
                            <span className="text-secondary ml-5"><b>Reports</b></span>
                            <div className="reportsTable">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
									<th><select><option>Site Name</option></select></th>
									<th>No.of Staff</th>
									<th>No.of Days</th>
									<th>No.of Hours</th>
									<th>OT Hours</th>
									<th>OT Wage</th>
									<th>Sunday</th>
									<th>Sunday Wage</th>
									<th><select><option>lump sum</option></select></th>
									<th>Total Wage</th>
									</tr>
                                    </thead>
                                    <tbody>
									<tr>
										<td>Permanent</td>
										<td>250</td>
										<td>90</td>
										<td>160hrs</td>
										<td>60hrs</td>
										<td>2500</td>
										<td>5</td>
										<td>1000</td>
										<td>1000</td>
										<td>500000</td>
									</tr>
									<tr>
										<td>Kunnel Staff Local</td>
										<td>218</td>
										<td>90</td>
										<td>160hrs</td>
										<td>80hrs</td>
										<td>4500</td>
										<td>3</td>
										<td>3000</td>
										<td>3000</td>
										<td>600000</td>
									</tr>
									<tr>
										<td>Kunnel Staff Hindi</td>
										<td>150</td>
										<td>90</td>
										<td>160hrs</td>
										<td>90hrs</td>
										<td>8800</td>
										<td>8</td>
										<td>6000</td>
										<td>5000</td>
										<td>480000</td>
									</tr>
								</tbody>
                                </Table>
                            </div>
                            </div>
                        </div>
                </section>
            </main>
            </>
        )
    }
}
export default Dashboard