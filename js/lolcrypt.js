(function ($) {
    'use strict';
    var tr = function (str, inAlphabet, outAlphabet) {
        inAlphabet = inAlphabet || 'aeioubcdfghjklmnpqrstvwxyz';
        outAlphabet = outAlphabet || 'iouaenpqrstvwxyzbcdfghjklm';
        return str.replace(new RegExp('([' + inAlphabet + '])', 'ig'), function (value) {
            var index = inAlphabet.indexOf(value.toLowerCase());
            var c = outAlphabet[index] || value;
            return /[A-Z]/.test(value) ? c.toUpperCase() : c;
        });
    };

    var imgurEncrypt = function (str) {
        return tr(str, '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./', '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.');
    };

    var imgurDecrypt = function (str) {
        return tr(str, '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.', '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./');
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
    
    $('#imgurEncrypt').on('click', function () {
        var ciphertext = imgurEncrypt($('#plaintext').val());
        $('#ciphertext').val(ciphertext);
    });
    $('#imgurDecrypt').on('click', function () {
        var plaintext = imgurDecrypt($('#ciphertext').val());
        $('#plaintext').val(plaintext);
    });
    
    $('#rot13').on('click', function () {
        var plaintext = rot13($('#plaintext').val());
        var ciphertext = rot13($('#ciphertext').val());
        $('#ciphertext').val(ciphertext);
        $('#plaintext').val(plaintext);
    });


})(jQuery);
