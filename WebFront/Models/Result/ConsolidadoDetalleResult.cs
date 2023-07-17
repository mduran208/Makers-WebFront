using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class ConsolidadoDetalleResult
    {
        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("id_Cliente")]
        public string id_Cliente { get; set; }

        [JsonProperty("numero_Cuenta")]
        public string numero_Cuenta { get; set; }

        [JsonProperty("valor")]
        public string valor { get; set; }
    }
}