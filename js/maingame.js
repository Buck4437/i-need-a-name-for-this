
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
var notationlist = ['Standard', 'Scientific', 'Mixed Scientific', 'Engineering',  'Mixed Engineering', 'Letters']



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



//change visibility of layers, upgrades etc
function visibility(){
  $("#time-prestige-section").css("display", "none");
  $("#autobuymax").css("display", "none");
  $("#timeprestige").css("display", "none");
  $("#dimlayer2").css("display", "none");
  $("#dimlayer3").css("display", "none");
  $("#expansion").css("display", "none");
  $("#buymax").css("display", "none");
  if(player.timeprestigeamount.gte(1)){
    $("#time-prestige-section").css("display", "block");
    $("#autobuymax").css("display", "inline");
    $("#timeprestige").css("display", "block");
    $("#dimlayer2").css("display", "block");
    $("#dimlayer3").css("display", "block");
    $("#expansion").css("display", "block");
    $("#buymax").css("display", "inline");
  }else if(player.expansions.gte(5)){
    $("#timeprestige").css("display", "block");
    $("#dimlayer2").css("display", "block");
    $("#dimlayer3").css("display", "block");
    $("#expansion").css("display", "block");
    $("#buymax").css("display", "inline");
  }else if(player.expansions.gte(1)){
    $("#dimlayer2").css("display", "block");
    $("#dimlayer3").css("display", "block");
    $("#expansion").css("display", "block");
    $("#buymax").css("display", "inline");
  }else{
    if (player.layers["dimlayer1"].bought.gte(5)){
      $("#dimlayer2").css("display", "block");
    }
    if (player.layers["dimlayer2"].bought.gte(5)){
      $("#dimlayer3").css("display", "block");
    }
    if (player.layers["dimlayer3"].bought.gte(5)){
      $("#expansion").css("display", "block");
    }
  }
}

//tabs changes
function opentab(tab){
  var tabcontent = $(".tabcontents");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  $("#"+tab+"tab").css("display", "block");
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


//make some variable dynamic
function dynamicvariable(){
  for(i = 1 ; i <= 3 ; i ++ ){
    var layername = "dimlayer" + i;
    player.layers[layername].multi = player.layers[layername].basemulti.times(new Decimal(2).pow(player.expansions)).times(player.layers[layername].multiincrease.pow(player.layers[layername].bought));
  }
  //update the multi due to data change
  player.expansioncost = player.expansions.times(new Decimal(2)).plus(new Decimal(5));
  TimeGainOnPrestige = new Decimal (1) //placeholder for formula
}


//visual stuffs


//make display in game dynamic
function dynamicdisplay(){
  //top display
  //money
  $('#player\\.money').text(allnotations[player.currentnotation].format(player.money,2,1));

  //layers tab
  //space layers
  for (i=1;i<=3;i++){
    layername='dimlayer'+i
    $('#' + layername + 'cost').text("Cost: "+ allnotations[player.currentnotation].format(player.layers[layername].cost,2,0) + " Space");
    $('#' + layername + 'multi').text("x" + allnotations[player.currentnotation].format(player.layers[layername].multi,2,1));
    $('#' + layername + 'bought').text("(" + allnotations[player.currentnotation].format(player.layers[layername].bought,2,0) + ")");
    $('#' + layername + 'amount').text(allnotations[player.currentnotation].format(player.layers[layername].amount,2,0));
  }
  //expansion
  $('#expansionamount').text(allnotations[player.currentnotation].format(player.expansions,2,0));
  $('#expansioncost').text("Cost: " + allnotations[player.currentnotation].format(player.expansioncost,2,0) + " Square");
  //time prestige

   /* placeholder for formula => */ $('TimeGainOnPrestige').text(allnotations[player.currentnotation].format(new Decimal(1),2,0));

  $('#timeamount').text("Time: " + allnotations[player.currentnotation].format(player.timeamount,2,0));
  $('#timecost').text("Requirement: " + allnotations[player.currentnotation].format(new Decimal(1e27),0,0) + " Space");
  //auto buy all
  if (player.autobuymax){
    $('#autobuymax').text("Auto: On");
  }else{
    $('#autobuymax').text("Auto: Off");
  }

  //options tab
  //notation
  $('#currentnotation').text(notationlist[player.currentnotation])
  //autosave
  if (player.autosave){
    $('#currentautosave').text("On");
  }else{
    $('#currentautosave').text("Off");
  }
}


//change colour of layers
function canbuylayer(){
  for (i=1;i<=3;i++){
    if (player.money.gte(player.layers["dimlayer"+i].cost)){
      $("#dimlayer"+i+"cost").css("color", "#0000ff")
    } else{
      $("#dimlayer"+i+"cost").css("color", "#000000")
    }
  }
  if(player.layers["dimlayer3"].amount.gte(player.expansioncost)){
    $("#expansioncost").css("color", "#0000ff")
  } else{
    $("#expansioncost").css("color", "#000000")
  }
  if(player.money.gte(new Decimal(1e27))){
    $("#timecost").css("color", "#0000ff")
  } else{
    $("#timecost").css("color", "#000000")
  }
}

//update everything that ran on set timed interval
setInterval(function update(){
             autobuymax();
             dynamicvariable()
             producemoney();
             canbuylayer();
             dynamicvariable()
             visibility();
             dynamicdisplay();
           },50);


//buttons
$('#opentab\\.layers').click(function() {opentab("layers")});
$('#opentab\\.options').click(function() {opentab("options")});
$('#dimlayer1').click(function() {buylayer("dimlayer1")});
$('#dimlayer2').click(function() {buylayer("dimlayer2")});
$('#dimlayer3').click(function() {buylayer("dimlayer3")});
$('#expansion').click(function() {expansionprestige()});
$('#timeprestige').click(function() {timeprestige()});
$('#optionsbutton\\.changenotations').click(function() {changenotations()});
$('#buymax').click(function() {buymax()});
$('#autobuymax').click(function() {toggleautobuymax()});
$('#optionsbutton\\.changeautosave').click(function() {changeautosave()});
