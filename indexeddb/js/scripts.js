function saveEntry(){
	localforage.setDriver([
		localforage.INDEXEDDB,
		localforage.WEBSQL,
		localforage.LOCALSTORAGE
		]).then(function() {
			var key = 'STORE_KEY';
			var value = document.getElementById('txtEntry').value;
			// value[0] = 65
			var UNKNOWN_KEY = 'unknown_key';

			localforage.setItem(key, value, function() {
				console.log('Using:' + localforage.driver());
				console.log('Saved: ' + value);

				localforage.getItem(key).then(function(readValue) {
					console.log('Read: ', readValue);
				});

    		// Since this key hasn't been set yet, we'll get a null value
    		localforage.getItem(UNKNOWN_KEY, function(err, readValue) {
    			console.log('Result of reading ' + UNKNOWN_KEY, readValue);
    		});
    	});
		});

		// this is just for demonstration purposes
		var originalConsoleLog = console.log;
		function consoleLogProxy() {
			originalConsoleLog.apply(console, arguments);
			var htmlConsole = document.getElementById('htmlConsole');
			if (htmlConsole) {
				var message = Array.prototype.slice.apply(arguments, []).join(' ');
				htmlConsole.innerHTML += '<li>' + message + '</li>';
			}
		}
		console.log = consoleLogProxy;
	}