import React from 'react'
import firebase from '../../firebase';
import Grid from '@material-ui/core/Grid';
import UserCol from '../../components/UserCol';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './user.css';


export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingSections: false,
            showingCards: false,
            userid:"rB8vDLhVfiNFKc7HaWtMvj0nOtF2",
            clientid:null,
            sectionid:null,
            anchorEl: null,
            setAnchorEl: null,
        }
        this.show = this.show.bind(this);
        this.onSelected = this.onSelected.bind(this)
    }

    

    onSelected(type, id){
        this.setState({...this.state, [type]:id})
    }

    signOut(){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }
    /**
     * Reveal the column.
     */
    show(type) {
        if(type === "sections" ){
            this.setState({ showingSections: true })
        }
        else if(type === "cards"){this.setState({ showingCards: true }) };
    }

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
      };

    render() {
        const { showingSections, showingCards } = this.state;
        const open = this.state.anchorEl;
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <div>
                            <IconButton 
                                edge="start"  
                                color="inherit" 
                                aria-label="menu" 
                                aria-controls="menu-dropdown"
                                onClick={this.handleMenu}
                            >
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
                            User
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol title="Clients" id="clients"/>
                    </Grid>
                    {showingSections &&
                        <Grid item className="Column">
                            <h1>Sections</h1>
                            <UserCol title="Sections" id="section"/>
                        </Grid>
                    }
                    {showingCards &&
                        <Grid item className="Column">
                            <h1>Cards</h1>
                            <UserCol title="Cards" id="cards"/>
                        </Grid>
                    }
                </Grid>
            </>
        )
    }
}