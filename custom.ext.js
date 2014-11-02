// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// Device APIs are available
function onDeviceReady() {
	console.log("Device is ready!");
	
	// Instantiate a new PouchDB database
    var db = new PouchDB("sdceClasses");
	
    // Check if any errors occurred in creating PouchDB database 
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
	
    // Function to add classes to the database
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
				document.getElementById("message").innerHTML = "<div style='margin-top: 25px;'>New Class Added</div>";
			} else {
				console.log("An error: " + error);
				document.getElementById("message").innerHTML = "<div style='margin-top: 25px;'>Please fill all fields</div>";
			}
		});
	};

	// Function to clear the input fields
	function clearFields() {
		document.getElementById("classForm").reset();
	};

	// Function to get the classes from the database
	function showClasses() {
		db.allDocs( { include_docs: true, ascending: true},
						function(err, doc) {
							showTableOfClasses(doc.rows);
						});
	};

	// Part of showClasses(); displays the classes in a table
	function showTableOfClasses(data) {
		var div = document.getElementById("message");
		var str = "<table border='1' style='width: 100%; margin-top: 25px;'><tr><th>CRN</th> <th>Class Title</th> <th>Instructor</th></tr>";
					for (var i = 0; i < data.length; i++) {
						str += "<tr><td>" + data[i].doc._id +
								"</td><td>" + data[i].doc.title +
								"</td><td>" + data[i].doc.author + 
								"</td></tr>"
					}
					str += "</table>";
					str += "<p><input type='text' size='16' id='deleteCRN'><button>Delete CRN</button></p>";
					div.innerHTML = str;
	};
	
	// Function to delete a class a user chooses
	function deleteClasses() {
		var theClass = document.getElementById("deleteCRN").value;
		
		db.get(theClass, function(err, doc) {
			db.remove(doc, function(err, response) { 
					if (response) {
						document.getElementById("deleteCRN").value = "";
						showClasses();
						navigator.notification.vibrate(250);
					} else {
						console.log(err);
						document.getElementById("deleteCRN").value = "";
						navigator.notification.vibrate(500);
						alert("The class CRN" + theClass + " does not exist. Try again.");
					}
				});
		});
	};
	
	// jQuery to access the Add a Class button
	$("#addClasses").click(function () {
			addClasses();
		});
	 
	// jQuery to access the Show Classes button
	$("#showClasses").click(function () {
			showClasses();
		});
	 
	// jQuery to access the dynamically-created Remove CRN button
	$("body").on("click", "button", 
    		function () {
    			deleteClasses();
    		}
    );
}