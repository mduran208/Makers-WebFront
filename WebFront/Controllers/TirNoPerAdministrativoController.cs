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
    }
}