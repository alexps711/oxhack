import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import firebase from "../firebase";

class NewClientComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      img: null,
      path: props.path,
      newId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveCard = this.saveCard.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }
  saveCard() {
    var currentThis = this;
    firebase
      .database()
      .ref(currentThis.props.path + "/" + currentThis.state.newId)
      .set({
        description: currentThis.state.description,
        title: currentThis.state.title,
        img: currentThis.state.img,
        id: currentThis.state.newId
      });
  }

  render() {
    return (
      <div className="new-element-container">
        <div className="new-element-inside-container">
          <h1>New Client</h1>
          <Grid container className="main-TextField-grid">
            <Grid item className="Column">
              <TextField
                id="outlined-basic"
                label="Id"
                name="newId"
                margin="normal"
                onChange={this.handleChange}
                multiline
                variant="outlined"
              />
            </Grid>

            <Grid item className="Column">
              <TextField
                id="outlined-basic"
                label="Title"
                name="title"
                margin="normal"
                onChange={this.handleChange}
                multiline
                variant="outlined"
              />
            </Grid>
            <Grid item className="Column">
              <TextField
                id="outlined-basic"
                label="Description"
                name="description"
                margin="normal"
                onChange={this.handleChange}
                multiline
                variant="outlined"
              />
            </Grid>
            <Grid item className="Column">
              <TextField
                id="outlined-basic"
                label="Image"
                name="img"
                margin="normal"
                onChange={this.handleChange}
                multiline
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            style={{ width: "100%", height: "60px" }}
            onClick={this.saveCard}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default NewClientComponent;
