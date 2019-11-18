import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class ColItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        text: props.text,
        id: props.id,
        type: props.type,
        handleChange : props.handleChange,
        editfunc:props.editfunc
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.state.type, this.state.id);
  }

  handleRemove() {
    this.props.handleClick(this.state.type, this.state.id);
  }

  handleEdit() {
    this.props.editfunc(this.props.id)
  }
  
  render() {
    return (
      <div className="itemButt">
        <div className="buttContainer">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button type="button" onClick={this.handleClick}>{this.props.text}</Button>
          </Grid>
          <Grid item xs={4}>
            <ButtonGroup size="small" aria-label="outlined primary button group">
              <Button onClick={this.handleEdit}><EditIcon /></Button>
              <Button onClick={this.handleRemove}><DeleteIcon /> </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
          
        </div>
      </div>
    )

  }
}

export default ColItem;
