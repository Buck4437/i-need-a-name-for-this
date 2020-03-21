var player = {
    //remember to update saveloadresetfile.js accordingly (savefixer converter and hard reset)
    money: new Decimal(1),
    initmoney: new Decimal(1),
    layers:{
      dimlayer1:{
        amount: new Decimal(0),
        bought: new Decimal(0),
        cost: new Decimal(1),
        multi: new Decimal(1),
        basecost: new Decimal(1),
        basemulti: new Decimal(1),
        costincrease: new Decimal(4),
        multiincrease: new Decimal(1.5)
      },
      dimlayer2:{
        amount: new Decimal(0),
        bought: new Decimal(0),
        cost: new Decimal(400),
        multi: new Decimal(1),
        basecost: new Decimal(400),
        basemulti: new Decimal(1),
        costincrease: new Decimal(11),
        multiincrease: new Decimal(1.5)
      },
      dimlayer3:{
        amount: new Decimal(0),
        bought: new Decimal(0),
        cost: new Decimal(1e7),
        multi: new Decimal(1),
        basecost: new Decimal(1e7),
        basemulti: new Decimal(1),
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
  updaterate: 50,
  currentnotation: 0,
  autosave: true
  };
var TimeGainOnPrestige = new Decimal(1)

//produces money,layers according to a set interval, and update it
function producemoney(){
  player.layers["dimlayer2"].amount = player.layers["dimlayer2"].amount.plus(player.layers["dimlayer3"].amount.times(player.layers["dimlayer3"].multi.times(player.updaterate)).div(1000));
  player.layers["dimlayer1"].amount = player.layers["dimlayer1"].amount.plus(player.layers["dimlayer2"].amount.times(player.layers["dimlayer2"].multi.times(player.updaterate)).div(1000));
  player.money = player.money.plus(player.layers["dimlayer1"].amount.times(player.layers["dimlayer1"].multi.times(player.updaterate)).div(1000));
}


//update the multi due to data change
function recalculatemulti(layername){
  player.layers[layername].multi = player.layers[layername].basemulti.times(new Decimal(2).pow(player.expansions)).times(player.layers[layername].multiincrease.pow(player.layers[layername].bought));
}


//buy layers
function buylayer(layername){
  if(player.money.gte(player.layers[layername].cost)){
    player.money = player.money.minus(player.layers[layername].cost);
    player.layers[layername].amount = player.layers[layername].amount.plus(1);
    player.layers[layername].bought = player.layers[layername].bought.plus(1);
    player.layers[layername].cost = player.layers[layername].cost.times(player.layers[layername].costincrease);
    }
}

//gives multiplier to all dim layers
function expansionprestige(){
  if(player.layers["dimlayer3"].amount.gte(player.expansioncost)){
    player.expansions = player.expansions.plus(1);
    player.expansioncost = player.expansioncost.plus(player.expansioncostincrease);
    for(i = 1 ; i <= 3 ; i ++){
      var layername = "dimlayer" + i;
      player.layers[layername].amount = new Decimal(0);
      player.layers[layername].bought = new Decimal(0);
      player.layers[layername].cost = player.layers[layername].basecost;
      player.money = player.initmoney;
    }
    player.expansioncost = player.expansions.times(new Decimal(2)).plus(new Decimal(5));
  }
}


//gives multiplier to all dim layers
function timeprestige(){
  if(player.money.gte(new Decimal(1e27))){
    player.timeprestigeamount = player.timeprestigeamount.plus(1);
    for(i = 1 ; i <= 3 ; i ++){
      var layername = "dimlayer" + i;
      player.layers[layername].amount = new Decimal(0);
      player.layers[layername].bought = new Decimal(0);
      player.layers[layername].cost = player.layers[layername].basecost;
      player.money = player.initmoney;
    }
    player.expansions = new Decimal(0)
    //expansion cost is dynamic
    player.timeamount = player.timeamount.plus(TimeGainOnPrestige)
  }
}

//buyall
function buymax(){
  for (i = 1; i <= 3; i++){
    while (player.money.gte(player.layers["dimlayer" + i].cost)){
      buylayer("dimlayer" + i);
    }
  }
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



//change visibility of layers, upgrades etc
function visibility(){
  
  document.getElementById("autobuymax").style.display = "none";
  document.getElementById("timeprestige").style.display = "none";
  document.getElementById("dimlayer2").style.display = "none";
  document.getElementById("dimlayer3").style.display = "none";
  document.getElementById("expansion").style.display = "none";
  document.getElementById("buymax").style.display = "none";

  if(player.timeprestigeamount.gte(1)||player.expansions.gte(5)){
    document.getElementById("autobuymax").style.display = "inline";
    document.getElementById("timeprestige").style.display = "block";
    document.getElementById("dimlayer2").style.display = "block";
    document.getElementById("dimlayer3").style.display = "block";
    document.getElementById("expansion").style.display = "block";
    document.getElementById("buymax").style.display = "inline";
  }else if(player.expansions.gte(1)){
    document.getElementById("dimlayer2").style.display = "block";
    document.getElementById("dimlayer3").style.display = "block";
    document.getElementById("expansion").style.display = "block";
    document.getElementById("buymax").style.display = "inline";
  }else{
    if (player.layers["dimlayer1"].bought.gte(5)){
      document.getElementById("dimlayer2").style.display = "block";
    }
    if (player.layers["dimlayer2"].bought.gte(5)){
      document.getElementById("dimlayer3").style.display = "block";
    }
    if (player.layers["dimlayer3"].bought.gte(5)){
      document.getElementById("expansion").style.display = "block";
    }
  }
}

//tabs changes
function opentab(tab){
  var tabcontent = document.getElementsByClassName("tabcontents");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(tab+"tab").style.display = "block";
}


//options tabs

//change notations
var allnotations = [new ADNotations.StandardNotation(), new ADNotations.ScientificNotation(), new ADNotations.MixedScientificNotation(), new ADNotations.EngineeringNotation(), new ADNotations.MixedEngineeringNotation(), new ADNotations.LettersNotation()];
function changenotations(){
  player.currentnotation ++;
  if(player.currentnotation > (list.length - 1) ){
    player.currentnotation = 0;
  }
}

//change Autosave
function changeautosave(){
  player.autosave = !player.autosave;
}

//save,load at saveloadfile.js


//make some variable dynamic
function dynamicvariable(){
  player.expansioncost = player.expansions.times(new Decimal(2)).plus(new Decimal(5));
  TimeGainOnPrestige = new Decimal (1) //placeholder for formula
}


//visual stuffs


//make display in game dynamic
function dynamicdisplay(){
  //top display
  document.getElementById('player.money').innerHTML = allnotations[player.currentnotation].format(player.money,2,1);

  //layers tab
  //space layers
  for (i=1;i<=3;i++){
    layername='dimlayer'+i
    document.getElementById(layername + 'cost').innerHTML = "Cost: "+ allnotations[player.currentnotation].format(player.layers[layername].cost,2,0) + " Space";
    document.getElementById(layername + 'multi').innerHTML = "x" + allnotations[player.currentnotation].format(player.layers[layername].multi,2,1);
    document.getElementById(layername + 'bought').innerHTML = "(" + allnotations[player.currentnotation].format(player.layers[layername].bought,2,0) + ")";
    document.getElementById(layername + 'amount').innerHTML = allnotations[player.currentnotation].format(player.layers[layername].amount,2,0);
  }
  //expansion
  document.getElementById('expansionamount').innerHTML = allnotations[player.currentnotation].format(player.expansions,2,0);
  document.getElementById('expansioncost').innerHTML = "Cost: " + allnotations[player.currentnotation].format(player.expansioncost,2,0) + " Square";
  //time prestige

   /* placeholder for formula => */ document.getElementById('TimeGainOnPrestige').innerHTML = allnotations[player.currentnotation].format(new Decimal(1),2,0);

  document.getElementById('timeamount').innerHTML = allnotations[player.currentnotation].format(player.timeamount,2,0);
  document.getElementById('timecost').innerHTML = "Requirement: " + allnotations[player.currentnotation].format(new Decimal(1e27),0,0) + " Space";
  //auto buy all
  if (player.autobuymax){
    document.getElementById('autobuymax').innerHTML = "Auto: On";
  }else{
    document.getElementById('autobuymax').innerHTML = "Auto: Off";
  }

  //options tab
  //notation
  notationlist = ['Standard', 'Scientific', 'Mixed Scientific', 'Engineering',  'Mixed Engineering', 'Letters']
  document.getElementById('currentnotation').innerHTML = notationlist[player.currentnotation]
  //autosave
  if (player.autosave){
    document.getElementById('currentautosave').innerHTML = "On";
  }else{
    document.getElementById('currentautosave').innerHTML = "Off";
  }
}


//change colour of layers
function canbuylayer(){
  for (i=1;i<=3;i++){
    if (player.money.gte(player.layers["dimlayer"+i].cost)){
      document.getElementById("dimlayer"+i+"cost").style.color = "#0000ff"
    } else{
      document.getElementById("dimlayer"+i+"cost").style.color = "#000000"
    }
  }
  if(player.layers["dimlayer3"].amount.gte(player.expansioncost)){
    document.getElementById("expansioncost").style.color = "#0000ff"
  } else{
    document.getElementById("expansioncost").style.color = "#000000"
  }
  if(player.money.gte(new Decimal(1e27))){
    document.getElementById("timecost").style.color = "#0000ff"
  } else{
    document.getElementById("timecost").style.color = "#000000"
  }
}

//update everything that ran on set timed interval
setInterval(function update(){
             autobuymax();
             for(i = 1 ; i <= 3 ; i ++ ){
               var layername = "dimlayer" + i;
               recalculatemulti(layername);
             }
             producemoney();
             canbuylayer();
             visibility();
             dynamicvariable()
             dynamicdisplay();
           },50);


//buttons
document.getElementById('opentab.layers').onclick = function() {opentab("layers")};
document.getElementById('opentab.options').onclick = function() {opentab("options")};
document.getElementById('dimlayer1').onclick = function() {buylayer("dimlayer1")};
document.getElementById('dimlayer2').onclick = function() {buylayer("dimlayer2")};
document.getElementById('dimlayer3').onclick = function() {buylayer("dimlayer3")};
document.getElementById('expansion').onclick = function() {expansionprestige()};
document.getElementById('timeprestige').onclick = function() {timeprestige()};
document.getElementById('optionsbutton.changenotations').onclick = function() {changenotations()};
document.getElementById('buymax').onclick = function() {buymax()};
document.getElementById('autobuymax').onclick = function() {toggleautobuymax()};
document.getElementById('optionsbutton.changeautosave').onclick = function() {changeautosave()};
