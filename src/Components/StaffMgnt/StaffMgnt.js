import React,{Component} from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import AddLabourer from './AddLabourer'
import LabourerList from './LabourerList'
/*import AddProjectManager from './AddProjectMgnr'
import AddSubContractor from './AddSubContractor'*/
import WorkHistory from './LabourerWorkHistory'
class StaffMgnt extends Component{
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
                                <span className="text-secondary"><b>STAFF MANAGEMENT</b></span>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="totalLabourer" id="uncontrolled-tab-example">
                                <Tab eventKey="totalLabourer" title="Labourer List">
                                <LabourerList/>
                                </Tab>
                                <Tab eventKey="addLabourer" title="Add Labourer">
                                <AddLabourer/>    
                                </Tab>  
                                <Tab eventKey="workHistory" title="Labourer Work History">
                                <WorkHistory/>
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
export default StaffMgnt
