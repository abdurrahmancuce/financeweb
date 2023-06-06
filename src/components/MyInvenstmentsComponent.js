import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, DeleteForever } from '@mui/icons-material'

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
  bold: {
    fontWeight: "bold"
  },
  keyColor: {
    color: theme.palette.primary.light
  }
}));

const MyInvenstmentsComponent = ({ myInvenstments = [], currentCurrency = [], removeInvenstment }) => {
  const classes = useStyles();

  const getGroupInvenstments = () => {
    const groupedData = {};

    myInvenstments.forEach(item => {
      const { currCode, piece } = item;

      // Eğer currCode daha önce gruplanmamışsa, yeni bir grup oluşturulur
      if (!groupedData[currCode]) {
        groupedData[currCode] = {
          currCode,
          totalPiece: piece,
        };
      } else {
        // Eğer currCode zaten gruplanmışsa, piece değeri toplam değere eklenir
        groupedData[currCode].totalPiece += piece;
      }
    });

    return Object.values(groupedData)
  }

  const getCurrCodeLogo = (currCode) => {
    if (currCode === "USD/TL") return "$"
    if (currCode === "EUR/TL") return "€"
    if (currCode === "ALT/TL") return "gr"
  }

  const calculateChangeRatio = (item) => {
    if (currentCurrency.length === 0 || myInvenstments.length === 0) return 0
    const buyRate = getBuyRateByCurrCode(item.currCode)
    const totalCost = (item.piece * item.sellRate) + item.cost
    const currentValue = item.piece * buyRate
    return parseFloat((currentValue - totalCost).toFixed(3))
  }

  const getTotalChangeRatio = () => {
    let totalChangeRatio = 0
    myInvenstments.map((el) => {
      return totalChangeRatio += calculateChangeRatio(el)
    })
    return parseFloat(totalChangeRatio.toFixed(3))
  }

  const getTotalInvenstments = () => {
    let totalInvenstments = 0, buyRate
    myInvenstments.map((el) => {
      buyRate = getBuyRateByCurrCode(el.currCode)
      return totalInvenstments += el.piece * buyRate
    })
    return parseFloat(totalInvenstments.toFixed(3))
  }

  const getBuyRateByCurrCode = (currCode) => {
    const item = currentCurrency.filter((el) => el.currCode === currCode)[0]

    return item?.exchBuyRate
  }

  if (myInvenstments.length > 0) {
    return (
      <>
        <h1>Yatırımlarım</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell>Döviz Cinsi</TableCell>
                <TableCell>Adet</TableCell>
                <TableCell>Alış Fiyatı</TableCell>
                <TableCell>Masraf</TableCell>
                <TableCell>Alış Tarihi</TableCell>
                <TableCell>Kar/Zarar</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myInvenstments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.currCode}</TableCell>
                  <TableCell>{item.piece}</TableCell>
                  <TableCell>{item.sellRate.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</TableCell>
                  <TableCell>{item.cost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <div className={classes.tableCell} style={calculateChangeRatio(item) < 0 ? { color: "red" } : { color: "green" }}>
                      {calculateChangeRatio(item) < 0 ? (
                        <ArrowDropDown fontSize="large" color="error" />
                      ) : (
                        <ArrowDropUp fontSize="large" color="success" />
                      )}
                      {calculateChangeRatio(item).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DeleteForever style={{ cursor: "pointer" }} fontSize="medium" color="error" onClick={() => { removeInvenstment(item) }} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={2 + getGroupInvenstments().length} />
                <TableCell className={`${classes.bold} ${classes.keyColor}`} align="right" colSpan={4}>Toplam Kar/Zarar:</TableCell>
                <TableCell className={classes.bold} align="right">
                  <div className={classes.tableCell}>
                    {getTotalChangeRatio() < 0 ? (
                      <ArrowDropDown fontSize="large" color="error" />
                    ) : (
                      <ArrowDropUp fontSize="large" color="success" />
                    )}
                    {getTotalChangeRatio().toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`${classes.bold} ${classes.keyColor}`} align="right" colSpan={4}>Toplam Yatırım:</TableCell>
                <TableCell className={classes.bold} align="left">
                  {getTotalInvenstments().toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </TableCell>
              </TableRow>
              {getGroupInvenstments().map((item, index) => (
                <TableRow key={index}>
                  <TableCell className={`${classes.bold} ${classes.keyColor}`} align="right" colSpan={4}>Toplam {item.currCode}:</TableCell>
                  <TableCell className={classes.bold} align="left">
                    {item.totalPiece} {getCurrCodeLogo(item.currCode)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  } else {
    return (
      <>
        <h1>Yatırımlarım</h1>
        <h5 className={classes.keyColor}>Henüz bir yatırımınız yok! Sağ üstte bulunan buton ile yeni bir yatırım ekleyebilirsiniz...</h5>
      </>
    )
  }


};

export default MyInvenstmentsComponent;
