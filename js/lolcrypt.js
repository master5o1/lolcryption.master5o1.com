(function ($) {
    'use strict';
    var tr = function (str, inAlphabet, outAlphabet) {
        inAlphabet = inAlphabet || 'aeioubcdfghjklmnpqrstvwxyz';
        outAlphabet = outAlphabet || 'iouaenpqrstvwxyzbcdfghjklm';

        return str.split('').map(function (c) {
            var isCaps, index;
            isCaps = /[A-Z]/.test(c);
            c = c.toLowerCase();
            index = inAlphabet.indexOf(c);
            c = index > -1 ? outAlphabet.charAt(index) : c;
            return isCaps ? c.toUpperCase() : c;
        }).join('');
    };

    var enlolcrypt = function (str) {
        return tr(str, 'aeioubcdfghjklmnpqrstvwxyz', 'iouaenpqrstvwxyzbcdfghjklm');
    };

    var delolcrypt = function (str) {
        return tr(str, 'iouaenpqrstvwxyzbcdfghjklm', 'aeioubcdfghjklmnpqrstvwxyz');
    };
    
    var rot13 = function (str) {
        return tr(str, 'abcdefghijklmnopqrstuvwxyz', 'nopqrstuvwxyzabcdefghijklm');
    };

    $('#enlolcrypt').on('click', function () {
        var ciphertext = enlolcrypt($('#plaintext').val());
        $('#ciphertext').val(ciphertext);
    });
    $('#delolcrypt').on('click', function () {
        var plaintext = delolcrypt($('#ciphertext').val());
        $('#plaintext').val(plaintext);
    });
    
    $('#rot13-plain').on('click', function () {
        var ciphertext = rot13($('#plaintext').val());
        $('#ciphertext').val(ciphertext);
    });
    
    $('#rot13-cipher').on('click', function () {
        var plaintext = rot13($('#ciphertext').val());
        $('#plaintext').val(plaintext);
    });


})(jQuery);
