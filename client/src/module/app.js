(function(angular){
    'use strict';

    var module = angular.module('candidatesCheck',[]);
    
    module.config(function () {
        
    });


    module.controller('CandidatesListCtrl',
        ['$scope', '$log','candidateService',
            function($scope, $log, candidateService){
                candidateService.getAll().then(function (candidates) {
                    $scope.candidates = candidates;
                });


                $scope.add = function(){
                    if (angular.isDefined($scope.name) && angular.isDefined($scope.surname)){
                        candidateService.add($scope.surname,$scope.name).then(function (result) {
                            $log.info(angular.toJson(result));
                            $scope.candidates.push(result);
                        });
                    }
                }

              //  $scope.del = function(id_del){
              //      candidateService.del(id_del);
              //      $scope.$apply();
//
              //  }

                $scope.removeCandidate = function(id){
                    candidateService.removeCandidate(id);
                    $log.info($scope.candidates);
                }
            }
        ]
    );

    module.factory('candidateService',function($http, $q){
        return {
            getAll:function(){
                return $http.get('/candidate').then(function (result) {
                    return result.data;
                });
            },
            add:function(surname,name){
                var candidate = {
                    name: name,
                    surname: surname
                };
                return $http.post('/candidate',candidate)
                    .then(function (result) {
                        return result.data;
                    })
                    .catch(function (result) {
                        alert('Упс не удалось добавить кандидата!');
                        return $q.reject(result);
                    });
            },
            removeCandidate: function(id) { //Эта функция вызывается тз контроллера -
                return $http.post('/candidate/' + id.toString())// Это вызывается в контроллере на сервере
                    .then(function (result) {
                        return result.data;
                    })
                    .catch(function (result) {
                        alert('Не удалось удалить кандидата!');
                        return $q.reject(result);
                    });
            },
            del:function(id_del){
                return $http.post('/candidate/del/'+id_del.toString())
                    .then(function (result) {
                        return result.data;
                    })
                    .catch(function (result) {
                        alert('Не удалось удалить кандидата!');
                        return $q.reject(result);
                    });
            }


        }
    });
})(angular);