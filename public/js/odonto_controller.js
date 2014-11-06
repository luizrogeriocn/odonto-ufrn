var app = angular.module( "odonto_app", ['ngTouch'] );

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
    $scope.question = {text: "Qual seu sexo?", alternatives: [{text: "Homem", score: 8, color: "blue"}, {text: "Mulher", score: 10, color: "red"}]};
    $scope.question2 = {text: "Qual a sua idade?", alternatives: [{text: "Até 10 anos", score: 4, color: "blue"}, {text: "10 a 15 anos", score: 10, color: "red"}, {text: "15 a 20 anos", score: 8, color: "red"}, {text: "Mais de 20 anos", score: 8, color: "red"}]};
    $scope.question3 = {text: "Você possui dentes mal posicionados?", alternatives: [{text: "Na frente", score: 6, color: "red"}, {text: "Na parte de trás", score: 8, color: "blue"}, {text: "Na parte de trás e na frente", score: 10, color: "blue"}, {text: "Não", score: 4, color: "blue"}]};
    $scope.question4 = {text: "Você possui dentes a mais?", alternatives: [{text: "Sim", score: 10, color: "red"}, {text: "Não", score: 4, color: "blue"}]};
    $scope.question5 = {text: "Você já perdeu algum dente?", alternatives: [{text: "Sim", score: 10, color: "red"}, {text: "Não", score: 4, color: "blue"}]};
    $scope.question6 = {text: "Você se considera uma pessoa bicuda?", alternatives: [{text: "Sim", score: 10, color: "red"}, {text: "Não", score: 4, color: "blue"}]};
    $scope.questions = [$scope.question, $scope.question2, $scope.question3, $scope.question4, $scope.question5, $scope.question6];

    $scope.current_question;
    $scope.current_question_id = 0;
    $scope.current_question = $scope.questions[$scope.current_question_id];

    $scope.choices = [];
    $scope.current_score = 0;

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
        $scope.calculate_score();
    };

    $scope.calculate_score = function(){
        $scope.current_score = 0;
        var chosen_question;

        for (var i = $scope.questions.length - 1; i >= 0; i--) {
            if($scope.choices[i] != undefined){
                chosen_question = $scope.choices[i];
                $scope.current_score += $scope.questions[i].alternatives[chosen_question].score;
            }
        };
        console.log("Seu score atual é: "+$scope.current_score);
    };
});