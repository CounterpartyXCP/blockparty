define(['conf','underscore','knockout'], function (conf,_, ko) {
      console.log(conf);
      console.log('loading util');

      var onError = function(jqXHR, textStatus, errorThrown, endpoint){
        console.log("Error: "+textStatus+" / "+errorThrown+" / "+endpoint);
      }
      return {
        load_msgs: function(n) {
          var msgs = ko.observableArray([]);

          failoverAPI('get_last_n_messages',{'count':n}, function(data){
                  _.forEach(data, function(x){

                    msgs.push(x);
                  });
                }
            );


          return msgs;

        }
      }
    }
);