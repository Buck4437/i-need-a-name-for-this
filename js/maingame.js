var player = {
    money:1,
    layers:{
      dimlayer1:{
        amount:0,
        bought:0,
        cost:1,
        multi:1,
        basecost:1,
        costincrease:5,
        multiincrease:1.5
      }
    }
  };
var updaterate = 50;

//produces money according to a set interval
function producemoney(){
  player.money += player.layers["dimlayer1"].amount * player.layers["dimlayer1"].multi * updaterate / 1000;
};

//update money
function updatemoney(){
  document.getElementById('player.money').innerHTML = Math.round(player.money * 10) / 10;
};

//update cost
function updatecost(layername){
  document.getElementById(layername + 'cost').innerHTML = Math.round(player.layers[layername].cost);
};

//update multi
function updatemulti(layername){
  document.getElementById(layername + 'multi').innerHTML = "x" + Math.round(player.layers[layername].multi * 10) / 10;
};

//update bought
function updatebought(layername){
  document.getElementById(layername + 'bought').innerHTML = "(" + Math.round(player.layers[layername].bought) + ")";
};

//update amount
function updateamount(layername){
  document.getElementById(layername + 'amount').innerHTML = Math.round(player.layers[layername].amount);
};

//buy layers
function buylayer(layername){
  if(player.money >= player.layers[layername].cost){
    player.money -= player.layers[layername].cost;
    player.layers[layername].amount ++;
    player.layers[layername].bought ++;
    player.layers[layername].cost *= player.layers[layername].costincrease;
    player.layers[layername].multi *= player.layers[layername].multiincrease;
    //updatemoney handled by update()
    updatecost(layername);
    updatemulti(layername);
    updatebought(layername);
    updateamount(layername);
  };
};

//update everything that ran on set timed interval
setInterval(function update(){
             producemoney();
             updatemoney();
           },50);
