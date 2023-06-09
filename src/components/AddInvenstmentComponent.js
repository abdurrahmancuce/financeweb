import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, FormControl, InputLabel, MenuItem, Select, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { AddCard } from "@mui/icons-material";


const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "10px"
    },
    input: {
        marginBottom: "16px !important",
        width: "100%",
    },
    addCard: {
        color: theme.palette.primary.main,
        position: "absolute",
        top: 52,
        right: 36,
        cursor: "pointer"
    }
}))

const AddInvenstmentComponent = ({ addInvenstment }) => {
    const classes = useStyles()
    const [date, setDate] = useState(dayjs(new Date()))
    const [openDialog, setOpenDialog] = React.useState(false)


    const [formData, setFormData] = useState({
        currCode: "ALT/TL",
        piece: 0,
        sellRate: 0,
        cost: 0,
        date: ""
    })

    const handleChange = (event) => {
        const { name, value, type } = event.target
        let parsedValue
        if (type === 'number') {
            parsedValue = Number(value)
        } else {
            parsedValue = value
        }
        setFormData({ ...formData, [name]: parsedValue })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newData = { currCode: formData.currCode, piece: formData.piece, sellRate: formData.sellRate, cost: formData.cost, date: date.format('DD.MM.YYYY') }
        addInvenstment(newData)
        setFormData({
            currCode: "ALT/TL",
            piece: 0,
            sellRate: 0,
            cost: 0,
            date: ""
        })
        handleClose()
    }

    const handleClickOpen = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <AddCard className={classes.addCard} fontSize="large" onClick={handleClickOpen} />
            <form onSubmit={handleSubmit}>
                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle>Yeni Yatırım Ekle</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Yeni yatırım eklemek için aşağıdaki bilgilerin tamamını doldurunuz...
                        </DialogContentText>
                        <Box className={classes.inputContainer}>
                            <FormControl className={classes.input}>
                                <InputLabel>Doviz Cinsi</InputLabel>
                                <Select
                                    name="currCode"
                                    value={formData.currCode}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="USD/TL">Dolar</MenuItem>
                                    <MenuItem value="EUR/TL">Euro</MenuItem>
                                    <MenuItem value="ALT/TL">Altın</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                className={classes.input}
                                label="Adet"
                                name="piece"
                                value={formData.piece}
                                type="number"
                                inputProps={{ min: 0, step: "any" }}
                                onChange={handleChange}
                            />
                            <TextField
                                className={classes.input}
                                label="Alış Fiyatı"
                                name="sellRate"
                                value={formData.sellRate}
                                type="number"
                                inputProps={{ min: 0, step: "any" }}
                                onChange={handleChange}
                            />
                            <TextField
                                className={classes.input}
                                label="Masraf"
                                name="cost"
                                value={formData.cost}
                                type="number"
                                inputProps={{ min: 0, step: "any" }}
                                onChange={handleChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className={classes.input}
                                    label="Alış Tarihi"
                                    name="date"
                                    value={date}
                                    format="DD/MM/YYYY"
                                    onChange={(newValue) => setDate(newValue)} />
                            </LocalizationProvider>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Yarırımı Kaydet</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    )
}

export default AddInvenstmentComponent
