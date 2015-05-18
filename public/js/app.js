// wait for the window to load
$(function () {
  var phraseTemp = _.template($("#phraseTemp").html())
  var $phraseHold = $("#phraseHold");
  var $newPhrase = $("#newPhrase");
  
  //grabs and templates all the phrases to the page
  $.get("/phrases").
      done(function (phrases) {
        _(phrases).each(function (phrase) {
            var $phrase = $(phraseTemp(phrase))
            $phrase.data("_id", phrase._id);
            console.log($phrase.data());
            $phraseHold.append($phrase);
          });
      });

  //listens for a submission
  $newPhrase.on("submit", function (event) {
    event.preventDefault();
    var phraseData = $newPhrase.serialize();
    $.post("/phrases", phraseData).
      done(function (data) {
        var $phrase = $(phraseTemp(data));
        // console.log(data);
        // console.log($phrase)
        $phrase.data("_id", data._id);
        $phraseHold.append($phrase);
        $newPhrase[0].reset();
      });
  });

  $phraseHold.on("click", ".phraseCon .delete", function (event) {
    var $phrase = $(this).closest(".phraseCon");
    var _id = $phrase.data("_id");
    console.log("DELETE", _id);
    $.ajax({
      url: "/phrases/" + _id,
      type: "DELETE"
    }).done(function () {
      $phrase.remove();
    });
  });
});
