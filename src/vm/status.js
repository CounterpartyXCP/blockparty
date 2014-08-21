define('status',['jquery','knockout'], function($,ko){
    console.log('loading status');
    var status = ko.observableArray([]);
    ajax("get_running_info",{}, status);
    return {
      status: status
    };


});