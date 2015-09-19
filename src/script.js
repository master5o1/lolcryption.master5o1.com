/* global document, $ */
var lolcryption = require('lolcryption');

$(document).ready(function() {
  var $plaintext = $('#plaintext');
  var $ciphertext = $('#ciphertext');
  $('.from-plaintext').on('click', function(){
    var algorithm = $(this).data('algorithm');
    translate(algorithm, $plaintext, $ciphertext);
  });

  $('.to-plaintext').on('click', function(){
    var algorithm = $(this).data('algorithm');
    translate(algorithm, $ciphertext, $plaintext);
  });

  $('.rot13').on('click', function(){
    translate('rot13', $ciphertext, $ciphertext);
    translate('rot13', $plaintext, $plaintext);
  });

  function translate(algorithm, $input, $output) {
    var input = $input.val();
    var output = lolcryption[algorithm](input);
    $output.val(output);
  }
});
