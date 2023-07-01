using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class InformeBuscaClienteRequest
    {
        [JsonProperty("Term")]
        public string Term { get; set; }

        [JsonProperty("Url")]
        public string Url { get; set; }
    }

    public class InformeClienteRequest
    {
        [JsonProperty("Term")]
        public string Term { get; set; }
    }
}