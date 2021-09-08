import React, { Component } from "react";
import Table from "../../common/table/NewTable";
import "./BuslistTable.css";
import Menu from "../../common/menu/Menu";
import { withRouter } from "react-router";


let columns = [
  {
    heading: "Bus Name",
    property: "busname",
  },
  {
    heading: "Bus No",
    property: "busno",
  },
  {
    heading: "Fare",
    property: "fare",
  },
  {
    heading: "From",
    property: "from",
  },
  {
    heading: "Total Seats",
    property: "totalSeats",
  },
  {
    heading: "Available Seats",
    property: "NoOfSeats",
  },
  {
    heading: "To",
    property: "to",
  },
  {
    heading: "Type",
    property: "type",
  },
  {
    heading: "Book Ticket",
    property: "button",
  },
];

class TableData extends Component {
  constructor(props) {
    super(props);
    
      this.bookTicket = this.bookTicket.bind(this);
    
  }
  bookTicket(isTrue) {
    if (isTrue) {
      const { history } = this.props;
      if (history) history.push("/book-seat");
    }
  }

  render() {
    let bookTicket = this.bookTicket;
    let busData = this.props.busData;
    let storedBusdata;
    let getBusdata;
    if (sessionStorage.getItem("busDetails")) {
      storedBusdata = JSON.parse(sessionStorage.getItem("busDetails"));
      if (sessionStorage.getItem("busdetails")) {
        getBusdata = [
          {
            from: storedBusdata.from,
            to: storedBusdata.to,
            busno: storedBusdata.busno,
            busname: storedBusdata.busname,
            fare: storedBusdata.fare,
            type: storedBusdata.type,
            NoOfSeats: storedBusdata.NoOfSeats,
            totalSeats:storedBusdata.totalSeats,
            button: storedBusdata.button,
          },
        ];
      } else {
        getBusdata = [
          {
            from: busData.from,
            to: busData.to,
            busno: busData.busno,
            busname: busData.busname,
            fare: busData.fare,
            type: busData.type,
            NoOfSeats: busData.NoOfSeats,
            totalSeats:busData.totalSeats,
            button: busData.button,
          },
        ];
      }

      return (
        <>
          <Menu />
          <Table
            columns={columns}
            data={getBusdata}
            bookticket={bookTicket.bind(this)}
          />
        </>
      );
    }
  }
}
export default withRouter(TableData);
