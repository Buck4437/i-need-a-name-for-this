var player = {
  money:1,
  basecost:[null,1,10,100],
  basecostincrease:[null,2,10,50],
  multiplier:[null,1,1,1],
  multiplierincrease:[null,1.5,1.5,1.5],
  layers:{
    dim1:{
      index:1,
      amount:0,
      bought:0,
      cost:1
    },
    dim2:{
      index:2,
      amount:0,
      bought:0,
      cost:10
    },
    dim3:{
      index:3,
      amount:0,
      bought:0,
      cost:100
    }
  }
};

//update money
function updatemoney(){
  document.getElementById('player.money').innerHTML = player.money;
};

//update cost
function updatecost(layername){
  document.getElementById('cost'+layername).innerHTML = player.layers[layername].cost;
};

//update multi
function updatemulti(layername, index){
  document.getElementById('multiplier'+layername).innerHTML = player.multiplier[index];
};

//buy layers
function buylayer(layername){
  index = player.layers[layername].index
  if (player.money >= player.layers[layername].cost){
    player.money = player.money - player.layers[layername].cost
    player.layers[layername].cost = player.layers[layername].cost * player.basecostincrease[index]
    player.multiplier[index] = player.multiplier[index] * player.multiplierincrease[index]
    updatemoney();
    updatecost(layername);
    updatemulti(layername, index);
  };
};


updatemoney();
