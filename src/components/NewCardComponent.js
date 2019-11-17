import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "./../firebase";
import "./newField.css";

class NewCardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      link: null,
      image: null,
      newId: null,
      path: props.path,
      reRender: props.reRender,
      reRenderId: props.reRenderId,
      id: props.id,
      pathPassed: props.pathPassed
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveCard = this.saveCard.bind(this);
  }

  componentDidUpdate(prevProps) {
    var currentThis = this
    if (prevProps.pathPassed != this.props.pathPassed) {
      if (this.props.pathPassed != null) {
        firebase
          .database()
          .ref(this.props.pathPassed + "/" + this.props.id)
          .once("value")
          .then(function(snapshot) {
            console.log(snapshot.val());
            currentThis.setState({
              link: snapshot.val()["link"],
              title: snapshot.val()["title"],
              description: snapshot.val()["description"],
              img: snapshot.val()["img"]
            });
          });
      }
    }
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
        img: currentThis.state.image,
        link: currentThis.state.link,
        title: currentThis.state.title
      })
      .then(() => {
        currentThis.state.reRender(this.state.reRenderId);
      });
  }

  render() {
    const { title } = this.state;
    const { description } = this.state;
    const { img } = this.state;
    const { link } = this.state;

    return (
      <div className="newFiledWindow">
        <div className="formContainer">
          <ValidatorForm
            ref="newClient"
            className="newFieldForm"
            onSubmit={this.saveCard}
            onError={errors => console.log(errors)}
          >
            <Typography variant="h6">Add new card</Typography>
            <div>
              <TextField
                id="title"
                label="Card title"
                name="title"
                value={title}
                margin="normal"
                onChange={this.handleChange}
                multiline={false}
                value={title}
                inputProps={{
                  maxLength: 30
                }}
                variant="outlined"
                errorText="Titel too long! Please enter a name under 30 symbols"
                style={{ width: 350, marginRight: 20 }}
                onChange={this.handleChange}
              />
              <TextField
                id="cardImg"
                label="Image link"
                name="image"
                value={img}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                style={{ width: 350 }}
              />
            </div>

            <div>
              <TextField
                id="cardLink"
                label="Link to the article"
                name="link"
                value={link}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                style={{ width: 720 }}
              />
            </div>

            <div>
              <TextField
                id="cardSumm"
                label="Abstract of the article"
                name="summary"
                value={description}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                multiline
                style={{ width: 720 }}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="newFieldButt"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

export default NewCardComponent;
