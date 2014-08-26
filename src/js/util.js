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


      my.parse_msg = function(msg){
        var r = {}
        r.tx_index = msg['tx_index'] || msg['tx1_index'] || '';
        r.tx_hash = msg['tx_hash'] || msg['order_hash'] || msg['id'] || '';
        r.block_index = msg['block_index'] || msg['tx1_block_index'];
        r.block_time = msg['_block_time'];
        r.raw_tx_type = msg['_category'];
        r.src = msg['source'] || msg['address'] || msg['issuer'];
        r.dest = '';
        r.desc = "";
        r.amount = new Asset(0,"");
        r.amount2 = new Asset(0,"");
        r.nice_status = msg['status']; //FIXME: Do something nice here
        console.log(msg);
        console.log(r);

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

        return r;
      }
      return my;

    }
);