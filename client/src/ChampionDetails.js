import React from "react";
import * as Styles from "./styles";
import { useParams } from "react-router-dom";

export function ChampionDetails(props) {
    const [champion, setChampion] = React.useState(null);
    let params = useParams();
  
    const spellsImgStyle = {
      marginRight: "10px",
      height: "100px",
      width: "100px",
      marginBottom: "0.5%",
    };
    const spellsStyle = {
      width: "40%",
      ...Styles.column,
    };
  
    const loreStyle = {
      width: "40%",
    };
  
    React.useEffect(() => {
      fetch("/api/champions/" + params.id)
        .then((res) => res.json())
        .then((champion) => setChampion(champion));
      // On met [] pour que useEffect ne soit appele qu'une seule fois.
    }, []);
    if (champion == null) {
      return <div>Page en cours de chargement</div>;
    } else {
      return (
        <div style={Styles.fullPage}>
          <img src={champion.championImg} />
          <h1>{champion.name}</h1>
          <h2>{champion.title}</h2>
          <p style={loreStyle}>{champion.lore} </p>
  
          <div style={Styles.column}>
            <div style={Styles.row}>
              <img style={spellsImgStyle} src={champion.championPassiveImg} />
              <div style={spellsStyle}>
                <strong>{champion.passive.name}</strong>
                {champion.passive.description}
              </div>
            </div>
          </div>
  
          <div style={Styles.column}>
            {champion.spells.map((spell) => (
              <div style={Styles.row}>
                <img style={spellsImgStyle} src={spell.spellImg} />
                <span style={spellsStyle}>
                  <strong>{spell.name}</strong>
                  {spell.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
  