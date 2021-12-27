import React from "react";
import logo from "./logo.svg";
import About from "./About";
import { useParams } from "react-router-dom";
import "./App.module.css";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <h1 style={{ container }}>Personnages</h1>
      </Link>
      <ul>
        <li>
          <Link to="summonerSpells"> Sorts d'invocateur </Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champion/:id" element={<ChampionDetails />} />
        <Route path="test" element={<Test />} />
        <Route path="about" element={<About />} />
        <Route path="/summonerSpells" element={<SummonerSpells />} />
        <Route path="detail/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

const column = {
  display: "flex",
  flexDirection: "column",
};

const row = {
  display: "flex",
  flexDirection: "row",
};

class Home extends React.Component {
  parentHomeStyle = {
    display: "flex",
    justifyContent: "center",
  };

  homeStyle = {
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "50%",
    ...row,
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
      <div style={this.parentHomeStyle}>
        <div style={this.homeStyle}>{ids}</div>
      </div>
    );
  }
}

function SummonerSpells() {
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
      <div style={column}>
        {summonerSpells.map((summonerSpell) => (
          <div style={row}>
            <img src={summonerSpell.summonerSpellsImg} style={spellsImgStyle}/>
            <div style={column}>
              <strong>{summonerSpell.name}</strong>
              {summonerSpell.description}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function ChampionDetails(props) {
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
    ...column,
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
      <div>
        <img src={champion.championImg} />
        <h1>{champion.name}</h1>
        <h2>{champion.title}</h2>
        <p style={loreStyle}>{champion.lore} </p>

        <div style={column}>
          <div style={row}>
            <img style={spellsImgStyle} src={champion.championPassiveImg} />
            <div style={spellsStyle}>
              <strong>{champion.passive.name}</strong>
              {champion.passive.description}
            </div>
          </div>
        </div>

        <div style={column}>
          {champion.spells.map((spell) => (
            <div style={row}>
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

function Test() {
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [data, setData] = React.useState(null);
  const [prenomCount, setPrenomCount] = React.useState(1);
  return (
    <header className="App-header">
      <nav>
        <Link to="/about">About</Link>
      </nav>

      <div>Test COMPONENT</div>
      <Personne prenom="Asapha" nom="HALIFA" />
      <Personne prenom="Axel" nom="HALIFA" />
      <Personne2 prenom={"Prenom " + prenomCount} nom="HALIFA" />
      <Counter count={5} />
      <Counter count={10} />
      <button onClick={() => setPrenomCount(prenomCount + 1)}>HEY</button>
      <img src={logo} className="App-logo" alt="logo" />
      <p>{!data ? "hey..." : data}</p>
      <Personne3
        array={[
          { prenom: "Axel", nom: "HALIFA" },
          { prenom: "Ruben", nom: "HALIFA" },
        ]}
      />
      <Chiffres listChiffre={[1, 2, 3, 4, 5]} />
    </header>
  );
}

function Details() {
  let params = useParams();
  return <div> Id : {params.id} </div>;
}
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count };
  }
  render() {
    console.log("appel render");
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Increase
        </button>
        <div>{this.state.count}</div>
        <div>
          le chiffre est {this.state.count % 2 === 0 ? "paire" : "impaire"}
        </div>

        <button onClick={() => {}}>test</button>
      </div>
    );
  }
}

class Chiffres extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.listChiffre.map((chiffre) => (
            <li>{chiffre}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class Personne extends React.Component {
  render() {
    return <Personne2 nom={this.props.nom} prenom={this.props.prenom} />;
  }
}

class Personne3 extends React.Component {
  // return
  render() {
    console.log("test personne 3");
    return <ListPersonne array={this.props.array} />;
  }
}

function Personne2(props) {
  const prenomNom = props.prenom + " " + props.nom;
  return <div>{prenomNom}</div>;
}

function ListPersonne(props) {
  console.log(props.array);
  const arrayPersonne = props.array.map((obj) => {
    return (
      <div>
        {obj.prenom + " "}
        {obj.nom}
      </div>
    );
  });
  console.log(arrayPersonne);

  return <div>{arrayPersonne}</div>;
}

export default App;
