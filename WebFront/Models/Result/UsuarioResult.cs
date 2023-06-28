using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class UsuarioResult
    {
        [JsonProperty("user")]
        public string user { get; set; }

        [JsonProperty("role")]
        public string role { get; set; }
    }
}