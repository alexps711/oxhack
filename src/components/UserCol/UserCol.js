import React from "react";
import './UserCol.css';
import ColItem from '../ColItem'
import Button from '@material-ui/core/Button';

class UserCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      type: props.type,
      rows: {
        0: "Client 0",
        1: "Client 1",
        2: "Client 2",
        3: "Client 3",
        4: "Client 4",
        5: "Client 5",
        7: "Client 6",
      },
      selected: {
        type: null,
        id: null,
      }
    };
    this.setClicked = this.setClicked.bind(this);
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
    //Tell User.js to reveal the column.
    this.props.show(this.state.type);
  }

  render() {
    let currentThis = this;
    var colItems = Object.keys(this.state.rows).map(function (id) {
      return <ColItem text={currentThis.state.rows[id]} id={currentThis.state.rows[id]} type={currentThis.state.type} handleClick={currentThis.setClicked} />
    })
    return (
      <div className="user-col">
        {colItems}
        <div className="col-footer">
          <Button type="button" onClick={this.buttonClicked}>{"Create new " + this.state.title}</Button>
        </div>
      </div>
    );
  }
}

export default UserCol;
