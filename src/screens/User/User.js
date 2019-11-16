import React from 'react'
import '../../firebase';
import Grid from '@material-ui/core/Grid';
import UserCol from '../../components/UserCol';
import './user.css';

export default class User extends React.Component {
    state = {
        showingCols: true,
        showingCards: true,
    }



    render() {
        const { showingCols, showingCards } = this.state;
        return (
            <>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol title="Clients" id="clients"/>
                    </Grid>
                    {showingCols &&
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