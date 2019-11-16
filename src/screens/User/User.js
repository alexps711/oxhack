import React from 'react'
import '../../firebase';
import Grid from '@material-ui/core/Grid';
import UserCol from '../../components/UserCol/UserCol';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';
import './user.css';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingSections: false,
            showingCards: false,
            clientId: "1",
        }
        this.show = this.show.bind(this);
    }

    /**
     * Reveal the column.
     */
    show(type, clickedId) {
        type === "sections" ?
            this.setState({ showingSections: true })
            : this.setState({ showingCards: true });
        // Keep track of the client clicked
        this.setState({ clientId: clickedId });
    }

    render() {
        const { showingSections, showingCards } = this.state;
        return (
            <>
                <AppBar position="static" className="NavMenu">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            User
                        </Typography>
                        <section className="rightNav">
                            <Button component={Link}
                                to={{
                                    pathname: this.state.clientId ? `/client/${this.state.clientId}` : "/error",
                                    state: {},
                                }}
                                color="inherit">
                                Preview
                            </Button>
                        </section>
                    </Toolbar>
                </AppBar>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol title="Clients" id="clients" type="sections" show={this.show} path={"/users/" + this.state.userid + "/clients"} idToPrev={this.handlePreview} />
                    </Grid>
                    {showingSections &&
                        <Grid item className="Column">
                            <h1>Sections</h1>
                            <UserCol title="Sections" id="sections" show={this.show} path={"/users/" + this.state.userid + "/clients/" + this.state.client + "/sections"} />
                        </Grid>
                    }
                    {showingCards &&
                        <Grid item className="Column">
                            <h1>Cards</h1>
                            <UserCol title="Cards" id="cards" path={"/users/" + this.state.userid + "/clients/" + this.state.client + "/sections/" + this.state.sectionid + "/cards"} />
                        </Grid>
                    }
                </Grid>
            </>
        )
    }
}

