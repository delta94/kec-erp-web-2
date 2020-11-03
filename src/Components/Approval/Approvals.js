import React,{Component} from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import OTList from './OTList'
class Approvals extends Component{
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
                                <span className="text-secondary"><b>APPROVALS</b></span>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="OTList" id="uncontrolled-tab-example">
                                <Tab eventKey="OTList" title="View OT List">
                                  <OTList/>
                                </Tab>
                                <Tab eventKey="" title="">
                                
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
export default Approvals