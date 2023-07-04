using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class InformeDatosSif
    {
        [JsonProperty("FechaIni")]
        public string FechaIni { get; set; }

        [JsonProperty("FechaFin")]
        public string FechaFin { get; set; }

        [JsonProperty("Cliente")]
        public string Cliente { get; set; }

        [JsonProperty("Cuenta")]
        public string Cuenta { get; set; }

        [JsonProperty("Url")]
        public string Url { get; set; }
    }

    public class DatosSif
    {
        [JsonProperty("FechaIni")]
        public string FechaIni { get; set; }

        [JsonProperty("FechaFin")]
        public string FechaFin { get; set; }

        [JsonProperty("Cliente")]
        public string Cliente { get; set; }

        [JsonProperty("Cuenta")]
        public string Cuenta { get; set; }
     }
}