var SaveLoadAnimCountdown = 0;
var SaveLoadAnimActivated = false

//autosave
function autosave(){
  savetimer -= player.updaterate / 1000
  if (savetimer <= 0){
    if(player.autosave){
      localStorage.setItem('player', JSON.stringify(player))
      savetimer = 30;
      SaveLoadAnimCountdown = 2;
      SaveLoadAnimActivated = true;
      document.getElementById("gamesavedtext").innerHTML = "Game Saved";
      document.getElementById("gamesavedtext").style.opacity = 1;
    };
  };
};

//forced autosave
function manualsave(){
  savetimer = 0;
};



//autoload
function autoloadfile(){
  if(localStorage.getItem('player')){
    player = JSON.parse(localStorage.getItem('player'))
    convertsavetodecimal(player);
  };
};

function convertsavetodecimal(player){
  player.money = new Decimal(player.money),
  player.initmoney = new Decimal(player.initmoney),

  //layer 1
  player.layers.dimlayer1.amount = new Decimal(player.layers.dimlayer1.amount),
  player.layers.dimlayer1.bought = new Decimal(player.layers.dimlayer1.bought),
  player.layers.dimlayer1.cost = new Decimal(player.layers.dimlayer1.cost),
  player.layers.dimlayer1.multi = new Decimal(player.layers.dimlayer1.multi),
  player.layers.dimlayer1.basecost = new Decimal(player.layers.dimlayer1.basecost),
  player.layers.dimlayer1.basemulti = new Decimal(player.layers.dimlayer1.basemulti),
  player.layers.dimlayer1.costincrease = new Decimal(player.layers.dimlayer1.costincrease),
  player.layers.dimlayer1.multiincrease = new Decimal(player.layers.dimlayer1.multiincrease),

  //layer 2
  player.layers.dimlayer2.amount = new Decimal(player.layers.dimlayer2.amount),
  player.layers.dimlayer2.bought = new Decimal(player.layers.dimlayer2.bought),
  player.layers.dimlayer2.cost = new Decimal(player.layers.dimlayer2.cost),
  player.layers.dimlayer2.multi = new Decimal(player.layers.dimlayer2.multi),
  player.layers.dimlayer2.basecost = new Decimal(player.layers.dimlayer2.basecost),
  player.layers.dimlayer2.basemulti = new Decimal(player.layers.dimlayer2.basemulti),
  player.layers.dimlayer2.costincrease = new Decimal(player.layers.dimlayer2.costincrease),
  player.layers.dimlayer2.multiincrease = new Decimal(player.layers.dimlayer2.multiincrease),

  //layer 3
  player.layers.dimlayer3.amount = new Decimal(player.layers.dimlayer3.amount),
  player.layers.dimlayer3.bought = new Decimal(player.layers.dimlayer3.bought),
  player.layers.dimlayer3.cost = new Decimal(player.layers.dimlayer3.cost),
  player.layers.dimlayer3.multi = new Decimal(player.layers.dimlayer3.multi),
  player.layers.dimlayer3.basecost = new Decimal(player.layers.dimlayer3.basecost),
  player.layers.dimlayer3.basemulti = new Decimal(player.layers.dimlayer3.basemulti),
  player.layers.dimlayer3.costincrease = new Decimal(player.layers.dimlayer3.costincrease),
  player.layers.dimlayer3.multiincrease = new Decimal(player.layers.dimlayer3.multiincrease),

  player.expansions = new Decimal (player.expansions),
  player.expansioncost = new Decimal (player.expansioncost),
  player.expansionbasecost = new Decimal (player.expansionbasecost),
  player.expansioncostincrease = new Decimal (player.expansioncostincrease),
  player.updaterate = Number(player.updaterate),
  player.currentnotation = Number(player.currentnotation),
  player.autosave = player.autosave !== "false"
}

autoloadfile();

function animationtimer(){
  SaveLoadAnimCountdown -= player.updaterate / 1000;
  if (SaveLoadAnimCountdown < 0){
    SaveLoadAnimCountdown = 0;
    if(SaveLoadAnimActivated){
      SaveLoadAnimActivated = false;
      document.getElementById("gamesavedtext").style.opacity = 0;
    }
  }
}

function manualload(){
  autoloadfile();
  SaveLoadAnimCountdown = 2;
  SaveLoadAnimActivated = true;
  document.getElementById("gamesavedtext").innerHTML = "Game Loaded";
  document.getElementById("gamesavedtext").style.opacity = 1;
}


//export and import uses atob/ btoa
