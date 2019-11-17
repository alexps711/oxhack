import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import firebase from "../firebase";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import './newField.css'

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
      .ref(currentThis.props.path + "/" + currentThis.props.count)
      .set({
        description: currentThis.state.description,
        title: currentThis.state.title,
        img: currentThis.state.img,
      });
  }

  render() {
    const { title } = this.state;
    const { description } = this.state;
    const { img } = this.state;

    return (
      <div className="newFiledWindow">
        <div className="formContainer">

          <ValidatorForm
            ref="newClient"
            className="newFieldForm"
            onSubmit={this.saveCard}
            onError={errors => console.log(errors)}
          >
            <Typography variant="h6">
              Add new client
            </Typography>
            <div>
            <TextField
                id="clientName"
                label="Client name"
                name="title"
                value={title}
                margin="normal"
                onChange={this.handleChange}
                multiline={false}
                inputProps={{
                  maxLength: 20,
                }}
                variant="outlined"
                errorText="Name too long! Please enter a name under 20 symbols"
                style={{ width: 350,
                         marginRight: 20
                }}

                onChange={this.handleChange}
              />
              <TextField
                id="clienLogo"
                label="Logo link"
                name="clientLogo"
                value={img}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                style={{ width: 350}}
              />
            </div>

            <div>
              <TextField
                id="clientSummary"
                label="Summary"
                name="description"
                value={description}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                multiline
                style={{ width: 720}}
              />
            </div>

            <div>
              <Button type="submit" className="newFieldButt" >
                Save
            </Button>
            </div>

          </ValidatorForm>

          
        </div>
      </div>
    );
  }
}

export default NewClientComponent;
