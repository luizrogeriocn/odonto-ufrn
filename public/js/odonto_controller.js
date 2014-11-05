var app = angular.module( "odonto_app", [] );

app.config( function ( $routeProvider ) {
  $routeProvider
  .when( '/index', { 
        templateUrl: 'public/quiz.html',
        controller: 'odonto_controller'
    })
  .when( '/about',{
        templateUrl: 'public/about.html'
  })
  .when( '/quiz',{
        templateUrl: 'public/quiz.html'
  })
  .otherwise( { redirectTo: '/quiz' } );
});

app.controller("odonto_controller", function($scope){
    $scope.question = {text: "Qual seu sexo?", alternatives: [{text: "Homem", score: 1, color: "blue"}, {text: "Mulher", score: 0, color: "red"}]};
    $scope.question2 = {text: "Qual a sua idade?", alternatives: [{text: "Até 10 anos", score: 1, color: "blue"}, {text: "10 a 15 anos", score: 0, color: "red"}, {text: "15 a 20 anos", score: 0, color: "red"}, {text: "Mais de 20 anos", score: 0, color: "red"}]};
    $scope.question3 = {text: "Você possui dentes a mais?", alternatives: [{text: "Sim", score: 1, color: "red"}, {text: "Não", score: 0, color: "blue"}]};
    $scope.question4 = {text: "Você possui dentes mal posicionados?", alternatives: [{text: "Sim", score: 1, color: "red"}, {text: "Não", score: 0, color: "blue"}]};
    $scope.questions = [$scope.question, $scope.question2, $scope.question3, $scope.question4];

    $scope.current_question;
    $scope.current_question_id = 0;
    $scope.current_question = $scope.questions[$scope.current_question_id];

    $scope.choices = [];

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
        if($scope.current_question_id-1 >= 0){
            console.log("previous question.")
            $scope.current_question_id -= 1;
            $scope.current_question = $scope.questions[$scope.current_question_id];
        }
        else
            console.log("Essa é a primeira questão");
    };

    $scope.choose_alternative = function(question, alternative){
        $scope.choices[question] = alternative;
        console.log("Você escolheu a alternativa #"+ (alternative+1) +" na questão #"+(question+1));
    };
});