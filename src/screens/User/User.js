import React from 'react'
import '../../firebase';
import Grid from '@material-ui/core/Grid';
import UserCol from '../../components/UserCol/UserCol';
import './user.css';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingSections: false,
            showingCards: false,
        }
        this.show = this.show.bind(this);
    }

    /**
     * Reveal the column.
     */
    show(type) {
        type === "sections" ?
            this.setState({ showingSections: true })
            : this.setState({ showingCards: true });
    }

    render() {
        const { showingSections, showingCards } = this.state;
        return (
            <>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol type="sections" show={this.show} />
                    </Grid>
                    {showingSections &&
                        <Grid item className="Column">
                            <h1>Sections</h1>
                            <UserCol type="cards" show={this.show} />
                        </Grid>
                    }
                    {showingCards &&
                        <Grid item className="Column">
                            <h1>Cards</h1>
                            <UserCol title="Clients" id="clients" />
                        </Grid>
                    }
                </Grid>
            </>
        )
    }
}