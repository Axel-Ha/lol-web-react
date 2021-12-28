import React from "react";
import * as Styles from "./styles";
import { Link } from "react-router-dom";

export class Home extends React.Component {
  parentHomeStyle = {
    display: "flex",
    justifyContent: "center",
  };

  homeStyle = {
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "50%",
    ...Styles.row,
  };

  constructor() {
    super();
    this.state = { champions: [] };
  }

  componentDidMount() {
    fetch("/api/champions/list")
      .then((res) => res.json())
      .then((champions) => this.setState({ champions: champions }));
  }

  render() {
    let champions = this.state.champions;
    let ids = champions.map((champion) => {
      return (
        <div>
          <Link to={"champion/" + champion.id}>
            <img src={champion.championImg} />
          </Link>
          <p>{champion.name}</p>
        </div>
      );
    });

    return (
      <div>
        <h1 style={Styles.container}>Personnages</h1>
        <div style={this.parentHomeStyle}>
          <div style={this.homeStyle}>{ids}</div>
        </div>
      </div>
    );
  }
}
