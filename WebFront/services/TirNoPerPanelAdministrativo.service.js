/*
----------------------------------------------------------------------------------------
-                                                                                      -
-                            TirNoPer - PANEL ADMINISTRATIVO                           -
-                               FUNCIONES Y SERVICIOS                                  -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

/*
----------------------------------------------------------------------------------------
-                                                                                      -                         
-                                      FUNCIONES                                       -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/



function separar_numero_en_comas(val){
    val = val.toFixed(2);
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

function limpiar_campos() {

    $("#btnEjecutarValoracion").prop("disabled", true);
    $("#txtEstadoEjecucionCarga").css("background-color", "");
    $("#txtEstadoEjecucionCarga").val("");

    $("#txtDetallesCarga").css("background-color", "");
    $("#txtDetallesCarga").val("");

    $("#txtEstadoEjecucionValoracion").css("background-color", "");
    $("#txtEstadoEjecucionValoracion").val("");

    $("#txtDetallesValoracion").css("background-color", "");
    $("#txtDetallesValoracion").val("");

    $("#fechaCarga").prop("disabled", true);
    $("#fechaValoracion").prop("disabled", true);

}

function limpiarCamposFics() {

    $("#btnProcesarFics").prop("disabled", true);

    $("#txtEstadoEjecucionCargaFics").css("background-color", "");
    $("#txtEstadoEjecucionCargaFics").val("");

    $("#txtDetallesCargaFics").css("background-color", "");
    $("#txtDetallesCargaFics").val("");

    $("#fechaCargaFics").prop("disabled", true);
}

function limpiarCamposCtaInv() {

    $("#btnProcesarCuentaInv").prop("disabled", true);

    $("#txtEstadoEjecucionCargaCuentaInv").css("background-color", "");
    $("#txtEstadoEjecucionCargaCuentaInv").val("");

    $("#txtDetallesCargaCuentaInv").css("background-color", "");
    $("#txtDetallesCargaCuentaInv").val("");

    $("#fechaCargaCuentaInv").prop("disabled", true);
}

function limpiarCamposSaldos() {

    $("#btnProcesarSaldos").prop("disabled", true);

    $("#txtEstadoEjecucionCargaSaldos").css("background-color", "");
    $("#txtEstadoEjecucionCargaSaldos").val("");

    $("#txtDetallesCargaSaldos").css("background-color", "");
    $("#txtDetallesCargaSaldos").val("");

    $("#fechaCargaSaldos").prop("disabled", true);
}

function limpiarCamposCargaCompleta() {

    $("#btnProcesarCargaCompleta").prop("disabled", true);

    $("#txtEstadoEjecucionCargaCompleta").css("background-color", "");
    $("#txtEstadoEjecucionCargaCompleta").val("");

    $("#txtDetallesCargaCompleta").css("background-color", "");
    $("#txtDetallesCargaCompleta").val("");

    $("#fechaCargaCompleta").prop("disabled", true);

    limpiar_campos();
    limpiarCamposFics();
    limpiarCamposCtaInv();
    limpiarCamposSaldos();
}

function LimpiarFiltrosCorrecciones() {
    $("#dtpFecha").val("");
    $("#txtIdCliente").val("");
    $("#resultados").html("");
}

let intervalo = null;
let intervaloFics = null;
let intervaloCtaInv = null;
let intervaloSaldos = null;
let intervaloCargaCompleta = null;

function ExceptionHandler(xhr) {
    switch (xhr.status) {
        case 401:
            sessionStorage.clear();
            window.location.href = "/";
            break;
        case 429:
            $(".modal-title").text("L&iacute;mite superado");
            $("#message").html("Se supero la cantidad de requests, por favor espere unos minutos e intente nuevamente. Si el problema persiste comuniquese con el administrador del sistema.");
            $('#modal-alert').modal("show");
            break;
        default:
            $(".modal-title").text(xhr.statusText + " - " + xhr.status);
            $("#message").html("<span style='font-weight:bold;'>Se produjo un error inesperado, por favor intente nuevamente. Si el problema persiste comuniquese con el administrador del sistema.</span>");
            $('#modal-alert').modal("show");
            break;
    }
}

/*
----------------------------------------------------------------------------------------
-                                                                                      -                         -
-                                      SERVICIOS                                       -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

function ConsultarCategoriasCorrecciones(){
    
    $("#cmbCategoria").empty();

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerCategorias",
        data: JSON.stringify({
            "CATEGORIA": "CategoriaCorrecciones"
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, value) {
                if(value.nombreCategoria.length > 0){
                    $('#cmbCategoria').append($('<option>').text(value.nombreCategoria).attr('value', value.nombreCategoria));
                }
            });
            $("#cmbCategoria").formSelect();    
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function ConsultarLote(fechaProceso) {
    $("#txtEstadoEjecucionValoracion").css("background-color", "");
    $("#txtEstadoEjecucionValoracion").val("");

    $("#txtDetallesValoracion").css("background-color", "");
    $("#txtDetallesValoracion").val("");

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerLotes",
        data: JSON.stringify({
            "FECHA": fechaProceso
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (data.lote == 0) {
                $("#btnEjecutarValoracion").prop("disabled", true);
                $("#idLote").val("");

                $(".modal-title").text("Alerta");
                $("#message").html("No se encontraron lotes en la fecha especificada");
                $('#modal-alert').modal("show");
            }
            else if (data.lote == 2) {
                $("#btnEjecutarValoracion").prop("disabled", true);
                $("#idLote").val("");
                
                //$.ajax({
                //    url: API_URL_BASE + "/api/v1/TirNoPer/PA/ObtenerCorreosError",
                //    data: JSON.stringify({ 
                //        "FECHA": fechaProceso 
                //    }),
                //    type: "POST",
                //    headers: {
                //        "Authorization": "Bearer " + sessionStorage.getItem("access_token"),
                //        "Content-Type": "application/json"
                //    },
                //});
                
                $(".modal-title").text("Alerta");
                $("#message").html("Se encontraron mas de 1 lote en la fecha especicicada. Por favor comun&iacute;quese con el &aacute;rea de soporte");
                $('#modal-alert').modal("show");
            }
            else {
                $("#idLote").val(data.lote);
                $("#btnEjecutarValoracion").prop("disabled", false);
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function CargarTitulosExtrabursatiles() {
    if ($("#fechaCargaTEB").val() == "") {
        $(".modal-title").text("Alerta");
        $("#message").html("Debe de ingresar la fecha de corte de T&iacute;tulos Extrabursatiles");
        $('#modal-alert').modal("show");
        return;
    }

    let fechaCarga = $("#fechaCargaTEB").val();

    $.ajax({
        url: "/TirNoPerAdministrativo/EjecutarCargaTEB",
        data: JSON.stringify({ 
            "FECHA": fechaCarga 
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (data.respuesta == "Proceso ocupado") {
                $(".modal-title").text("Alerta");
                $("#message").html("En el momento hay un proceso en ejecuci&oacute;n. Por favor, int&eacute;ntelo mas tarde");
                $("#modal-alert").modal("show");
            }
            else {
                limpiar_campos();

                $("#txtEstadoEjecucionTEB").val("");
                $("#txtDetallesTEB").val("");
                $("#txtEstadoEjecucionTEB").css("background-color", "orange");
                $("#txtEstadoEjecucionTEB").val("En Ejecucion...");
                $("#txtDetallesTEB").css("background-color", "orange");

                clickVerificarEstadoTarea("cargaTitulos");

                $(".modal-title").html("<span style='font-weight:bold;'>Aviso</span>");
                $("#message").html("El proceso de carga de T&iacute;tulos Extraburs&aacute;tiles se ha terminado");
                $('#modal-alert').modal("show");
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function MensajeModal(title, mensaje) {
    $(".modal-title").text(title);
    $("#message").html(mensaje);
    $("#modal-alert").modal("show");
}


function EjecutarValoracion() {
    if ($("#fechaValoracion").val() == "") {
        MensajeModal("Alerta","Debe de ingresar la fecha de corte valoraci&oacute;n");
        return;
    }

    let  nroLote = $("#idLote").val();

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerValoracionTEB",
        data: JSON.stringify({ 
            "ID": nroLote 
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (data.respuesta == "Proceso ocupado") {
                MensajeModal("Alerta","En el momento hay un proceso en ejecuci&oacute;n. Por favor, int&eacute;ntelo mas tarde");
            }
            else {
                limpiar_campos();

                $("#txtEstadoEjecucionValoracion").val("");
                $("#txtDetallesValoracion").val("");

                $("#txtEstadoEjecucionValoracion").css("background-color", "orange");
                $("#txtEstadoEjecucionValoracion").val("En Ejecucion...");
                $("#txtDetallesValoracion").css("background-color", "orange");
                
                MensajeModal("<span style='font-weight:bold;'>Aviso</span>","El proceso de valoraci&oacute;n se ha iniciado");
                clickVerificarEstadoTarea("valoracionTitulos");
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });

}

function CargarVarios(cuenta) {
    let fecha = "";
    let mensaje = "";
    let url = "";
    let idSession = "";
    let estadosEjecucion = "";
    let detalle = "";
    let mensajeInicio = "";
    switch(cuenta){
        case "Fics":
            fecha = "#fechaCargaFics";
            mensaje = "Debe de ingresar la fecha de corte FIC's";
            url = "/api/v1/Cargas/PA/EjecutarCargaFICS";
            idSession = "CargaFICS";
            estadosEjecucion = "#txtEstadoEjecucionCargaFics";
            detalle = "#txtDetallesCargaFics";
            mensajeInicio = "El proceso de carga FIC's se ha iniciado";
            break;
        case "CuentaInv":
            fecha = "#fechaCargaCuentaInv";
            mensaje = "Debe de ingresar la fecha de corte Cuenta de Inversi&oacute;n";
            url = "/api/v1/Cargas/PA/EjecutarCargaCTAINV";
            idSession = "CargaCTAINV";
            estadosEjecucion = "#txtEstadoEjecucionCargaCuentaInv";
            detalle = "#txtDetallesCargaCuentaInv";
            mensajeInicio = "El proceso de carga Cuenta de Inversi&oacute;n se ha iniciado";
            break;
        case "Saldos":
            fecha = "#fechaCargaSaldos";
            mensaje = "Debe de ingresar la fecha de corte Saldos";
            url = "/api/v1/Cargas/PA/EjecutarCargaSaldos";
            idSession = "CargaSALDOS";
            estadosEjecucion = "#txtEstadoEjecucionCargaSaldos";
            detalle = "#txtDetallesCargaSaldos";
            mensajeInicio = "El proceso de carga saldos se ha iniciado";
            break;
        case "Completa":
            fecha = "#fechaCargaCompleta";
            mensaje = "Ingresa la fecha de corte solicitada";
            url = "/api/v1/Cargas/PA/EjecutarCargaCompleta";
            idSession = "CargaCOMPLETA";
            estadosEjecucion = "#txtEstadoEjecucionCargaCompleta";
            detalle = "#txtDetallesCargaCompleta";
            mensajeInicio = "El proceso de carga completa se ha iniciado";
            break;
    }

    if ($(fecha).val() == "") {
        MensajeModal("Alerta",mensaje);
        return;
    }

    let fechaCarga = $(fecha).val();

    $.ajax({
        url: "/TirNoPerAdministrativo/CargarVarios",
        data: JSON.stringify({ 
            "FECHA": fechaCarga,
            "Url": url,
            "IdSession": idSession,
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (data.respuesta == "Proceso ocupado") {
                MensajeModal("Alerta","En el momento hay un proceso en ejecuci&oacute;n. Por favor, int&eacute;ntelo mas tarde");
            }
            else {
                switch(cuenta){
                    case "Fics":
                        limpiarCamposFics();
                        break;
                    case "CuentaInv":
                        limpiarCamposCtaInv();
                        break;
                    case "Saldos":
                        limpiarCamposSaldos();
                        break;
                    case "Completa":
                        limpiarCamposCargaCompleta();
                        break;
                }

                $(estadosEjecucion).val("");
                $(detalle).val("");

                $(estadosEjecucion).css("background-color", "orange");
                $(estadosEjecucion).val("En Ejecucion...");
                $(detalle).css("background-color", "orange");

                MensajeModal("Aviso",mensajeInicio);

                switch(cuenta){
                    case "Fics":
                        clickVerificarEstadoTareaFics();
                        break;
                    case "CuentaInv":
                        clickVerificarEstadoTareaCtaInv();
                        break;
                    case "Saldos":
                        clickVerificarEstadoTareaSaldos();
                        break;
                    case "Completa":
                        clickVerificarEstadoTareaCargaCompleta();
                        break;
                }

            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function CargarFics() {
    CargarVarios("Fics");
}

function CargarCuentaInv() {
    CargarVarios("CuentaInv");
}

function CargarSaldos() {
    CargarVarios("Saldos");
}

 function CargaCompleta() {
    CargarVarios("Completa");
}

function ExtraccionSalesforce() {

    $.ajax({
        url: "/TirNoPerAdministrativo/EjecutarExtraccionSalesforce",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (data.respuesta == "Proceso ocupado") {
                MensajeModal("Alerta","En el momento hay un proceso en ejecuci&oacute;n. Por favor, int&eacute;ntelo mas tarde");
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function clickVerificarEstadoTarea(proceso) {

    if (proceso == "cargaTitulos") {
        intervalo = setInterval(VerificarEstadoTareaCargaTitulos, 5000);
    } else if (proceso == "valoracionTitulos") {
        intervalo = setInterval(VerificarEstadoTareaValoracionTitulos, 5000);
    }
}

function clickVerificarEstadoTareaFics() {
    intervaloFics = setInterval(VerificarEstadoTareaCargaFics, 5000);
}

function clickVerificarEstadoTareaCtaInv() {
    intervaloCtaInv = setInterval(VerificarEstadoTareaCargaCtaInv, 5000);
}

function clickVerificarEstadoTareaSaldos() {
    intervaloSaldos = setInterval(VerificarEstadoTareaSaldos,5000);
}

function clickVerificarEstadoTareaCargaCompleta() {
    intervaloCargaCompleta = setInterval(VerificarEstadoTareaCargaCompleta, 600000);
}

function VerificarEstadoTarea(tipo)
{
    let url = "";
    let proceso = "";
    let interv;
    switch(tipo)
    {
        case "cargaTitulos":
            url = "/api/v1/Cargas/PA/VerificarEstadoCargaTEB";
            proceso = "#procesoFinalizadoTEB";
            interv = intervalo;
            break;
        case "valoracionTitulos":
            url = "/api/v1/Cargas/PA/VerificarEstadoValoracionTEB";
            proceso = "#procesoFinalizado";
            interv = intervalo;
            break;
        case "CargaFics":
            url = "/api/v1/Cargas/PA/VerificarEstadoCargaFics";
            proceso = "#procesoFinalizadoFics";
            interv = intervaloFics;
            break;
        case "CargaCtaInv":
            url = "/api/v1/Cargas/PA/VerificarEstadoCargaCtaInv";
            proceso = "#procesoFinalizadoCtaInv";
            interv = intervaloCtaInv;
            break;
        case "Saldos":
            url = "/api/v1/Cargas/PA/VerificarEstadoCargaSaldos";
            proceso = "#procesoFinalizadoSaldos";
            interv = intervaloSaldos;
            break;
        case "CargaCompleta":
            url = "/api/v1/Cargas/PA/VerificarEstadoCargaCompleta";
            proceso = "#procesoFinalizadoCargaCompleta";
            interv = intervaloCargaCompleta;
            break;
    }

    $.ajax({
        url: "/TirNoPerAdministrativo/VerificarEstadoTarea",
        data: JSON.stringify({
            "Url": url,
            "Tipo": tipo
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data){
            if (data){
                if($(proceso).val() === "true"){
                    clearInterval(interv);
                }
            }
            switch(tipo)
            {
                case "cargaTitulos":
                case "valoracionTitulos":
                    ObtenerDetallesProcesoTEB(tipo, data);
                    break;
                case "CargaFics":
                    ObtenerDetallesProcesoFics(data);
                    break;
                case "CargaCtaInv":
                    ObtenerDetallesProcesoCtaInv(data);
                    break;
                case "Saldos":
                    ObtenerDetallesProcesoSaldos(data);
                    break;
                case "CargaCompleta":
                    ObtenerDetallesProcesoCargaCompleta(data);
                    break;    
            }
            
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}


function VerificarEstadoTareaCargaTitulos() {
    VerificarEstadoTarea("cargaTitulos");
}

function VerificarEstadoTareaValoracionTitulos() {
    VerificarEstadoTarea("valoracionTitulos");
}

function VerificarEstadoTareaCargaFics() {
    VerificarEstadoTarea("CargaFics");
}

function VerificarEstadoTareaCargaCtaInv() {
    VerificarEstadoTarea("CargaCtaInv");
}

function VerificarEstadoTareaSaldos() {
    VerificarEstadoTarea("Saldos");
}

function VerificarEstadoTareaCargaCompleta() {
    VerificarEstadoTarea("CargaCompleta");
}

function ObtenerDetallesProcesoTEB(Proceso, Finalizado) {

    if (Proceso === "cargaTitulos") {
        if (Finalizado.GUID === null || Finalizado.GUID === undefined) {
            MensajeModal("<span style='font-weight:bold;'>Alerta</span>", "No se ha ejecutado una carga de titulos");
            return;
        }
    }

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerDetalleProceso",
        data: JSON.stringify({
            "GUID": Finalizado.GUID
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            if (Proceso === "cargaTitulos") {
                VerificaFinalizado(Finalizado, data);
            }
            else {
                if (data.estado == "En Ejecucion...") {
                    $("#txtEstadoEjecucionValoracion").css("background-color", "orange");
                    $("#txtEstadoEjecucionValoracion").val(data.estado);

                    $("#txtDetallesValoracion").css("background-color", "orange");
                    $("#txtDetallesValoracion").val("Hora Inicio: " + data.horaInicio
                        + " | Hora Fin: " + data.horaFin
                        + " | Tiempo transcurrido: " + data.tiempoEjecucion
                        + " | Lote: " + data.lote);
                    $("#procesoFinalizado").val("false");
                }

                if (data.estado == "Finalizado correctamente") {
                    $("#txtEstadoEjecucionValoracion").css("background-color", "Chartreuse");
                    $("#txtEstadoEjecucionValoracion").val("Finalizado correctamente");

                    $("#txtDetallesValoracion").css("background-color", "Chartreuse");
                    $("#txtDetallesValoracion").val("Hora Inicio: " + data.horaInicio
                        + " | Hora Fin: " + data.horaFin
                        + " | Tiempo transcurrido: " + data.tiempoEjecucion
                        + " | Lote: " + data.lote);
                    $("#btnEjecutarValoracion").prop("disabled", false);
                    $("#fechaCarga").prop("disabled", false);
                    $("#fechaValoracion").prop("disabled", false);
                    $("#procesoFinalizado").val("true");
                }

                if (data.estado == "Finalizado con errores") {
                    $("#txtEstadoEjecucionValoracion").css("background-color", "red");
                    $("#txtEstadoEjecucionValoracion").val(data.estado);

                    $("#txtDetallesValoracion").css("background-color", "red");
                    $("#txtDetallesValoracion").val("Hora Inicio: " + data.horaInicio
                        + " | Hora Fin: " + data.horaFin
                        + " | Tiempo transcurrido: " + data.tiempoEjecucion
                        + " | Lote: " + data.lote);
                    $("#btnEjecutarValoracion").prop("disabled", false);
                    $("#fechaCarga").prop("disabled", false);
                    $("#fechaValoracion").prop("disabled", false);
                    $("#procesoFinalizado").val("true");
                }
            }
			
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function VerificaFinalizado(Finalizado, data){
    AplicarEstilos(Finalizado, data, "#txtEstadoEjecucionTEB", "#txtDetallesTEB", "", "#fechaCargaTEB", "#procesoFinalizadoTEB");
}

function AplicarEstilos(Finalizado, data, estadoEjecucion, detalles, procesar, fechaCarga, procesoFinalizado) {
    if(Finalizado){
        if (data.estado == "Finalizado con errores") {
            $(estadoEjecucion).css("background-color", "red");
            $(estadoEjecucion).val(data.estado);
            $(detalles).css("background-color", "red");
        }
        else{
            $(estadoEjecucion).css("background-color", "Chartreuse");
            $(estadoEjecucion).val("Finalizado correctamente");
            $(detalles).css("background-color", "Chartreuse");
        }
        $(detalles).val("Hora Inicio: " + data.horaInicio 
                                        + "\r\nHora Fin: " + data.horaFin 
                                        + "\r\nTiempo transcurrido: " + data.tiempoEjecucion 
                                        + "\r\nLote: " + data.lote);
        $(procesar).prop("disabled", false);
        $(fechaCarga).prop("disabled", false);
        $(procesoFinalizado).val("true");
    }
    else{
        $(estadoEjecucion).css("background-color", "orange");
        $(estadoEjecucion).val(data.estado);
        $(detalles).css("background-color", "orange");
        $(detalles).val(data.detalles)
        $(procesoFinalizado).val("false");
    }
}

function ObtenerDetallesProceso(tipo, Finalizado) {
    let mensaje = "";
    let estadoEjecucion = "";
    let detalle = "";
    let btnProcesar = "";
    let fechaCarga = "";
    let procesoFinal = "";
    switch(tipo) {
        case "Fics":
            mensaje = "No se ha ejecutado una carga de Fics";
            estadoEjecucion = "#txtEstadoEjecucionCargaFics";
            detalle = "#txtDetallesCargaFics";
            btnProcesar = "#btnProcesarFics";
            fechaCarga = "#fechaCargaFics";
            procesoFinal = "#procesoFinalizadoFics";
            break;
        case "CtaInv":
            mensaje = "No se ha ejecutado una carga de Cuentas Inversion";
            estadoEjecucion = "#txtEstadoEjecucionCargaCuentaInv";
            detalle = "#txtDetallesCargaCuentaInv";
            btnProcesar = "#btnProcesarCuentaInv";
            fechaCarga = "#fechaCargaCuentaInv";
            procesoFinal = "#procesoFinalizadoCtaInv";
            break;
        case "Saldos":
            mensaje = "No se ha ejecutado una carga de Saldos";
            estadoEjecucion = "#txtEstadoEjecucionCargaSaldos";
            detalle = "#txtDetallesCargaSaldos";
            btnProcesar = "#btnProcesarSaldos";
            fechaCarga = "#fechaCargaSaldos";
            procesoFinal = "#procesoFinalizadoSaldos";
            break;
        case "CargaCompleta":
            mensaje = "No se ha ejecutado una carga completa";
            estadoEjecucion = "#txtEstadoEjecucionCargaCompleta";
            detalle = "#txtDetallesCargaCompleta";
            btnProcesar = "#btnProcesarCargaCompleta";
            fechaCarga = "#fechaCargaCompleta";
            procesoFinal = "#procesoFinalizadoCargaCompleta";
            break;
    }

    if (Finalizado.GUID === null || Finalizado.GUID === "") {
        MensajeModal("<span style='font-weight:bold;'>Alerta</span>",mensaje);
        return;
    }

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerDetalleProceso",
        data: JSON.stringify({
            "GUID": Finalizado.GUID
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            AplicarEstilos(Finalizado, data, estadoEjecucion, detalle, btnProcesar, fechaCarga, procesoFinal);
            if(tipo == "CargaCompleta") {
                if(Finalizado){
                    if (data.estado == "Finalizado con errores") {
                        $("#btnEjecutarValoracion").prop("disabled", false);
                        $("#fechaCarga").prop("disabled", false);
                        $("#fechaValoracion").prop("disabled", false);
                    }
                    $("#btnProcesarCuentaInv").prop("disabled", false);
                    $("#btnProcesarFics").prop("disabled", false);
                    $("#fechaCargaFics").prop("disabled", false);
                    $("#fechaCargaCuentaInv").prop("disabled", false);
                    $("#btnProcesarSaldos").prop("disabled", false);
                    $("#fechaCargaSaldos").prop("disabled", false);
                }   
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function ObtenerDetallesProcesoFics(Finalizado) {
    ObtenerDetallesProceso("Fics", Finalizado);
}

function ObtenerDetallesProcesoCtaInv(Finalizado) {
    ObtenerDetallesProceso("CtaInv", Finalizado);
}

function ObtenerDetallesProcesoSaldos(Finalizado) {
    ObtenerDetallesProceso("Saldos", Finalizado);
}

function ObtenerDetallesProcesoCargaCompleta(Finalizado) {
    ObtenerDetallesProceso("CargaCompleta", Finalizado);
}

//Pestaña correcciones
function BuscarDatosCorrecciones(_NroDePagina) {
    if (document.getElementById("cmbCategoria").value == "" || $("#dtpFecha").val() == "") {
        MensajeModal("<span style='font-weight:bold;'>Alerta</span>","La categor&iacute;a y la fecha son obligatorias");
        return;
    }

    $('#tabla-correciones').show(500);
    $('#tabla-correciones tbody').empty();

    let _Categoria = document.getElementById("cmbCategoria").value;
    let _FechaProceso = $("#dtpFecha").val();
    let _Cliente = $("#txtIdCliente").val();

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerCorrecciones",
        data: JSON.stringify({ 
            "Categoria": _Categoria, 
            "FechaProceso": _FechaProceso, 
            "Cliente": _Cliente, 
            "NroDePagina":_NroDePagina 
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data){
            _data.forEach(element => {
                let value_id = '<td>' + element.id + '</td>';
                let value_Transaccion = '<td>' + element.fK_Id_Transaccion + '</td>';
                let value_nip = '<td>' + element.idCliente + '</td>';
                let value_nombre = '<td>' + element.cliente + '</td>';
                let value_lote = '<td> ' + element.lote + '</td>';
                let value_Proceso = '<td> ' + element.proceso + '</td>';
                let value_Operacion = '<td> ' + element.operacion + '</td>';
                let value_Valor = '<td> $' + element.valor + '</td>';
                let value_Cuenta = '<td> ' + element.cuenta + '</td>';

                let item = '<tr>' + value_id + value_Transaccion + value_nip + value_nombre + value_lote + value_Proceso + value_Operacion + value_Valor + value_Cuenta + '</tr>';

                $('#tabla-correciones').append(item);
            });
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}


function GuardarCorreccion(id,idOperacion,tabla) {

    if ($("#Cuenta_" + id).val() == "" || $("#Cliente_" + id).val() == "" || $("#Empresa_" + id).val() == "") {
        MensajeModal("<span style='font-weight:bold;'>Alerta</span>","Debe de seleccionar las clasificaciones de cuenta, cliente y empresa.");
        return;
    }

    if ($("#cmbCategoria").val() != "Fics") {
        id = id.replace(",", "").trim();
    }

    let categoria = $("#cmbCategoria").val();
    let cuenta = $("#Cuenta_" + id).val();
    let cliente = $("#Cliente_"+ id).val();
    let empresa = $("#Empresa_" + id).val();

    $.ajax({
        url: "/TirNoPerAdministrativo/GuardarCorrecciones",
        data: JSON.stringify({ 
            "Categoria": categoria, 
            "Id": id,
            "IdOperacion": idOperacion, 
            "ClasificacionCuenta": cuenta, 
            "ClasificacionCliente": cliente, 
            "ClasificacionEmpresa": empresa,
            "Tabla": tabla 
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            GuardarEliminarCorreccion(data);
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });

}

function GuardarEliminarCorreccion(data){
    if (data.datos) {
        $("#imgBusquedaFiltros").click();
        MensajeModal("<span style='font-weight:bold;'>Aviso</span>","El registro se guard&oacute; con &eacute;xito.");
    }
    else {
        MensajeModal("<span style='font-weight:bold;'>Error</span>","Ocurri&oacute; un error al registrar el registro.");
    }
}

function EliminarCorreccion(id) {

    let categoria = $("#cmbCategoria").val();

    $.ajax({
        url: "/TirNoPerAdministrador/RemoverCorrecciones",
        data: JSON.stringify({ 
            "Categoria": categoria, 
            "Id": id
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            GuardarEliminarCorreccion(data);
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

//Pestaña bloqueos

function ConsultarBloqueos() {

    $('#tabla-bloqueos tbody').empty();

     $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerBloqueos",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data){
            _data.forEach(element => {
                let value_id = '<td>' + element.id + '</td>';
                let value_nip = '<td>' + element.cliente.identificacion + '</td>';
                let value_nombre = '<td>' + element.cliente.nombre + '</td>';
                let value_observacion = '<td> ' + element.observacion + '</td>';
                let value_ver = "<td> <button type='button' class='btn btn-default btn-eliminar-bloqueo' value="+ element.id +">Eliminar</button></td>";
                let item = '<tr>' + value_id + value_nip + value_nombre + value_observacion + value_ver + '</tr>';

                $('#tabla-bloqueos').append(item);
            });

            let elementsFlujoCaja = document.getElementsByClassName("btn-eliminar-bloqueo");
            for (let value of elementsFlujoCaja) {
                value.addEventListener('click', EliminarBloqueo, false);
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });

}

function GuardarBloqueo(documento, observacion) {

    $.ajax({
        url: "/TirNoPerAdministrativo/GuardarBloqueo",
        data: JSON.stringify({ 
            "Documento": documento, 
            "Observacion": observacion 
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data == "Correcto") {
                LimpiarCamposBloqueo();
                ConsultarBloqueos();
                MensajeModal("Aviso","El registro se guard&oacute; con &eacute;xito.");
            }
            else if (data == "<span style='font-weight:bold;'>Error</span>") {
                MensajeModal("Error","Error al guardar el registro. La informaci&oacute;n no se almacen&oacute;.");
            }
            else {
                MensajeModal("Error",data);
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }        
    });

    
}

function VerificarClienteExiste() {

    if ($("#txtIdClienteBloqueo").val() == "") {
        MensajeModal("Aviso","El campo identificaci&oacute;n es obligatorio");
        return;
    }

    let documento = $("#txtIdClienteBloqueo").val();
    let observacion = $("#txtObservacionBloqueo").val();

    $.ajax({
        url: "/TirNoPerAdministrativo/VerificarBloqueo",
        data: JSON.stringify({ 
            "Documento": documento
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data) {
                GuardarBloqueo(documento, observacion);
            }
            else {
                MensajeModal("Error","El cliente que intenta ingresar no existe en el sistema");
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function EliminarBloqueo() {

    let id = $(this).val();

    console.log(id);

    $.ajax({
        url: "/TirNoPerAdministrativo/RemoverBloqueo",
        data: JSON.stringify({ 
            "ID": id
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data) {
                LimpiarCamposBloqueo();
                MensajeModal("Aviso","El registro se elimin&oacute; con &eacute;xito");
            }
            else {
                MensajeModal("Error","Ocurri&oacute; un error al eliminar el registro.");
            }

            ConsultarBloqueos();
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function LimpiarCamposBloqueo() {
    $("#txtIdClienteBloqueo").val("");
    $("#txtObservacionBloqueo").val("");
}



/*
----------------------------------------------------------------------------------------
-                                                                                      -
-                         TIRNOPER - PANEL ADMINISTRATIVO INFORMES                     -
-                               FUNCIONES Y SERVICIOS                                  -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

function ObtenerCategoriaInformes(){
 
    $("#categoriaInforme").empty();

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerCategoriasInformes",
        type: "POST",
        success: function (data) {
            $('#categoriaInforme').append($('<option>').text("Seleccione...").attr('value', ""));
            $.each(data.informes, function (index, value) {
                $('#categoriaInforme').append($('<option>').text(value.categoria).attr('value', value.categoria));
            });
            $("#categoriaInforme").formSelect();   
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function ObtenerListaInformes(){

    $("#listInformes").empty();

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerInformesPorCategoria",
        data: JSON.stringify({ 
            "CATEGORIA": $("#categoriaInforme").val() 
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            $('#listInformes').append($('<option>').text("Seleccione...").attr('value', ""));
            $.each(data, function (index, value) {
                $('#listInformes').append($('<option>').text(value.nombre).attr('value', value.nombre));
            });
            $("#listInformes").formSelect();   
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
     });
}


function RenderReport(reporte){

    switch (reporte) {
        case "Datos Saldos":
            $("#divReportes").show();
            $('#divReportes').load('TirNoPerAdministrativo/DatosSaldos', function() {
                $('#search-informe-DatosSaldos').on("click", function(){ 
                    autocomplete_buscar_clientes_informe_DataSaldos();
                });
                $(".consultar-informe-DatosSaldos").on("click",function(){
                    obtener_informe_DatosSaldos();
                });
            });
            break;
        case "Datos Titulos Extrabursátiles":
            $("#divReportes").show();
            $('#divReportes').load('TirNoPerAdministrativo/DatosTitulosExtrabursatiles', function() {
                $('#search-cliente-informe-DatosTB').on("click", function(){ 
                    autocomplete_buscar_clientes_informe_DataTB();
                });
                $('#search-cuenta-informe-DatosTB').on("click", function(){ 
                    autocomplete_buscar_cuentas_informe_DataTB();
                });     
                $(".consultar-informe-DatosTB").on("click",function(){
                    obtener_informe_DatosTB();
                });
            });
            break;
        case "Datos Sifi":
            $("#divReportes").show();
            $('#divReportes').load('TirNoPerAdministrativo/DatosSifi', function() {
                $('#search-cliente-informe-DatosSifi').on("click", function(){ 
                    autocomplete_buscar_clientes_informe_DatosSifi();
                });
                $('#search-cuenta-informe-DatosSifi').on("click", function(){ 
                    autocomplete_buscar_cuentas_informe_DatosSifi();
                });     
                $(".consultar-informe-DatosSifi").on("click",function(){
                    obtener_informe_DatosSifi();
                });
            });
            break;
        case "Datos Sif":
            $("#divReportes").show();
            $('#divReportes').load('TirNoPerAdministrativo/DatosSif', function() {
                $('#search-cliente-informe-DatosSif').on("click", function(){ 
                    autocomplete_buscar_clientes_informe_DatosSif();
                });
                $('#search-cuenta-informe-DatosSif').on("click", function(){ 
                    autocomplete_buscar_cuentas_informe_DatosSif();
                });     
                $(".consultar-informe-DatosSif").on("click",function(){
                    obtener_informe_DatosSif();
                });
            });
            break;
        case "Consolidado Procesos":
            $("#divReportes").show();
            $('#divReportes').load('TirNoPerAdministrativo/ConsolidadoProcesos', function() {
                $(".consultar-informe-consolidado").on("click",function(){
                    obtener_informe_ConsolidadoProcesos();
                });
            });
            break;
        case "Tir Masiva":
            $("#divReportes").show();
            $('#divReportes').load('TirNoPerAdministrativo/TirMasiva', function() {
                $('#search-segmento-informe-tir-masiva').on("click", function(){ 
                    autocomplete_buscar_segmentos_informe_tir_masiva();
                });
                $('#search-comercial-informe-tir-masiva').on("click", function(){ 
                    autocomplete_buscar_comercial_informe_tir_masiva();
                });
                $(".consultar-informe-tir-masiva").on("click",function(){
                    obtener_informe_tir_masiva();
                });
            });
            break;
        default:
            break;
    }   
}

/* INFORME: DATA SALDOS */

function autocomplete_buscar_clientes_informe(tipo) {
    let autocomplete = "";
    let url = "";
    switch(tipo){
        case "DataSaldos":
            autocomplete = "#autocomplete-informe-DatosSaldos";
            url = "/api/v1/Informes/PA/ObtenerClienteDatosSaldos";
            break;
        case "DataTB":
            autocomplete = "#autocomplete-cliente-informe-DatosTB";
            url = "/api/v1/Informes/PA/ObtenerClienteDatosTEB";
            break;
        case "DatosSifi":
            autocomplete = "#autocomplete-cliente-informe-DatosSifi";
            url = "/api/v1/Informes/PA/ObtenerClienteDatosSifi";
            break;
        case "DatosSif":
            autocomplete = "#autocomplete-cliente-informe-DatosSif";
            url = "/api/v1/Informes/PA/ObtenerClienteDatosSif";
            break;
    }

    let term = $(autocomplete).val();
    
    if (term.length > 2) {
        $(autocomplete).attr('maxlength', 0);

        $.ajax({
            url: "/TirNoPerAdministrativo/autocomplete_buscar_clientes_informe",
            data: JSON.stringify({ 
                "Term": term,
                "Url": url
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data) {
                return success_autocomplete(_data, autocomplete);
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });
    }
}

function autocomplete_buscar_clientes_informe_DataSaldos(){
    return autocomplete_buscar_clientes_informe("DataSaldos");
}

function obtener_informe_DatosSaldos(){
    let _FECHA = $("#filtro-fecha-informe-DatosSaldos").val().replace(/\-/g, '' );
    let _CLIENTE_SELECTED = $("#autocomplete-informe-DatosSaldos").val();

    $('#table-data-saldos tbody').empty();

    if (_FECHA == '' || _CLIENTE_SELECTED == '') { 
        MensajeModal("<span style='font-weight:bold;'>Alerta</span>","Datos incompletos");
    }
    else {

        $.ajax({
            url: API_URL_BASE + "/TirNoPerAdministrativo/ObtenerDatosSaldos",
            data: JSON.stringify({ 
                "Fecha": _FECHA,
                "Cliente": _CLIENTE_SELECTED
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data){
                _data.forEach(element => {
                    let value_documento = '<td>' + element.documento + '</td>';
                    let value_tipo_operacion = '<td>' + element.tipo_Operacion + '</td>';
                    let value_tipo_Identificacion = '<td>' + element.tipo_Identificacion + '</td>';
                    let value_cuenta = '<td>' + element.cuenta + '</td>';
                    let date = new Date(element.fecha);
                    let value_fecha = '<td>' +  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + '</td>';
                    let value_tipo = '<td>' + element.tipo + '</td>';
                    let value_operacion = '<td>' + element.operacion + '</td>';
                    let value_fuente = '<td>' + element.fuente + '</td>';
                    let value_vpn = '<td>' + element.vpn + '</td>';
                    let value_vpl = '<td>' + element.vpl + '</td>';
                    let value_especies = '<td>' + element.especies + '</td>';
                    let value_lote = '<td>' + element.lote + '</td>';
            
                    let item = '<tr>' + value_documento + value_tipo_operacion + value_tipo_Identificacion + value_cuenta + value_fecha 
                            + value_tipo + value_operacion + value_fuente + value_vpn + value_vpl + value_especies + value_lote + '</tr>';

                    $('#table-data-saldos').append(item);
                });

            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });

        $('#table-data-saldos').DataTable();
        $('.dataTables_length').addClass('bs-select');
    }
}

/* INFORME: DATA TITULOS EXTRABURSATILES */

function autocomplete_buscar_clientes_informe_DataTB(){
    return autocomplete_buscar_clientes_informe("DataTB");
}

function autocomplete_buscar_cuentas_informe(tipo) {
    let autocompletar = "";
    let cuenta = "";
    let url = "";
    switch(tipo) {
        case "DataTB":
            autocompletar = "#autocomplete-cliente-informe-DatosTB";
            cuenta = "#autocomplete-cuenta-informe-DatosTB";
            url = "/api/v1/Informes/PA/ObtenerCuentasDatosTEB";
            break;
        case "DatosSifi":
            autocompletar = "#autocomplete-cliente-informe-DatosSifi";
            cuenta = "#autocomplete-cuenta-informe-DatosSifi";
            url = "/api/v1/Informes/PA/ObtenerCuentasDatosSifi";
            break;
        case "DatosSif":
            autocompletar = "#autocomplete-cliente-informe-DatosSif";
            cuenta = "#autocomplete-cuenta-informe-DatosSif";
            url = "/api/v1/Informes/PA/ObtenerCuentasDatosSif";
            break;
    }

    let Nombre = $(autocompletar).val();
    let _DATA_AUTOCOMPLETE = [];
    if (Nombre.length > 3) {
        $(cuenta).attr('maxlength', 0);

        $.ajax({
            url: "/TirNoPerAdministrativo/autocomplete_buscar_cuentas_informe",
            data: JSON.stringify({ 
                "Nombre": Nombre,
                "Url": url
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data){
                _data.forEach(element => {
                    _DATA_AUTOCOMPLETE[element] = null;
                });
                $(cuenta).autocomplete({
                    data: _DATA_AUTOCOMPLETE
                });
                $(cuenta).attr('maxlength', 15);
                return _data;
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });
    }
}

function autocomplete_buscar_cuentas_informe_DataTB(){
    return autocomplete_buscar_cuentas_informe("DataTB");
}

function obtener_informe_DatosTB(){
    let _FECHA = $("#filtro-fecha-inicial-cliente-DatosTB").val().replace(/\-/g, '' );
    let _CLIENTE_SELECTED = $("#autocomplete-cliente-informe-DatosTB").val();
    let _CUENTA_SELECTED = $("#autocomplete-cuenta-informe-DatosTB").val();

    $("#table-data-tb-detalle").hide(500);
    $("#table-data-TB").show(500);

    $('#table-data-TB tbody').empty();

    if (_FECHA == '' || _CLIENTE_SELECTED == '' || _CUENTA_SELECTED == '') { 
        MensajeModal("<span style='font-weight:bold;'>Alerta</span>","Datos incompletos");
    }
    else {

        $.ajax({
            url: "/TirNoPerAdministrativo/ObtenerDatosTEB",
            data: JSON.stringify({
                "Fecha": _FECHA, 
                "Nombre": _CLIENTE_SELECTED,
                "Cuenta": _CUENTA_SELECTED
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data){
                generacion_tabla(_data, '#table-data-TB');

                let elementsShowDetalail = document.getElementsByClassName("datos-tb-detalle");
                for (let value of elementsShowDetalail) {
                    value.addEventListener('click', obtener_informe_DatosTB_Detalle, false);
                }

            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });

        $('#table-data-TB').DataTable();
        $('.dataTables_length').addClass('bs-select');
    }
}

function generacion_tabla(data, tabla) {
    data.forEach(element => {
        let date = new Date(element.fecha);
        let value_fecha = '<td>' +  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + '</td>';
        let value_tipo = '<td>' + element.tipo_Transaccion + '</td>';
        let value_valor = '<td> $' + separar_numero_en_comas(element.valor) + '</td>';
        let value_clasificacion_Cliente = '<td>' + element.clasificacion_Cliente + '</td>';
        let value_clasificacion_Cuenta = '<td>' + element.clasificacion_Cuenta + '</td>';
        let value_clasificacion_Empresa = '<td>' + element.clasificacion_Empresa + '</td>';
        let value_detalle = "<td> <button type='button' class='btn btn-default datos-tb-detalle' value="+ element.id +">Detalle</button></td>";

        let item = '<tr>' + value_fecha + value_tipo + value_valor + value_clasificacion_Cliente 
                + value_clasificacion_Cuenta + value_clasificacion_Empresa + value_detalle + '</tr>';

        $(tabla).append(item);
    });
}

function obtener_informe_DatosTB_Detalle(){
    let _ID  = $(this).val();

    $("#table-data-tb-detalle").show(500);
    $("#table-data-TB").hide(500);

    $('#table-data-tb-detalle tbody').empty();

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerDetalleTEB",
        data: JSON.stringify({
            "GUID": _ID
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data){
            _data.forEach(element => {
                let date = new Date(element.fecha);
                let _fecha = '<td>' +  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + '</td>';
                let _estado_entrada = '<td>' + element.estado_Entrada + '</td>';
                let _estado_salida = '<td>' + element.estado_Salida + '</td>';
                let _nombre = '<td>' + element.nombre + '</td>';
                let _especie = '<td>' + element.especie + '</td>';
                let _isin = '<td>' + element.isin + '</td>';
                let _cantidad = '<td>' + separar_numero_en_comas(element.cantidad) + '</td>';
                let _detalle = '<td>' + element.detalle + '</td>';
        
                let item = '<tr>' + _fecha + _estado_entrada + _estado_salida + _nombre + _especie + _isin + _cantidad + _detalle + '</tr>';

                $('#table-data-tb-detalle').append(item);
            });

        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });

    $('#table-data-tb-detalle').DataTable();
    $('.dataTables_length').addClass('bs-select');
    
}

/* INFORME: DATA TITULOS SIFI */

function autocomplete_buscar_clientes_informe_DatosSifi(){
    return autocomplete_buscar_clientes_informe("DatosSifi");
}

function autocomplete_buscar_cuentas_informe_DatosSifi(){
    return autocomplete_buscar_cuentas_informe("DatosSifi");
}

function obtener_informe(tipo) {
    let fechaInicial = "";
    let fechaFin = "";
    let autocliente = "";
    let autocuenta = "";
    let tbody = "";
    let url = "";
    let table = "";
    if (tipo == "DatosSifi") {
        fechaInicial = "#filtro-fecha-inicial-cliente-DatosSifi";
        fechaFin = "#filtro-fecha-final-cliente-DatosSifi";
        autocliente = "#autocomplete-cliente-informe-DatosSifi";
        autocuenta = "#autocomplete-cuenta-informe-DatosSifi";
        tbody = '#table-data-Sifi tbody';
        url = "/api/v1/Informes/PA/ObtenerDatosSifi";
        table = '#table-data-Sifi';
    }
    else {
        fechaInicial = "#filtro-fecha-inicial-cliente-DatosSif";
        fechaFin = "#filtro-fecha-final-cliente-DatosSif";
        autocliente = "#autocomplete-cliente-informe-DatosSif";
        autocuenta = "#autocomplete-cuenta-informe-DatosSif";
        tbody = '#table-data-Sif tbody';
        url = "/api/v1/Informes/PA/ObtenerDatosSif";
        table = '#table-data-Sif';
    }

    let _FECHA_INI = $(fechaInicial).val().replace(/\-/g, '' );
    let _FECHA_FIN = $(fechaFin).val().replace(/\-/g, '' );
    let _CLIENTE_SELECTED = $(autocliente).val();
    let _CUENTA_SELECTED = $(autocuenta).val();

    $(tbody).empty();

    if (_FECHA_INI == '' || _FECHA_FIN == '' || _CLIENTE_SELECTED == '' || _CUENTA_SELECTED == '') { 
        MensajeModal("<span style='font-weight:bold;'>Alerta</span>","Datos incompletos");
    }
    else {

        $.ajax({
            url: "/TirNoPerAdministrativo/ObtenerDetalleTEB",
            data: JSON.stringify({
                "FechaIni": _FECHA_INI,
                "FechaFin": _FECHA_FIN,
                "Cliente": _CLIENTE_SELECTED,
                "Cuenta": _CUENTA_SELECTED,
                "Url": url
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data){
                generacion_tabla(_data, table);
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });

        $(table).DataTable();
        $('.dataTables_length').addClass('bs-select');
    }
}

function obtener_informe_DatosSifi(){
    obtener_informe("DatosSifi");
}

/* INFORME: DATA TITULOS SIF */

function autocomplete_buscar_clientes_informe_DatosSif(){
    return autocomplete_buscar_clientes_informe("DatosSif");
}

function autocomplete_buscar_cuentas_informe_DatosSif(){
    return autocomplete_buscar_cuentas_informe("DatosSif");
}

function obtener_informe_DatosSif(){
    obtener_informe("DatosSif");
}

/* INFORME: CONSOLIDADO PROCESOS */

function obtener_informe_ConsolidadoProcesos() {
    const fechaCorteInput = $("#filtro-fecha-corte-consolidado");
    const modalTitle = $(".modal-title");
    const message = $("#message");
    const modalAlert = $('#modal-alert');
    const fechaCorte = fechaCorteInput.val();
    const tableDataConsolidado = $('#table-data-consolidado');
    const tableDataResumenDetalle = $("#table-data-resumen-detalle-fics, #table-data-resumen-detalle-titulos, #table-data-resumen-detalle-ctaInversion, #table-data-resumen-detalle-saldos, #table-data-resumen-detalle-saldos-more");

    if (fechaCorte === "") {
        modalTitle.html('El campo de fecha de corte se encuentra vacio');
        message.html("Datos no permitidos");
        modalAlert.modal("show");
        return;
    }

    const formattedFechaCorte = fechaCorte.replace(/\-/g, '-');

    tableDataConsolidado.find('tbody').empty();
    tableDataConsolidado.removeClass("d-none");
    tableDataResumenDetalle.addClass("d-none");

    if (formattedFechaCorte === '') {
        const today = new Date();
        today.setDate(today.getDate() + 1);

    }

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerConsolidadoInformes",
        data: JSON.stringify({
            "FECHA": formattedFechaCorte
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data) {
            _data.forEach(element => {
                let value_producto = '<td>' + element.categoria + '</td>';
                let value_cantidad = '<td>' + element.registros + '</td>';
                let value_detalle_key = '';

				switch(element.categoria) {
					case "FICS":
						value_detalle_key = 'Fics';
						break;
					case "títulos":
						value_detalle_key = 'TEB';
						break;
					case "cuentas":
						value_detalle_key = 'CTV';
						break;
					case "saldos":
						value_detalle_key = 'Saldos';
						break;
				}

                let value_detalle = '';

                if (element.registros !== 0) {
                    value_detalle = "<td> <button type='button' class='btn btn-default consolidado-detalle' value=" + value_detalle_key + ">Detalle</button></td>";
                } else {
                    value_detalle = "<td> <button type='button'>Ver Detalle</button> </td>";
                }

                let item = '<tr>' + value_producto + value_cantidad + value_detalle + '</tr>';

                tableDataConsolidado.append(item);
            });

            let elementsShowDetail = document.getElementsByClassName("consolidado-detalle");
            for (let value of elementsShowDetail) {
                value.addEventListener('click', obtener_informe_consolidado_procesos_detalle, false);
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}


function obtener_informe_consolidado_procesos_detalle(){
    let _CATEGORIA  = $(this).val();

    switch (_CATEGORIA) {
        case 'Fics':
            obtener_informe_consolidado_procesos_detalle_fics();
            break;
        case 'TEB':
            obtener_informe_consolidado_procesos_detalle_titulos();
            break;
        case 'CTV':
            obtener_informe_consolidado_procesos_detalle_cuenta_inversion();
            break;
        case 'Saldos':
            obtener_informe_consolidado_procesos_detalle_saldos();
            break;
    }
}

function obtener_informe_consolidado_procesos_detalle_unificado(tipo) {
    let tbody = "";
    let tabla = "";
    let url = "";
    switch(tipo) {
        case "fics":
            tbody = '#table-data-resumen-detalle-fics tbody';
            tabla = "#table-data-resumen-detalle-fics";
            url = "/api/v1/Informes/PA/ObtenerDetalleFics";
            break;
        case "titulos":
            tbody = '#table-data-resumen-detalle-titulos tbody';
            tabla = "#table-data-resumen-detalle-titulos";
            url = "/api/v1/Informes/PA/ObtenerDetalleTitulo";
            break;
        case "inversion":
            tbody = '#table-data-resumen-detalle-ctaInversion tbody';
            tabla = "#table-data-resumen-detalle-ctaInversion";
            url = "/api/v1/Informes/PA/ObtenerDetalleCtaInversion";
            break;
        case "saldos":
            tbody = '#table-data-resumen-detalle-saldos tbody';
            tabla = "#table-data-resumen-detalle-saldos";
            url = "/api/v1/Informes/PA/ObtenerDetalleSaldos";
            break;
    }

    let _FECHA_CORTE = $("#filtro-fecha-corte-consolidado").val().replace(/\-/g, '' );

    $(tbody).empty();

    if (_FECHA_CORTE == '') { 
        let today = new Date();
        today.setDate(today.getDate()+1);
        let month = today.getMonth()+1;
        let day = today.getDate();

        _FECHA_CORTE = today.getFullYear() + '-' + ((''+month).length<2 ? '0' : '') + '' + month + '-' + ((''+day).length<2 ? '0' : '') + day;
    }
           
    $("#table-data-consolidado").addClass("d-none");
    $(tabla).removeClass("d-none");

    $.ajax({
        url: "/TirNoPerAdministrativo/ConsolidadoDetalle",
        data: JSON.stringify({
            "FECHA": _FECHA_CORTE,
            "Url": url
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data){
            dibujar_tabla(tipo, tabla, _data);

            if(tipo == "saldos") {
                let elementsShowDetalail = document.getElementsByClassName("consolidado-detalle-saldos");
                for (let value of elementsShowDetalail) {
                    value.addEventListener('click', obtener_informe_consolidado_procesos_detalle_saldos_more, false);
                }
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });

    $(tabla).DataTable();
    $('.dataTables_length').addClass('bs-select');
}

function dibujar_tabla(tipo, tabla, data) {
    data.forEach(element => {
        let _tipo_Transaccion;
        let _cliente;
        let _clasificacion_Cliente;
        let _clasificacion_Cuenta;
        let _clasificacion_Empresa
        let item;
        let _cantidad;
        let _detalle;

        let _id_Cliente = '<td>' + element.id_Cliente + '</td>';
        let _numero_Cuenta = '<td>' + element.numero_Cuenta + '</td>';
        let _valor = '<td> $' + separar_numero_en_comas(element.valor) + '</td>';
        
        if(tipo == "fics" || tipo == "titulos" || tipo == "inversion") {
            _tipo_Transaccion = '<td>' + element.tipo_Transaccion + '</td>';
            _cliente = '<td>' + element.cliente + '</td>';
            _clasificacion_Cliente = '<td>' + element.clasificacion_Cliente + '</td>';
            _clasificacion_Cuenta = '<td>' + element.clasificacion_Cuenta + '</td>';
            _clasificacion_Empresa = '<td>' + element.clasificacion_Empresa + '</td>';
            _detalle = '<td>' + element.detalle + '</td>';
        }
        else {
            _detalle = "<td> <button type='button' class='btn btn-default consolidado-detalle-saldos' value="+ element.numero_Cuenta +">Detalle</button></td>";
        }
        

        switch(tipo) {
            case "fics":
                item = '<tr>' + _id_Cliente + _cliente + _tipo_Transaccion + _numero_Cuenta +  _valor + _clasificacion_Cliente + 
                    _clasificacion_Cuenta + _clasificacion_Empresa + _detalle + '</tr>';
                break;
            case "titulos":
                let _especie = '<td>' + element.especie + '</td>';
                _cantidad = '<td>' + element.cantidad + '</td>';
                let _isin = '<td>' + element.isin + '</td>';

                item = '<tr>' + _id_Cliente + _cliente + _tipo_Transaccion + _numero_Cuenta + _cantidad +  _valor + _clasificacion_Cliente + 
                        _clasificacion_Cuenta + _clasificacion_Empresa + _especie  + _isin + _detalle + '</tr>';
                break;
            case "inversion":
                _cantidad = '<td>' + element.cantidad + '</td>';

                item = '<tr>' + _id_Cliente + _cliente + _tipo_Transaccion + _numero_Cuenta + _cantidad +  _valor + _clasificacion_Cliente + 
                    _clasificacion_Cuenta + _clasificacion_Empresa + _detalle + '</tr>';
                break;
            case "saldos":

                item = '<tr>' + _id_Cliente +_numero_Cuenta +  _valor + _detalle + '</tr>';
                break;
        }

        $(tabla).append(item);

    });
}

function obtener_informe_consolidado_procesos_detalle_fics(){
    obtener_informe_consolidado_procesos_detalle_unificado("fics");
}

function obtener_informe_consolidado_procesos_detalle_titulos(){
    obtener_informe_consolidado_procesos_detalle_unificado("titulos");
}

function obtener_informe_consolidado_procesos_detalle_cuenta_inversion(){
    obtener_informe_consolidado_procesos_detalle_unificado("inversion");
}

function obtener_informe_consolidado_procesos_detalle_saldos(){
    obtener_informe_consolidado_procesos_detalle_unificado("saldos");
}

function obtener_informe_consolidado_procesos_detalle_saldos_more(){


    let _FECHA_CORTE = $("#filtro-fecha-corte-consolidado").val().replace(/\-/g, '' );
    let _CUENTA  = $(this).val();

    $('#table-data-resumen-detalle-saldos-more tbody').empty();
    
    if (_FECHA_CORTE == '') { 
        let today = new Date();
        today.setDate(today.getDate()+1);
        let month = today.getMonth()+1;
        let day = today.getDate();

        _FECHA_CORTE = today.getFullYear() + '-' + ((''+month).length<2 ? '0' : '') + '' + month + '-' + ((''+day).length<2 ? '0' : '') + day;
    }
   
    $("#table-data-resumen-detalle-saldos").addClass("d-none");
    $("#table-data-resumen-detalle-saldos-more").removeClass("d-none");

    $.ajax({
        url: "/TirNoPerAdministrativo/ObtenerExtraccionSaldos",	
        data: JSON.stringify({
            "Fecha": _FECHA_CORTE,
            "Cuenta": _CUENTA
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data){
            _data.forEach(element => {
                let _numero_Cuenta = '<td>' + element.cuenta + '</td>';
                let _tipo = '<td>' + element.tipo + '</td>';
                let _operacion = '<td>' + element.operacion + '</td>';
                let _fuente = '<td>' + element.fuente + '</td>';
                let _vpn = '<td>' + element.vpn + '</td>';
                let _lote = '<td>' + element.lote + '</td>';

                let item = '<tr>' + _numero_Cuenta +_tipo +  _operacion + _fuente + _vpn + _lote + '</tr>';

                $('#table-data-resumen-detalle-saldos-more').append(item);
            });


        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });

    $('#table-data-resumen-detalle-saldos-more').DataTable();
    $('.dataTables_length').addClass('bs-select');

}

function autocomplete_buscar_informe(tipo) {
    let autocomplete = "";
    let url = "";
    if(tipo == "segmentos") {
        autocomplete = "#autocomplete-segmento-informe-tir-masiva";
        url = "/api/v1/Informes/PA/ObtenerSegmentos";
    }
    else {
        autocomplete = "#autocomplete-comercial-informe-tir-masiva";
        url = "/api/v1/Informes/PA/ObtenerComerciales";
    }

    $(autocomplete).attr('maxlength', 0);

    $.ajax({
        url: "/TirNoPerAdministrativo/BuscarInforme",
        data: JSON.stringify({
            "Url": url
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data){
            return success_autocomplete(_data, autocomplete);
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    }); 
}

function success_autocomplete(_data, autocomplete) {
    let _DATA_AUTOCOMPLETE = [];
    _data.forEach(element => {
        _DATA_AUTOCOMPLETE[element] = null;
    });
    $(autocomplete).autocomplete({
        data: _DATA_AUTOCOMPLETE
    });
    $(autocomplete).attr('maxlength', 15);
    return _data;
}

function autocomplete_buscar_segmentos_informe_tir_masiva(){
    autocomplete_buscar_informe("segmentos");
}

function autocomplete_buscar_comercial_informe_tir_masiva(){
    autocomplete_buscar_informe("comercial");
}


function obtener_informe_tir_masiva(){
    
    let _FECHA_INICIAL = $("#filtro-fecha-inicial-tir-masiva").val().replace(/\-/g, '' );
    let _FECHA_FIN = $("#filtro-fecha-final-tir-masiva").val().replace(/\-/g, '' );
    let _SEGMENTO = $("#autocomplete-segmento-informe-tir-masiva").val();
    let _COMERCIAL = $("#autocomplete-comercial-informe-tir-masiva").val();

    $('#table-data-tir-masiva tbody').empty();

    if (_FECHA_INICIAL == '' || _FECHA_FIN == ''){ 

        $("#message").html("La b&uacutesqueda requiere ingresar fecha de inicio y fin");
        $('#modal-alert').modal("show");
    }
    else{

        if(_SEGMENTO == ''){
            _SEGMENTO = '-1';
        }
        if(_COMERCIAL == ''){
            _COMERCIAL = '-1';
        }
        
        $.ajax({
            url: "/TirNoPerAdministrativo/ObtenerTirMasiva",
            data: JSON.stringify({
                "FechaIni": _FECHA_INICIAL,
                "FechaFin": _FECHA_FIN,
                "Segmento": _SEGMENTO,
                "Comercial": _COMERCIAL
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data){
                _data.forEach(element => {
                    
                    let _id = '<td>' + element.cliente + '</td>';
                    let _saldo_inicial = '<td>' + element.saldo_Inicial + '</td>';
                    let _saldo_final = '<td>' + element.saldo_Final + '</td>';
                    let _entradas = '<td>' + element.entradas + '</td>';
                    let _salidas = '<td>' + element.salidas + '</td>';
                    let _tir = '<td>' + element.tir + '</td>';

                    let item = '<tr>' + _id + _saldo_inicial + _entradas + _salidas + _saldo_final + _tir + '</tr>';

                    $('#table-data-tir-masiva').append(item);
                });

            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });

        
    }
}