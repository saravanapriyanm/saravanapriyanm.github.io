var key='STORE_KEY', jsonStore=[];

localforage.setDriver([
	localforage.INDEXEDDB,
	localforage.WEBSQL,
	localforage.LOCALSTORAGE
	]).then(function() {

		localforage.getItem(key).then(function(readValue) {
			jsonStore=readValue;
			if(readValue){
				for(i=0;i<readValue.length;i++){
					htmlConsole.innerHTML += '<li>' + readValue[i].desc + '<span class="amount">' + readValue[i].amount + '</span></li>';
				}
			}
		});

	});
	function saveEntry(){
		if(jsonStore==null) jsonStore=[];
		var value = {'desc':document.getElementById('txtEntry').value, 'amount':document.getElementById('numAmount').value};
		jsonStore.push(value);
		localforage.setItem(key, jsonStore, function() {
			localforage.getItem(key).then(function(readValue) {
				if(readValue){
					htmlConsole.innerHTML += '<li>' + readValue[readValue.length-1].desc + '<span class="amount">' + readValue[readValue.length-1].amount + '</span></li>';
				}
			});

		});
	}