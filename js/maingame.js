var player = {
    //remember to update loadfile.js accordingly
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
  expansionbasecost: new Decimal(5),
  expansioncostincrease: new Decimal(2),
  timeamount: new Decimal(0),
  timeprestigeamount: new Decimal(0),
  autobuymax: false,
  updaterate: 50,
  currentnotation: 0,
  autosave: true
  };


//produces money according to a set interval
function producemoney(){
  player.layers["dimlayer2"].amount = player.layers["dimlayer2"].amount.plus(player.layers["dimlayer3"].amount.times(player.layers["dimlayer3"].multi.times(player.updaterate)).div(1000));
  player.layers["dimlayer1"].amount = player.layers["dimlayer1"].amount.plus(player.layers["dimlayer2"].amount.times(player.layers["dimlayer2"].multi.times(player.updaterate)).div(1000));
  player.money = player.money.plus(player.layers["dimlayer1"].amount.times(player.layers["dimlayer1"].multi.times(player.updaterate)).div(1000));
}

//update money
function updatemoney(){
    document.getElementById('player.money').innerHTML = allnotations[player.currentnotation].format(player.money,2,1);
}

//update  cost, multi, bought and amount
function updatelayer(layername){
  document.getElementById(layername + 'cost').innerHTML = "Cost: "+ allnotations[player.currentnotation].format(player.layers[layername].cost,2,0) + " Space";
  document.getElementById(layername + 'multi').innerHTML = "x" + allnotations[player.currentnotation].format(player.layers[layername].multi,2,1);
  document.getElementById(layername + 'bought').innerHTML = "(" + allnotations[player.currentnotation].format(player.layers[layername].bought,2,0) + ")";
  document.getElementById(layername + 'amount').innerHTML = allnotations[player.currentnotation].format(player.layers[layername].amount,2,0);
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
    updateexpansionstuff();
  }
}

//update stuff of doing an expansion
function updateexpansionstuff(){
  player.expansioncost = player.expansions.times(new Decimal(2)).plus(new Decimal(5));
  document.getElementById('expansionamount').innerHTML = allnotations[player.currentnotation].format(player.expansions,2,0);
  document.getElementById('expansioncost').innerHTML = "Cost: " + allnotations[player.currentnotation].format(player.expansioncost,2,0) + " Square";
}

//gives multiplier to all dim layers
function timeprestige(){
  if(player.money.gte(new Decimal(1e27))){
    TimeGainOnPrestige = new Decimal (1) //placeholder for formula
    player.timeprestigeamount = player.timeprestigeamount.plus(1);
    for(i = 1 ; i <= 3 ; i ++){
      var layername = "dimlayer" + i;
      player.layers[layername].amount = new Decimal(0);
      player.layers[layername].bought = new Decimal(0);
      player.layers[layername].cost = player.layers[layername].basecost;
      player.money = player.initmoney;
    }
    player.expansions = new Decimal(0)
    player.expansioncost = player.expansionbasecost
    player.timeamount = player.timeamount.plus(TimeGainOnPrestige)
    updateexpansionstuff();
    updatetimestuff()
  }
}

function updatetimestuff(){
  document.getElementById('TimeGainOnPrestige').innerHTML = allnotations[player.currentnotation].format(new Decimal(1),2,0); //placeholder for formula
  document.getElementById('timeamount').innerHTML = allnotations[player.currentnotation].format(player.timeamount,2,0);
  document.getElementById('timecost').innerHTML = "Requirement: " + allnotations[player.currentnotation].format(new Decimal(1e27),0,0) + " Space";
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
  if (player.autobuymax){
    document.getElementById('autobuymax').innerHTML = "Auto: On";
  }else{
    document.getElementById('autobuymax').innerHTML = "Auto: Off";
  }
}


function autobuymax(){
  if(player.autobuymax){
    buymax()
  }
}

//visual stuffs

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


//change visibility of layers etc
function visibility(){
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


//change notations
var allnotations = [new ADNotations.StandardNotation(), new ADNotations.ScientificNotation(), new ADNotations.MixedScientificNotation(), new ADNotations.EngineeringNotation(), new ADNotations.MixedEngineeringNotation(), new ADNotations.LettersNotation()];
function changenotations(){
  var list = ['Standard', 'Scientific', 'Mixed Scientific', 'Engineering',  'Mixed Engineering', 'Letters']
  player.currentnotation ++;
  if(player.currentnotation > (list.length - 1) ){
    player.currentnotation = 0;
  }
  document.getElementById('currentnotation').innerHTML = list[player.currentnotation]
}

//change Autosave
function changeautosave(){
  player.autosave = !player.autosave;
  if (player.autosave){
    document.getElementById('currentautosave').innerHTML = "On";
  }else{
    document.getElementById('currentautosave').innerHTML = "Off";
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
             updatemoney();
             updatetimestuff();
             updateexpansionstuff();
             for(i = 1 ; i <= 3 ; i ++ ){
               var layername = "dimlayer" + i;
               updatelayer(layername);
             }
             canbuylayer();
             visibility();
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
