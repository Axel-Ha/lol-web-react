import React from "react";

import "./App.module.css";
import * as Styles from "./styles";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { SummonerSpells } from "./SummonerSpells";
import { ChampionDetails } from "./ChampionDetails";

function App() {
  return (
    <div>
      <ul style={Styles.ul}>
        <li style={Styles.li}>
          <Link to="/" style={Styles.a}>
            {" "}
            Accueil{" "}
          </Link>
        </li>
        <li style={Styles.li}>
          <Link to="summonerSpells" style={Styles.a}>
            {" "}
            Sorts d'invocateur{" "}
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champion/:id" element={<ChampionDetails />} />
        <Route path="/summonerSpells" element={<SummonerSpells />} />
      </Routes>
    </div>
  );
}

export default App;
