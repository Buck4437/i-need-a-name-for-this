
var savetimer = 30
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
    }
  }
}

//forced autosave
function manualsave(){
  localStorage.setItem('player', JSON.stringify(player))
  savetimer = 30;
  SaveLoadAnimCountdown = 2;
  SaveLoadAnimActivated = true;
  document.getElementById("gamesavedtext").innerHTML = "Game Saved";
  document.getElementById("gamesavedtext").style.opacity = 1;
}



//autoload
function autoloadfile(){
  if(localStorage.getItem('player')){
    player = JSON.parse(localStorage.getItem('player'))
    savefixer(player);
    convertsavetodecimal(player);
  }
}


//change anything in save that is undefined into default value
//kill me pls
function savefixer(player){
  if(player.money===undefined){
    player.money=1
  }
  if(player.initmoney===undefined){
    player.initmoney=1
  }
  if(player.layers.dimlayer1.amount===undefined){
    player.layers.dimlayer1.amount=0
  }
  if(player.layers.dimlayer1.bought===undefined){
    player.layers.dimlayer1.bought=0
  }
  if(player.layers.dimlayer1.cost===undefined){
    player.layers.dimlayer1.cost=1
  }
  if(player.layers.dimlayer1.multi===undefined){
    player.layers.dimlayer1.multi=1
  }
  if(player.layers.dimlayer1.basecost===undefined){
    player.layers.dimlayer1.basecost=1
  }
  if(player.layers.dimlayer1.costincrease===undefined){
    player.layers.dimlayer1.costincrease=4
  }
  if(player.layers.dimlayer1.multiincrease===undefined){
    player.layers.dimlayer1.multiincrease=1.5
  }
  if(player.layers.dimlayer2.amount===undefined){
    player.layers.dimlayer2.amount=0
  }
  if(player.layers.dimlayer2.bought===undefined){
    player.layers.dimlayer2.bought=0
  }
  if(player.layers.dimlayer2.cost===undefined){
    player.layers.dimlayer2.cost=400
  }
  if(player.layers.dimlayer2.multi===undefined){
    player.layers.dimlayer2.multi=1
  }
  if(player.layers.dimlayer2.basecost===undefined){
    player.layers.dimlayer2.basecost=400
  }
  if(player.layers.dimlayer2.costincrease===undefined){
    player.layers.dimlayer2.costincrease=11
  }
  if(player.layers.dimlayer2.multiincrease===undefined){
    player.layers.dimlayer2.multiincrease=1.5
  }
  if(player.layers.dimlayer3.amount===undefined){
    player.layers.dimlayer3.amount=0
  }
  if(player.layers.dimlayer3.bought===undefined){
    player.layers.dimlayer3.bought=0
  }
  if(player.layers.dimlayer3.cost===undefined){
    player.layers.dimlayer3.cost="1e7"
  }
  if(player.layers.dimlayer3.multi===undefined){
    player.layers.dimlayer3.multi=1
  }
  if(player.layers.dimlayer3.basecost===undefined){
    player.layers.dimlayer3.basecost="1e7"
  }
  if(player.layers.dimlayer3.costincrease===undefined){
    player.layers.dimlayer3.costincrease=32
  }
  if(player.layers.dimlayer3.multiincrease===undefined){
    player.layers.dimlayer3.multiincrease=1.5
  }
  if(player.expansions===undefined){
    player.expansions=0
  }
  if(player.expansioncost===undefined){
    player.expansioncost=5
  }
  if(player.expansioncostincrease===undefined){
    player.expansioncostincrease=2
  }
  if(player.updaterate===undefined){
    player.updaterate=50
  }
  if(player.currentnotation===undefined){
    player.currentnotation=0
  }
  if(player.autosave===undefined){
    player.autosave=true
  }
  if(player.timeamount===undefined){
    player.timeamount=0
  }
  if(player.timeprestigeamount===undefined){
    player.timeprestigeamount=0
  }
  if(player.autobuymax===undefined){
    player.autobuymax=false
  }
  if(player.TimeUpgrades===undefined){
    player.TimeUpgrades=[null,[null,0,0,0]]
  }
}



function convertsavetodecimal(player){
  player.money = new Decimal(player.money),
  player.initmoney = new Decimal(player.initmoney),

  //layer 1
  player.layers.dimlayer1.amount = new Decimal(player.layers.dimlayer1.amount),
  player.layers.dimlayer1.bought = new Decimal(player.layers.dimlayer1.bought),
  player.layers.dimlayer1.cost = new Decimal(player.layers.dimlayer1.cost),
  player.layers.dimlayer1.multi = new Decimal(player.layers.dimlayer1.multi),
  player.layers.dimlayer1.basecost = new Decimal(player.layers.dimlayer1.basecost),
  player.layers.dimlayer1.costincrease = new Decimal(player.layers.dimlayer1.costincrease),
  player.layers.dimlayer1.multiincrease = new Decimal(player.layers.dimlayer1.multiincrease),

  //layer 2
  player.layers.dimlayer2.amount = new Decimal(player.layers.dimlayer2.amount),
  player.layers.dimlayer2.bought = new Decimal(player.layers.dimlayer2.bought),
  player.layers.dimlayer2.cost = new Decimal(player.layers.dimlayer2.cost),
  player.layers.dimlayer2.multi = new Decimal(player.layers.dimlayer2.multi),
  player.layers.dimlayer2.basecost = new Decimal(player.layers.dimlayer2.basecost),
  player.layers.dimlayer2.costincrease = new Decimal(player.layers.dimlayer2.costincrease),
  player.layers.dimlayer2.multiincrease = new Decimal(player.layers.dimlayer2.multiincrease),

  //layer 3
  player.layers.dimlayer3.amount = new Decimal(player.layers.dimlayer3.amount),
  player.layers.dimlayer3.bought = new Decimal(player.layers.dimlayer3.bought),
  player.layers.dimlayer3.cost = new Decimal(player.layers.dimlayer3.cost),
  player.layers.dimlayer3.multi = new Decimal(player.layers.dimlayer3.multi),
  player.layers.dimlayer3.basecost = new Decimal(player.layers.dimlayer3.basecost),
  player.layers.dimlayer3.costincrease = new Decimal(player.layers.dimlayer3.costincrease),
  player.layers.dimlayer3.multiincrease = new Decimal(player.layers.dimlayer3.multiincrease),

  player.expansions = new Decimal (player.expansions),
  player.expansioncost = new Decimal (player.expansioncost),
  player.expansioncostincrease = new Decimal (player.expansioncostincrease),
  player.timeamount = new Decimal (player.timeamount),
  player.timeprestigeamount = new Decimal (player.timeprestigeamount),
  //player.autobuymax (no need conversion)
  //player.TimeUpgrades (no need conversion)
  player.updaterate = Number(player.updaterate),
  player.currentnotation = Number(player.currentnotation)
  //player.autosave (no need conversion)
}


// load ur save
autoloadfile();

function SaveLoadAnimationTimer(){
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
//placeholder

//hard reset confirmation
function hardreset(){
  var HARDRESETCONFIRMATION = prompt("Do you want to completely erase your progress? Please enter \"RESET THE GAME\" in ALL CAPS to confirm. THIS ACTION CANNOT BE UNDONE.")
  if (HARDRESETCONFIRMATION == "RESET THE GAME"){
    player = {
        money: new Decimal(1),
        initmoney: new Decimal(1),
        layers:{
          dimlayer1:{
            amount: new Decimal(0),
            bought: new Decimal(0),
            cost: new Decimal(1),
            multi: new Decimal(1),
            basecost: new Decimal(1),
            costincrease: new Decimal(4),
            multiincrease: new Decimal(1.5)
          },
          dimlayer2:{
            amount: new Decimal(0),
            bought: new Decimal(0),
            cost: new Decimal(400),
            multi: new Decimal(1),
            basecost: new Decimal(400),
            costincrease: new Decimal(11),
            multiincrease: new Decimal(1.5)
          },
          dimlayer3:{
            amount: new Decimal(0),
            bought: new Decimal(0),
            cost: new Decimal(1e7),
            multi: new Decimal(1),
            basecost: new Decimal(1e7),
            costincrease: new Decimal(32),
            multiincrease: new Decimal(1.5)
          }
        },
      expansions: new Decimal(0),
      expansioncost: new Decimal(5),
      expansioncostincrease: new Decimal(2),
      timeamount: new Decimal(0),
      timeprestigeamount: new Decimal(0),
      autobuymax: false,
      TimeUpgrades: [null,[null,0,0,0]],
      updaterate: 50,
      currentnotation: 0,
      autosave: true
    };
    manualsave()
  }
}

//run thing on timer
setInterval(function(){ autosave(),
                        SaveLoadAnimationTimer()
                      },50);

function exportsave(){
  $("#exportfailsave").css("display", "inline")
  $("#exportfailsavefield").val(window.btoa(JSON.stringify(player)));
  var save = $("#exportfailsavefield")
  save.select();
 try {
   document.execCommand('copy');
   alert("Save copied to clipboard!")
 } catch (error) {
     alert('Save exported!');
   }
}

function importsave(){
  var save = prompt("Import your save.")
  if (save == null || save == "") {
    alert("Invalid save!")
  } else {
    try{
      player = JSON.parse(window.atob(save))
      savefixer(player);
      convertsavetodecimal(player);
    } catch (error){
      alert("Invalid save!")
    }
  }
}



//buttons
$('#optionsbutton\\.manualsave').click(function() {manualsave()});
$('#optionsbutton\\.manualload').click(function() {manualload()});
$('#optionsbutton\\.exportsave').click(function() {exportsave()});
$('#optionsbutton\\.importsave').click(function() {importsave()});
$('#optionsbutton\\.hardreset').click(function() {hardreset()});
