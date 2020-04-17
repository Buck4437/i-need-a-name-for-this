function updateUITop(){
  //top display
  //money
  $('#player\\.money').text(allnotations[player.currentnotation].format(player.money,2,1));
  //time
  $('#timeamount2').text("Time: " + allnotations[player.currentnotation].format(player.timeamount,2,0));
  //timeprestige2
  $('#timeprestige2').text("Reset to gain "+ allnotations[player.currentnotation].format(timeGainOnPrestige,2,0)+" Time");
}

//layers tab
function updateUILayer(){

  //space production
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
  $('#timeamount').text("Time: " + allnotations[player.currentnotation].format(player.timeamount,2,0))

  //colour of layers,expansion and time prestige if avaliable for purchase
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

function updateUIAutomation(){
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
}

function updateUITimeUpgrades(){

  //Time upgrade tab buttons
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


  //colour of Time upgrades if can afford
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
}

//options tab
function updateUIOptions(){
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
function updateUIVisibility(){
  $("#TopBarTimeAmount").css("visibility", "hidden");
  $("#timeprestige2").css("visibility", "hidden");

  $("#time-prestige-section").css("display", "none");
  $("#autobuymax").css("display", "none");
  $("#autoexpansion").css("display", "none");
  $("#timeprestige").css("display", "none");
  $("#dimlayer2").css("display", "none");
  $("#dimlayer3").css("display", "none");
  $("#expansion").css("display", "none");
  $("#buymax").css("display", "none");

  if(player.unlocks.TimeUpgrades){
    $("#TopBarTimeAmount").css("visibility", "visible");
    if(player.money.gte(1e27)){
      $("#timeprestige2").css("visibility", "visible");
    }

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
    // dunno where to put it
    player.autoexpansion = false
  }
}

function updateUI(){
   updateUITop()
   updateUILayer()
   updateUIAutomation()
   updateUITimeUpgrades()
   updateUIOptions()
   updateUIVisibility()
}
