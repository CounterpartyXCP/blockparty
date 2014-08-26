/**
 * Created by Tyler on 8/22/2014.
 */
define('tx',['jquery','knockout','util', 'api'], function($,ko, util, api){

  return function() {
    this.tx = util.load_msgs(500);
    this.tx_data = ko.computed(function() {
      return _.map(_.filter(this.tx(), function(x){return _.contains(["valid","open"],x['status']) && x['_command'] == 'insert'}), util.parse_msg);
    });
    this.tx_json = ko.computed(function () {
      console.log("tx_json computed");
      var xs = _.map(this.tx(), JSON.stringify);
      return xs;

    });
  }

});