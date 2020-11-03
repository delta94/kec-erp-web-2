import React,{Component} from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CheckIn from './CheckIn'
import CheckOut from './Check-out'
import WorkReport from './WorkReport'
class Reports extends Component{
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
                                <span className="text-secondary"><b>Reports</b></span>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="CheckIn" id="uncontrolled-tab-example">
                                <Tab eventKey="CheckIn" title="Check-In Labourer">
                                  <CheckIn/>
                                </Tab>
                                <Tab eventKey="CheckOut" title="Check-Out Labourer">
                                <CheckOut/>
                                </Tab>
                                <Tab eventKey="WorkReport" title="Labourers Work Report">
                                <WorkReport/>
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
export default Reports