define('status',['jquery','knockout','util'], function($,ko, util){
    console.log('loading status');
    var status = ko.observableArray([]);
    util.rpc("get_running_info",{}, status);
    return {
      status: status
    };
});