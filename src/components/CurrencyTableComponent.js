import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    "& > *": {
      color: theme.palette.secondary.light,
      fontWeight: "bold",
    },
  },
  tableCell: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center"
  },
}));

const CurrencyTableComponent = ({ currentCurrency = [] }) => {
  const classes = useStyles();

  return (
    <div>
      <h1>Garanti Bankası Döviz Kurları</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell>Döviz Cinsi</TableCell>
              <TableCell>Banka Alış</TableCell>
              <TableCell>Banka Satış</TableCell>
              <TableCell>Değişim</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCurrency.map((item) => (
              <TableRow key={item.currCode}>
                <TableCell>{item.currCode}</TableCell>
                <TableCell>{item.exchBuyRate.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</TableCell>
                <TableCell>{item.exchSellRate.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</TableCell>
                <TableCell>
                  <div className={classes.tableCell} style={item.changeRatio < 0 ? { color: "red" } : { color: "green" }}>
                    {item.changeRatio < 0 ? (
                      <ArrowDropDown fontSize="large" color="error" />
                    ) : (
                      <ArrowDropUp fontSize="large" color="success" />
                    )}
                    %{item.changeRatio}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CurrencyTableComponent;
