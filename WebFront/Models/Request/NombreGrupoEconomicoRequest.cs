using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class NombreGrupoEconomicoRequest
    {
        [JsonProperty("Term")]
        public string Term { get; set; }
    }
}