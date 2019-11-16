import React from "react";
import Button from '@material-ui/core/Button';


class ColItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: props.text,
        id: props.id,
        type: props.type,
        handleChange : props.handleChange
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.state.type, this.state.id);
  }
  
  render() {
    return (
        <div>
          <Button type="button" onClick={this.handleClick}>{this.state.text}</Button>
        </div>
    )

  }
}

export default ColItem;
