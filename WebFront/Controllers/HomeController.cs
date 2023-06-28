using WebFront.Models.Request;
using WebFront.Models.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace WebFront.Controllers
{
    public class HomeController : Controller
    {
        /// <summary>
        /// Path de ubicacion del API de consulta
        /// </summary>
        private string urlBase = WebConfigurationManager.AppSettings["API_URL_BASE"].ToString();

        /// <summary>
        /// Metodo de inicializacion de la interfaz Index
        /// </summary>
        /// <param name="token">Parametro de ingreso correspondiente al Token de acceso</param>
        /// <returns></returns>
        public ActionResult Index(string token)
        {
            var user = new UsuarioResult();
            user.user = "";
            user.role = "";
            if(token != null && token != "")
            {
                user = HttpWebClient.Post<UsuarioRequest, UsuarioResult>(urlBase + "/api/auth/validate", new UsuarioRequest() { }, token);
                Session["User"] = user;
                Session["Token"] = token;
            }
            ViewBag.User = user;
            return View();
        }

        public void GetRoles()
        {
            var rol = HttpWebClient.Post<UsuarioRequest, UsuarioResult>(urlBase + "/api/v1/TirNoPer/ObtenerPARoles", new UsuarioRequest() { }, (string)Session["Token"]);
        }
    }
}