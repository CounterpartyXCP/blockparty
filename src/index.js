requirejs.config({
  shim: {},
  paths: {
    status: 'vm/status',
    jquery: 'vendors/jquery/dist/jquery',
    knockout: 'vendors/knockoutjs/dist/knockout',
    pager: 'vendors/pagerjs/pager'
  }
});

requirejs(['jquery', 'knockout', 'pager'], function ($, ko, pager) {

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