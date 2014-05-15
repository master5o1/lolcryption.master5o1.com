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

    $('#theuconEncrypt').on('click', function () {
        var ciphertext = theuconEncrypt($('#plaintext').val());
        $('#ciphertext').val(ciphertext);
    });
    $('#theuconDecrypt').on('click', function () {
        var plaintext = theuconDecrypt($('#ciphertext').val());
        $('#plaintext').val(plaintext);
    });
    
    $('#theuconExEncrypt').on('click', function () {
        var ciphertext = theuconExEncrypt($('#plaintext').val());
        $('#ciphertext').val(ciphertext);
    });
    $('#theuconExDecrypt').on('click', function () {
        var plaintext = theuconExDecrypt($('#ciphertext').val());
        $('#plaintext').val(plaintext);
    });

    $('#rot13').on('click', function () {
        var plaintext = rot13($('#plaintext').val());
        var ciphertext = rot13($('#ciphertext').val());
        $('#ciphertext').val(ciphertext);
        $('#plaintext').val(plaintext);
    });


    function theuconExEncrypt(str) {
        var spaceless = str.replace(/\ /g, '');
        spaceless = theuconEncrypt(spaceless);
        var characters = spaceless.split('');
        return str.split('').map(function (c) {
            return c === ' ' ? c : characters.shift();
        }).join('');
    }
    
    function theuconExDecrypt(str) {
        var spaceless = str.replace(/\ /g, '');
        spaceless = theuconDecrypt(spaceless);
        var characters = spaceless.split('');
        return str.split('').map(function (c) {
            return c === ' ' ? c : characters.shift();
        }).join('');
    }

    function theuconDecrypt(str) {
        var output = [];
        var remaining = str.split('');
        while (remaining.length) {
            var primes = [0].concat(primesUntil(remaining.length));
            var currentOutput = new Array(remaining.length).join('-').split('-');
            var current = remaining.splice(0, primes.length);

            for (var i = 0; i < primes.length; i++) {
                currentOutput[primes[i]] = current[i];
            }

            if (output.length === 0) {
                output = currentOutput;
            } else {
                for (var j = 0; j < output.length; j++) {
                    if (output[j] === '') {
                        output[j] = currentOutput.shift();
                    }
                }
            }
        }

        return output.join('');
    }

    function theuconEncrypt(input) {
        var output = [],
            remaining = input.split('');
        while (remaining.length > 0) {
            var primeIndexed = [],
                nonPrimeIndexed = [];
            for (var i = 0; i < remaining.length; i++) {
                if (i === 0 || isPrime(i)) {
                    primeIndexed.push(remaining[i]);
                } else {
                    nonPrimeIndexed.push(remaining[i]);
                }
            }
            output = output.concat(primeIndexed);
            remaining = nonPrimeIndexed;
        }

        return output.join('');
    }

    function isPrime(n) {
        if (n == 2) {
            return true;
        } else if ((n < 2) || (n % 2 === 0)) {
            return false;
        } else {
            for (var i = 3; i <= Math.sqrt(n); i += 2) {
                if (n % i === 0) return false;
            }
            return true;
        }
    }

    function primesUntil(max) {
        var primes = [];
        for (var i = 0; i < max; i += 1) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }


})(jQuery);
