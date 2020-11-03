import React,{Component} from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import SalaryReportForm from './SalaryReportForm'
import CreateSalaryStructForm from "./CreateSalaryStruct"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import SalaryList from './SalaryList'
class SalaryMgnt extends Component{
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
                                <span className="text-secondary"><b>SALARY MANAGEMENT</b></span>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="salaryReport" id="uncontrolled-tab-example">
                                <Tab eventKey="salaryReport" title="Salary report">
                                    <SalaryReportForm/>
                                </Tab>
                                <Tab eventKey="createSalaryStructure" title="Create Salary Structure">
                                     <CreateSalaryStructForm/>
                                </Tab>
                                <Tab eventKey="salaryList" title="Salary List">
                                <SalaryList/>    
                                </Tab>
                                <Tab eventKey="" title="" disabled>
                            
                                </Tab>
                                </Tabs>
                            </div>   
                        </div>
                </section>
            </main>
            </>
        )
    }
}
export default SalaryMgnt