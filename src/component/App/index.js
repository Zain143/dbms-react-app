import React, { Component } from "react";
import { withAuthentication } from "../Session";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { spring, AnimatedSwitch  } from "react-router-transition";
import Dashboard from "../Dashboard";
import AdminDashboard from "../Admin";
import { AdminSignIn } from "../Admin_SignIn";
import * as ROUTE from "../../constants/routes";
import "./styles.css";

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
};

const NoMatch = () => <h1>404</h1>;

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Switch>
            <AnimatedSwitch
              atEnter={bounceTransition.atEnter}
              atLeave={bounceTransition.atLeave}
              atActive={bounceTransition.atActive}
              mapStyles={mapStyles}
              className="route-wrapper"
            >
              <Route path={`${ROUTE.ADMIN_DASHBOARD}`} component={AdminDashboard} />
              <Route path={`${ROUTE.DASHBOARD}`} component={Dashboard} />
              <Route exact path={`/`} component={AdminSignIn} />
              <Route component={NoMatch} />
            </AnimatedSwitch>
          </Switch>
        </>
      </Router>
    );
  }
}

export default withAuthentication(App);
