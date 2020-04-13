import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FleetInfo from "./FleetInfo";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(endpoint, status, serialNumber, model, version, manufacturer, server, nextUpdate, fleet, tag, campaign, step, fotaStatus) {
    return {
        endpoint,
        status,
        serialNumber,
        model,
        version,
        manufacturer,
        server,
        nextUpdate,
        fleet,
        tag,
        campaign,
        step,
        fotaStatus
    };
}

export default function DeviceTable(props) {
    console.log(props.location.state.fleet);
    const fleet = props.location.state.fleet;
    const classes = useStyles();
    const history = useHistory();
    const [rows, setRows] = useState([]);
    useEffect(() => {
            loadData()
        }, []
    );

    const loadData = async () => {

        const data = await fetch("https://ao1x7zyaj7.execute-api.us-east-1.amazonaws.com/DefStage/fleets/" + fleet.id + "/devices", {
            method: 'post',
            headers: {'authorization': 'eyJraWQiOiJcLzl5Zjh0MFJOUVV3R0VRM1BGRmdmcDZENzNVeEdJSW9mUkJQaW94bDNXST0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjZDJlZTZlNy03Y2Y3LTRkYTctYWM0OS0xYjNhMTcwYmEwMzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfWHFpcFRYdkUwIiwiY29nbml0bzp1c2VybmFtZSI6Imd1ZXN0IiwiYXVkIjoiY2lnYnBpNXU1b3A5YWNtZjQyNWp0M2dhcCIsImV2ZW50X2lkIjoiN2U5YzdmYmUtZTQ2Mi00NGZlLWE0M2YtZmJlMWFhMWUyNjAxIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODQwMjUyMDQsIm5hbWUiOiJHdWVzdCIsImFjY291bnRzIjoiMTI3IiwiZXhwIjoxNTg0MDI4ODA2LCJpYXQiOjE1ODQwMjUyMDYsImZhbWlseV9uYW1lIjoiT3BlbiIsImVtYWlsIjoiZ3Vlc3RAYWx0YWlyLXNlbWkuY29tIn0.MzubaZsihq2_p6xLKSvKcHrjrXdLGH16k3pPrshzpOy9WB2WEQTnDxPwBOz59SJsGx2LMKHqTCkmXBvxGPQN-zG1EQTJ420VVwilGfb-qxZ52ZGNVVK_S7w0VuU5fAiWkzf5Ugz5QVWp2dwj7bucnFQcr_JbMerfg-Z5lKZnExmy0F6dEhuvaJ_gybb7J2mrC8x9_caNgyrAH4j1JnCctN6Oum9svlouRBq6gewtXq-MyTlIRezcY3LRbr5NNDEIWBrCjLDK8QF4J2HZfpjkz_GXlt0zRraxpyyV7x7yjO8IUv9JrLdxfvTiW5gZ2A2y8AhDCBpj_XT-4-BljRWa-Q&publicKey=-----BEGIN%20PUBLIC%20KEY-----%0AMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwrxgjV8VAYzUUZ%2FqVLs4%0Ahm7bGW1Z9DVNW0vhW3nzgTLamPJPfTURU7xsviu6ew%2B3cDMXZdsOpFBXLL4c6Hm6%0Ae0JYRLKREVbdJlVOasFN4%2B4UZkJ5NCvU8ez9j7VP1tIsVBeZRRJNKyUaGp9MdZ0K%0Atk2YHlAbOtx73O5P7v7E8TgdEprEM43J%2BYcXFu6AeYbsGgvmH2KJMP8bfJyj8ynB%0A%2FvyC%2BfrjTIwVlYfREeAknVY7w4Q96TB2UKLO6PbI%2Bt6opoZzUPjlDDRarDCRvjtc%0AJiWvInoirMrATJ%2BK5G4ozquoL6FddYANbEa5Qgd57SW%2FBDOcNUM0xudKp3pbpOma%0AKwIDAQAB%0A-----END%20PUBLIC%20KEY-----%0A'},
            body: JSON.stringify({numResults: 100})
        });

        let devices = await data.json();
        console.log(devices);
        devices = devices.data.map(device => createData(device.endpoint, device.regStatus, device.deviceInfo.serialNumber,
            device.deviceInfo.modelNumber, device.deviceInfo.firmwareVersion, device.deviceInfo.manufacturer, device.server, device.nextUpdate, fleet.name, device.tag, device.campaign, device.step, device.fotaStatus));
        console.log(devices);
        setRows(devices);
    };

    return (
        <div>
            <Button onClick={() => history.push("/")}>
                back
            </Button>
            <Grid container spacing={2} style={{padding: '30px'}}>
                <FleetInfo fleet={props.location.state.fleet}/>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Endpoint</TableCell>
                                    <TableCell align="right">status</TableCell>
                                    <TableCell align="right">Serial Number</TableCell>
                                    <TableCell align="right">Model</TableCell>
                                    <TableCell align="right">Version</TableCell>
                                    <TableCell align="right">Manufacturer</TableCell>
                                    <TableCell align="right">Server</TableCell>
                                    <TableCell align="right">Updated</TableCell>
                                    <TableCell align="right">Next Update</TableCell>
                                    <TableCell align="right">Fleet</TableCell>
                                    <TableCell align="right">Tag</TableCell>
                                    <TableCell align="right">Campaign</TableCell>
                                    <TableCell align="right">Step</TableCell>
                                    <TableCell align="right">Fota Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        {/* <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>*/}
                                        <TableCell align="right">{row.endpoint}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right">{row.serialNumber}</TableCell>
                                        <TableCell align="right">{row.model}</TableCell>
                                        <TableCell align="right">{row.version}</TableCell>
                                        <TableCell align="right">{row.manufacturer}</TableCell>
                                        <TableCell align="right">{row.server}</TableCell>
                                        <TableCell align="right">{row.update}</TableCell>
                                        <TableCell align="right">{row.nextUpdate}</TableCell>
                                        <TableCell align="right">{row.fleet}</TableCell>
                                        <TableCell align="right">{row.tag}</TableCell>
                                        <TableCell align="right">{row.campaign}</TableCell>
                                        <TableCell align="right">{row.step}</TableCell>
                                        <TableCell align="right">{row.fotaStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}