import React, { PropsWithChildren } from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import TournamentOverviewTable from "./TournamentOverviewTable";

// import * as a from '../../public/logo_saltatio_zeitplan.svg';

interface Props {

}

const iconPath = process.env.PUBLIC_URL;

const Layout = (props: PropsWithChildren<Props>) => {


    return (
        <Box pt={2.5}>
            <Box pl={6} pr={6} width="100vw" display="flex" justifyContent="space-between">
                <img style={{ maxWidth: "400px" }}
                     src={`${iconPath}logo_saltatio_zeitplan.svg`} alt="logo" />

                <Box>
                    <Box><Typography fontSize="30px">Letzte Aktualisierung:</Typography></Box>
                    <Box textAlign="right">08.01.2023 12:09 Uhr</Box>
                </Box>
            </Box>
            <Box width="100vw">
                <Table>
                    <colgroup>
                        <col width="0" />
                        <col width="auto" />
                    </colgroup>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Box
                                    style={{ transform: "rotate(-90deg)" }}
                                    minHeight="100px"
                                >
                                    Aktuell
                                </Box>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Box
                                    style={{ transform: "rotate(-90deg)" }}
                                    minHeight="150px"
                                >
                                    Tagesablauf
                                </Box>
                            </TableCell>
                            <TableCell>
                                <TournamentOverviewTable />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </Box>

    );
}

export default Layout;