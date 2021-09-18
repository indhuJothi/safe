import React from "react";
import "./Header.css";
import { Redirect, withRouter } from "react-router-dom";
class Header extends React.Component {

  constructor(props)
  {
    super(props)
    
      this.state={
        profile:false,
        logOut:false
      }
    
  }

  setprofile()
  {
    this.setState({
      profile:true
    })
  }
  logOut(){
   this.setState({
     logOut:true
   })
  }
  render(){
  return (
    <div>
      <div className="body">
        <div className="header">
          <span className="apptitle">Bus Booking App</span>
        </div>
        
        {sessionStorage.getItem("authToken") && (
          <span className="logobut">
            <span className="username">{sessionStorage.getItem("user")}</span>
            <span className="pro" onClick={(e) => {
              e.preventDefault();
              this.props.history.push('/profile')
              }}>
              Profile
            </span>
            <button
              onClick={(e) => {
               this.logOut()
               
              }}
              className="signuplogo"
            >
            Logout
            </button>
          </span>
        ) }
        
        {this.state.logOut&&<Redirect to="/login"/>}
        {this.state.logOut&&sessionStorage.clear()}
      </div>
    </div>
  );
}
}

export default withRouter(Header)