import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
class AttendanceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendances: [],
      isLoading: true,
      isLoadData: true,
      Sites: [],
      fromDate: "",
      toDate: "",
      errors: null,
      siteId: "",
      date: [],
      siteid: ""
    };
  }

  handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.updatetableData(
          this.state.siteId,
          this.state.fromDate,
          this.state.toDate
        );
      }
    );
  };

  componentDidMount() {
    axios
      .get(
        "http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/sitemanage/sites/",
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          Sites: response.data.data,
          isLoading: false,
          siteId: response.data.data[0].site_id,
          fromDate:
            new Date().getFullYear() +
            "-" +
            (parseInt(new Date().getMonth() + 1) < 10
              ? "0" + (1 + new Date().getMonth())
              : new Date().getMonth() + 1) +
            "-" +
            (parseInt(new Date().getDate() + 1) < 10
              ? "0" + new Date().getDate()
              : new Date().getDate() + 1),
          toDate:
            new Date().getFullYear() +
            "-" +
            (parseInt(new Date().getMonth() + 1) < 10
              ? "0" + (1 + new Date().getMonth())
              : new Date().getMonth() + 1) +
            "-" +
            (parseInt(new Date().getDate() + 1) < 10
              ? "0" + new Date().getDate()
              : new Date().getDate() + 1),
        });
        this.updatetableData(
          this.state.siteId,
          this.state.fromDate,
          this.state.toDate
        );
        console.log("sitesresponse", response);
        console.log("sites", this.state.Sites);
        console.log("siteid", this.state.siteId);
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }
  updatetableData = (x, y, z) => {
    const data = {
      siteid: x,
      date: [y, z],
    };
    axios
      .post(
        "http://ec2-13-127-182-134.ap-south-1.compute.amazonaws.com/attendancemanage/allAttendance",
        data,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === false) {
          this.setState({
            attendances: "",
            isLoadData: true,
          });
        } else {
          this.setState({
            attendances: response.data.data,
            isLoadData: false,
          });
          console.log("Allattendance response", response.data.data);
          console.log("Allattendance response data", response.data.data);
          console.log("Allattendance", this.state.attendance);
        }
      })
      .catch((error) => this.setState({ error, isLoadData: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.attendances !== this.state.attendances) {
      this.setState({
        attendances: this.state.attendances,
      });
    }
  }
  render() {
    console.log("inside render metho!d");
    const { isLoading, Sites, isLoadData, attendances } = this.state;

    return (
      <>
     
        <div className="content">
          <div className="attendanceTable">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Site Id</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.siteId}
                    name="siteId"
                    onChange={this.handleChange}
                  >
                    {!isLoading ? (
                      Sites.map((Site) => {
                        const { id, site_id } = Site;
                        return (
                          <option key={id} value={site_id}>
                            {site_id}
                          </option>
                        );
                      })
                    ) : (
                      <option></option>
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.fromDate}
                    name="fromDate"
                    onChange={this.handleChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.toDate}
                    name="toDate"
                    onChange={this.handleChange}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
            <Table striped hover responsive>
              <tr>
                <th>
                  <td>Labourer Id</td>
                </th>
                <th>
                  <td>Date</td>
                  <td>Work Hour</td>
                  <td>OT Hour</td>
                </th>
              </tr>

              <tbody>
                {!isLoadData ? (
                  attendances.map((attendance) => {
                    const { labourerid, info } = attendance;
                    return (
                      <tr>
                        <td>{labourerid}</td>
                        {info.map((item) => {
                          const { date, workhour, OThour } = item;
                          return (
                            <>
                              <tr>
                                <td>{date}</td>
                                <td>{workhour}</td>
                                <td>{OThour}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No data available..!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}
export default AttendanceTable;
