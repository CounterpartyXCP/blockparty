define('tx',['jquery','knockout','util', 'api'], function($,ko, util, api){
  return function() {

    this.vm = {
     tx_hash: ko.observable()
    }

    this.load = function(callback, page){
      console.log(page);

      callback(this.vm);

    }
  }
});