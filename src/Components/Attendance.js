import React,{Component} from 'react'
import Header from './Header'
import LeftNav from './LeftNav'
import AttendanceTable from './AttendanceTable'
class Attendance extends Component{
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
                <div className="activeSection">
                <span className="text-secondary"><b>TIMESHEET / ATTENDANCE</b></span>
                </div>
                <AttendanceTable/>
                </div>
                </section>
            </main>
            </>
        )
    }
}
export default Attendance;