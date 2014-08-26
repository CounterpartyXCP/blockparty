/*
 Class for handling a (quantity, asset type) bundle with formatting, etc
 */

define('asset', ['decimal', 'consts'], function (Decimal, consts) {
      var Asset = function (qty, currency, divisible) {
        if (typeof(qty) === 'undefined'){
          qty = 0;
        }
        if (divisible || typeof(divisible) === 'undefined') {
          var q = new Decimal(qty)
          this.qty = q.div(consts.UNIT);
        }
        else {
          this.qty = new Decimal(parseInt(qty));
        }

        this.currency = currency;
      };

      Asset.prototype.format = function () {
        if (this.qty.eq(0)) {
          return "";
        }
        return this.qty.round(15).toFormat(',', null, '') + " " + this.currency;
      };
      Asset.prototype.toString = function() {
        return this.format();
      }

      return Asset;
    }
);