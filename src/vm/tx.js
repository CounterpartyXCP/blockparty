/**
 * Created by Tyler on 8/22/2014.
 */
define('tx',['jquery','knockout','util', 'api'], function($,ko, util){

  return function() {
    this.tx = util.load_msgs(100);
    this.tx_json = ko.computed(function () {
      console.log("tx_json computed");
      var xs = _.map(this.tx(), JSON.stringify);
      return xs;

    })
  }

});