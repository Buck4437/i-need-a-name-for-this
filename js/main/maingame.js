var player = {
    //remember to update saveloadresetfile.js accordingly (savefixer converter and hard reset)
    money: new Decimal(1),
    maxMoneyTime: new Decimal(1),
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
        cost: new Decimal(20),
        multi: new Decimal(1),
        basecost: new Decimal(20),
        costincrease: new Decimal(11),
        multiincrease: new Decimal(1.5)
      },
      dimlayer3:{
        amount: new Decimal(0),
        bought: new Decimal(0),
        cost: new Decimal(1e6),
        multi: new Decimal(1),
        basecost: new Decimal(1e6),
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
  autoexpansion: false,
  TimeUpgrades: [null,
                [null,0,0,0],
                [null,0,0,0],
                [null,0,0,0],
                [null,0,0,0]
                ],
  updaterate: 50,
  currentnotation: 0,
  autosave: true,
  unlocks:{
      TimeUpgrades:false
    },
  versionNo:[1,1,0]
  };
var timeGainOnPrestige = new Decimal(1)
var notationlist = ['Standard', 'Scientific', 'Mixed Scientific', 'Engineering',  'Mixed Engineering', 'Letters']
var timeupgradescost = [null, [null,1,1,1], [null,1,3,15], [null,200,1000,3000], [null,1,25,1000]]



//produces money,layers according to a set interval, and update it
function producemoney(){
  player.layers["dimlayer2"].amount = player.layers["dimlayer2"].amount.plus(player.layers["dimlayer3"].amount.times(player.layers["dimlayer3"].multi.times(player.updaterate)).div(1000));
  player.layers["dimlayer1"].amount = player.layers["dimlayer1"].amount.plus(player.layers["dimlayer2"].amount.times(player.layers["dimlayer2"].multi.times(player.updaterate)).div(1000));
  player.money = player.money.plus(player.layers["dimlayer1"].amount.times(player.layers["dimlayer1"].multi.times(player.updaterate)).div(1000));
}


//buy layers
function buylayer(layername){
  if(player.money.gte(player.layers[layername].cost)){
    player.money = player.money.minus(player.layers[layername].cost);
    player.layers[layername].amount = player.layers[layername].amount.plus(1);
    player.layers[layername].bought = player.layers[layername].bought.plus(1);
    updateVariables()
  }
}

//gives multiplier to all dim layers
function expansionprestige(){
  if(player.layers["dimlayer3"].amount.gte(player.expansioncost)){
    if(player.TimeUpgrades[4][3]==1){
      //Max expansion
      player.expansions = player.layers["dimlayer3"].amount.minus(5).div(2).floor().plus(1)
    }
    else{
      player.expansions = player.expansions.plus(1);
    }
    player.expansioncost= player.expansions.times(2).plus(5)
    for(ex=1;ex<=3;ex++){
      let layer = "dimlayer"+ex;
      player.layers[layer].amount = new Decimal(0);
      player.layers[layer].bought = new Decimal(0);
      player.layers[layer].cost = player.layers[layer].basecost;
    }
    player.money = player.initmoney;
    updateVariables()
  }
}


//gain time
function timeprestige(){
  if(player.money.gte(new Decimal(1e27))){
    player.timeprestigeamount = player.timeprestigeamount.plus(1);
    for(w = 1 ; w<= 3 ; w ++){
      let layername = "dimlayer" + w;
      player.layers[layername].amount = new Decimal(0);
      player.layers[layername].bought = new Decimal(0);
      player.layers[layername].cost = player.layers[layername].basecost;
    }
    player.money = player.initmoney;
    player.maxMoneyTime = player.initmoney;
    if(player.TimeUpgrades[4][2]==1){
      player.expansions = new Decimal(5)
    }
    else{
      player.expansions = new Decimal(0)
    }
    //expansion cost is dynamic
    player.timeamount = player.timeamount.plus(timeGainOnPrestige)
    player.unlocks.TimeUpgrades = true
  }
}

//buyall
function buymax(){
  for (ce = 1; ce <= 3; ce++){
    while (player.money.gte(player.layers["dimlayer" + ce].cost)){
      buylayer("dimlayer" + ce);
    }
  }
  //subjected to improvement
}

//automation
function toggleautobuymax(){
  player.autobuymax = !player.autobuymax
}

function autobuymax(){
  if(player.autobuymax){
    buymax()
  }
}

function toggleautoexpansion(){
  player.autoexpansion = !player.autoexpansion
}

function autoexpansion(){
  if(player.autoexpansion){
    expansionprestige()
  }
}

//options tabs

//change notations
var allnotations = [new ADNotations.StandardNotation(), new ADNotations.ScientificNotation(), new ADNotations.MixedScientificNotation(), new ADNotations.EngineeringNotation(), new ADNotations.MixedEngineeringNotation(), new ADNotations.LettersNotation()];
function changenotations(){
  player.currentnotation ++;
  if(player.currentnotation > (notationlist.length - 1) ){
    player.currentnotation = 0;
  }
}

//change Autosave
function changeautosave(){
  player.autosave = !player.autosave;
}

//save,load at saveloadfile.js



//visual stuffs

//tabs changes
function opentab(tab){
  let tabcontent = $(".tabcontents");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  $("#"+tab+"tab").css("display", "block");
  if(tab!="options"){
    $("#exportfailsave").css("display", "none")
  }
}

function OpenTimeUpgradesTab(tier){
  let tabcontent = $(".TimeUpgradesTiers")
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  $("#TimeUpgradesTier"+tier).css("display", "block");
}

//update everything that ran on set timed interval
setInterval(function update(){
             autobuymax();
             producemoney();
             updateVariables()
             autoexpansion();
             updateVariables()
             updateUI();
           },50);


//buttons
$('#timeprestige2').click(function() {timeprestige()});

$('#opentab\\.layers').click(function() {opentab("layers")});
$('#opentab\\.milestones').click(function() {opentab("milestones")});
$('#opentab\\.options').click(function() {opentab("options")});

$('#dimlayer1').click(function() {buylayer("dimlayer1")});
$('#dimlayer2').click(function() {buylayer("dimlayer2")});
$('#dimlayer3').click(function() {buylayer("dimlayer3")});
$('#expansion').click(function() {expansionprestige()});
$('#timeprestige').click(function() {timeprestige()});
$('#buymax').click(function() {buymax()});
$('#autobuymax').click(function() {toggleautobuymax()});
$('#autoexpansion').click(function() {toggleautoexpansion()});

$('#TimeUpgradesTabButton1').click(function () {OpenTimeUpgradesTab("1")});
$('#TimeUpgradesTabButton2').click(function () {OpenTimeUpgradesTab("2")});
$('#TimeUpgradesTabButton3').click(function () {OpenTimeUpgradesTab("3")});
$('#TimeUpgradesTabButtonQOL').click(function () {OpenTimeUpgradesTab("QOL")});

$('#optionsbutton\\.changenotations').click(function() {changenotations()});
$('#optionsbutton\\.changeautosave').click(function() {changeautosave()});
