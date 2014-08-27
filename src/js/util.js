define('util', ['conf', 'underscore', 'knockout','consts','asset'], function (conf, _, ko, consts, Asset) {
      console.log(conf);
      console.log('loading util');
      var my = {}
      my.load_msgs = function (n) {
        var msgs = ko.observableArray([]);
        msgs.extend({rateLimit: 20});
        failoverAPI('get_last_n_messages', {'count': n}, function (data) {
              _.map(data, function (x) {
                msgs.push(x);
              });
            }
        );


        return msgs;

      }

      // Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
      my.reduce = function(numerator, denominator){
        var gcd = function gcd(a,b){
          return b ? gcd(b, a%b) : a;
        };
        gcd = gcd(numerator,denominator);
        return [numerator/gcd, denominator/gcd];
      }

      my.parse_msg = function(msg){
        var r = {}
        r.tx_index = msg['tx_index'] || msg['tx1_index'] || '';
        r.tx_hash = msg['tx_hash'] || msg['order_hash'] || msg['id'] || '';
        r.block_index = msg['block_index'] || msg['tx1_block_index'];
        r.block_time = msg['_block_time'];
        r.raw_tx_type = msg['_category'];
        r.src = msg['source'] || msg['address'] || msg['issuer'];
        r.dest = ''; //Destination address
        r.desc = ""; //Textual description
        r.amount = new Asset(0,""); //The only amount or the "source" currency if amount2 present
        r.amount2 = new Asset(0,""); //THe resulting amount
        r.msg = ""; //A string for textual information
        r.nice_status = msg['status']; //FIXME: Do something nice here


        if (r.raw_tx_type == 'burns'){
          r.desc = "XCP Proof-of-Burn";
          r.amount = new Asset(msg['burned'], 'BTC');
          r.amount2 = new Asset(msg['earned'], 'XCP');
        }
        else if (r.raw_tx_type == 'sends') {
          r.desc = "Send";
          r.dest = msg['destination'];
          r.amount = new Asset(msg['quantity'],msg['asset'], msg['_divisible']);
        }
        else if (r.raw_tx_type == 'orders') {
          r.desc  = "Sell";
          r.amount = new Asset(msg['give_quantity'],msg['give_asset'],msg['_give_asset_divisible']);
          r.amount2 = new Asset(msg['get_quantity'],msg['get_asset'],msg['_get_asset_divisible']);
        }
        else if (r.raw_tx_type == 'order_matches'){
          r.desc = "Order Match";
          r.src = msg['tx0_address'];
          r.dest = msg['tx1_address'];
          r.amount = new Asset(msg['backward_quantity'],msg['backward_asset'],msg['_backward_asset_divisible']);
          r.amount2 = new Asset(msg['forward_quantity'],msg['forward_asset'],msg['_forward_asset_divisible']);

        }
        else if (r.raw_tx_type == 'btcpays'){
          r.desc = "Payment";
          r.amount = new Asset(msg['btc_amount'],'BTC');
        }
        else if (r.raw_tx_type == 'issuances'){
          if (msg['transfer']){
            r.desc = "Token Transferred";
            r.amount = (NaN, msg['asset']);
            r.dest = msg['issuer'];
          }
          else if (msg['locked']){
            r.desc = "Token Locked";
            r.amount = (NaN, msg['asset']);
          }
          else{
            r.desc = 'Quantity issued';
            r.amount = new Asset(msg['quantity'],msg['asset'],msg['divisible']);
          }
        }
        else if (r.raw_tx_type == 'broadcasts'){
          r.desc = "Broadcast";
          r.msg = "Text: "+msg['text'] +" Value: "+msg['value'];
        }
        else if (r.raw_tx_type == 'bets'){
          r.desc = "Bet";
          var odds = my.reduce(msg['wager_quantity'], msg['counterwager_quantity']);
          r.msg = "Odds: " + odds[0]+'/'+odds[1];
          r.src = msg['feed_address'];
          r.amount = new Asset(msg['wager_quantity'], 'XCP');
          r.amount2 = new Asset(msg['counterwager_quantity'], 'XCP');

        }
        else if (r.raw_tx_type == 'bet_matches'){
          r.desc = "Bet Match";
          r.src = msg['feed_address'];
          r.dest = msg['tx0_address'];
          r.amount = new Asset(msg['forward_quantity'],'XCP');
          r.amount2 = new Asset(msg['backward_quantity'],'XCP');
        }
        else if (r.raw_tx_type == 'dividends'){
          r.desc = "Dividend Paid";
          r.amount = new Asset(1,msg['asset']);
          r.amount2 = new Asset(msg['quantity_per_unit'],msg['dividend_asset']);
        }
        else if (r.raw_tx_type == 'cancels'){
          r.desc = "Canceled";
          r.src = msg['offer_hash'];

        }
        else if (r.raw_tx_type == 'callbacks'){
          r.desc = "Called Back";
          r.amount = new Asset(NaN, msg['asset']);
          var amt = new Decimal(msg['fraction']*100);
          r.msg = amt.toSD(4).toString()+"% called back";
        }
        else if (r.raw_tx_type == 'bet_expirations'){
          r.desc = "Bet Expired";
          r.src = msg['bet_index'];
        }
        else if (r.raw_tx_type == 'order_expirations'){
          r.desc = "Order Expired";
          r.src = msg['order_index'];
        }
        else if (r.raw_tx_type == 'bet_match_expirations'){
          r.desc = "Bet match expiried";
          r.src = msg['bet_match_id'];
        }
        else if (r.raw_tx_type == 'order_match_expirations'){
          r.desc = "Order match expiried";
          r.src = msg['order_match_id'];
        }
        else if (r.raw_tx_type == 'credits'){
          r.desc = "Credit";
          r.src = msg['address'];
          r.amount = new Asset(msg['quantity'],msg['asset'],msg['_divisible']);
        }
        else if (r.raw_tx_type == 'debits'){
          r.desc = "Debit";
          r.src = msg['address'];
          r.amount = new Asset(msg['quantity'],msg['asset'],msg['_divisible']);
        }
        else if (r.raw_tx_type == 'rps'){
          r.desc = "Rock/Paper/Scissors Bet";
          r.amount = new Asset(msg['quantity'],'XCP');
        }
        else if (r.raw_tx_type == 'rps_matches'){
          r.desc = "Rock/Paper/Scissors Bet Matched";
          r.src = msg['tx0_address'];
          r.dest = msg['tx1_address'];
          r.amount = new Asset(msg['wager'],'XCP');
        }
        else if (r.raw_tx_type == 'rpsresolves'){
          r.desc = "Rock/Paper/Scissors Bet Resolved";
          r.src = msg['source'];
          r.msg = "Match ID: "+msg['rps_match_id']+" Winning Move: "+msg['move'];
        }
        else if (r.raw_tx_type == 'rps_expirations'){
          r.desc = "RPS Expired";
          r.src = msg['rps_index'];
        }
        else if (r.raw_tx_type == 'rps_match_expirations'){
          r.desc = "RPS Match Expired";
          r.src = msg['rps_index'];
        }
        else{
          r.desc = "Unknown Transaction Type";
        }

        if (r.amount2.qty.eq(0)){
          r.formatted_amount = r.amount.toString();
        }
        else{
          r.formatted_amount = r.amount.toString() + " &rarr; " + r.amount2.toString();
        }

        return r;
      }
      return my;

    }
);