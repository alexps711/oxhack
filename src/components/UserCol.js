import React from "react";
import "./UserCol.css";
import ColItem from "./ColItem";
import Button from "@material-ui/core/Button";
import firebase from "../firebase";
class UserCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      id: props.id,
      hidden: props.hidden,
      path: props.path,
      rows: [],
      selected: {
        type: null,
        id: null
      }
    };

    this.handleChange = this.handleChange.bind(this);

    this.buttonClicked = this.buttonClicked.bind(this);
  }

  componentDidMount() {
      var currentThis = this;
    firebase.database().ref(this.state.path).once('value').then(function(snapshot) {
        currentThis.setState({...currentThis.state, rows:Object.keys(snapshot.val())})
      });

  }


  buttonClicked(event) {
    alert("Create new " + this.state.title);
  }

  handleChange(type, id) {
    var tempSelected = {
      type: type,
      id: id
    };
    this.setState({ ...this.state, selected: tempSelected });
  }

  render() {
    let currentThis = this;
    var colItems = Object.keys(this.state.rows).map(function(id) {
      return (
        <ColItem
          text={currentThis.state.rows[id]}
          id={currentThis.state.rows[id]}
          type={currentThis.state.id}
          handleChange={currentThis.handleChange}
        />
      );
    });
    console.log(colItems);
    return (
      <div className="user-col ">
        {/* <h2>{this.state.title}</h2> */}
        {colItems}
        <div className="col-footer">
          <Button type="button" onClick={this.buttonClicked}>
            {"Create new " + this.state.title}
          </Button>
        </div>
      </div>
    );
  }
}

export default UserCol;
