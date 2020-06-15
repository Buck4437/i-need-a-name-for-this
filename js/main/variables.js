//they should be updated as soon as anything updates

function updateVariablesMoney(){
  if(player.money.gt(player.maxMoneyTime))[
    player.maxMoneyTime = player.money
  ]
}

function updateVariablesLayers(){
  for(jc = 1 ; jc <= 3 ; jc ++ ){
    let layer = "dimlayer" + jc;
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
    let ramping_starts = [null,50,28,16] //layer 1: 50, 2: 28, 3:16
    let ramp_coeff = Decimal.max(0,player.layers[layer].bought.minus(ramping_starts[jc]-1))
    let ramp_coeff2 = ramp_coeff.times(ramp_coeff.plus(1)).div(2)

    if(player.TimeUpgrades[3][3]==1){
      player.layers[layer].cost = player.layers[layer].cost.times(Decimal.max(1,Decimal.pow(1.1, ramp_coeff2)))
    }
    else {
      player.layers[layer].cost = player.layers[layer].cost.times(Decimal.max(1,Decimal.pow(1.5, ramp_coeff2)))
    }
  }
}

function updateVariablesExpansions(){
  player.expansioncost = player.expansions.times(new Decimal(2)).plus(new Decimal(5));
}

function updateVariablesTime(){
  //prestige time gain
  timeGainOnPrestige = Decimal.pow(10, Decimal.minus(Decimal.log10(player.maxMoneyTime),27).div(27))
  if(player.TimeUpgrades[3][2]==1){
    timeGainOnPrestige = timeGainOnPrestige.times(new Decimal(1.1).pow(player.expansions))
  }
  timeGainOnPrestige = Decimal.max(1,timeGainOnPrestige.floor())
}

function updateVariables(){
  updateVariablesMoney()
  updateVariablesLayers()
  updateVariablesExpansions()
  updateVariablesTime()
}
