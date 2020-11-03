import React,{Component} from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CreateUser from './CreateUser'


class UserMgnt extends Component{
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
                                <span className="text-secondary"><b>USER MANAGEMENT</b></span>
                            </div>
                            <div className="content">
                                <Tabs defaultActiveKey="createUser" id="uncontrolled-tab-example">
                                <Tab eventKey="createUser" title="Create User">
                                <CreateUser/>
                                </Tab>
                                <Tab eventKey="addPermission" title="Add Permission">
                                
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
export default UserMgnt