   //prefixes of implementation that we want to test
   //window.indexedDB = window.indexedDB ;


   //prefixes of window.IDB objects
   window.IDBTransaction = window.IDBTransaction || 
   window.webkitIDBTransaction || window.msIDBTransaction;
   window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
   window.msIDBKeyRange
   
   if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB.")
   }
   
   let db;
   let request = window.indexedDB.open("tirnoper", 1);
   
   request.onerror = function(event) {
      console.log("error: ");
   };
   
   request.onsuccess = function(event) {
      db = request.result;
      console.log("success: "+ db);
      readAll();
   };
   
  
   
   function read() {
      let transaction = db.transaction(["tirnoper"]);
      let objectStore = transaction.objectStore("cliente");
      let request = objectStore.get("1");
      
      request.onerror = function(event) {
         alert("Unable to retrieve daa from database!");
      };
      
      request.onsuccess = function(event) {
         // Do something with the request.result!
         if(request.result) {
            alert("Name: " + request.result.name );
         } else {
            alert("Kenny couldn't be found in your database!");
         }
      };
   }
   let _CLIENTE_AUTOCOMPLETE = [];
   
   function readAll() {
      let objectStore = db.transaction("cliente").objectStore("cliente");
      objectStore.openCursor().onsuccess = function(event) {
         let cursor = event.target.result;
        
         if (cursor) {
            _CLIENTE_AUTOCOMPLETE[cursor.value.name] = null;
            cursor.continue();
         } else {
            console.log("No more entries!");
         }

      };
   }

   function addIndexDB(id,nombre) {
      let request = db.transaction(["cliente"], "readwrite")
      .objectStore("cliente")
      .add({ id: id, name: nombre });
      
      request.onsuccess = function(event) {
         console.log(" has been added to your database.");
      };
      
      request.onerror = function(event) {
         console.log("Unable to add data\r\nKenny is aready exist in your database! ");
      }
   }
   
   function add() {
      let request = db.transaction(["cliente"], "readwrite")
      .objectStore("cliente")
      .add({ id: "1", name: "Kenny" });
      
      request.onsuccess = function(event) {
         alert("Kenny has been added to your database.");
      };
      
      request.onerror = function(event) {
         alert("Unable to add data\r\nKenny is aready exist in your database! ");
      }
   }
   
   function remove() {
      let request = db.transaction(["employee"], "readwrite")
      .objectStore("employee")
      .delete("00-03");
      
      request.onsuccess = function(event) {
         alert("Kenny's entry has been removed from your database.");
      };
   }

   $.ajax({
      url: API_URL_BASE + "/api/v1/TirNoPer/ObtenerNombreClientesAll",
      data: JSON.stringify({ 
         "Nombre": sessionStorage.getItem("user"),
         "Rol": sessionStorage.getItem("role")
     }),
      type: "POST",
      headers: {
         "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
         "Content-Type": "application/json"
     },
      success: function (_data){
           let count = 1   
          _data.forEach(element => {
              console.log(element);
            
              addIndexDB(count,element);
              count = count + 1;
          });
          return _data;
      },
      error: function (xhr, status, error) {
          console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
      }
  }); 

  $("#autocomplete-cliente").autocomplete({
   data: _CLIENTE_AUTOCOMPLETE
});