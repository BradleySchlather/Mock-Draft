using Microsoft.AspNetCore.Mvc;
using MockDraftApi.Configuration;
using MockDraftApi.Models;
using System.Data;

namespace MockDraftApi.Repositories
{
    public class MockDraftRepository
    {
        private string conn { get; set; }
        public MockDraftRepository(MockDraftConfiguration connection) {
            this.conn = connection.DbConnectionString; 
        }
        //public IEnumerable<Team> GetTeams()
        //{
            //    using OdbcConnection connection = new OdbcConnection(this.conn);
            //    var procedure = "CALL PROCNAME();"
            //    var result = connection.Query<Team>(procedure, CommandType.StoredProcedure);
            //    return result;
        //}
    }
}
