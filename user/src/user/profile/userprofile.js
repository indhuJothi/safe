import React from "react";
import logo from "../../resources/signlogo.jpg";
import "./userprofile.css";
import Menu from "../../common/menu/Menu";
import Header from "../../common/header/Header";
import { withRouter } from "react-router";
import { userAuthenticated } from "../../service/api";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
      this.state = {
        isUpdate: true,
        name: "",
        email: "",
        pass: "",
        mobile: "",
        error:"",
        emailError:"",
        mobileError:"",
        changePassword: false,
        isupdateData: true,
        isinputShow: false,
        userData:[]
       
      
    }
    this.getForm = this.getForm.bind(this);
    this.getName = this.getName.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.close = this.close.bind(this);
  }
  getName(e) {
    const name = e.target.name;
    const email = e.target.email;
    const mobile = e.target.mobile;
    this.setState({
      [name]: e.target.value,
      [email]: e.target.value,
      [mobile]: e.target.value,
    });
  }
  updateUser(e) {
    let updateName=true
    let updateEmail=true
    let updateMobile=true
    let nameRegex = /^[a-zA-z_\s]{4,20}$/;
    let emailRegex = /^[a-zA-Z0-9+_.-]+@([a-zA-Z.]+\.)+[\w]{2,3}$/;
    let mobileRegex = /^[6-9]\d{9}$/;
    if(this.state.name!==""){
    if(nameRegex.test(this.state.name))
    {
      updateName=true
      this.setState({
        error:""
      })
    }
    else{
      updateName=false
      this.setState({
        error:"Please provide a valid name"
      })
    }
  }
  if(this.state.email!==""){
    if(emailRegex.test(this.state.email)){
      updateEmail=true
      this.setState({
        emailError:""
      })
    }
    else{
      updateEmail = false
      this.setState({
        emailError:"Provide a valid email"
      })
    }
  }
  if(this.state.mobile!==""){
    if(mobileRegex.test(this.state.mobile))
    {
      updateMobile=true
      this.setState({
        mobileError:""
      })
    }
    else{
      updateMobile=false
      this.setState({
        mobileError:"Please provide a valid mobile"
      })
    }
    
  }
  if((updateMobile && updateName && updateEmail)===true){
    this.setState({
      isupdateData: false,
      isinputShow: false,
      changePassword: false,
    });
    sessionStorage.user= this.state.name===""?this.state.userData.name:this.state.name
    const data ={
    
      name : this.state.name===""?this.state.userData.name:this.state.name,
      mobile:this.state.mobile===""?this.state.userData.mobile:this.state.mobile,
      email:this.state.email===""?this.state.userData.email:this.state.email,
    }
    axios.put('http://localhost:5000/users/updateuser',data,{
      headers:{
        "Content-Type": "application/json",
        "access-token":sessionStorage.getItem("authToken")
      }
    })
  }
  }

  getForm() {
    this.setState({
      isUpdate: false,
      isinputShow: true,
    });
  }
  close() 
  {     
      this.props.history.goBack(); 
  }

  componentDidMount()
  {
    userAuthenticated().then((response)=>{
      this.setState({
        userData:response.data
      })
      
   })
  

  }
  render() {
    
    let isinputShow = this.state.isinputShow;
    let isUpdate = this.state.isUpdate;

    return (
      <div>
        <div>
          <Menu />
          <Header />
          <div className="profile">
            <>
              <div className="profilepic">
                <img className="profilelogo" alt="logo" src={logo}></img>
              </div>
              <button onClick={this.getForm}>Edit</button>
              <button onClick={this.close}>Close</button>
              <button
                onClick={() => {
                  this.props.history.push("/password");
                }}
              >
                ChangePassword
              </button>
              <div className="profiledetails">
                {isUpdate ? (
                  <div className="profileinfo">
                    <span className="info">
                      Name: <span className="info1">{this.state.userData.name}</span>
                    </span>
                  </div>
                ) : this.state.name === "" ? (
                  <div className="profileinfo">
                    <span className="info">
                      Name:<span className="info1">{this.state.userData.name}</span>
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="info">
                      Name:<span className="info1">{this.state.name}</span>
                    </span>
                  </div>
                )}
                {isUpdate ? (
                  <div className="profileinfo">
                    <span className="info">
                      Email:<span className="info1">{this.state.userData.email}</span>
                    </span>
                  </div>
                ) : this.state.email === "" ? (
                  <div className="profileinfo">
                    <span className="info">
                      Email:<span className="info1">{this.state.userData.email}</span>{" "}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="info">
                      Email:<span className="info1">{this.state.email}</span>
                    </span>
                  </div>
                )}
                {isUpdate ? (
                  <div className="profileinfo">
                    <span className="info">
                      Mobile:<span className="info1">{this.state.userData.mobile}</span>
                    </span>
                  </div>
                ) : this.state.mobile === "" ? (
                  <div className="profileinfo">
                    <span className="info">
                      Mobile:<span className="info1">{this.state.userData.mobile}</span>{" "}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="info">
                      Mobile:<span className="info1">{this.state.mobile}</span>
                    </span>
                  </div>
                )}
              </div>
            
              <div className="updatedetails">
                {isinputShow ? (
                  <input
                    className="inputdetail"
                    // defaultValue={this.state.userData.name}
                    type="text"
                    placeholder="Name to Upadte"
                    name="name"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <input
                    className="inputdetail"
                    // defaultValue={this.state.userData.email}
                    type="text"
                    name="email"
                    placeholder="Email to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <input
                    className="inputdetail"
                    // defaultValue={this.state.userData.mobile}
                    type="text"
                    name="mobile"
                    placeholder="Mobile No to Update"
                    onChange={this.getName}
                  />
                ) : null}
                <br></br>
                {isinputShow ? (
                  <button className="inputbutton" onClick={this.updateUser}>
                    Save
                  </button>
                ) : null}
              </div>
            </>
            <p className="error">{this.state.error}</p>
            <p className="error">{this.state.emailError}</p>
            <p className="error">{this.state.mobileError}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);

