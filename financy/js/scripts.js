lapp = angular.module('listApp', []);
lapp.controller('listController', function($scope,$http,$timeout) {

	$scope.key='STORE_KEY', $scope.jsonStore={}, $scope.value={}, $scope.toggle=false, $scope.addDescription, $scope.addAmount, $scope.addAccount='Wallet', $scope.addCategory='Food', $scope.accEdit=false, $scope.currentDate = new Date(), $scope.jsonDownload=[], $scope.jsonStore.accounts=[{"name":"SBI","balance":5500},{"name":"Indian","balance":10500},{"name":"Wallet","balance":2500}],$scope.categories=["Food","Bills & Utilities","Clothing","Electronics","Family","Friends","Health & Beauty","Leisure","Transportation"];
	$scope.init = function(){
		localforage.setDriver([
			localforage.INDEXEDDB,
			localforage.WEBSQL,
			localforage.LOCALSTORAGE
			]).
		then(function() {
			localforage.getItem($scope.key).then(function(readValue) {
				// console.log($scope.jsonStore.accounts);
				if(readValue){
					$scope.jsonStore = readValue;
					if($scope.jsonStore.accounts==undefined){
						console.log('Accounts undefined');
						$scope.jsonStore.accounts=[{"name":"SBI","balance":5500},{"name":"Indian","balance":10500},{"name":"Wallet","balance":2500}]
					}
					// console.log($scope.jsonStore);
					$scope.$apply();
					// $scope.jsonDownload.push(JSON.stringify($scope.jsonStore));
					// console.log($scope.jsonDownload);
				}
			});
		});
	}
	
	$scope.saveEntry = function(){
		if($scope.jsonStore==null) {
			console.log('jsonStore null');
			$scope.jsonStore={};
		}
		if($scope.jsonStore.expenses==undefined){
			console.log('expenses undefined');
			$scope.jsonStore.expenses=[];
		}
		$scope.value = {'desc':$scope.addDescription, 'amount':$scope.addAmount, 'acc':$scope.addAccount, 'cat':$scope.addCategory, 'date':$scope.currentDate};
		$scope.jsonStore.expenses.push($scope.value);

		angular.forEach($scope.jsonStore.accounts,function(value,key){
			if($scope.addAccount==value.name){
				value.balance-=$scope.addAmount;
			}
		});
		console.log($scope.jsonStore.accounts);
		localforage.setItem($scope.key, $scope.jsonStore, function() {
			localforage.getItem($scope.key).then(function(readValue) {
				$scope.jsonStore = readValue;
			});
		});
	}

	$scope.saveAccounts = function(){
		if($scope.jsonStore==null || $scope.jsonStore.accounts==undefined) {
			$scope.jsonStore={};
		};
		localforage.setItem($scope.key, $scope.jsonStore, function() {
			localforage.getItem($scope.key).then(function(readValue) {
				$scope.jsonStore = readValue;
				$scope.accEdit = false;
			});
		});
	}

	$scope.getAccTotal = function(){
		if($scope.jsonStore.accounts!=undefined){
			var total = 0;
			for(var i = 0; i < $scope.jsonStore.accounts.length; i++){
				total += parseInt($scope.jsonStore.accounts[i].balance);
			}
			return total;
		}
	}
	$scope.getTotal = function(){
		if($scope.jsonStore.expenses!=undefined){
			var total = 0;
			for(var i = 0; i < $scope.jsonStore.expenses.length; i++){
				total += parseInt($scope.jsonStore.expenses[i].amount);
			}
			return total;
		}
	}
	
});