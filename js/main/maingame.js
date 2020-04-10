
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
  autoexpansion: false,
  TimeUpgrades: [null,
                [null,0,0,0],
                [null,0,0,0],
                [null,0,0,0],
                [null,0,0,0]
                ],
  updaterate: 50,
  currentnotation: 0,
  autosave: true
  };
var timeGainOnPrestige = new Decimal(1)
var notationlist = ['Standard', 'Scientific', 'Mixed Scientific', 'Engineering',  'Mixed Engineering', 'Letters']
var timeupgradescost = [null, [null,1,1,1], [null,1,3,10], [null,250,1000,3000], [null,1,25,1000]]



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
  }
  dynamicvariable()
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
      var layer = "dimlayer"+ex;
      player.layers[layer].amount = new Decimal(0);
      player.layers[layer].bought = new Decimal(0);
      player.layers[layer].cost = player.layers[layer].basecost;
    }
    player.money = player.initmoney;
    dynamicvariable()
  }
}


//gain time
function timeprestige(){
  if(player.money.gte(new Decimal(1e27))){
    player.timeprestigeamount = player.timeprestigeamount.plus(1);
    for(w = 1 ; w<= 3 ; w ++){
      var layername = "dimlayer" + w;
      player.layers[layername].amount = new Decimal(0);
      player.layers[layername].bought = new Decimal(0);
      player.layers[layername].cost = player.layers[layername].basecost;
    }
    player.money = player.initmoney;
    if(player.TimeUpgrades[4][2]==1){
      player.expansions = new Decimal(5)
    }
    else{
      player.expansions = new Decimal(0)
    }
    //expansion cost is dynamic
    player.timeamount = player.timeamount.plus(timeGainOnPrestige)
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

//buy time upgrades
function BuyTimeUpgrade(a,b){
  if(player.TimeUpgrades[a][b]!=1){
    if(player.timeamount.gte(timeupgradescost[a][b])){
      player.TimeUpgrades[a][b]=1
      player.timeamount=player.timeamount.minus(new Decimal(timeupgradescost[a][b]))
    }
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


//make some variable dynamic
function dynamicvariable(){
  for(jc = 1 ; jc <= 3 ; jc ++ ){
    var layer = "dimlayer" + jc;
    //layer multi increase
    if(player.TimeUpgrades[3][1]==1){
      player.layers[layer].multiincrease = new Decimal("1.7")
    }
    else if(player.TimeUpgrades[1][2]==1){
      player.layers[layer].multiincrease = new Decimal("1.55")
    }
    else {
      player.layers[layer].multiincrease = new Decimal("1.5")
    }

    //layer multi
    //bought multiplier
    player.layers[layer].multi = player.layers[layer].multiincrease.pow(player.layers[layer].bought)
    //expansion multiplier
    if(player.TimeUpgrades[1][3]==1){
      player.layers[layer].multi = player.layers[layer].multi.times(new Decimal(2.5).pow(player.expansions))
    }else{
      player.layers[layer].multi = player.layers[layer].multi.times(new Decimal(2).pow(player.expansions))
    }
    if(player.TimeUpgrades[2][3]==1){
      player.layers[layer].multi = player.layers[layer].multi.times(new Decimal(1.5).pow(player.expansions))
    }
    //extra multipliers
    if (player.TimeUpgrades[1][1]==1) {
      player.layers[layer].multi = player.layers[layer].multi.times(new Decimal(2.5))
    }
    if (player.TimeUpgrades[2][1]==1) {
      player.layers[layer].multi = player.layers[layer].multi.times(new Decimal(5).pow(Decimal.log10(player.timeprestigeamount.plus(1))))
    }
    if (player.TimeUpgrades[2][2]==1) {
      player.layers[layer].multi = player.layers[layer].multi.times(new Decimal(3).pow(Decimal.log10(player.timeamount.times(5).plus(1))))
    }



    //layer cost
    //scaling cost
    player.layers[layer].cost = player.layers[layer].basecost.times(player.layers[layer].costincrease.pow(player.layers[layer].bought));
    //ramping
    var ramping_starts = [null,50,27,16] //layer 1: 50, 2: 27, 3:16
    var ramp_coeff = Decimal.max(0,player.layers[layer].bought.minus(ramping_starts[jc]-1))
    var ramp_coeff2 = ramp_coeff.times(ramp_coeff.plus(1)).div(2)

    if(player.TimeUpgrades[3][3]==1){
      player.layers[layer].cost = player.layers[layer].cost.times(Decimal.max(1,Decimal.pow(1.1, ramp_coeff2)))
    }
    else {
      player.layers[layer].cost = player.layers[layer].cost.times(Decimal.max(1,Decimal.pow(1.5, ramp_coeff2)))
    }
  }


  player.expansioncost = player.expansions.times(new Decimal(2)).plus(new Decimal(5));

  //prestige time gain
  timeGainOnPrestige = Decimal.pow(10, Decimal.minus(Decimal.log10(player.money),27).div(27))
  if(player.TimeUpgrades[3][2]==1){
    timeGainOnPrestige = timeGainOnPrestige.times(new Decimal(1.1).pow(player.expansions))
  }
  timeGainOnPrestige = Decimal.max(1,timeGainOnPrestige.floor())
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
  $('#expansionamount').text(player.expansions);
  $('#expansioncost').text("Cost: " + allnotations[player.currentnotation].format(player.expansioncost,2,0) + " Square");
  //time prestige
  $('#TimePrestigeAmount').text(allnotations[player.currentnotation].format(player.timeprestigeamount,2,0));
  $('#TimeGainOnPrestige').text(allnotations[player.currentnotation].format(timeGainOnPrestige,2,0));
  $('#timecost').text("Requirement: " + allnotations[player.currentnotation].format(new Decimal(1e27),0,0) + " Space");
  $('#timeamount').text("Time: " + allnotations[player.currentnotation].format(player.timeamount,2,0));

  //colour of layers,expansion and time prestige
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

  //auto buy all
  if (player.autobuymax){
    $('#autobuymax').text("Auto: On");
  }else{
    $('#autobuymax').text("Auto: Off");
  }
  //auto expansion
  if (player.autoexpansion){
    $('#autoexpansion').text("Auto Expansion: On");
  }else{
    $('#autoexpansion').text("Auto Expansion: Off");
  }

  //Time upgrade tabs
  if(player.TimeUpgrades[1][1]==1||player.TimeUpgrades[1][2]==1||player.TimeUpgrades[1][3]==1){
    $("#TimeUpgradesTabButtonQOL").css("display", "inline")
    $("#TimeUpgradesTabButton2").css("display", "inline")
  }
  else{
    $("#TimeUpgradesTabButtonQOL").css("display", "none")
    $("#TimeUpgradesTabButton2").css("display", "none")
  }
  if(player.TimeUpgrades[2][1]==1||player.TimeUpgrades[2][2]==1||player.TimeUpgrades[2][3]==1){
    $("#TimeUpgradesTabButton3").css("display", "inline");
  }
  else{
    $("#TimeUpgradesTabButton3").css("display", "none");
  }

  //Time Upgrades effect
  $("#TimeUpgrade21Effect").text(allnotations[player.currentnotation].format(new Decimal(5).pow(Decimal.log10(player.timeprestigeamount.plus(1))),2,2))
  $("#TimeUpgrade22Effect").text(allnotations[player.currentnotation].format(new Decimal(3).pow(Decimal.log10(player.timeamount.times(5).plus(1))),2,2))
  $("#TimeUpgrade32Effect").text(allnotations[player.currentnotation].format(new Decimal(1.1).pow(player.expansions),2,2))


  //colour of Time upgrades
  //QOL upgrades are considered as 4
  for (i=1;i<=4;i++){
    for(j=1;j<=3;j++){
      $("#TimeUpgrade"+i+j+"Cost").css("display", "inline")
      if(player.TimeUpgrades[i][j]==1){
        $("#TimeUpgrade"+i+j+"Cost").css("display", "none")
        $("#TimeUpgrade"+i+j+"Desc").css("color", "#00dd00")
      }else{
        $("#TimeUpgrade"+i+j+"Desc").css("color", "#000000")
        if (player.timeamount.gte(new Decimal(timeupgradescost[i][j]))){
          $("#TimeUpgrade"+i+j+"Cost").css("color", "#0000ff")
        } else{
          $("#TimeUpgrade"+i+j+"Cost").css("color", "#000000")
        }
      }
    }
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


//change visibility of layers, upgrades etc
function visibility(){
  $("#time-prestige-section").css("display", "none");
  $("#autobuymax").css("display", "none");
  $("#autoexpansion").css("display", "none");
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
  }else if(player.expansions.gte(1)){
    $("#timeprestige").css("display", "block");
    $("#dimlayer2").css("display", "block");
    $("#dimlayer3").css("display", "block");
    $("#expansion").css("display", "block");
    $("#buymax").css("display", "inline");
  }else{
    if (player.layers["dimlayer1"].bought.gte(1)){
      $("#dimlayer2").css("display", "block");
    }
    if (player.layers["dimlayer2"].bought.gte(1)){
      $("#dimlayer3").css("display", "block");
    }
    if (player.layers["dimlayer3"].bought.gte(1)){
      $("#expansion").css("display", "block");
    }
  }
  if(player.TimeUpgrades[4][1]==1){
    $("#autoexpansion").css("display", "inline");
  }
  else{
    // dunnp where to put it
    player.autoexpansion = false
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

function OpenTimeUpgradesTab(tier){
  var tabcontent = $(".TimeUpgradesTiers")
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  $("#TimeUpgradesTier"+tier).css("display", "block");
}

//update everything that ran on set timed interval
setInterval(function update(){
             autobuymax();
             dynamicvariable();
             producemoney();
             dynamicvariable()
             autoexpansion();
             dynamicvariable()
             visibility();
             dynamicdisplay();
           },50);


//buttons
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

$('#TimeUpgrade11').click(function () {BuyTimeUpgrade(1,1)})
$('#TimeUpgrade12').click(function () {BuyTimeUpgrade(1,2)})
$('#TimeUpgrade13').click(function () {BuyTimeUpgrade(1,3)})
$('#TimeUpgrade21').click(function () {BuyTimeUpgrade(2,1)})
$('#TimeUpgrade22').click(function () {BuyTimeUpgrade(2,2)})
$('#TimeUpgrade23').click(function () {BuyTimeUpgrade(2,3)})
$('#TimeUpgrade31').click(function () {BuyTimeUpgrade(3,1)})
$('#TimeUpgrade32').click(function () {BuyTimeUpgrade(3,2)})
$('#TimeUpgrade33').click(function () {BuyTimeUpgrade(3,3)})
$('#TimeUpgrade41').click(function () {BuyTimeUpgrade(4,1)})
$('#TimeUpgrade42').click(function () {BuyTimeUpgrade(4,2)})
$('#TimeUpgrade43').click(function () {BuyTimeUpgrade(4,3)})

$('#optionsbutton\\.changenotations').click(function() {changenotations()});
$('#optionsbutton\\.changeautosave').click(function() {changeautosave()});
