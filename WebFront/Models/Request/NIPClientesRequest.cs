using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class NIPClientesRequest
    {
        [JsonProperty("Nit")]
        public string Nit { get; set; }
        [JsonProperty("Nombre")]
        public string Nombre { get; set; }
    }
}