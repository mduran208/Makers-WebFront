using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class CuentasPorClienteResult
    {
        [JsonProperty("Numero")]
        public string Numero { get; set; }
        [JsonProperty("Cuenta")]
        public string Cuenta { get; set; }
    }
}