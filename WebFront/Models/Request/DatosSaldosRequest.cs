using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class DatosSaldosRequest
    {
        [JsonProperty("Fecha")]
        public string Fecha { get; set; }

        [JsonProperty("Cliente")]
        public string Cliente { get; set; }
    }
}