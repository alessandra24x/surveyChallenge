import { Card, CardContent, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import quizContract from "../abis/quiz.json"
import { CONTRACT_ADDRESS, formatAccount, formatBalance } from "../utils";

const BasicCard = () => {
    const { account, library } = useWeb3React();
    const [balance, setBalance] = useState(null);
    const [name, setName] = useState(null)

    
    useEffect( async() => {
        try {
            await loadContract().then(contract => {contract.methods.balanceOf(account).call().then(b => setBalance(formatBalance(b)))});
            await loadContract().then(contract => {contract.methods.name().call().then(n => setName(n))});
        } catch(error) {
            return null
        }
    },[])

    const loadContract = async () => {      
        try {
            const contract = await new library.eth.Contract(quizContract, CONTRACT_ADDRESS);
            return contract;
        } catch (error) {
            return null;
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {formatAccount(account)}
                </Typography>
                <Typography>Balance: {balance} {name}</Typography>
            </CardContent>
        </Card>
    )
}

export default BasicCard;