define('status',['jquery','knockout','api'], function($,ko){
    console.log('loading status');

    var stat_arr = ko.observableArray([]);
    failoverAPI("get_running_info",{}, function(data){

      stat_arr.removeAll();
      console.log(data);
      for (var key in data){
        stat_arr.push({'key':key,'value':data[key]});
      }
    });
    return {
      stat_arr: stat_arr
    };
});