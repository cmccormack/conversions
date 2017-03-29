
WORD = Math.pow(2,16);
DWORD = Math.pow(2,32);

funcs = {
  "bgpNewFormatToDecimal": convertToDecimal,
  "bgpDecimalToNewFormat": convertToFormat
};

$("document").ready(function() {

  $("form").submit(function(e) {
    e.preventDefault();
    var $form = $(this),
        $input = $form.find(".user-input"),
        $output = $form.find(".output"),
        func = $form.attr("data-function"),
        args = [$input.val()].concat( $form.attr("data-args").split(",") );

    console.log("output element: " + $output.attr("id"));
    console.log("Form " + $form.attr("id") + " submitted - input: '" + $input.val() +"'", "func: " + func, "args: " + args);
    
    // Calls function based on form data-function and data-args attributes
    $output.val( funcs[func].apply(null, args) );


    highlightText( $input );
  });
    

  $("#bgpCVtoNewFormat").click(function(){
    // convertDecimalToFormat( ".", false );
  });


  $(".clear-btn").click(function(e){
    console.log("Clear button clicked");
    $target = $( e.target );
    $target.closest(".input-group").find('input[type="text"]').val("");
    $target.closest(".input-group").find(".user-input").focus();
  });

});

// Selects all text in the user input 
function highlightText(textfield){
  textfield.select();
}

function convertToDecimal(val, sep){
  var text = val,
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

  return output;
}

function convertToFormat(val, sep, showLeft){
  var text = val,
    left = 0, right = 0,
    output = "Invalid";

  if (text.match(/\d+/)){
    text = Number(text);

    if (text < 0 || text > DWORD - 1){
      if (text < 0) { output += ": Too Low"; }
      if (text > DWORD - 1) { output += ": Too High"; }
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
