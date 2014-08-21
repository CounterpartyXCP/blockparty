define('test',['jquery','knockout','util'], function($,ko, util){
  console.log("in test vm");
  return {
    foo: ko.observable('bar')
  }
});