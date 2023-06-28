using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class ClienteInfoRequest
    {
        [JsonProperty("FECHA_INI")]
        public string FECHA_INI { get; set; }

        [JsonProperty("FECHA_FIN")]
        public string FECHA_FIN { get; set; }

        [JsonProperty("CLIENTE_SELECTED")]
        public string CLIENTE_SELECTED { get; set; }

        [JsonProperty("OPT_SELECTED")]
        public string OPT_SELECTED { get; set; }

        [JsonProperty("CUENTA_SELECTED")]
        public string CUENTA_SELECTED { get; set; }
    }
}