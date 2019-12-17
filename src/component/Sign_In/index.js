import React from "react";
import { SignInForm } from "../Sign_In_Form";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Row, Col } from "antd";

import "./styles.css";
const INITIAL_STATE = {
  email: "",
  password: "",
  franchise: "",
  error: null
};

class SignInComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.props.firebase.getUserRole(authUser.user.uid)
          .then((doc) => {
            if (doc.exists) {
              if (doc.data().userrole === 'user') {
                this.props.history.push(`/dashboard`);                  
              } else if (doc.data().userrole === 'admin') {
                this.props.history.push(`/admin`);
              }
            }
          })
        this.setState({
          ...INITIAL_STATE
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Row>
        <Col
          sm={{
            span: 14,
            offset: 5
          }}
        >
          <SignInForm
            formInputs={this.state}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </Col>
      </Row>
    );
  }
}

const SignIn = withRouter(withFirebase(SignInComponent));

export { SignIn };
