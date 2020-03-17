var player = {
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
  expansioncostincrease: new Decimal(2)
  };
var updaterate = 50;
const allnotations = [new ADNotations.StandardNotation(), new ADNotations.ScientificNotation(), new ADNotations.EngineeringNotation(), new ADNotations.LettersNotation()]
var currentnotation = 0

//produces money according to a set interval
function producemoney(){
  player.layers["dimlayer2"].amount = player.layers["dimlayer2"].amount.plus(player.layers["dimlayer3"].amount.times(player.layers["dimlayer3"].multi.times(updaterate)).div(1000));
  player.layers["dimlayer1"].amount = player.layers["dimlayer1"].amount.plus(player.layers["dimlayer2"].amount.times(player.layers["dimlayer2"].multi.times(updaterate)).div(1000));
  player.money = player.money.plus(player.layers["dimlayer1"].amount.times(player.layers["dimlayer1"].multi.times(updaterate)).div(1000));
};

//update money
function updatemoney(){
    document.getElementById('player.money').innerHTML = allnotations[currentnotation].format(player.money,2,1);
};

//update cost
function updatecost(layername){
  document.getElementById(layername + 'cost').innerHTML = allnotations[currentnotation].format(player.layers[layername].cost,2,0) + " Space";
};

//update multi
function updatemulti(layername){
  document.getElementById(layername + 'multi').innerHTML = "x" + allnotations[currentnotation].format(player.layers[layername].multi,2,1);
};

//update bought
function updatebought(layername){
  document.getElementById(layername + 'bought').innerHTML = "(" + allnotations[currentnotation].format(player.layers[layername].bought,2,0) + ")";
};

//update amount
function updateamount(layername){
  document.getElementById(layername + 'amount').innerHTML = allnotations[currentnotation].format(player.layers[layername].amount,2,0);
};

//buy layers
function buylayer(layername){
  if(player.money.gte(player.layers[layername].cost)){
    player.money = player.money.minus(player.layers[layername].cost);
    player.layers[layername].amount = player.layers[layername].amount.plus(1);
    player.layers[layername].bought = player.layers[layername].bought.plus(1);
    player.layers[layername].cost = player.layers[layername].cost.times(player.layers[layername].costincrease);
    player.layers[layername].multi = player.layers[layername].multi.times(player.layers[layername].multiincrease);
    };
};

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
      player.layers[layername].multi = player.layers[layername].basemulti.times(new Decimal(2).pow(player.expansions));
      player.money = player.initmoney;
    };
  };
};

//update stuff of doing an expansion
function updateexpansionstuff(){
  document.getElementById('expansionamount').innerHTML = allnotations[currentnotation].format(player.expansions,2,0);
  document.getElementById('expansioncost').innerHTML = allnotations[currentnotation].format(player.expansioncost,2,0) + " Square";
}

//update everything that ran on set timed interval
setInterval(function update(){
             producemoney();
             updatemoney();
             for(i = 1 ; i <= 3 ; i ++){
               var layername = "dimlayer" + i;
               updatecost(layername);
               updatemulti(layername);
               updatebought(layername);
               updateamount(layername);
             }
             updateexpansionstuff();
             visibility();
           },50);




//visual stuffs

//change visibility of layers etc
function visibility(){
  if (player.layers["dimlayer1"].bought.gte(5)){
    document.getElementById("dimlayer2").style.display = "block";
  }
  else{
    document.getElementById("dimlayer2").style.display = "none";
  };
  if (player.layers["dimlayer2"].bought.gte(5)){
    document.getElementById("dimlayer3").style.display = "block";
  }
  else{
    document.getElementById("dimlayer3").style.display = "none";
  };
  if (player.layers["dimlayer3"].bought.gte(5)){
    document.getElementById("expansion").style.display = "block";
  };
};

//tabs changes
function opentab(tab){
  var tabcontent = document.getElementsByClassName("tabcontents");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(tab+"tab").style.display = "inline";
};

//change notations
function changenotations(){
  var list = ['Standard', 'Scientific', 'Engineering', 'Letters']
  currentnotation ++;
  if(currentnotation > (list.length - 1) ){
    currentnotation = 0;
  };
  document.getElementById('currentnotation').innerHTML = list[currentnotation]
}
