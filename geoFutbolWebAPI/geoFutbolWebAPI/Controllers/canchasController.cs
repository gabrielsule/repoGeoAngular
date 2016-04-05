using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace geoFutbolWebAPI.Controllers
{
    public class canchasController : ApiController
    {
        geoFutbolEntities objAPI = new geoFutbolEntities();

        [HttpGet, Route("api/canchas/getCahchas/{lat}/{lng}/{dist}")]
        public IEnumerable<sp_getCanchas_Result> Get(float lat, float lng, int dist)
        {

            return objAPI.sp_getCanchas(lat, lng, dist).AsEnumerable();
        }

    }
}
