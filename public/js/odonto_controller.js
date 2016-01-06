var app = angular.module( "odonto_app", ['ngRoute', 'ngTouch'] );

app.service('Score', function() {
  var service = {};
  service.result = 0;
  service.set_score = function(arg) { service.result = arg; };
  service.get_score = function() { return service.result; };

  return service;
});

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
        templateUrl: 'public/result.html',
        controller: 'result_controller'
  })
  .otherwise( { redirectTo: '/quiz' } );
});

app.controller("result_controller", function($scope, Score){
  $scope.result = Score.get_score();
  console.log($scope.result);

  $scope.first = false;
  $scope.second = false;
  $scope.third = false;

  $scope.setResult = function() {
    if($scope.result <= 23){
      $scope.first = true;
      $scope.second = false;
      $scope.third = false;
      console.log('first');
    }
    else if(($scope.result < 37)&&($scope.result > 23)){
      $scope.first = false;
      $scope.second = true;
      $scope.third = false;
      console.log('second');
    }
    else{
      $scope.first = false;
      $scope.first = false;
      $scope.third = true;
      console.log('third');
    }
  }();
});

app.controller("odonto_controller", function($scope, Score){
    $scope.question = {text: "Qual seu sexo?",
                        alternatives: [{text: "Homem", score: 0, color: "blue"},
                                        {text: "Mulher", score: 0, color: "red"}]};

    $scope.question2 = {text: "Qual a sua idade?",
                        alternatives: [{text: "Até 10 anos", score: 0, color: "blue"},
                                        {text: "10 a 15 anos", score: 0, color: "red"},
                                        {text: "15 a 20 anos", score: 0, color: "red"},
                                        {text: "Mais de 20 anos", score: 0, color: "red"}]};

    $scope.question3 = {text: "Como você considera que é o formato do seu rosto?",
                        alternatives: [{text: "Dolicofacial", score: 5, color: "red"},
                                        {text: "Braquifacial", score: 3, color: "blue"},
                                        {text: "Mesofacial", score: 2, color: "blue"}]};

    $scope.question4 = {text: "Qual personagem você parece?",
                        alternatives: [{text: "Bart Simpson", score: 4, color: "red"},
                                        {text: "Capitão Gancho", score: 4, color: "blue"},
                                        {text: "Peter Pan", score: 2, color: "blue"}]};

    $scope.question5 = {text: "Você apresenta mordida cruzada?",
                        alternatives: [{text: "Anterior", score: 0, color: "red"},
                                        {text: "Posterior", score: 3, color: "blue"},
                                        {text: "Combinada", score: 3, color: "blue"},
                                        {text: "Não", score: 4, color: "blue"}]};

    $scope.question6 = {text: "Você apresenta mordida aberta?",
                        alternatives: [{text: "Anterior", score: 0, color: "red"},
                                        {text: "Posterior", score: 3, color: "blue"},
                                        {text: "Combinada", score: 3, color: "blue"},
                                        {text: "Não", score: 4, color: "blue"}]};

    $scope.question7 = {text: "Quanto o dente de cima passa o de baixo na frente (incisivos)?",
                        alternatives: [{text: "Não passa", score: 5, color: "red"},
                                        {text: "Cobre aproximadamente 30% o inferior", score: 0, color: "blue"},
                                        {text: "Cobre mais que 30% o inferior", score: 5, color: "blue"}]};

    $scope.question8 = {text: "Você possui dentes mal posicionados ou tortos?",
                        alternatives: [{text: "Na frente", score: 3, color: "red"},
                                        {text: "Atrás", score: 3, color: "blue"},
                                        {text: "Nos dois", score: 4, color: "blue"},
                                        {text: "Nenhum", score: 0, color: "blue"}]};

    $scope.question9 = {text: "Você já perdeu algum dente por cárie, doença periodontal ou trauma?",
                        alternatives: [{text: "Sim", score: 10, color: "blue"},
                                        {text: "Não", score: 0, color: "red"}]};

    $scope.question10 = {text: "Você possui dentes a mais?",
                        alternatives: [{text: "Sim", score: 10, color: "blue"},
                                        {text: "Não", score: 0, color: "red"}]};

    $scope.question11 = {text: "Você apresenta/apresentou em algum momento da sua vida alguns desses hábitos?",
                        alternatives: [{text: "Chupar chupeta", score: 0, color: "blue"},
                                        {text: "Chupar o dedo", score: 4, color: "red"},
                                        {text: "Língua anteriorizada quando fala, deglute e em repouso", score: 6, color: "red"}]};

    $scope.question12 = {text: "O hábito encontra-se?",
                        alternatives: [{text: "Até os 3 anos", score: 2, color: "blue"},
                                        {text: "Mais de 3 anos", score: 3, color: "red"},
                                        {text: "Até o presente", score: 5, color: "red"}]};

    $scope.questions = [$scope.question, $scope.question2, $scope.question3, $scope.question4, $scope.question5, $scope.question6, $scope.question7, $scope.question8, $scope.question9, $scope.question10, $scope.question11, $scope.question12];

    $scope.init_quiz = function(){
        $scope.current_question_id = 0;
        $scope.current_question = $scope.questions[$scope.current_question_id];
        $scope.choices = [];
        $scope.incomplete = false;
        console.log("init");
    }();

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
        Score.set_score($scope.current_score);
        console.log("Service de score: "+ Score.get_score());
        console.log("Seu score atual é: "+ $scope.current_score);
    };
});
