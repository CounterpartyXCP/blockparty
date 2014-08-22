define('test',['jquery','knockout','api'], function($,ko, api){
  console.log("in test vm");
  return {
    foo: ko.observable('bar')
  }
});