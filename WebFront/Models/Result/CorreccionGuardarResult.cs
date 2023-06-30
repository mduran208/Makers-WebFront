using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class CorreccionGuardarResult
    {
        [JsonProperty("datos")]
        public string datos { get; set; }
    }
}