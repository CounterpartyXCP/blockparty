define('status',['jquery','knockout','util'], function($,ko, util){
    console.log('loading status');
    var status = ko.observableArray([]);
    var stat_arr = ko.observableArray([]);
    util.rpc("get_running_info",{}, status, function(data){
      stat_arr.removeAll();
      console.log(data);
      for (var key in data){
        stat_arr.push({'key':key,'value':data[key]});
        console.log({'key':key,'value':data[key]});
      }
      console.log(stat_arr);
    });
    return {
      status: status,
      stat_arr: stat_arr
    };
});