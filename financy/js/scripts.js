lapp = angular.module('listApp', ['ngRoute']);
lapp.config(function($routeProvider){
	$routeProvider.when('/',{
		controller:'listController',
		templateUrl:'expenses.html'
	})
	.when('/loan',{
		templateUrl:'loan.html'
	});
});

lapp.controller('listController', function($scope,$http,$timeout) {
	$scope.$on('$routeChangeStart', function($event, next, current) {
		$scope.menuToggle=!$scope.menuToggle;
	});

	$scope.key='STORE_KEY', $scope.jsonStore={}, $scope.value={}, $scope.toggle=false, $scope.addDescription, $scope.addAmount, $scope.addAccount='Wallet', $scope.addCategory='Food', $scope.accEdit=false, $scope.currentDate = new Date(), $scope.loan={}, $scope.loan.addDate = new Date(), $scope.jsonDownload=[], $scope.jsonStore.accounts=[{"name":"SBI","balance":5500},{"name":"Indian","balance":10500},{"name":"Wallet","balance":2500}],$scope.categories=["Food","Bills & Utilities","Clothing","Electronics","Family","Friends","Health & Beauty","Leisure","Transportation"], $scope.menuToggle = true;
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
					$scope.jsonDownload = JSON.stringify($scope.jsonStore);
					$scope.$apply();
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
		$scope.syncDB();		
	}

	$scope.syncDB = function(){
		localforage.setItem($scope.key, $scope.jsonStore, function() {
			localforage.getItem($scope.key).then(function(readValue) {
				$scope.jsonStore = readValue;
				$scope.accEdit = false;
			});
		});
	}

	$scope.saveAccounts = function(){
		if($scope.jsonStore==null || $scope.jsonStore.accounts==undefined) {
			$scope.jsonStore={};
		};
		$scope.syncDB();		
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

	$scope.download = function(){
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent($scope.jsonDownload);
		var dlAnchorElem = document.createElement('a');
		dlAnchorElem.setAttribute("href",dataStr);
		dlAnchorElem.setAttribute("download", "financy.json");
		dlAnchorElem.click();
	}

	$scope.loanKey = 'STORE_LOAN', $scope.loan.addName, $scope.loan.addAmount, $scope.loan.addDate;
	$scope.initLoan = function(){
		localforage.setDriver([
			localforage.INDEXEDDB,
			localforage.WEBSQL,
			localforage.LOCALSTORAGE
			]).
		then(function() {
			localforage.getItem($scope.loanKey).then(function(readValue) {
				if(readValue){
					$scope.loanStore = readValue;
					if($scope.loanStore==undefined){
					}
					$scope.$apply();
				}else{
					console.log('Loan undefined');
					$scope.loanStore=[];
					console.log($scope.loanStore);
				}
			});
		});
	}
	$scope.getTotalLoan = function(){
		if($scope.loanStore!=null){
			let total=0;
			for(i=0; i<$scope.loanStore.length; i++){
				for(j=0; j<$scope.loanStore[i].transactions.length; j++){
					total += $scope.loanStore[i].transactions[j].amount;
				}
			}
			return total;
		}
	}
	$scope.getPersonLoanTotal = function(trans){
		let personTotal = 0;
		for(i=0;i<trans.length;i++){
			personTotal+=trans[i].amount;
		}
		return personTotal;
	}
	$scope.saveLoanEntry = function(){
		var existingPersonFlag = false;
		for(i=0; i<$scope.loanStore.length; i++){
			if($scope.loanStore[i].name==$scope.loan.addName){
				existingPersonFlag=$scope.loan.addName;
			}
		}

		if(existingPersonFlag){
			for(i=0; i<$scope.loanStore.length; i++){
				if($scope.loanStore[i].name==existingPersonFlag){
					$scope.loanStore[i].transactions.push({
						"description":$scope.loan.addDesc,
						"amount":$scope.loan.addAmount,
						"date":$scope.loan.addDate
					});
				}
			}
		}else{
			$scope.value = {
				"name":$scope.loan.addName,
				"transactions":[
				{
					"description":$scope.loan.addDesc,
					"amount":$scope.loan.addAmount,
					"date":$scope.loan.addDate
				},
				]
			};
			$scope.loanStore.push($scope.value);
		}
		$scope.syncLoanDB();
	}
	$scope.syncLoanDB = function(){
		localforage.setItem($scope.loanKey, $scope.loanStore, function() {
			localforage.getItem($scope.loanKey).then(function(readValue) {
				$scope.loanStore = readValue;
				$scope.accEdit = false;
			});
		});
	}

}); //Controller Ends