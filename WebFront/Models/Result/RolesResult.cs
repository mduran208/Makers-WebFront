﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class RolesResult
    {
        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("rol")]
        public string rol { get; set; }
    }
}