    <script type="text/cq" id="cq_survey">
        function main() {
          return People(
          ).filter(function(user){
            var isSurvey = false;
            var surveyId = params.surveyID;
            _.each(user.properties.$answers, function(v,k) {
                if(v.$survey_id == surveyId)
                  isSurvey = true
            })
            return isSurvey
          }).map(function(user) {
            var surveyId = params.surveyID;
            var answers = {};
            _.each(user.properties.$answers, function(v,k) {
                if(v.$survey_id == surveyId){
                  answers["Collection ID"] = v.$collection_id;
                  answers["Question ID - " + v.$question_id] = v.$value;
                }
            })
            return {
              "distinct_id": user.distinct_id,
              "Email": user.properties.$email,
              "City": user.properties.$city,
              "Suvery": answers
              }
          });
        }
    </script>
