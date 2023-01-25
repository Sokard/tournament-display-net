using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.AspNetCore.Cors;
using MySql.Data.MySqlClient;

namespace TournamentOverview.Controllers;

public class RoundPlanDto
{
    public int Position { get; set; }

    public DateTime Startzeit { get; set; }

    public int Dauer { get; set; }

    public int Paare { get; set; }

    public string Turnier { get; set; }

    public string Runde { get; set; }

    public int Gruppen { get; set; }

    public int TurnierID { get; set; }

    public int RundenNr { get; set; }

    public bool laeuft { get; set; } // tinyint(1)

    public bool beendet { get; set; } // tinyint(1)

    public string Floor { get; set; }

    public bool manHinz { get; set; } // tinyint(1)

    public bool zBerUnt { get; set; } // tinyint(1)
}

public class Round
{
    public int Position { get; set; }

    public DateTime StartDate { get; set; }

    public int Duration { get; set; }

    public int Couples { get; set; }

    public string Tournament { get; set; }

    public string RoundName { get; set; }

    public int Groups { get; set; }

    public int TournamentID { get; set; }

    public int RoundNumber { get; set; }

    public bool IsRunning { get; set; }

    public bool IsFinished { get; set; }

    public string Floor { get; set; }

    public Round(RoundPlanDto dto)
    {
        Position = dto.Position;
        StartDate = dto.Startzeit;
        Duration = dto.Dauer;
        Couples = dto.Paare;
        Tournament = dto.Turnier;
        RoundName = dto.Runde;
        Groups = dto.Gruppen;
        TournamentID = dto.TurnierID;
        RoundNumber = dto.RundenNr;
        IsRunning = dto.laeuft;
        IsFinished = dto.beendet;
        Floor = dto.Floor;
    }
}

[ApiController]
[EnableCors]
public class TournamentDataController : ControllerBase
{
    [HttpGet("tournament/round-plan")]
    public IActionResult GetRoundPlan()
    {
        using var connection = new MySqlConnection("Server=192.168.0.10;Database=turnierdaten;User Id=root;Password=rootpasswort;");
        
        connection.Open();
        
        var result = connection.Query<RoundPlanDto>("SELECT * FROM rundenplanung").ToList()
                .Select(s => new Round(s))
                .ToList()
            ;

        return Ok(result);
    }

    [HttpGet("test")]
    public IActionResult Get()
    {
        return Ok();
    }

    [HttpGet("tournament")]
    public IEnumerable<Round> Get2()
    {
        using var connection = new MySqlConnection("Server=192.168.0.10;Database=turnierdaten;User Id=root;Password=rootpasswort;");
        
        connection.Open();

        var result = connection.Query<RoundPlanDto>("SELECT * FROM rundenplanung").ToList()
            .Select(s => new Round(s))
            .ToList();

        return result;
    }
    
}