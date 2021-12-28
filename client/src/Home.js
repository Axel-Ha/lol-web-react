import React from "react";
import * as Styles from "./styles";
import { Link } from "react-router-dom";

export function Home() {
  const [champions, getChampions] = React.useState(null);

  const parentHomeStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const homeStyle = {
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "50%",
    ...Styles.row,
  };

  React.useEffect(() => {
    fetch("/api/champions/list")
      .then((res) => res.json())
      .then((champions) => getChampions(champions));
  }, []);


  if (champions == null) {
    return <div>Page en cours de chargement</div>;
  } else {
    return (
      <div>
        <h1 style={Styles.container}>Personnages</h1>
        <div style={parentHomeStyle}>
          <div style={homeStyle}>
            {champions.map((champion) => (
              <div>
                <Link to={"champion/" + champion.id}>
                  <img src={champion.championImg} />
                </Link>
                <p>{champion.name} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
