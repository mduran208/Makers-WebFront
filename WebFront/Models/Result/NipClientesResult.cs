using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class NipClientesResult
    {
        [JsonProperty("Nit")]
        public string Nit { get; set; }
        [JsonProperty("Nombre")]
        public string Nombre { get; set; }
    }
}