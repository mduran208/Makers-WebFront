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
            if (token != null && token != "")
            {
                try
                {
                    user = Post<UsuarioRequest, UsuarioResult>(urlBase + "/api/auth/validate", new UsuarioRequest() { }, token);
                    user.Error = "";
                    user.Descripcion = "";
                    Session["User"] = user;
                    GetRoles(token);
                }
                catch (ApiException ex)
                {
                    user.Error = "1";
                    user.Descripcion = ex.Content;
                }
                Session["Token"] = token;
            }
            else
            {
                if (Session["User"] == null)
                {
                    user.user = "";
                    user.role = "";
                }
                else
                    user = (UsuarioResult)Session["User"];
            }
            ViewBag.User = user;
            ViewBag.Panel = Session["Panel"];
            return View();
        }

        public void GetRoles(string token)
        {
            try
            {
                var panel = false;
                var roles = Post<UsuarioRequest, List<RolesResult>>(urlBase + "/api/v1/TirNoPer/ObtenerPARoles", new UsuarioRequest() { }, token);
                var acceso = Post<UsuarioRequest, string>(urlBase + "/api/auth/validate-access", new UsuarioRequest() { }, token);
                if (Convert.ToBoolean(acceso))
                {
                    var user = (UsuarioResult)Session["User"];
                    roles.ForEach(r =>
                    {
                        if (r.rol == user.role)
                            panel = true;
                    });
                }
                Session["Panel"] = panel;
                
            }
            catch (ApiException ex)
            {
                throw ex;
            }
        }
    }
}