using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class BloqueoEliminarRequest
    {
        [JsonProperty("ID")]
        public string ID { get; set; }
    }
}