var json_to_csv = new json2csv();
      var survey_id;
      var last_response = undefined;
  
       $('#run_query').on('click', function(e, survey) {
        $('#csv_export').hide();
         survey_id = $('#surveySelect').val();
         runQuery();
        });
        
       $("body").delegate( "#csv_export", "click", function() {
            var csv = "data:text/csv;charset=utf-8," + json_to_csv.jsonToCSV(last_response);
            window.open(encodeURI(csv), survey_id.csv);
        });
          
        var runQuery = function() {
          var queryParams = {
            surveyID: survey_id
          };
          var script = $('#cq_survey').html();
          script = script.replace(/REPLACE_WITH_SURVEY_ID/g, queryParams);
          script = $.trim(script);
          MP.api.custom_query(script, queryParams)
          .done(function(resp) {
                last_response = resp;
                $('#csv_export').show();
                
            }).fail(function($xhr) {
                // Somehow the request is not parsed into JSON event with application/json header
                var error = $xhr.request.responseText;
                var error_text = "Requst failed";
                try {
                    error_text = JSON.parse(error).error;
                } catch (err) {
                    error_text = $xhr.request.responseText;
                }
            });
        }
