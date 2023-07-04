/*
----------------------------------------------------------------------------------------
-                                                                                      -
-                           TIRNOPER | PLATAFORMA ADMINISTRATIVA                       -
-                                   COMPONENTES                                        -
-                                                                                      -
---------------------------------------------------------------------------------------- 
*/

    

$(document).on({
    ajaxStart: function() { $("body").addClass("loading"); },
    ajaxStop: function() { $("body").removeClass("loading"); }    

});

$(document).ready(function () {


    $('.modal').modal({
        dismissible: true
    });

    $.ajaxSetup({
        cache: false,
    });

    $(".nuevo-bloqueo").click(function () {
        VerificarClienteExiste();
    });

    $(".buscar-correcciones").click(function () {
        BuscarDatosCorrecciones();
    });

    $(".btnProcesarCargaCompleta").click(function () {
        CargaCompleta();
    })

    $(".btnObtenerDetallesCargaCompleta").click(function () {
        VerificarEstadoTareaCargaCompleta();
    })

    $(".btnProcesarCargaTEB").click(function () {
        CargarTitulosExtrabursatiles();
    })

    $(".btnObtenerDetallesTEB").click(function () {
        ObtenerDetallesProcesoTEB("cargaTitulos");
    })

    $(".btnProcesarCargaFics").click(function () {
        CargarFics();
    })

    $(".btnObtenerDetallesFics").click(function () {
        VerificarEstadoTareaCargaFics();
    })

    $(".btnProcesarCuentasInv").click(function () {
        CargarCuentaInv();
    })

    $(".btnObtenerDetallesCuentasInv").click(function () {
        VerificarEstadoTareaCargaCtaInv();
    })

    $(".btnProcesarSaldos").click(function () {
        CargarSaldos();
    })

    $(".btnObtenerDetallesSaldos").click(function () {
        VerificarEstadoTareaSaldos();
    })

    $(".btnProcesarExtraccionSalesforce").click(function () {
        ExtraccionSalesforce();
    })

    $("#cmbCategoria").change(function () {
        LimpiarFiltrosCorrecciones();
    });

    $('#tab-bloqueos').click(function () {
        InteraccionesTabBloqueos();
        ConsultarBloqueos();
        //$('#tabla-bloqueos').DataTable();
    });

    $('#tab-procesamiento').click(function () {
        InteraccionesTabProcesamiento();
    });

    $('#tab-correcciones').click(function () {
        InteraccionesTabCorreccciones();
        ConsultarCategoriasCorrecciones();
    });

    $('#tab-informes').click(function () {
        InteraccionesTabInformes();
        ObtenerCategoriaInformes();
    });

    $("#categoriaInforme").change(function () {
        ObtenerListaInformes();
    });

    $("#listInformes").change(function () {
        RenderReport($("#listInformes").val());
    });

    $("#btn-close-modal").click(function(){
        $('#modal-alert').modal("hide");
    });

    /*--------------- COMPONENTES | ANIMACIONES ---------------*/

    $('.collapsible').collapsible();
    $('.selectpicker').formSelect();

    $("#correcciones").hide();
    $("#informes").hide();
    $("#bloqueos").hide();
    $("#tabla-correciones").hide();
    $("#divReportes").hide();

    $("#filtro-fecha-final-tir-masiva").change(function(){
        console.log("controla escritura");
    });

    function InteraccionesTabProcesamiento () {
        $("#tab-correcciones").removeClass("active");
        $("#tab-informes").removeClass("active");
        $("#tab-bloqueos").removeClass("active");
        $("#tab-procesamiento").addClass("active");
        $("#correcciones").hide(500);
        $("#informes").hide(500);
        $("#bloqueos").hide(500);
        $("#procesamiento").show(500);
        $("#divReportes").hide();
    }

    function InteraccionesTabCorreccciones () {
        $("#tab-procesamiento").removeClass("active");
        $("#tab-informes").removeClass("active");
        $("#tab-bloqueos").removeClass("active");
        $("#tab-correcciones").addClass("active");
        $("#procesamiento").hide(500);
        $("#informes").hide(500);
        $("#bloqueos").hide(500);
        $("#correcciones").show(500);
        $("#divReportes").hide();
    }

    function InteraccionesTabInformes () {
        $("#tab-procesamiento").removeClass("active");
        $("#tab-correcciones").removeClass("active");
        $("#tab-bloqueos").removeClass("active");
        $("#tab-informes").addClass("active");
        $("#procesamiento").hide(500);
        $("#correcciones").hide(500);
        $("#bloqueos").hide(500);
        $("#informes").show(500);
    }

    function InteraccionesTabBloqueos() {
        $("#tab-procesamiento").removeClass("active");
        $("#tab-informes").removeClass("active");
        $("#tab-correcciones").removeClass("active");
        $("#tab-bloqueos").addClass("active");
        $("#procesamiento").hide(500);
        $("#informes").hide(500);
        $("#correcciones").hide(500);
        $("#bloqueos").show(500);
        $("#divReportes").hide();
    }
});