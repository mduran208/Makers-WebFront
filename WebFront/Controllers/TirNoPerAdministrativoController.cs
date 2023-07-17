using WebFront.Models.Request;
using WebFront.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using static WebFront.HttpWebClient;

namespace WebFront.Controllers
{
    public class TirNoPerAdministrativoController : Controller
    {
        /// <summary>
        /// Path de ubicacion del API de consulta
        /// </summary>
        private string urlBase = WebConfigurationManager.AppSettings["API_URL_BASE"].ToString();

        // GET: TirNoPerAdministrativo
        public ActionResult TirNoPerAdministrativo()
        {
            ViewBag.User = (UsuarioResult)Session["User"];
            ViewBag.Panel = Session["Panel"];
            return View();
        }

        [AllowAnonymous]
        public JsonResult ObtenerCategorias(CategoriaRequest categoria)
        {
            try
            {
                var categoriaResult = Post<CategoriaRequest, List<CategoriaResult>>(urlBase + "/api/v1/Informes/PA/ObtenerCategorias", categoria, (string)Session["token"]);
                return Json(categoriaResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerLotes(CargarVariosRequest request)
        {
            try
            {
                FechaRequest fecha = new FechaRequest() { FECHA = request.FECHA };
                var loteResult = Post<FechaRequest, LoteResult>(urlBase + "/api/v1/Cargas/PA/ObtenerLotes", fecha, (string)Session["token"]);
                return Json(loteResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult EjecutarCargaTEB(CargarVariosRequest request)
        {
            try
            {
                FechaRequest fecha = new FechaRequest() { FECHA = request.FECHA };
                var carga = Post<FechaRequest, EjecutaCargaResult>(urlBase + "/api/v1/Cargas/PA/EjecutarCargaTEB", fecha, (string)Session["token"]);
                Session["CargaTEB"] = carga.id_proceso;
                return Json(carga, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerValoracionTEB(LoteRequest loteId)
        {
            try
            {
                var carga = Post<LoteRequest, EjecutaCargaResult>(urlBase + "/api/v1/Correcciones/PA/ObtenerValoracionTEB", loteId, (string)Session["token"]);
                Session["ValoracionTEB"] = carga.id_proceso;
                return Json(carga, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult CargarVarios(CargarVariosRequest cargarVarios)
        {
            try
            {
                FechaRequest fecha = new FechaRequest();
                fecha.FECHA = cargarVarios.FECHA;
                var carga = Post<FechaRequest, EjecutaCargaResult>(urlBase + cargarVarios.Url, fecha, (string)Session["token"]);
                Session[cargarVarios.IdSession] = carga.id_proceso;
                return Json(carga, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult EjecutarExtraccionSalesforce()
        {
            try
            {
                var sales = Post<FechaRequest, EjecutaCargaResult>(urlBase + "/api/v1/TirNoPer/PA/EjecutarExtraccionSalesforce", new FechaRequest() { }, (string)Session["token"]);
                return Json(sales, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult VerificarEstadoTarea(CargarVariosRequest estadoTarea)
        {
            try
            {
                VerificarEstadoTareaResult estado = new VerificarEstadoTareaResult();
                estado.GUID = "";
                var carga = Post(urlBase + estadoTarea.Url, (string)Session["token"]);
                if (Convert.ToBoolean(carga))
                {
                    switch (estadoTarea.Tipo)
                    {
                        case "cargaTitulos":
                            estado.GUID = (string)Session["CargaTEB"];
                            break;
                        case "valoracionTitulos":
                            estado.GUID = (string)Session["ValoracionTEB"];
                            break;
                        case "CargaFics":
                            estado.GUID = (string)Session["CargaFICS"];
                            break;
                        case "CargaCtaInv":
                            estado.GUID = (string)Session["CargaCTAINV"];
                            break;
                        case "Saldos":
                            estado.GUID = (string)Session["CargaSALDOS"];
                            break;
                        case "CargaCompleta":
                            estado.GUID = (string)Session["CargaCOMPLETA"];
                            break;
                    }
                }
                
                return Json(estado, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerDetalleProceso(DetalleProcesoRequest detalleProceso)
        {
            try
            {
                var sales = Post<DetalleProcesoRequest, DetalleProcesoResult>(urlBase + "/api/v1/Cargas/PA/ObtenerDetalleProceso", detalleProceso, (string)Session["token"]);
                return Json(sales, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerCorrecciones(CorreccionRequest correccionRequest)
        {
            try
            {
                var result = Post<CorreccionRequest, List<CorreccionResult>>(urlBase + "/api/v1/Correcciones/PA/ObtenerCorrecciones", correccionRequest, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult GuardarCorrecciones(CorreccionGuardarRequest correccionRequest)
        {
            try
            {
                var result = Post<CorreccionGuardarRequest, CorreccionGuardarResult>(urlBase + "/api/v1/Correcciones/PA/GuardarCorrecciones", correccionRequest, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult RemoverCorrecciones(CorreccionGuardarRequest correccionRequest)
        {
            try
            {
                var result = Post<CorreccionGuardarRequest, CorreccionGuardarResult>(urlBase + "/api/v1/Correcciones/PA/RemoverCorrecciones", correccionRequest, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerBloqueos()
        {
            try
            {
                var result = Post<string, List<BloqueoResult>>(urlBase + "/api/v1/Bloqueos/PA/ObtenerBloqueos", "", (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult GuardarBloqueo(BloqueoRequest bloqueo)
        {
            try
            {
                var result = Post<BloqueoRequest, string>(urlBase + "/api/v1/Bloqueos/PA/GuardarBloqueo", bloqueo, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult VerificarBloqueo(BloqueoRequest bloqueo)
        {
            try
            {
                var result = Post<BloqueoRequest, string>(urlBase + "/api/v1/Bloqueos/PA/VerificarBloqueo", bloqueo, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult RemoverBloqueo(BloqueoEliminarRequest bloqueo)
        {
            try
            {
                var result = Post<BloqueoEliminarRequest, string>(urlBase + "/api/v1/Bloqueos/PA/RemoverBloqueo", bloqueo, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerCategoriasInformes()
        {
            try
            {
                var result = Post<string, CategoriaInformeResult>(urlBase + "/api/v1/Informes/PA/ObtenerCategoriasInformes", "", (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerInformesPorCategoria(InformePorCategoriaRequest informe)
        {
            try
            {
                var result = Post<InformePorCategoriaRequest, List<InformePorCategoriaResult>>(urlBase + "/api/v1/Informes/PA/ObtenerInformesPorCategoria", informe, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult autocomplete_buscar_clientes_informe(InformeBuscaClienteRequest informe)
        {
            try
            {
                InformeClienteRequest info = new InformeClienteRequest() { Term = informe.Term };
                var result = Post<InformeClienteRequest, List<string>>(urlBase + informe.Url, info, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerDatosSaldos(DatosSaldosRequest datos)
        {
            try
            {
                var result = Post<DatosSaldosRequest, List<DatosSaldosResult>>(urlBase + "/api/v1/Informes/PA/ObtenerDatosSaldos", datos, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult autocomplete_buscar_cuentas_informe(InformeBuscaCuentaRequest informe)
        {
            try
            {
                InformeCuentaRequest info = new InformeCuentaRequest() { Nombre = informe.Nombre};
                var result = Post<InformeCuentaRequest, List<InformePorCategoriaResult>>(urlBase + informe.Url, info, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerDatosTEB(DatosTebRequest informe)
        {
            try
            {
                var result = Post<DatosTebRequest, List<DatosTebResult>>(urlBase + "/api/v1/Informes/PA/ObtenerDatosTEB", informe, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerDetalleTEB(DetalleProcesoRequest informe)
        {
            try
            {
                var result = Post<DetalleProcesoRequest, List<DetalleTebResult>>(urlBase + "/api/v1/Informes/PA/ObtenerDetalleTEB", informe, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult InformeDatosSif(InformeDatosSif informe)
        {
            try
            {
                DatosSif info = new DatosSif() { FechaIni = informe.FechaIni, FechaFin = informe.FechaFin, Cliente = informe.Cliente, Cuenta = informe.Cuenta };
                var result = Post<DatosSif, List<DatosTebResult>>(urlBase + informe.Url, info, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerConsolidadoInformes(CargarVariosRequest request)
        {
            try
            {
                FechaRequest fecha = new FechaRequest() { FECHA = request.FECHA };
                var result = Post<FechaRequest, List<ConsolidadoResult>>(urlBase + "/api/v1/Informes/PA/ObtenerConsolidadoInformes", fecha, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ConsolidadoDetalle(CargarVariosRequest informe)
        {
            try
            {
                FechaRequest info = new FechaRequest() { FECHA = informe.FECHA };
                var result = Post<FechaRequest, List<ConsolidadoDetalleResult>>(urlBase + informe.Url, info, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerExtraccionSaldos(ExtraccionRequest extra)
        {
            try
            {
                var result = Post<ExtraccionRequest, List<DatosSaldosResult>>(urlBase + "/api/v1/Informes/PA/ObtenerExtraccionSaldos", extra, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult BuscarInforme(CargarVariosRequest informe)
        {
            try
            {
                var result = Post<string, List<string>>(urlBase + informe.Url, "", (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerTirMasiva(TirMasivaRequest tir)
        {
            try
            {
                var result = Post<TirMasivaRequest, List<TirMasivaResult>>(urlBase + "/api/v1/TirMasiva/PA/ObtenerTirMasiva", tir, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

    }
}