define(['conf'], function (conf) {
      console.log(conf);
      console.log('loading util');
      return {
        rpc: function (method, params, result, callback) {
          params = typeof params !== 'undefined' ? params : [];
          var real_params = {
            method: method,
            params: params
          };
          var request = {};
          request.method = "proxy_to_counterpartyd";;
          request.params = real_params;
          request.id = 1;
          request.jsonrpc = "2.0";

          $.ajax({
            type: "POST",
            url: conf.API_SERVER + "/_api",
            data: JSON.stringify(request),
            success: function (data, status, jqx) {
              result = data.result;
              if (typeof callback !== 'undefined'){
                callback(result);
              }
            },
            dataType: "json"

          });
        }
      }
    }
);