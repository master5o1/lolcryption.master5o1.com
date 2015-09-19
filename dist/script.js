(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _primes = require('primes');

var _primes2 = _interopRequireDefault(_primes);

var _isPrime = require('is-prime');

var _isPrime2 = _interopRequireDefault(_isPrime);

exports['default'] = {
  enlolcrypt: enlolcrypt,
  delolcrypt: delolcrypt,
  imgurEncrypt: imgurEncrypt,
  imgurDecrypt: imgurDecrypt,
  theuconEncrypt: theuconEncrypt,
  theuconDecrypt: theuconDecrypt,
  theuconScrambleArray: theuconScrambleArray,
  theuconUnscrambleArray: theuconUnscrambleArray,
  theuconEncryptPreserveSpaces: theuconEncryptPreserveSpaces,
  theuconDecryptPreserveSpaces: theuconDecryptPreserveSpaces,
  rot13: rot13,
  tr: tr
};

function rot13(text) {
  return tr(text, 'abcdefghijklmnopqrstuvwxyz', 'nopqrstuvwxyzabcdefghijklm');
}

function enlolcrypt(text) {
  return tr(text, 'aeioubcdfghjklmnpqrstvwxyz', 'iouaenpqrstvwxyzbcdfghjklm');
}

function delolcrypt(text) {
  return tr(text, 'iouaenpqrstvwxyzbcdfghjklm', 'aeioubcdfghjklmnpqrstvwxyz');
}

function imgurEncrypt(text) {
  return tr(text, '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./', '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.');
}

function imgurDecrypt(text) {
  return tr(text, '/1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,.', '1234567890-=qwertyuiopasdfghjkl;\'zxcvbnm,./');
}

function theuconEncrypt(text) {
  return theuconScrambleArray(text.split('')).join('');
}

function theuconDecrypt(text) {
  return theuconUnscrambleArray(text.split('')).join('');
}

function theuconEncryptPreserveSpaces(text) {
  var textArray = text.split('');
  var spaceless = text.replace(/\ /g, '');
  var spacelessArray = spaceless.split('');
  var characters = theuconScrambleArray(spacelessArray);

  return textArray.map(function (c) {
    return c === ' ' ? c : characters.shift();
  }).join('');
}

function theuconDecryptPreserveSpaces(text) {
  var spaceless = text.replace(/\ /g, '');
  var textArray = text.split('');
  var spacelessArray = spaceless.split('');
  var characters = theuconUnscrambleArray(spacelessArray);

  return textArray.map(function (c) {
    return c === ' ' ? c : characters.shift();
  }).join('');
}

function theuconScrambleArray(remaining) {
  var output = [];

  var _loop = function () {
    var primeIndexed = [];
    remaining = remaining.filter(function (r, i) {
      var accepted = i === 0 || (0, _isPrime2['default'])(i);
      if (accepted) {
        primeIndexed.push(r);
      }
      return !accepted;
    });
    output = output.concat(primeIndexed);
  };

  while (remaining.length > 0) {
    _loop();
  }
  return output;
}

function theuconUnscrambleArray(remaining) {
  var output = [];

  var _loop2 = function () {
    var primes = [0].concat((0, _primes2['default'])(0, remaining.length));
    var currentOutput = remaining.map(function () {
      return '';
    });
    var current = remaining.splice(0, primes.length);

    primes.forEach(function (p, i) {
      currentOutput[primes[i]] = current[i];
    });

    if (output.length === 0) {
      output = currentOutput;
    } else {
      output = output.map(function (o) {
        return o === '' ? currentOutput.shift() : o;
      });
    }
  };

  while (remaining.length) {
    _loop2();
  }
  return output;
}

function tr(text) {
  var inAlphabet = arguments.length <= 1 || arguments[1] === undefined ? 'abcdefghijklmnopqrstuvwxyz' : arguments[1];
  var outAlphabet = arguments.length <= 2 || arguments[2] === undefined ? 'abcdefghijklmnopqrstuvwxyz' : arguments[2];

  return text.replace(new RegExp('([' + inAlphabet + '])', 'ig'), function (value) {
    var index = inAlphabet.indexOf(value.toLowerCase());
    var c = outAlphabet[index] || value;
    return (/[A-Z]/.test(value) ? c.toUpperCase() : c
    );
  });
}
module.exports = exports['default'];
},{"is-prime":2,"primes":6}],2:[function(require,module,exports){
'use strict';

var numberIsInteger = require('number-is-integer');

function isPrime (n) {
  if(n === 1) {
    return false
  }
  if (n === 2 || n === 3) {
    return true;
  }
  else if ( (n % 2 === 0) || (n % 3 === 0) ){
    return false;
  }
  else {
    var p=5;
    var w=2;
    while ( p * p <= n ){
      if (n % p === 0) { return false; }
      p += w;
      w = 6 - w;
    }
    return true;
  }
}

module.exports = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Expected a number');
  }
  if(n<=0) {
    throw new Error('The number must be a positive integer');
  }
  if(!numberIsInteger(n)){
    throw new Error('The number must be a integer');
  }
  return isPrime(n);
};

},{"number-is-integer":3}],3:[function(require,module,exports){
'use strict';
var numberIsFinite = require('is-finite');

module.exports = Number.isInteger || function (x) {
	return numberIsFinite(x) && Math.floor(x) === x;
};

},{"is-finite":4}],4:[function(require,module,exports){
'use strict';
var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":5}],5:[function(require,module,exports){
'use strict';
module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],6:[function(require,module,exports){
'use strict';

var isprime = require('isprime');

/**
 *  Generate prime numbers according to the lower and upper bound
 *  @param {Number} min
 *  @param [{Number}] max
 */

module.exports = function(min, max) {
  var holdme;

  if (!arguments.length) return [];
  if (min < 0 || max < 0) return [];
 
  if (min === max) return isprime(min) ? [min] : [];

  if (~min && ~max && min > max) {
    holdme = min;
    min = max;
    max = holdme;
  };
  
  if (max === undefined) {
    max = min;
    min = 0;
  };

  if (min == 0) min = 1;

  return new Array(max+1)
    .join(',').split(',')
    .map(function(a, b){ return b; })
    .slice(min, max)
    .filter(isprime);
};


},{"isprime":7}],7:[function(require,module,exports){
'use strict';

/**
 *	Find is num is prime
 *	@param {Number} num
 */
module.exports = function(num) {
  if (num == 1) return false;
  num += 2;

  var upper = Math.sqrt(num);
	var sieve = new Array(num)
		.join(',').split(',') // get values for map to work
		.map(function(){ return true });
  
  for (var i = 2; i <= num; i++) {
    if (sieve[i]) {
      for (var j = i * i; j < num; j += i) {
        sieve[j] = false;
      };
    };
  };

  return sieve[num-2];
};

},{}],8:[function(require,module,exports){
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

},{"lolcryption":1}]},{},[8]);
