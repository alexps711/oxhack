import React, {Component, useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import  { FirebaseContext } from '../src/components/Firebase';
import Fab from '@material-ui/core/Fab';
import { Link2 } from 'react-router-dom';
import $ from 'jquery'

const SignUpPage = () => (
  <div>
    <h1 align = "center">SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        KIAT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const INITIAL_STATE = {
  firstName:'',
  lastName:'',
  email: '',
  password: '',
  phoneNumber: '',
};

const styles = theme => ({
  body: {
    backgroundColor: theme.palette.backgroundColor,
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary,
    alignItems : 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fab : {
    alignItems: 'center',
  }
});

class SignUpForm extends Component{

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  onSubmit = event => {
    //use to push to database firstName, lastName, phoneNumber
    const { firstName, lastName, email, password, phoneNumber } = this.state;
  
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        alert("Incorrect email format.")
        this.setState({ error });
      });
    event.preventDefault();
    
    this.setState({...INITIAL_STATE});
}; 

  render() {

      const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    } = this.state;

    const isInvalid =
      firstName === '' ||
      phoneNumber === '' ||
      email === '' ||
      password === '' ||
      lastName === '' ;

    const classes = styles;


    return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Join the team and show your clients you know what you're doing.
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value = {firstName}
                onChange = {this.onChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                value = {lastName}
                onChange = {this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {email}
                onChange = {this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                value = {password}
                onChange = {this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value = {phoneNumber}
                autoComplete="phoneNumber"
                onChange = {this.onChange}
              />
            </Grid>
          </Grid>
          <Fab
            
            variant = "extended"
            disabled = {isInvalid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submit}
          >
            Sign Up
          </Fab>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
                
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    );
  }
}

export default SignUpPage;



