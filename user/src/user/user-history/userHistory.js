import React from "react";
import Table from '../../common/table/NewTable';
import "../../common/table/NewTable.css";
import "./userHistory.css";
import Header from "../../common/header/Header";
import Menu from "../../common/menu/Menu";
import axios from 'axios'



let columns = [
  {
    heading:"UserId",
    property:"userId"

  },
  {
    heading:"BookingHistoryId",
    property:"bookingHistoryId"

  },
  {
    heading: "Mobile",
    property: "mobile",
  },
  {
    heading: "BusNo",
    property: "busno",
  },
  {
    heading: "BusName",
    property: "busname",
  },
  {
    heading: "TotalFare",
    property: "totalfare",
  },
  {
    heading: "Numberofseats",
    property: "numberofseats",
  },
  {
    heading: "DateofJourney",
    property: "date",
  },
  {
    heading: "Source",
    property: "from",
  },
  {
    heading: "Destination",
    property: "to",
  },
  {
    heading:"BookedDate",
    property:"bookedDate"
  }
];


class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    
      this.state = {
        go: false,
        history:[]
      };
    
    
  }
  gotoSearch() {
    this.setState({
      go: true,
    });
  }
  

  componentDidMount(){
    
    axios.get("http://localhost:5000/users/getuserhistory",{
      headers:{
        "access-token":sessionStorage.getItem("authToken")
      }
    }).then(response=>{
     
      this.setState({
        history:response.data
      })
    })
  }

  


  render() {
    
    let go = this.state.go;
    let datalist = [...this.state.history].reverse()
    return (
      <>
        <Header />
        <Table columns={columns} data={datalist} />
        <button class="historyback" onClick={(e)=>this.props.history.goBack()}>
          Back
        </button>
        
        <input type="button" class="searchbtn" value="search" onClick={() => this.gotoSearch()}/>
        
        <Menu />

        {go ? this.props.history.push("/search") : null}
        {go ? sessionStorage.removeItem("busdetails") : null}
        {go ? sessionStorage.removeItem("searchdetails") : null}
        {go ? sessionStorage.removeItem("passengerDetails") : null}
        {go ? sessionStorage.removeItem("seats") : null}
        {go ? sessionStorage.removeItem("seatcount") : null}
      </>
    );
  }
}

export default HistoryTable;
