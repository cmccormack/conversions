
WORD = Math.pow(2,16);
DWORD = Math.pow(2,32);

$("document").ready(function() {

  $("form").submit(function(e) {
    var $input = $(e.target).find(".user-input");
    console.log($input);
    console.log("Form Submitted");
    e.preventDefault();
    convertToDecimal(":");
    $input[0].selectionStart = 0;
  });
    
  $("#bgpCVtoDecimal").click(function(){
    convertToDecimal(":");
  });

  $("#bgpCVtoNewFormat").click(function(){
    convertDecimalToFormat(".", false);
  });


  $(".clear-btn").click(function(e){
    console.log("Clear button clicked");
    $target = $(e.target);
    $target.closest(".input-group").find('input[type="text"]').val("");
    $target.closest(".input-group").find(".user-input").focus();
  });

});




function convertToDecimal(sep){
  var text = $("#bgpNewFormatInput").val(),
      left = 0, right = 0,
      output = "Invalid";

  if (text.match(/\d+:\d*/g)){
    text = text.split(sep).map(Number);

    if (text[0] > WORD - 1 || text[1] > WORD - 1){
      if (text[0] > WORD - 1) { output += " [" + text[0] + "]"; }
      if (text[1] > WORD - 1) { output += sep +"[" + text[1] + "]"; }
    } else {
      output = text[0] * WORD + text[1];
    }
  } else { output += " Entry"; }

  $("#bgpCVtoDecimalOutput").val(output);
}

function convertDecimalToFormat(sep, showLeft){
  var text = $("#bgpDecimalInput").val(),
      left = 0, right = 0,
      output = "Invalid";

  if (text.match(/\d+/)){
    text = Number(text);

    if (text < 0 || text > DWORD - 1){
      if (text < 0) { output += ": Too Low"; }
      if (text > DWORD - 1) { output += ": Too High"}
    } else {
      left = Math.floor(text/WORD);
      right = text % WORD;

      output = left + sep + right; 
      if (!showLeft && text < WORD){ 
        output = right;
      } 
    }
  } else { output += " Entry"; }

  $("#bgpCVtoNewFormatOutput").val(output);
}
