using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class TirMasivaRequest
    {
        [JsonProperty("FechaIni")]
        public string FechaIni { get; set; }

        [JsonProperty("FechaFin")]
        public string FechaFin { get; set; }

        [JsonProperty("Segmento")]
        public string Segmento { get; set; }

        [JsonProperty("Comercial")]
        public string Comercial { get; set; }
    }
}