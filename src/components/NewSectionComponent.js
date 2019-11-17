import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import firebase from "../firebase";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import './newField.css'

class NewSectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title:null,
        description: null,
        newId:null,
        path: props.path
    }
    this.handleChange = this.handleChange.bind(this)
    this.saveCard = this.saveCard.bind(this)
  }

  handleChange(event){
      this.setState({...this.state, [event.target.name]:event.target.value})

  }
  saveCard(){
      var currentThis = this
    firebase.database().ref(currentThis.props.path+"/"+currentThis.props.count).set({
        description: currentThis.state.description,
        title : currentThis.state.title,
      });

  }

  render() {
    const { title } = this.state;

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
              Add new section
            </Typography>
            <div>
              <TextField
                id="title"
                label="Section title"
                name="title"
                value={title}
                margin="normal"
                onChange={this.handleChange}
                multiline={false}
                inputProps={{
                  maxLength: 30,
                }}
                variant="outlined"
                errorText="Titel too long! Please enter a name under 30 symbols"
                style={{ width: 720}}

                onChange={this.handleChange}
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

export default NewSectionComponent;
