$(document).ready(

    function functionName() {
        const getUrlParameter = (sParam) => {
          const sPageURL = window.location.search.substring(1);
          const sURLVariables = sPageURL.split('&');
      
          for (const sParameter of sURLVariables) {
            const [sParameterName, sParameterValue] = sParameter.split('=');
      
            if (sParameterName === sParam) {
              return sParameterValue === undefined ? "true" : decodeURIComponent(sParameterValue);
            }
          }
      
          return "false";
        };
      
        const access_token = sessionStorage.getItem("access_token");
        const utlToken = getUrlParameter('token');
      
        if (!access_token) {
          if (!utlToken) {
            $("#message").html("Usuario no autorizado");
            $('#modal-alert').modal("show");
          } else {
            $('#modal-alert').modal("hide");
            sessionStorage.setItem("access_token", utlToken);
          }
        } else if (utlToken.length > 0) {
          $('#modal-alert').modal("hide");
          sessionStorage.setItem("access_token", getUrlParameter('token'));
        }

        return "false";

      }      
      

);
