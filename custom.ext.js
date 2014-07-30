// Custom code here

    // Wait for device API libraries to load
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    function onDeviceReady() {
    	console.log("Device is ready!");
        var db = new PouchDB("sdceClasses");
                
		function addClasses() {
			var classCRN = document.getElementById("crnField").value;
			var classTitle = document.getElementById("titleField").value;
			var classInstructor = document.getElementById("instructorField").value;
							
			var aClass = {
				_id: classCRN,
				title: classTitle,
				author: classInstructor
			};
			
			db.put(aClass, function callback(error, result){
					if(!error) {
						document.getElementById("message").innerHTML = "Class added!";
						console.log("Result: " , result);
						clearFields();
					} else {
						document.getElementById("message").innerHTML = "Error: " ;
						console.log("An error: " , error);
					}
				}
			);
		}
		
		function clearFields() {
			document.getElementById("crnField").value = "";
			document.getElementById("titleField").value = "";
			document.getElementById("instructorField").value = "";
		}
		
		function showClasses() {
			db.allDocs( { include_docs: true, ascending: true }, 
								function(err, doc) {
									showTableOfClasses(doc.rows);
								}
			);
		}
		
		function showTableOfClasses(data) {
			var div = document.getElementById("message");
			var str = "<table border='1'><tr><th>CRN</th><th>Class Name</th><th>Instructor</th></tr>";
			for(var i = 0; i < data.length; i++) {
				str += "<tr><td>" + data[i].doc._id +
						"</td><td>" + data[i].doc.title +
						"</td><td>" + data[i].doc.author +
						"</td></tr>"
			}
			str += "</table>";
			div.innerHTML = str;
		}
    }