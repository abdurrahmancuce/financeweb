import { useEffect, useState } from 'react';
import logo from '../logo.png';
import '../App.css';
import CurrencyTableComponent from './CurrencyTableComponent';
import MyInvenstmentsComponent from './MyInvenstmentsComponent';
import AddInvenstmentComponent from './AddInvenstmentComponent';
import { Paper, styled } from '@material-ui/core';
import { Stack } from '@mui/material';
import { addInvenstmentToFirebase, getAllInvenstmentsFromFirebase, removeInvenstmentFromFirebase } from '../firebase';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.secondary.main,
}));

function ContainerComponent() {
    const [currentCurrency, setCurrentCurrency] = useState([])
    const [myInvenstments, setMyInvenstments] = useState([])
    const codeFilter = ['USD/TL', 'EUR/TL', 'ALT/TL']

    useEffect(() => {
        fetch("https://customers.garantibbva.com.tr/internet/digitalpublic/currency-convertor-public/v1/currency-convertor/currency-list-detail", {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "authorization": "",
                "channel": "Public",
                "client-id": "DslahJXaDW59ibNZppCm",
                "client-session-id": "b6f2-3ffc-3721-4ba3-ab5a",
                "client-type": "ArkClient",
                "content-type": "application/json",
                "dialect": "TR",
                "guid": "b5c2a44b1f7c42d597484b58ef1a7936",
                "ip": "127.0.0.1",
                "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "state": "",
                "tenant-app-id": "",
                "tenant-company-id": "GAR",
                "tenant-geolocation": "TUR",
                "x-client-trace-id": "b5c2a44b1f7c42d597484b58ef1a7936"
            },
            "referrer": "https://webforms.garantibbva.com.tr/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        }).then(response => response.json()).then((data) => {
            data = data.filter((el) => codeFilter.includes(el.currCode))
            setCurrentCurrency(data)
        })
        
        getAllInvenstments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAllInvenstments = async () => {
        const allInvenstment = await getAllInvenstmentsFromFirebase()
        setMyInvenstments(allInvenstment)
    };

    const addInvenstment = async (newInvenstment) => {
        await addInvenstmentToFirebase(newInvenstment)
        getAllInvenstments()
    }

    const removeInvenstment = async (invenstment) => {
        await removeInvenstmentFromFirebase(invenstment?.id)
        getAllInvenstments()
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Stack spacing={2}>
                <Item>
                    <CurrencyTableComponent currentCurrency={currentCurrency} />
                </Item>
                <Item style={{ position: "relative" }}>
                    <AddInvenstmentComponent addInvenstment={addInvenstment} />
                    <MyInvenstmentsComponent myInvenstments={myInvenstments} currentCurrency={currentCurrency} removeInvenstment={removeInvenstment} />
                </Item>
            </Stack>
        </div>
    );
}

export default ContainerComponent;
