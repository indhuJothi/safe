import React from "react";
import "./LogReg.css";
import { Redirect, withRouter } from "react-router-dom";
import Header from "../../common/header/Header";
import SweetAlert from "react-bootstrap-sweetalert";
import baseURL from '../../service/api';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      userNameErr: "",
      emailErr: "",
      passErr: "",
      mobileerr: "",
      confirmpassErr: "",
      login: true,
      alert: null,
      redirectLogin: false,
      userAlreadyExsist:null
    };
  }

  handleChange(event) {
    event.preventDefault();
    const userName = event.target.userName;
    const mobile = event.target.name;
    const password = event.target.password;
    const email = event.target.email;
    const confirmPassword = event.target.confirmPassword;
    this.setState({
      [userName]: event.target.value,
      [email]: event.target.value,
      [mobile]: event.target.value,
      [password]: event.target.value,
      [confirmPassword]: event.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      redirectLogin: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let emailRes = true;
    let mobileRes = true;
    let passwordRes = true;
    let confirmPassRes = true;
    let userNameres = true;
    let nameRegex = /^[a-zA-z_\s]{4,20}$/;
    let emailRegex = /^[a-zA-Z0-9+_.-]+@([a-zA-Z.]+\.)+[\w]{2,3}$/;
    let mobileRegex = /^[6-9]\d{9}$/;
    let passRegex = /^[A-Za-z0-9@\s]{5,15}$/;
    if (this.state.userName === "") {
      userNameres = true;
      this.setState({
        userNameErr: "Please Enter Your User Name",
      });
    } else {
      if (nameRegex.test(this.state.userName)) {
        userNameres = false;
        this.setState({
          userNameErr: " ",
        });
      } else {
        userNameres = true;
        this.setState({
          userNameErr: "User Name Must Be between 5-15 Charachters",
        });
      }
    }
    if(this.state.email===""){
      emailRes=true
      this.setState({
        emailErr:"Please Enter Your Email"
      })
    }else{
    if (emailRegex.test(this.state.email)) {
      emailRes = false;
      this.setState({
        emailErr: " ",
      });
    } else {
      emailRes = true;
      this.setState({
        emailErr: "Enter a valid email",
      });
    }
  }
  if(this.state.mobile==="")
  {
    mobileRes=true
    this.setState({
      mobileerr:"Please Enter Your Mobile Number"
    })
  }
  else{
    if (mobileRegex.test(this.state.mobile)) {
      mobileRes = false;
      this.setState({
        mobileerr: " ",
      });
    } else {
      mobileRes = true;
      this.setState({
        mobileerr: "Enter a valid mobile",
      });
    }
  }
   if(this.state.password===""){
     passwordRes=true
     this.setState({
       passErr:"Please Enter Your Password"
     })
   }
   else{
    if (passRegex.test(this.state.password)) {
      passwordRes = false;
      this.setState({
        passErr: " ",
      });
    } else {
      passwordRes = true;
      this.setState({
        passErr: "Enter a valid password",
      });
    }
  }
    if (this.state.confirmPassword === "") {
      confirmPassRes = true;
      this.setState({
        confirmpassErr: "Please Enter Your Password",
      });
    } else if (this.state.password === this.state.confirmPassword) {
      confirmPassRes = false;
      this.setState({
        confirmpassErr: " ",
      });
    } else {
      confirmPassRes = true;
      this.setState({
        confirmpassErr: "password are not same",
      });
    }

    if (
      (userNameres ||
        emailRes ||
        mobileRes ||
        passwordRes ||
        confirmPassRes) ===false
    ) {
      const getAlert = () => (
        <SweetAlert success
          confirmBtnStyle={{backgroundColor:"greenyellow",width:70,color:"purple",fontWeight:"bold"}}
          onConfirm={() => this.hideAlert()}>
          You are signed in successfully
          <p>You can now Login</p>
        </SweetAlert>
      );
      const userAlert = () => (
        <SweetAlert warning 
        confirmBtnStyle={{backgroundColor:"Red",width:70,color:"Black",fontWeight:"bold"}}
        confirmBtnBsStyle ="warning"
        onConfirm={() => this.hideAlert()}>
          User Already Exisit
          <p>You can Login</p>
        </SweetAlert>
      );
      const newUser ={
        name:this.state.userName,
        email:this.state.email,
        mobile:this.state.mobile,
        password:this.state.password
        }
        this.registerUser(newUser)
        .then(response =>{
              if(response.data==="User alredy exsit..")
          {
            this.setState({
              alert:null,
              userAlreadyExsist:userAlert()
            })
         }
         else{
          this.setState({
            alert: getAlert(),
          });

         }
        })
    }
  }
  hideAlert() {
    this.setState({
      alert: null,
      login:false
    });
   
  }


registerUser(newUserDetails){
    let apiUrl = '/users/register'
    return baseURL.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <div className="base-container">
            <div class="MainContainer center">
              <button onClick={(e)=>this.handleLogin(e)} class="button">
                Login
              </button>
              <button class="button">
                Signup
              </button>
              <div className="formheader">Signup</div>
              <div className="form">
                <div>
                <p class="error">{this.state.userAlreadyExsist}</p>
                  <label htmlFor="email">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="User Name"
                    onChange={(e)=>this.handleChange(e)}
                  />
                  <div class="error">{this.state.userNameErr}</div>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="xyz@domain.com"
                    onChange={(e)=>this.handleChange(e)}
                  />
                  <div class="error">{this.state.emailErr}</div>
                </div>
                <div>
                  <label htmlFor="Mobile">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="MobileNo"
                    onChange={(e)=>this.handleChange(e)}
                  />
                  <div class="error">{this.state.mobileerr}</div>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e)=>this.handleChange(e)}
                  />
                  <div class="error">{this.state.passErr}</div>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    onChange={(e)=>this.handleChange(e)}
                  />
                  <div class="error">{this.state.confirmpassErr}</div>
                </div>
              </div>
              <div>
                <input type="submit" class="submitbtn"></input>
              </div>
              <br></br>
             <div> Already have an account?<a href="/login"> Login here</a></div>
            </div>
          </div>
        </form>
        {this.state.alert}
        {this.state.redirectLogin ? <Redirect to="/login"></Redirect> : null}
        {this.state.login ? null : <Redirect to="/login"></Redirect>}
      </div>
    );
  }
}

export default withRouter(SignUp);
