	// Haurus Inc. 2012
	
	// Declare global variables
	var state = 0; // 0 record, 1 stop, 2 playback   
	var src = "recording.wav"; // name of auio file
	var mediaRec; // the object for recording and play sound
	var directory; // holds a reference for directory reading
	
	// Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
 
	// PhoneGap is ready
    function onDeviceReady() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSytemSuccess, null);       	
    }
       
	// For this simple example we'll use the same file
    function onClick() {
    	//alert("onClick() "+state);
    	switch(state) {
    		case 0: 
    			startRecording(); 
    			break;
    		case 1: 
    			stopRecording(); 
    			break;
    		case 2: 
    			playRecording(); 
    			break;
    		default: 
    			paraRecording();
    	}
    	// Cycle back for another recording
    	if( ++state > 3 ) {
    		state =0;
    	}
		if( state > 1 ) {
    		
$("#subidor").empty().html('<img src="upload.png" />');
    	}
    }

	function startRecording() {
		//alert("startRecording()"); 
		// Create your Media object
		//alert('antes de cambiar');
		 document.getElementById('grabadora').src='recording.gif';

		//alert('despues de cambiar');
   		mediaRec = new Media(directory.fullPath+"/"+src,
        // Success callback
        function() {
      //      alert("mediaRec -> success");
        },
        // Error callback
        function(err) {
      //      alert("mediaRec -> error: "+ err.code);
        });
    	// Record audio
    	mediaRec.startRecord();
	}
      
	function stopRecording() {
    //	alert("stopRecording()");
    	mediaRec.stopRecord();
		document.getElementById('grabadora').src='play.gif';
    }
    
    function playRecording() {
    	//alert("playRecording()");
		
		document.getElementById('grabadora').src='stop.gif';
    	mediaRec.play();
    }    
    function paraRecording() {
    	//alert("playRecording()");
		
		document.getElementById('grabadora').src='record.png';
    	mediaRec.stop();
    }
	
    function onFileSytemSuccess(fileSystem) {
		// Get the data directory, creating it if it doesn't exist.
	    fileSystem.root.getDirectory("",{create:true},onDirectory,onError);
	    // Create the lock file, if and only if it doesn't exist.	
		fileSystem.root.getFile(src, {create: true, exclusive: false}, onFileEntry, onError);  
	}
	
	function onFileEntry(fileEntry) {
	//	alert("onFileEntry()");
    }
    
	function onDirectory(d) {
		//alert("onDirectory()");
    	directory = d;
    	var reader = d.createReader();
    	reader.readEntries(onDirectoryRead,onError);
	}
	
	// Helpful if you want to see if a recording exists 
	function onDirectoryRead(entries) {
    	//alert("The dir has "+entries.length+" entries.");
    	// Scan for audio src
 		for (var i=0; i<entries.length; i++) {
 			//alert(entries[i].name+' dir? '+entries[i].isDirectory);
 			if(entries[i].name == src) {
 			//	alert("file found");
 			}
        }
 	}

    function onSuccess() {
      //  alert("onSuccess()");
    }

    function onError(error) {
   //     alert('onError(): '    + error.code    + '\n' + 
      //        'message: ' + error.message + '\n');
    }
	    function uploadFile() {
		
		mediaFile=directory.fullPath+"/"+src;
	//	alert(mediaFile);
        var ft = new FileTransfer(),
            path = mediaFile,
            name = mediaFile.name;
//alert(name);
//alert(path);
var id = localStorage['id'];
//alert(server+"uploadaudio.php");
$("#subidor").empty().html('<img src="loading.gif" />');
        ft.upload(path,
            server+"uploadaudio.php?id="+id,
            function(result) {
            //    alert('Upload success: ' + result.response);
              //  alert('volvemos al directorio');
				$("#subidor").slideUp('fast');
				location.href = 'folders.html';
            },
            function(error) {
              //  alert('Error uploading file ' + path + ': ' +error.code);
            },
            { fileName: name });  
    }
	