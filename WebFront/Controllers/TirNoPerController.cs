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
    public class TirNoPerController : Controller
    {
        /// <summary>
        /// Path de ubicacion del API de consulta
        /// </summary>
        private string urlBase = WebConfigurationManager.AppSettings["API_URL_BASE"].ToString();
        
        /// <summary>
        /// Metodo principal de creacion de interfaz TirNoPer
        /// </summary>
        /// <returns></returns>
        public ActionResult TirNoPer()
        {
            ViewBag.User = (UsuarioResult)Session["User"];
            return View();
        }

        /// <summary>
        /// Obtener reporte por cliente
        /// </summary>
        /// <param name="clienteInfo">Estructura de consulta para cliente</param>
        /// <returns></returns>
        [AllowAnonymous]
        public JsonResult ObtenerReporteClientesInfo(ClienteInfoRequest clienteInfo)
        {
            try
            {
                var clienteResult = Post<ClienteInfoRequest, List<ClienteInfoResult>>(urlBase + "/api/v1/TirNoPer/ObtenerNombreClientes", clienteInfo, (string)Session["token"]);
                return Json(clienteResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        /// <summary>
        /// Obtener el reporte de movimientos por cliente
        /// </summary>
        /// <param name="clienteInfo">Estructura de datos de consulta de cliente</param>
        /// <returns></returns>
        [AllowAnonymous]
        public JsonResult ObtenerReporteClientesMovimientos(ClienteInfoRequest clienteInfo)
        {
            try
            {
                var clienteResult = Post<ClienteInfoRequest, List<ClienteMovimientoResult>>(urlBase + "/api/v1/TirNoPer/ObtenerReporteClientesMovimientos", clienteInfo, (string)Session["token"]);
                return Json(clienteResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }

        [AllowAnonymous]
        public JsonResult ObtenerNombreClientes(NombreClienteRequest nombreCliente)
        {
            try
            {
                var user = (UsuarioResult)Session["User"];
                nombreCliente.Nombre = user.user;
                nombreCliente.Rol = user.role;
                var clienteResult = Post<NombreClienteRequest, List<NombreClienteResult>>(urlBase + "/api/v1/TirNoPer/ObtenerNombreClientes", nombreCliente, (string)Session["token"]);
                return Json(clienteResult, JsonRequestBehavior.AllowGet);
            }
            catch (ApiException ex)
            {
                return Json(ex);
            }
        }
    }
}
