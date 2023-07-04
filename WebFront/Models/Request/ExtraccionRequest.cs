using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class ExtraccionRequest
    {
        [JsonProperty("Fecha")]
        public string Fecha { get; set; }

        [JsonProperty("Cuenta")]
        public string Cuenta { get; set; }
    }
}