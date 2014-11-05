var app = angular.module( "odonto_app", [] );

app.config( function ( $routeProvider ) {
  $routeProvider
  .when( '/index', { 
        templateUrl: 'index.html',
        controller: 'odonto_controller'
    })
  .otherwise( { redirectTo: '/index' } );
});

app.controller("odonto_controller", function($scope){
    $scope.question = {text: "Você possui dentes mal posicionados?", alternatives: [{text: "sim", score: 1, color: "red"}, {text: "não", score: 0, color: "blue"}]};
    $scope.question2 = {text: "Qual seu sexo?", alternatives: [{text: "Homem", score: 1, color: "blue"}, {text: "Mulher", score: 0, color: "red"}]};
    $scope.questions = [$scope.question, $scope.question2];

    $scope.current_question;
    $scope.current_question_id = 0;
    $scope.current_question = $scope.questions[$scope.current_question_id];

    $scope.next_question = function(){
        if($scope.current_question_id+1 < $scope.questions.length){
            console.log("next question.");
            $scope.current_question_id += 1;
            $scope.current_question = $scope.questions[$scope.current_question_id];
        }
        else
            console.log("Essa é a última questão.");
    };
    
    $scope.previous_question = function(id){
        if($scope.current_question_id-1 > 0){
            console.log("previous question.")
            $scope.current_question_id -= 1;
            $scope.current_question = $scope.questions[$scope.current_question_id];
        }
        else
            console.log("Essa é a primeira questão");
    };
});