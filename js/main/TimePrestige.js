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
