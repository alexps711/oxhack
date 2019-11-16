import React from "react";
import './UserCol.css';
import ColItem from './ColItem'
import Button from '@material-ui/core/Button';

class UserCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      rows: {
        0: "Client 0",
        1: "Client 1",
        2: "Client 2",
        3: "Client 3",
        4: "Client 4",
        5: "Client 5",
        6: "Client 6",
        7: "Client 7",
      },
      selected: null
    };
  }

  render() {
    let currentThis = this;
    var colItems = Object.keys(this.state.rows).map((id) => {
      return <ColItem text={currentThis.state.rows[id]} />
    })
    return (
      <div className="user-col">
        <h2>{this.state.title}</h2>
        {colItems}
        <div className="col-footer">
          <Button type="button">{"Create new " + this.state.title}</Button>
        </div>
      </div>
    );
  }
}

export default UserCol;
