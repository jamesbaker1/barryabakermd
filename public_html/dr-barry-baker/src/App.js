import React from 'react';
import './App.css';
import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase.js'; // <--- add this line


class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { submitted: false, loading: true, noName: false, name: ''};
    this.checkInPatient = this.checkInPatient.bind(this);
    this.showNoName = this.showNoName.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

  }

  presentFormOrCompleted() {
//     if (this.state.loading) return (   <Spinner animation="border" variant="success"/>
// );
    if (!this.state.submitted) return (    <Container>
              <Row className="justify-content-md-center">Welcome!</Row>
              <Row className="justify-content-md-center">
                <Col>
                <div>
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label >Name</Form.Label>
                      <Form.Control value={this.state.name} onChange={this.handleFormChange} placeholder="Enter full name." />
                      {this.showNoName()}
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="New patient? (Never been to Dr. Baker's office before.)" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.checkInPatient}>
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
              </Row>
            </Container>);
      else return (<div>Submitted!</div>)
  }

  handleFormChange(event) {
    this.setState({name: event.target.value, noName: false});
  }

  checkInPatient(e) {
    e.preventDefault();
    if (this.state.name.length === 0) {
      this.setState({noName: true})
      return;
    }
    const itemsRef = firebase.database().ref('signed_in');
    itemsRef.push({check_in_time: new Date().toLocaleString(), name: this.state.name});
    this.setState({submitted: true});
    setTimeout(() => {
      this.setState({submitted: false});
    }, 2000);
  }

  showNoName() {
    if (this.state.noName) return (<strong style={{color: 'red'}}>No name!</strong>);
  }

  render () {
    return this.presentFormOrCompleted();
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
