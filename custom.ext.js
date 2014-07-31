// Custom code here

// Wait for device API libraries to load
document.addEventListener("deviceready",onDeviceReady,false);

// Device APIs are available
function onDeviceReady() {
	console.log("Device is ready!");
    var db = new PouchDB("sdceClasses");
    db.info(function(err, info){ 
		 if (err) {
            console.log("Error while creating database: " + err)
            for(var e in err) {
                console.log("Error element: " + e + " -> "  + err[e]);
            }
            return;
        } else {
			console.log("Database is: " + info.db_name) 
		}
	});
	
	function addClasses() {
		var classCRN = document.getElementById("crnField").value;
		var classTitle = document.getElementById("titleField").value;
		var classInstructor = document.getElementById("instructorField").value;
		
		var aClass = {
			_id: classCRN,
			title: classTitle,
			author: classInstructor
		};
		
		db.put(aClass, function callback(error, result) {
			if(!error) {
				clearFields();
				document.getElementById("message").innerHTML = "New Class Added";
			} else {
				console.log("An error: " + error);
				document.getElementById("message").innerHTML = "Please fill all fields";
			}
		});
	}

	function clearFields() {
		document.getElementById("titleField").value = "";
		document.getElementById("crnField").value = "";
		document.getElementById("instructorField").value = "";
	}

	function showClasses() {
		db.allDocs( { include_docs: true, ascending: true},
							function(err, doc) {
								showTableOfClasses(doc.rows);
							}
		);
	}

	function showTableOfClasses(data) {
		var div = document.getElementById("message");
		var str = "<table border='1' align='left'><tr><th>CRN</th> <th>Class Title</th> <th>Instructor</th></tr>";
					for(var i = 0; i < data.length; i++) {
						str += "<tr><td>" + data[i].doc._id +
								"</td><td>" + data[i].doc.title +
								"</td><td>" + data[i].doc.author + 
								"</td></tr>"
					}
					str += "</table>";
					div.innerHTML = str;
	}
	
	$("#addClasses").click(function () {
			console.log("clicked addClasses!");
			addClasses();
		});
	 
	 $("#showClasses").click(function () {
			console.log("clicked showClasses!");
			showClasses();
		});
}