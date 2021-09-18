import React from "react";
import "./TicketForm.css";
import "../buspage/BuslistTable.css";
import Header from "../../common/header/Header";
import Menu from "../../common/menu/Menu";
import { withRouter } from "react-router";
import Swal from "sweetalert2";


 class TicketForm extends React.Component {


  constructor(props) {
    super(props);
    
      this.state = {
        name:  [],
        selectedOption: [],
        age:   [],
        isbool: false,
        value: [],
        error: "",
      };
    
    this.confirmPassengerDetails = this.confirmPassengerDetails.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  handleChange(index, event) {
    let names = this.state.name.slice();
    names[index] = event.target.value;
    this.setState({ name: names });
    sessionStorage.setItem("passengerName", this.state.name);
  }

  handleAge(index, event) {
    let ages = this.state.age.slice();
    ages[index] = event.target.value;
    this.setState({ age: ages });
  }
  onValueChange(index, event) {
    let genders = this.state.selectedOption.slice();
    genders[index] = event.target.value;
    this.setState({
      selectedOption: genders,
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  confirmPassengerDetails(event, index) {
    event.preventDefault();
    if (this.state.name === "") {
      Swal.fire({
        icon: "error",
        title: "!",
        text: "please enter your name",
      });
    } else {
      let passengerDetails = {
        name: this.state.name,
        age: this.state.age,
        gender: this.state.selectedOption,
      };

      sessionStorage.setItem(
        "passengerDetails",
        JSON.stringify(passengerDetails)
      );

      this.setState({
        isbool: true,
      });
      this.props.history.push('/ticket')
      window.location.reload(true)
     
    }
  
    let passengerName = this.state.name
    sessionStorage.setItem("PassengerName",JSON.stringify(passengerName))
  }
componentDidMount()
{
  if(sessionStorage.getItem("passengerDetails"))
  {
    let values = JSON.parse(sessionStorage.getItem("passengerDetails"));
    let name = values.name;
    let age = values.age;
    let gender = values.gender;
     this.setState({
       name:name,
       age:age,
       gender:gender
     })
  }
}
  render() {
    let busDetails = JSON.parse(sessionStorage.getItem("busdetails"));
    let amount =sessionStorage.getItem("seatcount") * busDetails.fare;
    let seats = JSON.parse(sessionStorage.getItem("seats"));
    
  

    return (
      <div>
       <Header/>
        <Menu />
        <div className="finalticket">
          <button className="goback" onClick={this.goBack}>
            GO BACK
          </button>
          <form className="passengerform" onSubmit={this.confirmPassengerDetails}>
            {seats.map((element, index) => {
              return (
                <span>
                  <div className="form-input" key={index}>
                    <div>
                      <span className="passengerNo">Passenger:{index + 1}</span>
                      <span className="seatno">SeatNo:{element}</span>
                    </div>
                    <br />
                    <label for="name" className="pInfo">
                      {" "}
                      Passenger Name:{" "}
                    </label>
                    <input
                      className="inputname"
                      type="text"
                      name="name"
                      value={this.state.name[index]}
                      onChange={this.handleChange.bind(this, index)}
                    />
                    <span>{this.state.error}</span>
                    <div className="radio">
                      <label className="pInfo">
                        {" "}
                        Gender:
                        <br></br>
                        <label className="pInfo">
                          <input
                            className="radio"
                            type="radio"
                            value="Male"
                            onChange={this.onValueChange.bind(this, index)}
                          />
                          Male
                        </label>
                        <label className="pInfo">
                          <input
                            className="radio"
                            type="radio"
                            value="Female"
                            onChange={this.onValueChange.bind(this, index)}
                          />
                          Female
                        </label>
                      </label>
                    </div>
                    <label for="age" className="pInfo">
                      Age
                      <input
                        type="text"
                        name="age"
                        value={this.state.age[index]}
                        onChange={this.handleAge.bind(this, index)}
                        className="inputname"
                      />
                    </label>
                  </div>
                </span>
              );
            })}
            <span className="amount">TotalFare:{amount}</span>
            <input type="submit" className="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(TicketForm);
