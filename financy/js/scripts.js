lapp = angular.module('listApp', []);
lapp.controller('listController', function($scope,$http,$timeout) {

	$scope.key='STORE_KEY', $scope.acckey='ACCOUNT_KEY', $scope.jsonStore=[], $scope.accStore={"Indian":0,"SBI":0,"Wallet":0}, $scope.value={}, $scope.toggle=false, $scope.addDescription, $scope.addAmount, $scope.addAccount='Wallet', $scope.addCategory='Food', $scope.accEdit=false, $scope.currentDate = new Date(), $scope.jsonDownload=[];
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
					// $scope.jsonDownload.push(JSON.stringify($scope.jsonStore));
					// console.log($scope.jsonDownload);
				}
			});
			localforage.getItem($scope.acckey).then(function(readValue) {
				if(readValue){
					$scope.accStore = readValue;
					$scope.$apply();
					// $scope.jsonDownload.push(JSON.stringify($scope.jsonStore));
					// console.log($scope.jsonDownload);
				}
			});
		});
	}
	
	$scope.saveEntry = function(){
		if($scope.jsonStore==null) $scope.jsonStore=[];
		$scope.value = {'desc':$scope.addDescription, 'amount':$scope.addAmount, 'acc':$scope.addAccount, 'cat':$scope.addCategory, 'date':$scope.currentDate};
		$scope.jsonStore.push($scope.value);

		localforage.setItem($scope.key, $scope.jsonStore, function() {
			localforage.getItem($scope.key).then(function(readValue) {
				$scope.jsonStore = readValue;
			});
		});

		$scope.accStore=$scope.getAccounts();
		localforage.setItem($scope.acckey, $scope.accStore, function() {
			localforage.getItem($scope.acckey).then(function(readValue) {
				$scope.accStore = readValue;
			});
		});
	}

	$scope.saveAccounts = function(){
		if($scope.accStore==null) $scope.accStore={};
		localforage.setItem($scope.acckey, $scope.accStore, function() {
			localforage.getItem($scope.acckey).then(function(readValue) {
				$scope.accStore = readValue;
				$scope.accEdit = false;
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

	$scope.getAccounts = function(){
		if($scope.addAccount=="SBI"){
			$scope.accStore.SBI -= $scope.addAmount;
		}else if($scope.addAccount=="Indian"){
			$scope.accStore.Indian -= $scope.addAmount;
		}else{
			$scope.accStore.Wallet -= $scope.addAmount;
		}
		return {"Indian":$scope.accStore.Indian,"SBI":$scope.accStore.SBI,"Wallet":$scope.accStore.Wallet}
	}
	
});