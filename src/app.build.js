{
  appDir: "./",
  baseUrl: "js",
  paths: {
  api: 'https://cdn.rawgit.com/CounterpartyXCP/counterwebdeps/master/js/util.api',
      status: 'vm/status',
      test: 'vm/test',
      tx: 'vm/tx',
      conf: 'js/conf',
      util: 'js/util',
      jquery: '../vendors/jquery/dist/jquery',
      knockout: '../vendors/knockoutjs/dist/knockout',
      pager: '../vendors/pagerjs/pager',
      underscore: '../vendors/underscore/underscore',
      bootstrap: "../vendors/bootstrap/dist/js/bootstrap"
},
  dir: "../build",
  modules: [
    {
      name: "../index",
    }
  ]
}