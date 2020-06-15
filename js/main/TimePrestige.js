//buy time upgrades
function BuyTimeUpgrade(a,b){
  if(player.TimeUpgrades[a][b]!=1){
    if(player.timeamount.gte(timeupgradescost[a][b])){
      player.TimeUpgrades[a][b]=1
      player.timeamount=player.timeamount.minus(new Decimal(timeupgradescost[a][b]))
    }
  }
}

//buttons

for (let i = 1; i <=4; i++){
  for (let j = 1; j <=3; j++){
    $('#TimeUpgrade'+i+j).click(function (){BuyTimeUpgrade(i,j)})
  }
}
