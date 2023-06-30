using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class ClientesPorGrupoEconomicoRequest
    {
        [JsonProperty("Categoria")]
        public string Categoria { get; set; }
    }
}