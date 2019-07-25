$(document).ready(function() {

//This sets the variables for the random number, the users totals, wins, and losses.

    var randomNum = 0;
    var usersTotal = 0;
    var wins = 0;
    var losses = 0;

//This function generates the random number for the computers number, starting from a vualue of 20,
//and up to 80.

function setgameRandnum(){
  randomNum = Math.floor((Math.random()*60)+20);
  
};

//This function generates a random number between 1 and 12, and writes only unique values to the 
//array 'crystalNumArray'.  It then loops through the array, and writes each value to
//each crystals value.
//

function setCrystalvalues() {
  var crystalNumArray = []
  while(crystalNumArray.length < 4){
      var r = Math.floor(Math.random()*12) + 1;
      if(crystalNumArray.indexOf(r) === -1) crystalNumArray.push(r);
      
  };
  for(let i = 0; i < crystalNumArray.length; i++){
  
  let crystalNum = (crystalNumArray[i]);
  console.log(crystalNum);                          
  $(".crystal").eq(i).attr("value", crystalNum);

  };
};

//Generates the computers number.  
setgameRandnum();

//Updates the display with the inital values.

  $(".wins").text("Wins: " + wins);
  $(".losses").text("Losses: " + losses);
  $(".randomNumber").text(randomNum);
  //$(".yourScore").attr("value", usersTotal);
  $(".yourScore").text(usersTotal);
  
//Generates each crytals random number.
setCrystalvalues();

//This is the button click event for each crystal.  It outputs
//to the display and increments the users total score.

$(".crystal").on("click", function(){
  usersTotal = parseInt(usersTotal) + parseInt($(this).attr('value'));

  console.log("your number: " + $(this).attr('value'));
  console.log("yoursum: "+usersTotal);

  $(".yourScore").text(usersTotal);

//This checks if the users total is greater than the games number.
//If so, then losses are incremented and the display is updated.
//It then regenerates new crystal numbers and the computers number.

if(usersTotal > randomNum) {
  losses++;
  console.log("losses: " + losses);
  $(".losses").text("Losses: " + losses);
  usersTotal = 0;
  $(".yourScore").text(usersTotal);
  alert("You went over!!  Try again.");
//reset crystal values and games random number.
setCrystalvalues();
setgameRandnum();

//updates the new random number to the display
$(".randomNumber").text(randomNum);
}
//If the users total equals the computers number, then it increments the wins total,
// regenerates new numbers for the crystals and the computers number, and updates the display.
else{
  if(usersTotal == randomNum){
    wins++;
    $(".wins").text("Wins: " +wins);
      usersTotal = 0;
      setCrystalvalues();
      setgameRandnum();
      $(".yourScore").text(usersTotal);
      $(".randomNumber").text(randomNum);
      alert("Congratulations!!!  You Won!!"); 

  }};

});

});
