import React from "react";
import Sports from "../Sports";
import Competitions from "../Competitions";
import Events from "../Events";
import { getFavorites, addFavorite } from "../../services/firebaseService";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: null,
      competition: null,
      favorites: [],
      error: null,
    };
    this.fetchFavorites(props.user.user);
  }

  fetchFavorites() {
    this.setState({ error: null });
    getFavorites(this.props.user)
      .then((data) => {
        this.setState({ favorites: data });
      })
      .catch((ignore) => {
        this.setState({ error: "Unable to fetch favorites" });
      });
  }

  setSport(sport) {
    this.setState({ sport });
  }

  setCompetition(competitionKey) {
    this.setState({ competition: competitionKey });
  }

  newFavorite(fav) {
    addFavorite(this.props.user.user, fav).then((f) => {
      this.setState({ favorites: [...this.state.favorites, f] });
    });
  }

  render() {
    return (
      <div className="main">
        <div className="main-container">
          <Sports setSport={(s) => this.setSport(s)} />
          <Competitions
            sportKey={this.state.sport}
            setCompetition={(c) => this.setCompetition(c)}
          />
          <Events
            competitionKey={this.state.competition}
            favorites={this.state.favorites}
            newFavorite={(f) => this.newFavorite(f)}
          />
        </div>
      </div>
    );
  }
}

export default Main;
