import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,

} from "react-router-dom";
import "./Menu.css";
import { withRouter } from "react-router";


class Menu extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Router>
            <ul>
              <li className="li">
                <NavLink
                  className="link"
                  activeStyle={{ color: "red" }}
                  to="/search"
                  onClick={()=>{this.props.history.push('/search')}}
                >
                  Search
                </NavLink>
              </li>
              <li className="li">
                <NavLink
                  className="link"
                  activeStyle={{ color: "red" }}
                  to="/user-history"
                  onClick={()=>{this.props.history.push('/user-history')}}
                >
                  User History
                </NavLink>
              </li>
            </ul>
          </Router>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
