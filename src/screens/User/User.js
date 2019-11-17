import React from 'react'
import firebase from '../../firebase';
import Grid from '@material-ui/core/Grid'
import UserCol from '../../components/UserCol/UserCol';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './user.css';

import NewCardComponent from "../../components/NewCardComponent";
import NewSectionComponent from "../../components/NewSectionComponent";
import NewClientComponent from "../../components/NewClientComponent";
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';


export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingSections: false,
      showingCards: false,
      userid: props.uid,
      clientid: null,
      sectionid: null,
      clientid: null,
      sectionUpadateTime: 0,
      clientUpadateTime: 0,
      cardUpadateTime: 0,
      currentNewComponent : {
          type:null,
          count:null,
          path:null,
          id:null
      },
      anchorEl: null,
    };
    this.show = this.show.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.showNewComponent = this.showNewComponent.bind(this)
    this.reRender = this.reRender.bind(this)
  }

  onSelected(type, id) {
    this.setState({ ...this.state, [type]: id })
       
  }

    showNewComponent(type, count) {
        this.setState({ ...this.state, currentNewComponent: {type,count} })
    }

    signOut(){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }

    reRender(id){
        var seconds = new Date() / 1000;
        this.setState({[id]:seconds, currentNewComponent : {
            type:null,
            count:null,
            path:null,
            id:null
        }})
    }
    /**
     * Reveal the column.
     */
    show(type) {
        if (type === "sections") {
            this.setState({ showingSections: true });
        } else if (type === "cards") {
            this.setState({ showingCards: true });
        }
    }

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
      };

      editFunc(type, count, path, id){
          alert([type,path,id])
          //this.setState({ ...this.state, currentNewComponent: {type,count,path,id} })
      }

    render() {
        const reRender = this.reRender
        const { showingSections, showingCards, clientid, userid, sectionid, currentNewComponent } = this.state;
        const open = this.state.anchorEl;
        return (
            <>
                <AppBar position="static" className="navMenu">
                    <Toolbar>
                        <div>
                            <IconButton 
                                edge="start"  
                                color="inherit" 
                                aria-label="menu" 
                                aria-controls="menu-dropdown"
                                onClick={this.handleMenu}                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-dropdown"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.signOut}>Log Out</MenuItem>
                            </Menu>
                        </div>
                        <Typography variant="h6">
                            Current user: {firebase.auth().currentUser.email}
                        </Typography>
                        <section className="rightNav">
                            <Button component={Link} color="inherit" to={(clientid !== null) ? `/client/${userid}/${clientid}` : '/error'}>Preview</Button>
                        </section>
                    </Toolbar>
                </AppBar>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol
                            title="Clients"
                            id="clientid"
                            onSelected={this.onSelected}
                            type="sections"
                            updateTime={this.state.clientUpadateTime}
                            show={this.show}
                            showNewComponent={this.showNewComponent}
                            path={"/users/" + userid + "/clients"}
                            editFunc={this.editFunc}
                        />
                    </Grid>
                    {showingSections && (
                        <Grid item className="Column">
                            <h1>Sections</h1>
                            <UserCol
                                title="Sections"
                                id="sectionid"
                                onSelected={this.onSelected}
                                type="cards"
                                updateTime={this.state.sectionUpadateTime}
                                showNewComponent={this.showNewComponent}
                                show={this.show}
                                path={
                                    "/users/" +
                                    userid +
                                    "/clients/" +
                                    clientid +
                                    "/sections"
                                }
                                editFunc={this.editFunc}
                            />
                        </Grid>
                    )}
                    {showingCards && (
                        <Grid item className="Column">
                            <h1>Cards</h1>
                            <UserCol
                                title="Cards"
                                id="cardsid"
                                onSelected={this.onSelected}
                                updateTime={this.state.cardUpadateTime}
                                showNewComponent={this.showNewComponent}
                                path={
                                    "/users/" +
                                    userid +
                                    "/clients/" +
                                    clientid +
                                    "/sections/" +
                                    sectionid +
                                    "/cards"
                                }
                                editFunc={this.editFunc}
                            />
                        </Grid>
                    )}
                </Grid>
                {currentNewComponent["type"] === "cardsid" && (
                    <NewCardComponent
                        path={
                            "/users/" +
                            userid +
                            "/clients/" +
                            clientid +
                            "/sections/" +
                            sectionid +
                            "/cards"
                        }
                        reRenderId="cardUpadateTime"
                        reRender={reRender}
                        count = {currentNewComponent["count"] }
                        id = {currentNewComponent["id"] }
                        pathPassed = {currentNewComponent["path"] }

                    />
                )
                }

                {currentNewComponent["type"]  === "sectionid" && (
                    <NewSectionComponent
                        path={
                            "/users/" +
                            userid +
                            "/clients/" +
                            clientid +
                            "/sections"
                        }
                        reRender={reRender}
                        reRenderId="sectionUpadateTime"
                        count = {currentNewComponent["count"] }
                        id = {currentNewComponent["id"] }
                        pathPassed = {currentNewComponent["path"] }

                    />
                )
                }

                {currentNewComponent["type"]  === "clientid" && (
                    <NewClientComponent
                        path={
                            "/users/" +
                            userid +
                            "/clients/"
                        }
                        reRender={reRender}
                        reRenderId="clientUpadateTime"
                        count = {currentNewComponent["count"] }
                        id = {currentNewComponent["id"] }
                        pathPassed = {currentNewComponent["path"] }
                    />
                )}
            </>
        );
    }
}
