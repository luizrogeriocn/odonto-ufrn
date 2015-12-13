var app = angular.module( "odonto_app", ['ngRoute', 'ngTouch'] );

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
  .when( '/result',{
        templateUrl: 'public/result.html'
  })
  .otherwise( { redirectTo: '/quiz' } );
});

app.controller("odonto_controller", function($scope){
    $scope.question = {text: "Qual seu sexo?",
                        alternatives: [{text: "Homem", score: 8, color: "blue"},
                                        {text: "Mulher", score: 10, color: "red"}]};

    $scope.question2 = {text: "Qual a sua idade?",
                        alternatives: [{text: "Até 10 anos", score: 4, color: "blue"},
                                        {text: "10 a 15 anos", score: 10, color: "red"},
                                        {text: "15 a 20 anos", score: 8, color: "red"},
                                        {text: "Mais de 20 anos", score: 8, color: "red"}]};

    $scope.question3 = {text: "Como você considera que é o formato do seu rosto?",
                        alternatives: [{text: "Dolicofacial", score: 6, color: "red"},
                                        {text: "Braquifacial", score: 8, color: "blue"},
                                        {text: "Mesofacial", score: 10, color: "blue"}]};

    $scope.question4 = {text: "Qual personagem você parece?",
                        alternatives: [{text: "Bart Simpson", score: 10, color: "red"},
                                        {text: "Capitão Gancho", score: 4, color: "blue"},
                                        {text: "Peter Pan", score: 2, color: "blue"}]};

    $scope.question5 = {text: "Você apresenta mordida cruzada?",
                        alternatives: [{text: "Anterior", score: 10, color: "red"},
                                        {text: "Posterior", score: 4, color: "blue"},
                                        {text: "Combinada", score: 4, color: "blue"},
                                        {text: "Não", score: 4, color: "blue"}]};

    $scope.question6 = {text: "Você apresenta mordida aberta?",
                        alternatives: [{text: "Anterior", score: 10, color: "red"},
                                        {text: "Posterior", score: 4, color: "blue"},
                                        {text: "Combinada", score: 4, color: "blue"},
                                        {text: "Não", score: 4, color: "blue"}]};

    $scope.question7 = {text: "Quanto o dente de cima passa o de baixo na frente (incisivos)?",
                        alternatives: [{text: "Não passa", score: 10, color: "red"},
                                        {text: "Cobre aproximadamente 30% o inferior", score: 4, color: "blue"},
                                        {text: "Cobre mais que 30% o inferior", score: 4, color: "blue"}]};

    $scope.question8 = {text: "Você possui dentes mal posicionados ou tortos?",
                        alternatives: [{text: "Na frente", score: 10, color: "red"},
                                        {text: "Atrás", score: 4, color: "blue"},
                                        {text: "Nos dois", score: 4, color: "blue"},
                                        {text: "Nenhum", score: 4, color: "blue"}]};

    $scope.question9 = {text: "Você já perdeu algum dente por cárie, doença periodontal ou trauma?",
                        alternatives: [{text: "Sim", score: 8, color: "blue"},
                                        {text: "Não", score: 10, color: "red"}]};

    $scope.question10 = {text: "Você possui dentes a mais?",
                        alternatives: [{text: "Sim", score: 8, color: "blue"},
                                        {text: "Não", score: 10, color: "red"}]};

    $scope.question11 = {text: "Você apresenta/apresentou em algum momento da sua vida alguns desses hábitos?",
                        alternatives: [{text: "Chupar chupeta", score: 8, color: "blue"},
                                        {text: "Chupar o dedo", score: 10, color: "red"},
                                        {text: "Língua anteriorizada quando fala, deglute e em repouso", score: 10, color: "red"}]};

    $scope.question12 = {text: "O hábito encontra-se?",
                        alternatives: [{text: "Até os 3 anos", score: 8, color: "blue"},
                                        {text: "Mais de 3 anos", score: 10, color: "red"},
                                        {text: "Até o presente", score: 10, color: "red"}]};

    $scope.questions = [$scope.question, $scope.question2, $scope.question3, $scope.question4, $scope.question5, $scope.question6, $scope.question7, $scope.question8, $scope.question9, $scope.question10, $scope.question11, $scope.question12];

    $scope.init_quiz = function(){
        $scope.current_question_id = 0;
        $scope.current_question = $scope.questions[$scope.current_question_id];
        $scope.choices = [];
        $scope.incomplete = false;
        console.log("init");
    }();

    //$scope.init_quiz();

    $scope.next_question = function(){
        if($scope.current_question_id+1 < $scope.questions.length){
            console.log("next question.");
            $scope.current_question_id += 1;
            $scope.current_question = $scope.questions[$scope.current_question_id];
        }
        else
            console.log("Essa é a última questão");
    };

    $scope.previous_question = function(id){
        if($scope.current_question_id-1 >= 0){
            console.log("previous question.")
            $scope.current_question_id -= 1;
            $scope.current_question = $scope.questions[$scope.current_question_id];
            $scope.incomplete = false;
        }
        else
            console.log("Essa é a primeira questão");
    };

    $scope.get_result = function(){
        for (var i = $scope.questions.length - 1; i >= 0; i--) {
            if($scope.choices[i] == undefined)
                $scope.incomplete = true;
        };
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
