import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        border: 0,
        borderRadius: 3,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function FleetInfo(props) {
    const classes = useStyles();
    const fleet = props.fleet;
    return (
        <Grid container spacing={0}>
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Fleet Info
                        </Typography>
                        <Typography variant="body2" component="p">
                            Name: {fleet.name}
                            <br/>
                            Description: {fleet.description}
                            <br/>
                            <br/>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Total Devices: {Number(fleet.healthy) + Number(fleet.disabled) + Number(fleet.unregistered)}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Healthy Devices: {Number(fleet.healthy)}
                            <br/>
                            Disabled Devices: {Number(fleet.disabled)}
                            <br/>
                            Unregistered Devices: {Number(fleet.unregistered)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
