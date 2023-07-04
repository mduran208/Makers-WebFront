﻿using WebFront.Models.Request;
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
                var categoriaResult = Post<CategoriaRequest, List<CategoriaResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerCategorias", categoria, (string)Session["token"]);
                return Json(categoriaResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerLotes(FechaRequest fecha)
        {
            try
            {
                var loteResult = Post<FechaRequest, LoteResult>(urlBase + "/api/v1/TirNoPer/PA/ObtenerLotes", fecha, (string)Session["token"]);
                return Json(loteResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult EjecutarCargaTEB(FechaRequest fecha)
        {
            try
            {
                var carga = Post<FechaRequest, EjecutaCargaResult>(urlBase + "/api/v1/TirNoPer/PA/EjecutarCargaTEB", fecha, (string)Session["token"]);
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
                var carga = Post<LoteRequest, EjecutaCargaResult>(urlBase + "/api/v1/TirNoPer/PA/ObtenerValoracionTEB", loteId, (string)Session["token"]);
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
                var carga = Post<FechaRequest, VerificarEstadoTareaResult>(urlBase + estadoTarea.Url, new FechaRequest() { }, (string)Session["token"]);
                switch(estadoTarea.Tipo)
                {
                    case "cargaTitulos":
                        carga.GUID = (string)Session["CargaTEB"];
                        break;
                    case "valoracionTitulos":
                        carga.GUID = (string)Session["ValoracionTEB"];
                        break;
                    case "CargaFics":
                        carga.GUID = (string)Session["CargaFICS"];
                        break;
                    case "CargaCtaInv":
                        carga.GUID = (string)Session["CargaCTAINV"];
                        break;
                    case "Saldos":
                        carga.GUID = (string)Session["CargaSALDOS"];
                        break;
                    case "CargaCompleta":
                        carga.GUID = (string)Session["CargaCOMPLETA"];
                        break;
                }
                return Json(carga, JsonRequestBehavior.AllowGet);
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
                var sales = Post<DetalleProcesoRequest, EjecutaCargaResult>(urlBase + "/api/v1/Cargas/PA/ObtenerDetalleProceso", detalleProceso, (string)Session["token"]);
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
                var result = Post<CorreccionRequest, List<CorreccionResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerCorrecciones", correccionRequest, (string)Session["token"]);
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
                var result = Post<CorreccionGuardarRequest, CorreccionGuardarResult>(urlBase + "/api/v1/TirNoPer/PA/GuardarCorrecciones", correccionRequest, (string)Session["token"]);
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
                var result = Post<CorreccionGuardarRequest, CorreccionGuardarResult>(urlBase + "/api/v1/TirNoPer/PA/RemoverCorrecciones", correccionRequest, (string)Session["token"]);
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
                var result = Post<string, List<BloqueoResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerBloqueos", "", (string)Session["token"]);
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
                var result = Post<BloqueoRequest, string>(urlBase + "/api/v1/TirNoPer/PA/GuardarBloqueo", bloqueo, (string)Session["token"]);
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
                var result = Post<BloqueoRequest, string>(urlBase + "/api/v1/TirNoPer/PA/VerificarBloqueo", bloqueo, (string)Session["token"]);
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
                var result = Post<BloqueoEliminarRequest, string>(urlBase + "/api/v1/TirNoPer/PA/RemoverBloqueo", bloqueo, (string)Session["token"]);
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
                var result = Post<string, string>(urlBase + "/api/v1/TirNoPer/PA/ObtenerCategoriasInformes", "", (string)Session["token"]);
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
                var result = Post<InformePorCategoriaRequest, List<InformePorCategoriaResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerInformesPorCategoria", informe, (string)Session["token"]);
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
                var result = Post<InformeClienteRequest, List<InformePorCategoriaResult>>(urlBase + informe.Url, info, (string)Session["token"]);
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
                var result = Post<DatosSaldosRequest, List<DatosSaldosResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerDatosSaldos", datos, (string)Session["token"]);
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
                var result = Post<DatosTebRequest, List<DatosTebResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerDatosTEB", informe, (string)Session["token"]);
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
                var result = Post<DetalleProcesoRequest, List<DetalleTebResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerDetalleTEB", informe, (string)Session["token"]);
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
        public JsonResult ObtenerConsolidadoInformes(FechaRequest fecha)
        {
            try
            {
                var result = Post<FechaRequest, List<ConsolidadoResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerConsolidadoInformes", fecha, (string)Session["token"]);
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
                var result = Post<FechaRequest, List<DatosTebResult>>(urlBase + informe.Url, info, (string)Session["token"]);
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
                var result = Post<ExtraccionRequest, List<DatosSaldosResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerExtraccionSaldos", extra, (string)Session["token"]);
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
                var result = Post<TirMasivaRequest, List<TirMasivaResult>>(urlBase + "/api/v1/TirNoPer/PA/ObtenerTirMasiva", tir, (string)Session["token"]);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        public ActionResult DatosSaldos()
        {
            return PartialView();
        }

        public ActionResult DatosTitulosExtrabursatiles()
        {
            return PartialView();
        }

        public ActionResult DatosSifi()
        {
            return PartialView();
        }

        public ActionResult DatosSif()
        {
            return PartialView();
        }

        public ActionResult ConsolidadoProcesos()
        {
            return PartialView();
        }

        public ActionResult TirMasiva()
        {
            return PartialView();
        }
    }
}