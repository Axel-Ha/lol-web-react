import React from "react";
import * as Styles from "./styles";


export function SummonerSpells() {
  const [summonerSpells, setSummonerSpell] = React.useState(null);

  const spellsImgStyle = {
    marginRight: "10px",
    height: "70px",
    width: "70px",
    marginBottom: "0.5%",
  };

  React.useEffect(() => {
    fetch("/api/summonerSpells")
      .then((res) => res.json())
      .then((summonerSpells) => setSummonerSpell(summonerSpells));
  }, []);
  if (summonerSpells == null) {
    return <div>Page en cours de chargement</div>;
  } else {
    return (
      <div style={Styles.fullPage}>
        <div style={Styles.column}>
          {summonerSpells.map((summonerSpell) => (
            <div style={Styles.row}>
              <img
                src={summonerSpell.summonerSpellsImg}
                style={spellsImgStyle}
              />
              <div style={Styles.column}>
                <strong>{summonerSpell.name}</strong>
                {summonerSpell.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
