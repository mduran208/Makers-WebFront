using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class BloqueoRequest
    {
        [JsonProperty("Documento")]
        public string Documento { get; set; }

        [JsonProperty("Observacion")]
        public string Observacion { get; set; }
    }
}