import React from "react";
import './UserCol.css';
import ColItem from '../ColItem'
import Button from '@material-ui/core/Button';
import firebase from "../../firebase";

class UserCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      id:props.id,
      type: props.type,
      path:props.path,
      rows: [],
      onSelected : props.onSelected,
      selected: {
        type: null,
        id: null,
      }
    };
    this.setClicked = this.setClicked.bind(this);
  }


  componentDidMount() {
    var currentThis = this;
    console.log("Getting data from "+this.state.path)
    firebase.database().ref(this.state.path).once('value').then(function(snapshot) {
      if(snapshot.val()!=null){
      currentThis.setState({...currentThis.state, rows:Object.keys(snapshot.val())})
      }
    });

}

createClicked(){
  alert("here")

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
        id: id,
      }
    });
    this.state.onSelected(type, id)
    //Tell User.js to reveal the column.
    this.props.show(this.state.type);
  }

  render() {
    let currentThis = this;
    var colItems = Object.keys(this.state.rows).map(function (id) {
      return <ColItem text={currentThis.state.rows[id]} id={currentThis.state.rows[id]} type={currentThis.state.id} handleClick={currentThis.setClicked} />
    })
    return (
      <div className="user-col">
        <div className="user-col-scroll">
        {colItems}
        </div>
        <div className="col-footer">
          <Button type="button" onClick={this.createClicked}>{"Create new " + this.state.title}</Button>
        </div>
      </div>
    );
  }
}

export default UserCol;
