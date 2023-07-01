using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class InformeBuscaCuentaRequest
    {
        [JsonProperty("Nombre")]
        public string Nombre { get; set; }

        [JsonProperty("Url")]
        public string Url { get; set; }
    }

    public class InformeCuentaRequest
    {
        [JsonProperty("Nombre")]
        public string Nombre { get; set; }
    }
}