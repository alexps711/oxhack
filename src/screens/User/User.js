import React from "react";
import Grid from "@material-ui/core/Grid";
import UserCol from "../../components/UserCol";
import "./user.css";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingCols: false,
      showingCards: false,
      userid: "rB8vDLhVfiNFKc7HaWtMvj0nOtF2",
      sectionid: null,
      clientid:null,
    }
  }

  render() {
    const { showingCols, showingCards } = this.state;
    return (
        <div>
        <div className="nav">

        </div>
        <Grid container className="Main">
          <Grid item className="Column">
            <h1>Clients</h1>
            <UserCol title="Clients" id="clients" path={"/users/"+this.state.userid+"/clients"}/>
          </Grid>
          {showingCols && (
            <Grid item className="Column">
              <h1>Sections</h1>
              <UserCol title="Sections" id="sections" path={"/users/"+this.state.userid+"/clients/"+this.state.client+"/sections"}/>
            </Grid>
          )}
          {showingCards && (
            <Grid item className="Column">
              <h1>Cards</h1>
              <UserCol title="Cards" id="cards" path={"/users/"+this.state.userid+"/clients/"+this.state.client+"/sections/"+this.state.sectionid+"/cards"}/>
            </Grid>
          )}
        </Grid>
        </div>
    );
  }
}
