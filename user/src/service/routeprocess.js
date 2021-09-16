import React, { Component } from "react";
import Ticket from '../bus/ticket/Ticket';
import Menu from "../common/menu/Menu";
import Profile from '../user/profile/userprofile';
import SeatList from "../bus/seats/SeatPage";
import TicketForm from "../bus/ticketform/TicketForm";
import PrivateRoute from "./private";
import HistoryTable from "../user/user-history/userHistory";
import Search from "../bus/search/Search";
import Login from "../user/user-login/Login";
import signUp from "../user/user-login/SignUp";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ChangePassword from "../user/profile/userPassword"

class RouteTable extends Component {

  render(){
    return (
        <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"></Redirect>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/register" component={signUp} />
            <PrivateRoute path="/menu" component={Menu} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/book-seat" component={SeatList} />
            <PrivateRoute path="/ticket-form" component={TicketForm} />
            <PrivateRoute path="/ticket" component={Ticket} />
            <Route exact path="/user-history" component={HistoryTable} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute exact path='/password' component={ChangePassword}/>
          </Switch>
        </BrowserRouter>
        </div>
        
   
    );
  }
}

export default RouteTable;
