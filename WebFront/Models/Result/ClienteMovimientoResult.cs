using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class ClienteMovimientoResult
    {
        [JsonProperty("fecha")]
        public string fecha { get; set; }

        [JsonProperty("producto")]
        public string producto { get; set; }

        [JsonProperty("cuenta")]
        public string cuenta { get; set; }

        [JsonProperty("tipo")]
        public string tipo { get; set; }

        [JsonProperty("valor")]
        public string valor { get; set; }
    }
}