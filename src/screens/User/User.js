import React from 'react'
import '../../firebase';
import Grid from '@material-ui/core/Grid';
import UserCol from '../../components/UserCol';
import './user.css';

export default class User extends React.Component {
    state = {
        showingCols: false,
        showingCards: false,
    }



    render() {
        const { showingCols, showingCards } = this.state;
        return (
            <>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol />
                    </Grid>
                    {showingCols &&
                        <Grid item className="Column">
                            <h1>Sections</h1>
                            <UserCol />
                        </Grid>
                    }
                    {showingCards &&
                        <Grid item className="Column">
                            <h1>Cards</h1>
                            <UserCol />
                        </Grid>
                    }
                </Grid>
            </>
        )
    }
}