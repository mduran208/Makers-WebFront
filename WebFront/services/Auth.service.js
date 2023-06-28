/*
----------------------------------------------------------------------------------------
-                                                                                      -
-                                   AUTHORIZATION                                      -
-                                     SERVICIOS                                        -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

const btnLogin = document.getElementById("btnLogin");
const email = document.getElementById("InputEmail");
const password = document.getElementById("InputPassword");
let token_login;


function getTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  
    return titleCase;
  }


function validate_token() {

    
    $.ajax({
        url: API_URL_BASE + "/api/auth/validate",
        type: "POST",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
            "Content-Type": "application/json"
        },
        success: function (_data){
            $('.navbar-content').html('<li ><h6>' + getTitleCase(_data.user) + '</h6></li> <li ><h6 style="font-family:Cabin ">'+ getTitleCase(_data.role) +'</h6></li>');
            sessionStorage.setItem("user", _data.user);
            sessionStorage.setItem("role", _data.role);
            //Hacer la llamada al API para crear la sesion en BD...
            //y almacenar token, user, role, timestamp..
            get_roles();
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText) 
        }
    });

}

function get_roles(){

    $.ajax({
        url: API_URL_BASE + "/api/v1/TirNoPer/ObtenerPARoles",
        type: "POST",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
            "Content-Type": "application/json"
        },
        success: function (_data){
            let roles=[];

            _data.forEach(element => {
                roles.push(element.rol.toUpperCase());
            });

            validate_access(roles);

        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });

}
function generar_token_login(){

    let user;
    let role;


    $.ajax({
        url: API_URL_BASE + "/api/auth",
        data: JSON.stringify({
            "user": user,
            "role": role
        }),
        type: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        success: function (_data){

            token_login = _data.token;
            sessionStorage.setItem("access_token", token_login);

        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });

}


function get_usarios_temp_auth(){


    $.ajax({
        url: API_URL_BASE + "/api/v1/TirNoPer/ObtenerUsuariosTempAuth",
        data: JSON.stringify({
            "email": email.value,
            "password":password.value
        }),
        type: "POST",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
            "Content-Type": "application/json"
        },
        success: function (_data){

            if(_data[0]){
                window.location.href = "/";
                sessionStorage.setItem("role", _data[0].rol);
                sessionStorage.setItem("user", _data[0].nombre);
                sessionStorage.setItem("time", new Date().getTime());
            }else{
                removersessionStorageValues();
                alert('Usuario invalido..');
            }

        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });

}


function validate_access(roles){

    //Leer el token de BD..
    
    $.ajax({    
        url: API_URL_BASE + "/api/auth/validate-access",
        type: "POST",
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
            "Content-Type": "application/json"
        },
        success: function (_data){
            if(roles.indexOf(sessionStorage.getItem("role").replace('\t','').toUpperCase())>-1){
                if ($('#tirnoper-menu-pa').length === 0) {
                    $("#tirnoper-menu").append('<li id="tirnoper-menu-pa"><a href="TirNoPer-Administrative.html" class="link-dark rounded">Panel Administrativo</a></li>');
                } 
            }
            else{
                if ($('#tirnoper-menu-pa').length > 0) {
                    $("#tirnoper-menu-pa").remove();
                } 
            }

            
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            sessionStorage.removeItem("access_token");
            window.location.href = "/";  
        }
    })
}