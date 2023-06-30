using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class CorreccionRequest
    {
        [JsonProperty("Categoria")]
        public string Categoria { get; set; }

        [JsonProperty("FechaProceso")]
        public string FechaProceso { get; set; }

        [JsonProperty("Cliente")]
        public string Cliente { get; set; }

        [JsonProperty("NroDePagina")]
        public string NroDePagina { get; set; }
    }
}