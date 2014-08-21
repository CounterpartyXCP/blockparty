requirejs.config({
  shim: {bootstrap:{"deps":['jquery']}},

  paths: {
    util: 'js/util',
    conf: 'js/conf',
    status: 'vm/status',
    jquery: 'vendors/jquery/dist/jquery',
    knockout: 'vendors/knockoutjs/dist/knockout',
    pager: 'vendors/pagerjs/pager',
    bootstrap: "vendors/bootstrap/dist/js/bootstrap"
  },
  urlArgs: "bust=" + (new Date()).getTime() //Cache bust!
});

requirejs(['jquery', 'knockout', 'pager','bootstrap'], function ($, ko, pager) {

  var viewModel = {id: "test"};

  window.requireVM = function (moduleName) {
    return function (callback) {
      require([moduleName], function (mod) {
        callback(mod);
      });
    };
  };

  window.requireJson = function(url) {

  };


  $(function () {
    pager.onBindingError.add(function(event) {
      console.log(event);
    });
    pager.Href.hash = '#!/';

    pager.extendWithPage(viewModel);

    ko.applyBindings(viewModel);
    pager.start();
  });
});