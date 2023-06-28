/*
----------------------------------------------------------------------------------------
-                                                                                      -
-                                     TIRNOPER                                             -
-                                   COMPONENTES                                        -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/


$(document).on({
    ajaxStart: function() { $("body").addClass("loading"); },
    ajaxStop: function() { $("body").removeClass("loading"); }    
});

init.push(function () {
    tirnoper.inicio();
});
window.PixelAdmin.start(init);
var tirnoper = {
    inicio: function () {
        $(".consultar-cliente").click(tirnoper.consultarcliente);
    },

    consultarcliente:function () {

        let _FECHA_INI = $("#filtro-fecha-inicial-cliente").val().replace(/\-/g, '');
        let _FECHA_FIN = $("#filtro-fecha-final-cliente").val().replace(/\-/g, '');

        $('#table-cliente-tirnoper-resumen tbody').empty();
        $('#table-cliente-tirnoper-detalle tbody').empty();

        _CLIENTE_SELECTED = $("#autocomplete-cliente").val().trim();
        _OPCION_SELECTED = '1';

        if (_CLIENTE_SELECTED == '') {
            _CLIENTE_SELECTED = $("#autocomplete-nip").val().split("-")[0].trim();
            _OPCION_SELECTED = '2';
        }

        if (_FECHA_INI == '' || _FECHA_FIN == '' || _CLIENTE_SELECTED == '' || _OPCION_SELECTED == '') {
            $(".modal-title").html('<span style="font-weight:bold;">Verificar los campos ingresados</span>');
            $("#message").html("Datos incompletos");
            $('#modal-alert').modal("show");
        }
        else if ($('#select-cuentas-cliente').val().length > 1 && $('#select-cuentas-cliente').val().includes('-1')) {
            $(".modal-title").html('<span style="font-weight:bold;">Error</span>');
            $("#message").html("Seleccionar varias cuentas o TODAS");
            $('#modal-alert').modal("show");
        }
        else {

            if (_FECHA_INI >= _FECHA_FIN) {
                $(".modal-title").html('<span style="font-weight:bold;">Datos incorrectos</span>');
                $("#message").html("La fecha inicial es mayor a fecha final");
                $('#modal-alert').modal("show");
                return;
            }

            _CUENTA_SELECTED = $('#select-cuentas-cliente').val().join('|');

            obtener_reporte_informacion_del_cliente(_FECHA_INI, _FECHA_FIN, _CLIENTE_SELECTED, _OPCION_SELECTED);
        }
    }
}

function modalVerificarFecha(fecha) {
    if(fecha === 'Inicial') {
        $(".modal-title").html('<span style="font-weight:bold;">Verificar el campo de fecha inicial, no se admite una fecha posterior de hoy </span>');
    }
    else {
        $(".modal-title").html('<span style="font-weight:bold;">Verificar el campo de fecha Final, no se admite una fecha posterior de hoy</span>');
    }
    $("#message").html("Datos no permitidos");
    $('#modal-alert').modal("show");
}


function manejarCambioFecha(elemento, tipo) {
    let hoy = new Date();
    let fecha = $(elemento).val();
    let fechaFormulario = new Date(fecha);
    fechaFormulario.setDate(fechaFormulario.getDate() + 1);

    if (hoy <= fechaFormulario) {
        modalVerificarFecha(tipo);
        $(elemento).val("");
    }
}

$("#filtro-fecha-inicial-cliente").change(function () {
    manejarCambioFecha(this, 'Inicial');
});

$("#filtro-fecha-final-cliente").change(function () {
    manejarCambioFecha(this, 'Final');
});

$("#filtro-fecha-final-grupo-economico").change(function () {
    manejarCambioFecha(this, 'Final');
});

$("#filtro-fecha-inicial-grupo-economico").change(function () {
    manejarCambioFecha(this, 'Inicial');
});


$("#search-nip").hover(
        function () {
            $(".popupseclient").attr("style", "display:block");     
        }
);

$("#autocomplete-cliente").change(function(){
    if ($("#autocomplete-cliente").val() == "") {
        $("#autocomplete-nip").prop("disabled", false );
    } else {
        $("#autocomplete-nip").prop("disabled", true );
    }
    
});

$("#autocomplete-nip").change(function(){
    if ($("#autocomplete-nip").val() == "") {
        $("#autocomplete-cliente").prop("disabled", false );
    } else {
        $("#autocomplete-cliente").prop("disabled", true );
    }
    
});


$(document).ready(function () {

   

    function limpiar_campos_tirnoper_cliente() {
        $("#autocomplete-nip").prop("disabled", false );
        $("#autocomplete-cliente").prop("disabled", false );
        $("#filtro-fecha-final-cliente").val("");
        $("#filtro-fecha-inicial-cliente").val("");
        $("#autocomplete-cliente").val("");
        $('#autocomplete-nip').val('');
        $('#select-cuentas-cliente')[0].options.length = 0;
        $("#reporte-tir-grupo-economico").hide(500);
        $('#select-cuentas-cliente').empty();
    }

    function limpiar_campos_tirnoper_grupo_economico() {
        $("#filtro-fecha-final-grupo-economico").val("");
        $("#filtro-fecha-inicial-grupo-economico").val("");
        $("#autocomplete-grupo-economico").val("");
        $('#select-cliente-grupo-economico')[0].options.length = 0;
        $('#select-cuentas-grupo-economico')[0].options.length = 0;
        $("#reporte-tir-cliente").hide(500);
        $('#select-cuentas-grupo-economico').empty();
        $('#select-cliente-grupo-economico').empty();
    }

    $('.modal').modal({
        dismissible: true
    });

    $.ajaxSetup({
        cache: false,
    });

    /*--------------- VARIABLES LOCALES PARA BÚSQUEDA DE CLIENTES PARA MOSTRAR INFO EN TABLA ---------------*/
    
    let _CLIENTE_SELECTED = '';
    let _CUENTA_SELECTED = '-1';
    let _OPCION_SELECTED = '';

   
    /* CLIENTE */

    //$("#search-cliente").click(function() {
    //    autocompletado_obtener_clientes();
    //});

    $('#autocomplete-cliente').autocomplete({

        onPick(el, item) {
          console.log('Selected Option: ', item)
        }
      
      })

    let ctrlKey = 17

    $("#autocomplete-cliente").keyup(function (e) {
        if($("#autocomplete-cliente").val().trim() != ''){
            if($("#autocomplete-cliente").val().length % 5 == 0){
                autocompletado_obtener_clientes();
            }else {
                if (e.keyCode == ctrlKey){
                    autocompletado_obtener_clientes();
                } 
            }
        }
    })

    $("#autocomplete-nip").keyup(function () {
        console.log("preciona")
        if($("#autocomplete-nip").val().trim() != ''){
            if($("#autocomplete-nip").val().length % 5 == 0){
                autocompletado_obtener_nip();
            }else {
               
                  if (e.keyCode == ctrlKey){
                     autocompletado_obtener_nip();
                  } 
              }
        }
    })

    $("#autocomplete-grupo-economico").keyup(function () {
        if($("#autocomplete-grupo-economico").val().trim() != ''){
            if($("#autocomplete-grupo-economico").val().length % 5 == 0){
                autocomplete_obtener_grupo_economico();
            }else {
               
                if (e.keyCode == ctrlKey){
                    autocomplete_obtener_grupo_economico();
                } 
            }
        }
    })


    $("#search-nip").click(function(){
        autocompletado_obtener_nip();
    });

    

// disabled campo cuentasz

    $('#select-cuentas-cliente').append('<option value="-1" selected>TODAS</option>');
    $("#select-cuentas-cliente").formSelect();
    $("#select-cuentas-cliente").prop("disabled",true);
    
    $('#select-cuentas-grupo-economico').append('<option value="-1" selected>TODAS</option>');
    $("#select-cuentas-grupo-economico").formSelect();
    $("#select-cuentas-grupo-economico").prop("disabled",true);
    
//fin de disabled campo cuentas    
    $("#search-select-cuentas-cliente").click(function(){

        $('#select-cuentas-cliente')[0].options.length = 0;

        if($("#autocomplete-cliente").val().trim() != '' || $("#autocomplete-nip").val().trim() != ''){

           
            _CLIENTE_SELECTED = $("#autocomplete-cliente").val().trim();
            _OPCION_SELECTED = '1';

            if (_CLIENTE_SELECTED == '') {
                _CLIENTE_SELECTED = $("#autocomplete-nip").val().split("-")[0].trim();
                _OPCION_SELECTED = '2';
            }
            autocomplete_obtener_cuentas_por_cliente(_OPCION_SELECTED, _CLIENTE_SELECTED);
        }
        else{
            $(".modal-title").html('<span style="font-weight:bold;">Error</span>');
            $("#message").html("Seleccionar un nombre o NIP");
            $('#modal-alert').modal("show");
        }
        
    });

    $("#btnAtras").click(function () {
        $("#table-cliente-tirnoper-resumen").show(500);
        $("#table-cliente-tirnoper-detalle").hide(500);
        $("#btnAtras").hide()
    });

    

    /* GRUPO ECONOMICO */

    let _GRUPO_ECONOMICO_SELECTED = '';
    let _GRUPO_ECONOMICO_CLIENTE_SELECTED = '';
    let _GRUPO_ECONOMICO_CUENTA_SELECTED = '-1';

    $("#search-grupo-economico").click(function(){
        autocomplete_obtener_grupo_economico();
    });

    $("#search-select-cliente-grupo-economico").click(function(){
        _GRUPO_ECONOMICO_SELECTED = $("#autocomplete-grupo-economico").val().trim();
        if(_GRUPO_ECONOMICO_SELECTED == ''){
            $(".modal-title").html('<span style="font-weight:bold;">Error</span>');
            $("#message").html("Seleccionar un grupo económico");
            $('#modal-alert').modal("show");
        }
        else{
            autocomplete_obtener_clientes_grupo_economico(_GRUPO_ECONOMICO_SELECTED);
        }
    });

    $("#search-select-cuentas-grupo-economico").click(function(){
        if( $('#select-cliente-grupo-economico').val().length > 1 && $('#select-cliente-grupo-economico').val().includes('-1')){
            $(".modal-title").html('<span style="font-weight:bold;">Error</span>');
            $("#message").html("Seleccionar varias clientes o TODOS");
            $('#modal-alert').modal("show");
        }
        else{
            _GRUPO_ECONOMICO_CLIENTE_SELECTED = $('#select-cliente-grupo-economico').val().join('|');
            autocomplete_obtener_cuentas_clientes_grupo_economico(_GRUPO_ECONOMICO_SELECTED, _GRUPO_ECONOMICO_CLIENTE_SELECTED);
        }
    });


    $(".consultar-grupo-economico").click(function () {
        
        let _FECHA_INI = $("#filtro-fecha-inicial-grupo-economico").val().replace(/\-/g, '');
        let _FECHA_FIN = $("#filtro-fecha-final-grupo-economico").val().replace(/\-/g, '');
        _GRUPO_ECONOMICO_SELECTED = $("#autocomplete-grupo-economico").val().trim();
        if( $('#select-cuentas-grupo-economico').val().length > 1 && $('#select-cuentas-grupo-economico').val().includes('-1')){
            $(".modal-title").html('<span style="font-weight:bold;">Error</span>');
            $("#message").html("Seleccionar varias cuentas o TODAS");
            $('#modal-alert').modal("show");
        }
        else if(_FECHA_INI == '' || _FECHA_FIN == '' || _GRUPO_ECONOMICO_SELECTED == '') { 
            $(".modal-title").html('<span style="font-weight:bold;">Error</span>');
            $("#message").html("Datos incompletos");
            $('#modal-alert').modal("show");
        }
        else{

            if (_FECHA_INI >= _FECHA_FIN) {
                $(".modal-title").html('<span style="font-weight:bold;">Datos incorrectos</span>');
                $("#message").html("La fecha inicial es mayor a fecha final");
                $('#modal-alert').modal("show");
                return;
            }

            _GRUPO_ECONOMICO_CUENTA_SELECTED = $('#select-cuentas-grupo-economico').val().join('|');
            _GRUPO_ECONOMICO_CLIENTE_SELECTED = $('#select-cliente-grupo-economico').val().join('|');

            if(_GRUPO_ECONOMICO_CLIENTE_SELECTED == ''){
                _GRUPO_ECONOMICO_CLIENTE_SELECTED = '-1';
            }

            if(_GRUPO_ECONOMICO_CUENTA_SELECTED == ''){
                _GRUPO_ECONOMICO_CUENTA_SELECTED = '-1';
            }

            $('#table-grupo-economico-tirnoper-resumen tbody').empty();
            $('#table-grupo-economico-tirnoper-detalle tbody').empty();
 
            obtener_reporte_informacion_del_cliente_grupo_economico(_FECHA_INI, _FECHA_FIN,_GRUPO_ECONOMICO_SELECTED,_GRUPO_ECONOMICO_CLIENTE_SELECTED);
            
        }

    });

    /*--------------- COMPONENTES | ANIMACIONES ---------------*/

    $("#grupo-economico").hide(500);
    $("#reporte-tir-cliente").hide(500);
    $("#reporte-tir-grupo-economico").hide(500);

    $('#select-cuentas-cliente').formSelect();
    $('#select-cuentas-grupo-economico').formSelect();
    $('#select-cliente-grupo-economico').formSelect();

    $("#autocomplete-nip").prop("disabled", false );
    $("#autocomplete-cliente").prop("disabled", false );
    
    $("#btn-close-modal").click(function(){
        $('#modal-alert').modal("hide");
    });

    $("#tab-cliente").click(function () {
        $("#tab-grupo-economico").removeClass("active");
        $("#tab-cliente").addClass("active");
        $("#grupo-economico").hide(500);
        $("#cliente").show(500);
        limpiar_campos_tirnoper_cliente();
    });

    $("#tab-grupo-economico").click(function () {
        $("#tab-cliente").removeClass("active");
        $("#tab-grupo-economico").addClass("active");
        $("#grupo-economico").show(500);
        $("#cliente").hide(500);
        limpiar_campos_tirnoper_grupo_economico();
    });
});