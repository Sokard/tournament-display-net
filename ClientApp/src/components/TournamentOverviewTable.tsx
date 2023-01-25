import React, { useState } from 'react';
import useAsyncEffect from "../useAsyncEffect";
import axios from "axios";
import { Round } from "../domain";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface RoundMetaData {
    couples: number
    tournamentID: number
    tournament: string
}

const TournamentOverviewTable = () => {
    const [rounds, setRounds] = useState<Round[]>();

    useAsyncEffect(async () => {
        const response = await axios.get<Round[]>("https://localhost:7051/tournament/round-plan");

        setRounds(response.data);
    }, []);

    const distinctTournamentRounds = (rounds: Round[]) => {
        let arr: number[] = [];
        let asdf: RoundMetaData[] = [];

        for (const round of rounds) {
            console.log(round);

            if (arr.indexOf(round.tournamentID) === -1) {
                arr.push(round.tournamentID);
                asdf.push({
                    couples: round.couples,
                    tournamentID: round.tournamentID,
                    tournament: round.tournament
                });
            }
        }

        return asdf;
    };

    const getDistinctRoundNames = (rounds: Round[]):string[] => {
        let names: string[] = [];

        for (const round of rounds.sort((a,b) => a.roundNumber > b.roundNumber ? 1 : -1)) {
            if (names.indexOf(round.roundName) === -1) {
                names.push(round.roundName);
            }
        }

        return names;
    };
    const distinctRoundNames = rounds && getDistinctRoundNames(rounds);

    const calcRounds = () => {
        if (!rounds || !distinctRoundNames) return;

        let minR = Math.min()
    }

    const findFirstByTournamentID = (id: number): Round | undefined => {
        if (!rounds)
            return;

        return rounds.filter(f => f.tournamentID === id)[0];
    };

    const roundsMetaData = rounds && distinctTournamentRounds(rounds);
    //rounds && new Set(rounds.map(m => m.tournamentID)).size;

    console.log(roundsMetaData);

    return (
        <>
            {!rounds && (
                <CircularProgress size={48} />
            )}
            {rounds && (
                <Table>
                    <colgroup>
                        <col width="auto" />
                        {roundsMetaData && roundsMetaData.map((t, i) => (
                            <col key={i} width="auto" />
                        ))}
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {roundsMetaData && roundsMetaData.map((t, i) => (
                                <TableCell key={i}>{t.tournament}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Paare</TableCell>
                            {roundsMetaData && roundsMetaData.map((t, i) => (
                                <TableCell key={i}>{t.couples}</TableCell>
                            ))}
                        </TableRow>
                        {distinctRoundNames && distinctRoundNames.map((drn,i) => (
                            <TableRow key={i}>
                                <TableCell>{drn}</TableCell>
                                {roundsMetaData && roundsMetaData.map((t, i) => (
                                    <TableCell key={i}>{rounds.filter(f => f.tournamentID === t.tournamentID && f.roundName == drn)[0]?.startDate}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}

export default TournamentOverviewTable;