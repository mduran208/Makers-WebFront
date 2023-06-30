using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class LoteResult
    {
        [JsonProperty("lote")]
        public string lote { get; set; }
    }
}