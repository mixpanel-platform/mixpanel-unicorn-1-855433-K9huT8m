var json_to_csv = new json2csv();
      var survey_id;
      var last_response = undefined;
  
       $('#run_query').on('click', function(e, survey) {
         $('#run_query').html("Please Wait...").prop("disabled",true);
         survey_id = $('#surveySelect').val();
         runQuery();
        });
        
       $("body").delegate( "#csv_export", "click", function() {
            var csv = "data:text/csv;charset=utf-8," + json_to_csv.jsonToCSV(last_response);
            $(this).attr("href", encodeURI(csv)).attr("download", 
                  "Survey_Export_" + survey_id + "_" + moment().format('MMM-DD-YYYY') + ".csv");
            $('#csv_export').hide();
        });
          
        var runQuery = function() {
          var queryParams = {
            surveyID: survey_id
          };
          var script = $('#cq_survey').html();
          script = $.trim(script);
          MP.api.custom_query(script, queryParams)
          .done(function(resp) {
                $('#run_query').html("Run Query").prop("disabled",false);
                last_response = resp;
                $('#csv_export').show();
                
            }).fail(function($xhr) {
                $('#run_query').html("Run Query").prop("disabled",false);
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
