(function (ng) {
  'use strict';

  /**
   * Capitalizes a string.
   */
  function capitalize(input, all) {
    if (!ng.isString(input)) {
      return input;
    }

    input = input.toLowerCase();

    if (all) { /* Capitalize each word */
      return input.replace(/(?:^|\s)\S/g, function (match) {
        return match.toUpperCase();
      });
    } else { /* Capitalize the first word only */
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
  }

  /**
   * Formats a Number as bytes.
   */
  function bytes(num, precision) {
    if (isNaN(parseFloat(num)) || !isFinite(num)) {
      return '-';
    }

    if (!precision) {
      precision = 1;
    }

    var number = Math.floor(Math.log(num) / Math.log(1024));
    var size = num / Math.pow(1024, Math.floor(number));
    var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];

    return size.toFixed(precision) + ' ' + units[number];
  }

  /**
   * Formats a string with replacements.
   */
  function format(str) {
    if (!str || arguments.length < 2) {
      return str;
    }

    for (var i = 1; i < arguments.length; i++) {
      var regex = new RegExp('\\{' + (i - 1) + '\\}', 'igm');
      str = str.replace(regex, arguments[i]);
    }

    return str;
  }

  /** Angular Module */
  var m = ng.module('Formatter', []);

  /** SERVICE */
  m.service('$formatter', function () {

    return {
      capitalize: capitalize,
      bytes: bytes
    };

  });

  /** FILTERS */

  /** Capitalize */
  m.filter('capitalize', [
    function () {
      return capitalize;
    }
  ]);

  /** Bytes */
  m.filter('bytes', [
    function () {
      return bytes;
    }
  ]);

  m.filter('format', [
    function () {
      return format;
    }
  ]);

}(angular));
