import React from "react";
import bushistory from "../../resources/bushistory.json";
import Menu from "../../common/menu/Menu";
import "./Ticket.css";
import { withRouter } from "react-router-dom";
import Header from "../../common/header/Header";
import userdata from '../../resources/userhistory.json'
import { userAuthenticated } from "../../service/api";
import axios from 'axios'




class Ticket extends React.Component {
  constructor() {
    super();
    this.state = { isbool: true,
                     userData:[]
                  };
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  submit() {
    let bushistoryPushDetails
    let busDetails = JSON.parse(sessionStorage.getItem("busdetails"));
    let passengerName = JSON.parse(sessionStorage.getItem("PassengerName"));
    let reservedSeats= JSON.parse(sessionStorage.seats) 
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    busDetails.NoOfSeats =busDetails.NoOfSeats - sessionStorage.getItem("seatcount");
    bushistoryPushDetails= {
      // bookingHistoryId:this.state.userData.busDetails.length+1,
      mobile: this.state.userData.mobile,
      userId: this.state.userData.userId,
      busno: busDetails.busno,
      busname: busDetails.busname,
      totalfare: sessionStorage.getItem("seatcount") * busDetails.fare,
      numberofseats: sessionStorage.getItem("seatcount"),
      date: busDetails.date,
      from: busDetails.from,
      to: busDetails.to,
      bookedDate:today,
      reservedSeats:reservedSeats
     };

 
    bushistory.userbusbooking.push(bushistoryPushDetails)
    let userpushDetails;
    userpushDetails = {
   
      name:passengerName ,
      mobile: this.state.userData.mobile
    };
    userdata.buspassanger.push(userpushDetails)
    this.setState({
      isbool: false,
    });
   
    

    let busdetails ={
    busno:busDetails.busno,
    date:busDetails.date,
    seatsCount:parseInt(sessionStorage.getItem("seatcount")),
    reservedSeats: reservedSeats}

 axios.post('http://localhost:5000/users/bookedseats',
    {
     busdetails
    },
     {
      headers:{
        "Content-type":"application/json",
        "access-token":sessionStorage.getItem("authToken")
      }
    })




  axios.post('http://localhost:5000/users/updatehistory',
    {
      busdata:bushistoryPushDetails
    },
    {
      headers:{
        "Content-Type": "application/json",
        "access-token":sessionStorage.getItem("authToken")
      }
    })
    this.props.history.push('/user-history')
    
    window.location.reload(true)
  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount(){
    userAuthenticated().then((response)=>{
      this.setState({
        userData:response.data
      })  
   })
   }

  render() {
    let busDetails = JSON.parse(sessionStorage.getItem("busdetails"));
    let passengerName = JSON.parse(sessionStorage.getItem("PassengerName"));
    return (
      <div>
        <Header />
        <Menu />
        <div class="ticket">
          <button class="goBack" onClick={this.goBack}>
            BACK
          </button>
          <h1>Booking Details</h1>
         <br></br>
          <label class="info">
            Name:
            <span class="info1">
              {
                (passengerName.map((elem, i) => {
                  return i + 1 + "." + elem + " ";
                }))
              }
            </span>
          </label>
          <br></br>
          <label class="info">
            Mobile:<span class="info1">{this.state.userData.mobile}</span>
          </label>
          <br></br>
          <label class="info">
            Seatno:<span class="info1">{sessionStorage.getItem("seats")}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            Date:<span class="info1">{busDetails.date}</span>{" "}
          </label>
          <br></br>
          <label class="info">
            Fare:
            <span class="info1">
              {sessionStorage.getItem("seatcount") * busDetails.fare}
            </span>{" "}
          </label>
          <br></br>
          <label class="info">
            From:<span class="info1">{busDetails.from}</span>
          </label>
          <br></br>
          <label class="info">
            To:<span class="info1">{busDetails.to}</span>
          </label>
          <br></br>
          <label class="info">
            Bus No:<span class="info1"> {busDetails.busno}</span>
          </label>
          <br></br>
          <label class="info">
            Bus name:<span class="info1"> {busDetails.busname}</span>
          </label>
          <br></br>
          <button onClick={this.submit}> proceed to pay</button>
        </div>
        {/* {this.state.isbool===false&& window.location.reload(true)} */}
        {/* {this.state.isbool===false?<Redirect to='/user-history'/>:null} */}
    
      </div>
    );
  }
}

export default withRouter(Ticket);
