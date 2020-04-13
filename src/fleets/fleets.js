import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    mypaper: {
        background: "gray"
    }
});

function createData(id, name, description, healthy, disabled, unregistered, totalDevices, lastUpdated) {
    return {id, name, description, healthy, disabled, unregistered, totalDevices, lastUpdated};
}

export default function FleetTable() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    useEffect(() => {
            loadData()
        }, []
    );

    const loadData = async () => {
        const data = await fetch("https://ao1x7zyaj7.execute-api.us-east-1.amazonaws.com/DefStage/fleets", {
            headers: {'authorization': 'eyJraWQiOiJcLzl5Zjh0MFJOUVV3R0VRM1BGRmdmcDZENzNVeEdJSW9mUkJQaW94bDNXST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjZDJlZTZlNy03Y2Y3LTRkYTctYWM0OS0xYjNhMTcwYmEwMzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfWHFpcFRYdkUwIiwiY29nbml0bzp1c2VybmFtZSI6Imd1ZXN0IiwiYXVkIjoiY2lnYnBpNXU1b3A5YWNtZjQyNWp0M2dhcCIsImV2ZW50X2lkIjoiN2U5YzdmYmUtZTQ2Mi00NGZlLWE0M2YtZmJlMWFhMWUyNjAxIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODQwMjUyMDQsIm5hbWUiOiJHdWVzdCIsImFjY291bnRzIjoiMTI3IiwiZXhwIjoxNTg0MDI4ODA2LCJpYXQiOjE1ODQwMjUyMDYsImZhbWlseV9uYW1lIjoiT3BlbiIsImVtYWlsIjoiZ3Vlc3RAYWx0YWlyLXNlbWkuY29tIn0.MzubaZsihq2_p6xLKSvKcHrjrXdLGH16k3pPrshzpOy9WB2WEQTnDxPwBOz59SJsGx2LMKHqTCkmXBvxGPQN-zG1EQTJ420VVwilGfb-qxZ52ZGNVVK_S7w0VuU5fAiWkzf5Ugz5QVWp2dwj7bucnFQcr_JbMerfg-Z5lKZnExmy0F6dEhuvaJ_gybb7J2mrC8x9_caNgyrAH4j1JnCctN6Oum9svlouRBq6gewtXq-MyTlIRezcY3LRbr5NNDEIWBrCjLDK8QF4J2HZfpjkz_GXlt0zRraxpyyV7x7yjO8IUv9JrLdxfvTiW5gZ2A2y8AhDCBpj_XT-4-BljRWa-Q&publicKey=-----BEGIN%20PUBLIC%20KEY-----%0AMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwrxgjV8VAYzUUZ%2FqVLs4%0Ahm7bGW1Z9DVNW0vhW3nzgTLamPJPfTURU7xsviu6ew%2B3cDMXZdsOpFBXLL4c6Hm6%0Ae0JYRLKREVbdJlVOasFN4%2B4UZkJ5NCvU8ez9j7VP1tIsVBeZRRJNKyUaGp9MdZ0K%0Atk2YHlAbOtx73O5P7v7E8TgdEprEM43J%2BYcXFu6AeYbsGgvmH2KJMP8bfJyj8ynB%0A%2FvyC%2BfrjTIwVlYfREeAknVY7w4Q96TB2UKLO6PbI%2Bt6opoZzUPjlDDRarDCRvjtc%0AJiWvInoirMrATJ%2BK5G4ozquoL6FddYANbEa5Qgd57SW%2FBDOcNUM0xudKp3pbpOma%0AKwIDAQAB%0A-----END%20PUBLIC%20KEY-----%0A'}
        });
        let fleets = await data.json();
        fleets = fleets.map(fleet => createData(fleet.fid, fleet.name, fleet.description, fleet.stats.healthy, fleet.stats.disabled, fleet.stats.unregistered, Number(fleet.stats.healthy) + Number(fleet.stats.disabled) + Number(fleet.stats.unregistered), fleet.stats.lastUpdate));
        console.log(fleets);
        setRows(fleets);
    };
    const goToFleet = (row) => {
        console.log(row);
        history.push("/fleet", {fleet: row})
    };
    const history = useHistory();
    return (
        <div>
            <header style={{marginLeft: "30px", fontSize: "30px"}}>
                <p><b> Fleets</b></p>
            </header>
            <Grid container spacing={2} style={{padding: '30px'}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Healthy</TableCell>
                                <TableCell align="right">Disabled</TableCell>
                                <TableCell align="right">Unregistered</TableCell>
                                <TableCell align="right">Total Devices</TableCell>
                                <TableCell align="right">Last Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} onClick={() => goToFleet(row)}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.healthy}</TableCell>
                                    <TableCell align="right">{row.disabled}</TableCell>
                                    <TableCell align="right">{row.unregistered}</TableCell>
                                    <TableCell align="right">{row.totalDevices}</TableCell>
                                    <TableCell align="right">{row.lastUpdated}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    );
};