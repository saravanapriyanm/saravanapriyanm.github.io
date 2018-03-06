lapp = angular.module('listApp', []);
lapp.controller('listController', function($scope,$http,$timeout) {

	$scope.key='STORE_KEY', $scope.jsonStore=[], $scope.value={};

	$scope.init = function(){
		localforage.setDriver([
			localforage.INDEXEDDB,
			localforage.WEBSQL,
			localforage.LOCALSTORAGE
			]).
		then(function() {
			localforage.getItem($scope.key).then(function(readValue) {
				if(readValue){
					$scope.jsonStore = readValue;
					$scope.$apply();
					console.log(readValue);
				}
			});
		});
	}

	$scope.getTotal = function(){
		var total = 0;
		for(var i = 0; i < $scope.jsonStore.length; i++){
			total += parseInt($scope.jsonStore[i].amount);
		}
		return total;
	}

	$scope.saveEntry = function(){
		console.log($scope.jsonStore);
		if($scope.jsonStore==null) $scope.jsonStore=[];
		$scope.value = {'desc':document.getElementById('txtEntry').value, 'amount':document.getElementById('numAmount').value};
		$scope.jsonStore.push($scope.value);
		console.log($scope.jsonStore);
		localforage.setItem($scope.key, $scope.jsonStore, function() {
			console.log('get item');
			localforage.getItem($scope.key).then(function(readValue) {
				$scope.jsonStore = readValue;
			});
		});
	}
});