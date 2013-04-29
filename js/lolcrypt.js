(function ($) {
    'use strict';
    var enlolcrypt = function (str, cipher) {
        cipher = cipher || "aeioubcdfghjklmnpqrstvwxyz";
        return str.split("").map(function (T) {
            var c = /[A-Z]/.test(T),
                i = null;
            T = T.toLowerCase();
            i = cipher.indexOf(T);
            if (/[^a-z]/.test(T)) {
                return T;
            }

            if ((new RegExp("[" + cipher.substr(0, 5) + "]")).test(T)) {
                T = cipher[(i + 2) % 5];
            } else {
                T = cipher[(i + 5) % 21 + 5];
            }

            return c ? T.toUpperCase() : T;
        }).join("");
    };

    var delolcrypt = function (str, cipher) {
        cipher = cipher || "aeioubcdfghjklmnpqrstvwxyz";
        return str.split("").map(function (T) {
            var c = /[A-Z]/.test(T),
                i = null,
                mod = null;
            T = T.toLowerCase();
            i = cipher.indexOf(T);
            mod = function (a, n) {
                return ((a % n) + n) % n;
            };
            if (/[^a-z]/.test(T)) {
                return T;
            }

            if ((new RegExp("[" + cipher.substr(0, 5) + "]")).test(T)) {
                T = cipher[mod(i - 2, 5)];
            } else {
                T = cipher[mod(i - 15, 21) + 5];
            }

            return c ? T.toUpperCase() : T;
        }).join("");
    };

    $('#enlolcrypt').on('click', function () {
        var ciphertext = enlolcrypt($('#plaintext').val());
        $('#ciphertext').val(ciphertext);
    });
    $('#delolcrypt').on('click', function () {
        var plaintext = delolcrypt($('#ciphertext').val());
        $('#plaintext').val(plaintext);
    });


})(jQuery);