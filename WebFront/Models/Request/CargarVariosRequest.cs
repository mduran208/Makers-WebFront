using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class CargarVariosRequest
    {
        [JsonProperty("FECHA")]
        public string FECHA { get; set; }

        [JsonProperty("Url")]
        public string Url { get; set; }

        [JsonProperty("IdSession")]
        public string IdSession { get; set; }

        [JsonProperty("Tipo")]
        public string Tipo { get; set; }
    }
}