requirejs.config({
  shim: {bootstrap:{"deps":['jquery']}},

  paths: {
    util: 'js/util',
    conf: 'js/conf',
    status: 'vm/status',
    test: 'vm/test',
    jquery: 'vendors/jquery/dist/jquery',
    knockout: 'vendors/knockoutjs/dist/knockout',
    pager: 'vendors/pagerjs/pager',
    bootstrap: "vendors/bootstrap/dist/js/bootstrap"
  },
  urlArgs: "bust=" + (new Date()).getTime() //Cache bust!
});

requirejs(['jquery', 'knockout', 'pager'], function ($, ko, pager) {

  var viewModel = {

  };

  window.requireVM = function (moduleName) {
    return function (callback) {
      require([moduleName], function (mod) {
        callback(mod);
      });
    };
  };

  window.requireJson = function (url) {

  };

  // withOnShow: requireVM('product')

  $(function () {
    pager.Href.hash = '#!/';

    pager.extendWithPage(viewModel);

    ko.applyBindings(viewModel);
    pager.start();

  });
});

