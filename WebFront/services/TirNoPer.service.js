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

function funcionChangeGe() {
    autocomplete_obtener_clientes_grupo_economico($("#autocomplete-grupo-economico").val());
}

function separar_numero_en_comas(_VAL){
    _VAL = parseFloat(_VAL).toFixed(2);
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

function autocompletado_obtener_clientes(inputField, dataList) {

    let term = $(inputField).val();
    let _CLIENTE_AUTOCOMPLETE = [];
    const datalist = $(dataList);
    let options = '';

    if (term.length > 2) {
        $.ajax({
            url: "/TirNoPer/ObtenerNombreClientes",
            data: JSON.stringify({
                "Key": term
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data) {
                _data.forEach(element => {
                    options += '<option value="' + element + '"/>';
                });

                document.getElementById(dataList).innerHTML = options;

                if (inputField == "#autocomplete-cliente") {
                    $("#autocomplete-nip").prop("disabled", true);
                }
               
                return _data;
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });
    }
}

function autocompletado_obtener_nip() {

    let term = $("#autocomplete-nip").val();
    let _CLIENTE_AUTOCOMPLETE = {};


    if (term.length > 2) {
        $("#autocomplete-nip").attr('maxlength', 0);

        $.ajax({
            url: "/TirNoPer/ObtenerNIPClientes",
            data: JSON.stringify({
                "Key": term
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data) {
                _data.forEach(element => {
                    _CLIENTE_AUTOCOMPLETE[`${element.Nit} - ${element.Nombre}`] = null;
                });
                $("#autocomplete-nip").autocomplete({
                    data: _CLIENTE_AUTOCOMPLETE
                });
                $("#autocomplete-nip").attr('maxlength', 15);
                $("#autocomplete-cliente").prop("disabled", true);
                return _data;
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });
    }
}

function agregarOpcionCuenta(numero, cuenta, seleccionada) {
    if (cuenta > 0) {
        $("#select-cuentas-cliente").append('<option value="' + numero + '">' + cuenta + '</option>');
    } else {
        $('#select-cuentas-cliente').append('<option value="' + numero + '" ' + seleccionada + '>' + cuenta + '</option>');
    }
}

function obtenerCuentasPorCliente(key, nombre) {
    $.ajax({
        url: "/TirNoPer/ObtenerCuentasPorCliente",
        data: JSON.stringify({
            "Key": key,
            "Nombre": nombre
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) {
            data.forEach(element => {
                agregarOpcionCuenta(element.Numero, element.Cuenta, (element.Cuenta > 0 ? '' : 'selected'));
            });
            $("#select-cuentas-cliente").formSelect();
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}
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
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
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
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
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
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
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

function autocomplete_obtener_grupo_economico() {

    let term = $("#autocomplete-grupo-economico").val();
    let _CLIENTE_AUTOCOMPLETE = [];
    const datalist = $("#lista-grupo-economico");
    let options = '';
    $("#autocomplete-grupo-economico")
    if (term.length > 2) {

        $.ajax({
            url:  "/TirNoPer/ObtenerNombreGrupoEconomico",
            data: JSON.stringify({
                "Term": term
            }),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (_data) {
                _data.forEach(element => {
                    options += '<option value="' + element + '"/>';
                });

                document.getElementById('lista-grupo-economico').innerHTML = options;

                //$("#autocomplete-grupo-economico").autocomplete({
                //    onAutocomplete: function (val) {
                //            autocomplete_obtener_clientes_grupo_economico(val);
                //        }
                //});
                return _data;
            },
            error: function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                ExceptionHandler(xhr);
            }
        });
    }
}

function autocomplete_obtener_clientes_grupo_economico(grupo_economico) {
    $('#select-cliente-grupo-economico').empty();
    $.ajax({
        url: "/TirNoPer/ObtenerClientesPorGrupoEconomico",
        data: JSON.stringify({
            "Categoria": grupo_economico
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data) {
            $('#select-cliente-grupo-economico').append('<option value="-1" selected>TODAS</option>');
            _data.forEach(element => {
                $('#select-cliente-grupo-economico').append('<option value="' + element.IdCliente + '">' + element.Nombre + '</option>');
            });
            $("#select-cliente-grupo-economico").formSelect();
        },
        error: function (xhr, status, error) {
            error(xhr, status, error);
        }
    });
}

function autocomplete_obtener_cuentas_clientes_grupo_economico(grupo_economico, clientes) {
    $('#select-cuentas-grupo-economico').empty();
    $.ajax({
        url: "/TirNoPer/ObtenerCuentasPorGrupoEconomico",
        data: JSON.stringify({
            "GrupoEconomico": grupo_economico,
            "Clientes": clientes
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data) {
            _data.forEach(element => {
                if (element.cuenta > 0) {
                    $("#select-cuentas-grupo-economico").append('<option value="' + element.numero + '">' + element.cuenta + '</option>');
                }
                else {
                    $('#select-cuentas-grupo-economico').append('<option value="' + element.numero + '" selected>' + element.cuenta + '</option>');
                }

            });
            $("#select-cuentas-grupo-economico").formSelect();
        },
        error: function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            ExceptionHandler(xhr);
        }
    });
}

function obtener_reporte_informacion_del_cliente_grupo_economico(_FECHA_INI, _FECHA_FIN, _GRUPO_ECONOMICO_SELECTED, _CLIENTE_SELECTED) {
    let _CUENTA_SELECTED = '-1';
    let _GRUPO_ECONOMICO_CUENTA_SELECTED = '-1';
    let _GRUPO_ECONOMICO_CLIENTE_SELECTED = '-1';

    $.ajax({
        url: "/TirNoPer/ObtenerReporteGrupoEconomicoInfo",
        type: "POST",
        data: JSON.stringify({
            "FECHA_INI": _FECHA_INI,
            "FECHA_FIN": _FECHA_FIN,
            "CLIENTE_SELECTED": _CLIENTE_SELECTED,
            "OPT_SELECTED": _GRUPO_ECONOMICO_SELECTED,
            "CUENTA_SELECTED": _CUENTA_SELECTED
        }),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data) {
            _data.forEach(element => {
                element.clienteId == -1 ? $('#grupo-economico-identificacion').html("TODAS") : $('#grupo-economico-identificacion').html(element.clienteId);

                element.clienteCuentas == -1 ? $('#grupo-economico-cuenta').html("TODAS") : $('#grupo-economico-cuenta').html(element.clienteCuentas);

                element.clienteNombre == -1 ? $('#grupo-economico-nombre').html("TODAS") : $('#grupo-economico-nombre').html(element.clienteNombre);
                //----------- modificar ------------
                let param = ['#grupo-economico-fecha-inicial',
                    '#grupo-economico-fecha-final',
                    '#grupo-economico-fecha-vinculacion',
                    '#grupo-economico-saldo-inicial',
                    '#grupo-economico-total-entradas',
                    '#grupo-economico-total-salidas',
                    '#grupo-economico-saldo-final',
                    '#grupo-economico-tir',
                    '#grupo-economico-tir',
                    '#grupo-economico-tir',
                    '#grupo-economico-pyg',
                    '#grupo-economico-pyg',
                    '#grupo-economico-pyg'
                ]

                func_auxliar(param, element)


            });

            if (_data[0].fechaInicial == '') {
                $(".modal-title").html('<span style="font-weight:bold;">Error en fecha inicial</span>');
                $("#message").html("No se encontr&oacute; saldo para la fecha inicial ingresada.");
                $('#modal-alert').modal("show");
                $("#reporte-tir-grupo-economico").hide(500);
            } else if (_data[0].fechaFinal == '') {
                $(".modal-title").html('<span style="font-weight:bold;">Error en fecha final</span>');
                $("#message").html("No se encontr&oacute; saldo para la fecha final ingresada.");
                $('#modal-alert').modal("show");
                $("#reporte-tir-grupo-economico").hide(500);
            } else {
                obtener_reporte_movimientos_del_cliente_grupo_economico(_FECHA_INI,
                    _FECHA_FIN,
                    _GRUPO_ECONOMICO_CLIENTE_SELECTED,
                    _GRUPO_ECONOMICO_SELECTED,
                    _GRUPO_ECONOMICO_CUENTA_SELECTED);
                $("#show-exportar-grupo-economico").show(500);
                $("#reporte-tir-grupo-economico").show(500);
            }

            return _data;
        }


        ,
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

function obtener_reporte_movimientos_del_cliente_grupo_economico(_FECHA_INI, _FECHA_FIN, _CLIENTE_SELECTED, _OPCION_SELECTED, _CUENTA_SELECTED) {

    $("#table-grupo-economico-tirnoper-resumen").show(500);
    $("#table-grupo-economico-tirnoper-detalle").hide(500);
    if ($('#select-cliente-grupo-economico').val().length > 1) {
        if ($('#select-cliente-grupo-economico').val()[0] == '-1') {
            _CLIENTE_SELECTED = $('#select-cliente-grupo-economico').val().splice(1).join('|');
        } else {
            _CLIENTE_SELECTED = $('#select-cliente-grupo-economico').val().join('|');
        }
    } else {
        _CLIENTE_SELECTED = $('#select-cliente-grupo-economico').val()[0];
    }

    let date = new Date();
    let value_fecha = '';
    let value_producto = '';
    let value_cuenta = '';
    let value_nombre = '';
    let value_tipo = '';
    let value_valor = '';
    let value_id = '';
    let item = '';

    $.ajax({
        url: "/TirNoPer/ObtenerReporteGrupoEconomicoMovimientos",
        type: "POST",
        data: JSON.stringify({
            "FECHA_INI": _FECHA_INI,
            "FECHA_FIN": _FECHA_FIN,
            "CLIENTE_SELECTED": _CLIENTE_SELECTED,
            "OPT_SELECTED": _OPCION_SELECTED,
            "CUENTA_SELECTED": _CUENTA_SELECTED
        }),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data) {
            _data.forEach(element => {
                date = element.fecha;
                value_fecha = '<td>' + date + '</td>';
                value_producto = '<td>' + element.producto + '</td>';
                value_id = '<td>' + element.id_Cliente + '</td>';
                value_cuenta = '<td>' + element.cuenta + '</td>';
                value_nombre = '<td>' + element.nombre + '</td>';

                value_tipo = '<td>' + element.tipo + '</td>';
                value_valor = '<td> $' + separar_numero_en_comas(element.valor) + '</td>';

                item = '<tr>' + value_fecha + value_producto + value_cuenta + value_id + value_nombre + value_tipo + value_valor + '</tr>';

                $('#table-grupo-economico-tirnoper-resumen').append(item);
            });

            let elementsShowDetalail = document.getElementsByClassName("grupo-economico-detalle");
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

function get_report_group_economico_movements_detail() {

    $("#table-grupo-economico-tirnoper-resumen").hide(500);
    $("#table-grupo-economico-tirnoper-detalle").show(500);

    let _ID_CUENTA = $(this).val();

    let _FECHA_INI = $("#filtro-fecha-inicial").val().replace(/\-/g, '');
    let _FECHA_FIN = $("#filtro-fecha-final").val().replace(/\-/g, '');

    let _CLIENTE_SELECTED = $("#autocomplete-cliente").val().trim();
    let _OPCION_SELECTED = '1';
    if (_CLIENTE_SELECTED == "") {
        _CLIENTE_SELECTED = $("#autocomplete-idcredicorp").val().trim();
        _OPCION_SELECTED = '2';
        if (_CLIENTE_SELECTED == "") {
            _CLIENTE_SELECTED = $("#autocomplete-nip").val().split("-")[0].trim();
            _OPCION_SELECTED = '3';
        }
    }

    let _CUENTA_SELECTED = '-1';

    $.ajax({
        url: "/TirNoPer/ObtenerReporteGrupoEconomicoMovimientos",
        type: "POST",
        data: JSON.stringify({
            "FECHA_INI": _FECHA_INI,
            "FECHA_FIN": _FECHA_FIN,
            "CLIENTE_SELECTED": _CLIENTE_SELECTED,
            "OPT_SELECTED": _OPCION_SELECTED,
            "CUENTA_SELECTED": _CUENTA_SELECTED
        }),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (_data) {
            successClientesMovimientos(_data, '#table-grupo-economico-tirnoper-detalle', element.cuenta == _ID_CUENTA)
        },
        error: function (xhr, status, error) {
            error(xhr, status, error)
        }
    });

}
