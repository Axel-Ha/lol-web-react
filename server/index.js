const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/champions/list", (req, res) => {
  getChampions((champions) => {
    res.json(champions);
  });
});

app.get("/api/summonerSpells", (req, res) => { 
  
  getSummonerSpells((summonerSpells) => {
    
    res.json(summonerSpells);
  });
});

app.get("/api/champions/:idChampion", (req, res) => {
  let nameChampion = req.params["idChampion"];
  getInfoChampion(nameChampion, (infoChampion) => res.json(infoChampion));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// TODO:
// 1. lister tous les personnages lol via console.log
// 2. lister tous les sorts d'un personnage console.log
function getInfoChampion(idChampion, callback) {
   http.get(
    "http://ddragon.leagueoflegends.com/cdn/11.20.1/data/fr_FR/champion/" +
      idChampion +
      ".json",
    (res) => {
      if (res.statusCode !== 200) {
        console.error(
          "Did not get an ok from the server. Code:" + res.statusCode
        );
        return;
      }
      let data = "";
      res.on("data", (chunk) => {
        data = data + chunk;
      });

      res.on("close", () => {
        let newData = JSON.parse(data);
        let detailChampion = newData.data[idChampion];
        let newSpells = detailChampion.spells.map(spell => {
          return {...spell, spellImg: getChampionSpellImg(spell.id)}
        })

        detailChampion = {
          ...detailChampion,
          championImg: getChampionImgUrl(detailChampion.id),
          championPassiveImg: getChampionPassiveImg(detailChampion),
          spells: newSpells, 
        };
        callback(detailChampion);
      });
    }
  );
}

function getChampions(callback) {
  http.get(
    "http://ddragon.leagueoflegends.com/cdn/11.20.1/data/fr_FR/champion.json",
    (res) => {
      if (res.statusCode !== 200) {
        console.error(
          "Did not get an ok from the server. Code:" + res.statusCode
        );
      }
      let data = "";
      res.on("data", (chunk) => {
        data = data + chunk;
      });

      res.on("close", () => {
        let newData = JSON.parse(data);
        //La réponse de l'API LOL est de la forme {championId : data} , on récupère data
        let championIds = Object.keys(newData.data);
        let champions = championIds
          .map((id) => newData.data[id])
          .map((champion) => {
            return { ...champion, championImg: getChampionImgUrl(champion.id) };
          });
        callback(champions);
      });
    }
  );
}



function getSummonerSpells(callback) {
  http.get(
    "http://ddragon.leagueoflegends.com/cdn/11.21.1/data/fr_FR/summoner.json",
    (res) => {
      if (res.statusCode !== 200) {
        console.error(
          "Did not get an ok from the server. Code:" + res.statusCode
        );
      }
      let data = "";
      res.on("data", (chunk) => {
        data = data + chunk;
      });

      res.on("close", () => {
        let newData = JSON.parse(data);
        let summonerSpellIds = Object.keys(newData.data);
        let summonerSpells = summonerSpellIds
          .map((id) => newData.data[id])
          .map((summonerSpells) => {
            return { ...summonerSpells, summonerSpellsImg: getSummonerSpellsImg(summonerSpells.id) };
          });
        callback(summonerSpells);
      });
    }
  );
}

function getChampionImgUrl(id) {
  return "http://ddragon.leagueoflegends.com/cdn/11.20.1/img/champion/" + id + ".png"
}

function getChampionPassiveImg(champion) {
  return "http://ddragon.leagueoflegends.com/cdn/11.20.1/img/passive/" + champion.passive["image"].full
}

function getChampionSpellImg(spellId) {
  return "http://ddragon.leagueoflegends.com/cdn/11.20.1/img/spell/" + spellId + ".png"
}

function getSummonerSpellsImg(id){
  return "http://ddragon.leagueoflegends.com/cdn/11.21.1/img/spell/"+ id+ ".png" 
}