import React,{Component} from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateSite from './CreateSite'
import ViewSites from './ViewSites'
import ViewLabourer from './AddLabourerSite'
class SiteMgnt extends Component{
    
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
                                <span className="text-secondary"><b>SITE MANAGEMENT</b></span>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="viewSites" id="uncontrolled-tab-example">
                                <Tab eventKey="viewSites" title="View Sites">
                                <ViewSites/>
                                </Tab>
                                <Tab eventKey="createSite" title="Create New Site">
                                <CreateSite/>
                                </Tab>
                                <Tab eventKey="addLabourer" title="Add Labourer to Sites">
                                <ViewLabourer/>
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
export default SiteMgnt