import React from "react";
import Button from '@material-ui/core/Button';


class ColItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: props.text
    }
  }
  render() {
    return (
        <div>
    <Button type="button" style={{width:"100%", fontSize:"20px", paddingBottom: "10px", paddingTop: "10px" }}>{this.state.text}</Button>
    </div>
    )

  }
}

export default ColItem;
