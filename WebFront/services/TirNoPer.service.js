/*
----------------------------------------------------------------------------------------
-                                                                                      -
-                                      TirNoPer                                        -
-                               FUNCIONES Y SERVICIOS                                  -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

/*
----------------------------------------------------------------------------------------
-                                                                                      -                         -
-                                      FUNCIONES                                       -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/



function separar_numero_en_comas(_VAL){
    _VAL = _VAL.toFixed(2);
    while (/(\d+)(\d{3})/.test(_VAL.toString())){
        _VAL = _VAL.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return _VAL;
}

function ExceptionHandler(xhr){
    switch (xhr.status) {
        case 401:
            sessionStorage.clear();
            window.location.href = "/";
            break;
        case 429:
            $(".modal-title").html('<span style="font-weight:bold;">Error de l&iacute;mite de solicitudes</span>');
            $("#message").html("Se supero la cantidad de requests, por favor espere unos minutos e intente nuevamente. Si el problema persiste comuniquese con el administrador del sistema.");
            $('#modal-alert').modal("show");
            break;
        default:
            $(".modal-title").text('Error | Estado: ' + xhr.status);
            $("#message").html("Se produjo un error inesperado, por favor intente nuevamente. Si el problema persiste comuniquese con el administrador del sistema.");
            $('#modal-alert').modal("show");
            break;
    }
}

/*
----------------------------------------------------------------------------------------
-                                                                                      -     
-                                      SERVICIOS                                       -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

function obtener_reporte_informacion_del_cliente(_FECHA_INI, _FECHA_FIN, _CLIENTE_SELECTED, _OPCION_SELECTED) {

    let _CUENTA_SELECTED = "-1";

    $.ajax({
        url: "/TirNoPer/ObtenerReporteClientesInfo",
        data: JSON.stringify({
            "FECHA_INI": _FECHA_INI,
            "FECHA_FIN": _FECHA_FIN,
            "CLIENTE_SELECTED": _CLIENTE_SELECTED,
            "OPT_SELECTED": _OPCION_SELECTED,
            "CUENTA_SELECTED": _CUENTA_SELECTED
        }),
        type: "POST",
        success: function (_data) {
            _data.forEach(element => {

                $('#cliente-identificacion').html(element.clienteId);
                $('#cliente-nombre').html(element.clienteNombre);
                console.log(element.clienteCuentas);
                if (element.clienteCuentas == "-1") {
                    $('#cliente-cuenta').html("TODAS");
                }
                else {
                    $('#cliente-cuenta').html(element.clienteCuentas);
                }

                //-----------------------Modificar------------

                let param = ['#cliente-fecha-inicial',
                    '#cliente-fecha-final',
                    '#cliente-fecha-vinculacion',
                    '#cliente-saldo-inicial',
                    '#cliente-total-entradas',
                    '#cliente-total-salidas',
                    '#cliente-saldo-final',
                    '#cliente-tir',
                    '#cliente-tir',
                    '#cliente-tir',
                    '#cliente-pyg',
                    '#cliente-pyg',
                    '#cliente-pyg'
                ]

                func_auxliar(param, element);


            });

            if (_data[0].fechaInicial == '') {
                mensaje_by_fecha("fecha inicial");
            } else if (_data[0].fechaFinal == '') {
                mensaje_by_fecha("fecha final");
            } else {
                obtener_reporte_movimientos_del_cliente(_FECHA_INI, _FECHA_FIN, _CLIENTE_SELECTED, _OPCION_SELECTED);
                $("#show-exportar-cliente").show(500);
                $("#reporte-tir-cliente").show(500);
            }

            return _data;
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function func_auxliar(param, element) {
    $(param[0]).html(element.fechaInicial.split(" ")[0]);
    $(param[1]).html(element.fechaFinal.split(" ")[0]);
    $(param[2]).html(element.fechaVinculacion.split(" ")[0]);
    $(param[3]).html("$" + separar_numero_en_comas(element.saldoInicial));
    $(param[4]).html("$" + separar_numero_en_comas(element.totalEntradas));
    $(param[5]).html("$" + separar_numero_en_comas(element.totalSalidas));
    $(param[6]).html("$" + separar_numero_en_comas(element.saldosFinal));
    $(param[7]).html((element.tir * 100).toFixed(2) + "%");

    if (element.tir < 0) {
        $(param[8]).css("color", "red");
    } else {
        $(param[9]).css("color", "#32cd32");
    }
    $(param[10]).html("$" + separar_numero_en_comas(element.pyG));
    if (element.pyG < 0) {
        $(param[11]).css("color", "red");
    } else {
        $(param[12]).css("color", "#32cd32");
    }
}

function mensaje_by_fecha(inifin) {
    $(".modal-title").html('<span style="font-weight:bold;">Error en ' + inifin + ' </span>');
    $("#message").html("No se encontr&oacute; saldo para la " + inifin + " ingresada. ");
    $('#modal-alert').modal("show");
    $("#reporte-tir-cliente").hide(500);
}

function obtener_reporte_movimientos_del_cliente(_FECHA_INI, _FECHA_FIN, _CLIENTE_SELECTED, _OPCION_SELECTED) {
    $("#table-cliente-tirnoper-resumen").show(500);
    $("#table-cliente-tirnoper-detalle").hide(500);
    let _CUENTA_SELECTED = "-1";
    $.ajax({
        url: "/TirNoPer/ObtenerReporteClientesMovimientos",
        data: JSON.stringify({
            "FECHA_INI": _FECHA_INI,
            "FECHA_FIN": _FECHA_FIN,
            "CLIENTE_SELECTED": _CLIENTE_SELECTED,
            "OPT_SELECTED": _OPCION_SELECTED,
            "CUENTA_SELECTED": _CUENTA_SELECTED
        }),
        type: "POST",
        success: function (_data) {
            _data.forEach(element => {
                let date = element.fecha;
                let value_fecha = '<td>' + date + '</td>';
                let value_producto = '<td>' + element.producto + '</td>';
                let value_cuenta = '<td>' + element.cuenta + '</td>';
                let value_tipo = '<td>' + element.tipo + '</td>';
                let value_valor = '<td> $' + separar_numero_en_comas(element.valor) + '</td>';

                let item = '<tr>' + value_fecha + value_producto + value_cuenta + value_tipo + value_valor + '</tr>';

                $('#table-cliente-tirnoper-resumen').append(item);
            });

            let elementsShowDetalail = document.getElementsByClassName("cliente-detalle");
            for (let value of elementsShowDetalail) {
                value.addEventListener('click', obtener_reporte_detalle_movimientos_del_cliente, false);
            }
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function obtener_reporte_detalle_movimientos_del_cliente() {

    $("#table-cliente-tirnoper-resumen").hide(500);
    $("#table-cliente-tirnoper-detalle").show(500);
    $("#btnAtras").show()
    let _VALOR = $(this).val();

    let _FECHA_INI = $("#filtro-fecha-inicial-cliente").val().replace(/\-/g, '');
    let _FECHA_FIN = $("#filtro-fecha-final-cliente").val().replace(/\-/g, '');

    let _CLIENTE_SELECTED = $("#autocomplete-cliente").val().trim();
    let _OPCION_SELECTED = '1';
    if (_CLIENTE_SELECTED == "") {
        _CLIENTE_SELECTED = $("#autocomplete-nip").val().split("-")[0].trim();
        _OPCION_SELECTED = '2';
    }

    let _CUENTA_SELECTED = '-1';

    $.ajax({
        url: "/TirNoPer/ObtenerReporteClientesMovimientos",
        type: "POST",
        data: JSON.stringify({
            "FECHA_INI": _FECHA_INI,
            "FECHA_FIN": _FECHA_FIN,
            "CLIENTE_SELECTED": _CLIENTE_SELECTED,
            "OPT_SELECTED": _OPCION_SELECTED,
            "CUENTA_SELECTED": _CUENTA_SELECTED
        }),
        success: function (_data) {
            successClientesMovimientos(_data, '#table-cliente-tirnoper-detalle', element.valor == _VALOR)
        },
        error: function (xhr, status, error) {
            error(xhr, status, error)
        }
    });

}

function successClientesMovimientos(_data, _table, condicion) {
    _data.forEach(element => {
        if (condicion) {
            let value_producto = '<td>' + element.producto + '</td>';
            let value_NombreProducto = '<td>' + element.nombre_Producto + '</td>';
            let value_categoria = '<td>' + element.ccli + '</td>';
            let value_nombre = '<td>' + element.nombre + '</td>';
            let value_entradas = '<td> $' + separar_numero_en_comas(element.entradas) + '</td>';
            let value_salidas = '<td> $' + separar_numero_en_comas(element.salidas) + '</td>';

            let item = '<tr>' + value_producto + value_NombreProducto + value_categoria + value_nombre + value_entradas + value_salidas + '</tr>';
            $(_table).append(item);
        }
    });
}

function error(xhr, status, error) {
    console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
    ExceptionHandler(xhr);
}