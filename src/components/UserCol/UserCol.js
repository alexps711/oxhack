import React from "react";
import "./UserCol.css";
import ColItem from "../ColItem";
import Button from "@material-ui/core/Button";
import firebase from "../../firebase";

class UserCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      id: props.id,
      type: props.type,
      path: props.path,
      showNewComponent: props.showNewComponent,
      rows: {},
      onSelected: props.onSelected,
      selected: {
        type: null,
        id: null
      }
    };
    this.setClicked = this.setClicked.bind(this);
    this.createNew = this.createNew.bind(this)
    this.updateView = this.updateView.bind(this)
  }

  componentDidMount() {
    this.updateView()
  }
    
  componentDidUpdate(prev){
    if(prev.path!=this.props.path){
      this.updateView()
    }

  }

  updateView(){
    var currentThis = this;
    console.log("Getting data from " + this.props.path);
    firebase
      .database()
      .ref(this.props.path)
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot.val())
        if (snapshot.val() != null) {
          currentThis.setState({
            ...currentThis.state,
            rows: snapshot.val()
          }, function(){
            currentThis.render()
          });
        }
        else{
          currentThis.setState({
            ...currentThis.state,
            rows: {}
          }, function(){
            currentThis.render()
          });

        }
      });
  }
  

  createNew() {
    this.state.showNewComponent(this.state.id, Object.keys(this.state.rows).length+1);
  }


  /**
   * Keeps track of the card clicked
   * @param {String} type
   * @param {String} id
   */
  setClicked(type, id) {
    this.setState({
      selected: {
        type: type,
        id: id
      }
    });
    this.state.onSelected(type, id);
    //Tell User.js to reveal the column.
    this.props.show(this.state.type, this.state.selected.id);
  }

  render() {
    let currentThis = this;
    var colItems = Object.keys(this.state.rows).map(function(id) {
      return (
        <ColItem
          text={currentThis.state.rows[id]["title"]}
          id={id}
          type={currentThis.state.id}
          handleClick={currentThis.setClicked}
        />
      );
    });
    console.log(colItems)
    return (
      <div className="user-col">
        <div className="user-col-scroll">
        {colItems}
        </div>
        <div className="col-footer">
          <Button type="button" onClick={this.createNew}>{"Create new " + this.state.title}</Button>
        </div>
      </div>
    );
  }
}

export default UserCol;
