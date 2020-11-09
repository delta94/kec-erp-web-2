import React,{Component} from 'react'
import Header from './Header'
import LeftNav from './LeftNav'
import AttendanceTable from './AttendanceTable'
class Attendance extends Component{
    constructor(){
        super()
        this.state ={
            user:localStorage.getItem('role')
        }
    }
    render(){
        const {user} = this.state
        return(
            <>
            <Header>
                <Header/>
            </Header>
            <main>
                <section className="mainContainer">
                <LeftNav/>
                <div className="rightContainer">
                <div className="activeSection">
                <span className="text-secondary"><b>TIMESHEET / ATTENDANCE</b></span>
                </div>
                {(user === "SiteOperator"||"admin"||"OperationDept")?
                (<AttendanceTable/>)
                :(
                    <div>
                        <h4>
                            You are not authorized!
                        </h4>
                 </div>
                )}
                </div>
                </section>
            </main>
            </>
        )
    }
}
export default Attendance;