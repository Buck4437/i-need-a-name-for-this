var player = {
    money: new Decimal(1),
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
        costincrease: new Decimal(15),
        multiincrease: new Decimal(1.5)
      }
    }
  };
var updaterate = 50;

//produces money according to a set interval
function producemoney(){
  player.layers["dimlayer1"].amount = player.layers["dimlayer1"].amount.plus(player.layers["dimlayer2"].amount.times(player.layers["dimlayer2"].multi.times(updaterate)).div(1000));
  player.money = player.money.plus(player.layers["dimlayer1"].amount.times(player.layers["dimlayer1"].multi.times(updaterate)).div(1000));
};

//update money
function updatemoney(){
  if(player.money.lt(1000)){
    document.getElementById('player.money').innerHTML = player.money.toFixed(1);
  } else{
    document.getElementById('player.money').innerHTML = player.money.round();
  };
};

//update cost
function updatecost(layername){
  document.getElementById(layername + 'cost').innerHTML = player.layers[layername].cost.round() + "[PLACEHOLDER]";
};

//update multi
function updatemulti(layername){
  document.getElementById(layername + 'multi').innerHTML = "x" + player.layers[layername].multi.toFixed(1);
};

//update bought
function updatebought(layername){
  document.getElementById(layername + 'bought').innerHTML = "(" + player.layers[layername].bought.round() + ")";
};

//update amount
function updateamount(layername){
  document.getElementById(layername + 'amount').innerHTML = player.layers[layername].amount.round();
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

//change visibility of layers etc
function visibility(){
  if (player.layers["dimlayer1"].bought.gte(5)){
    document.getElementById("dimlayer2").style.visibility = "visible";
  };
};

//update everything that ran on set timed interval
setInterval(function update(){
             producemoney();
             updatemoney();
             for(i = 1 ; i <= 2 ; i ++){
               var layername = "dimlayer" + i;
               updatecost(layername);
               updatemulti(layername);
               updatebought(layername);
               updateamount(layername);
             }
             visibility();
           },50);
