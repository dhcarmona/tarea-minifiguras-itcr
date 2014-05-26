/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */ 
 	
	$(function($) {
	 var foto;
 
 
 function onFail(message){
		window.alert("Error al tomar la foto.");
	 }
	 
function onPhotoDataSuccess(imageData) {
		  foto = imageData;
		}

function TakePhotoClick(){
		console.error("Tomando foto");
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
				{quality:50, destinationType:navigator.camera.DestinationType.DATA_URL});
		}
	
 
	 
	function agregar(){
				
				Parse.initialize("uRfID27WirC8G3K7iyIngwAsiLWOFVX1LaqJ2EZ8", "4R91UBZGwCKwLqWAREgPvoDxLIvnUHBQUFmsKckL");
				var user = Parse.User.current();
				var Figure = Parse.Object.extend("Figure");
					if (foto != "") {
					  $.blockUI({message:'<img src="img/ajax-loader.gif"></img>'});
					  var name = "photo.jpg";					 
					  
					  var parseFile = new Parse.File(name, {base64:foto});

					  var nombre = $('#nombre').val();
					  var serie = $('#serie').val();
					  console.error("Datos: nombre " + nombre + " foto "+foto);
					  var b1 = new Figure({"Name":nombre,"Series":serie,"Photo":parseFile});
					  
					  b1.save().then(function() {
					   $.unblockUI();
						
					}, function(error) {
						$.unblockUI();
						window.alert("Error");
					});
				  
					} else {
						window.alert("No se ha tomado la imagen.");
					}
					

				
	}
	
    $('#guardar').click(function() {
		
		agregar();
  
    });
	
    $('#foto').click(function() {
		
		TakePhotoClick();
  
    });	
	}
	);
 
function getNotes(){
				Parse.initialize("uRfID27WirC8G3K7iyIngwAsiLWOFVX1LaqJ2EZ8", "4R91UBZGwCKwLqWAREgPvoDxLIvnUHBQUFmsKckL");
		
				var Figura = Parse.Object.extend("Figure");
				var query = new Parse.Query(Figura);


				query.find({
					success:function(results) {
						console.dir(results);
						var s = "";
						cols = 1;
						for(var i=0, len=results.length; i<len; i++) {

								var note = results[i];
								if( note.get("Photo") != null){
							
								if (cols == 1) {
									s += '<div class="row">';		
								}
								s += '<div class="col-sm-6 col-lg-3">';		
								s += '<div class="panel panel-primary">';
								s += '<div class="panel-heading"><h3 class="panel-title">'+note.get("Name")+'</h3></div>';
								s += "<img src=" + note.get("Photo").url() + ' height="80" width="80"><br/>';
								s += '<div class="panel-footer">'+note.get("Series")+ '</div>';

								s += '</div></div>';
								
								if (cols == 4) {
									s += '</div>';	
									cols = 0;
								}
								cols++;
							
							}
						}
						document.getElementById('minifigures').innerHTML += s;
					//	$('#minifigures').append(s);
					//	$("#minifigures").html(s);
					},
					error:function(error) {
						alert("Error when getting notes!");
					}
				}); }

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

		
	
				
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('deviceready', this.getNotes, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
	
	
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		this.getNotes();
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


