import { Card, CardContent, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import quizContract from '../abis/quiz.json';
import { CONTRACT_ADDRESS, formatAccount, formatBalance } from '../utils';

const AccountCard = () => {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      try {
        const contract = await new library.eth.Contract(quizContract, CONTRACT_ADDRESS);
        return contract;
      } catch (error) {
        return null;
      }
    };

    const fn = async () => {
      try {
        const contract = await loadContract();

        const [balance, name] = await Promise.all([
          contract.methods.balanceOf(account).call(),
          contract.methods.name().call(),
        ]);

        setBalance(balance);
        setName(name);
      } catch (error) {
        return null;
      }
    };
    fn();
  }, [account, library.eth.Contract]);

  return (
    <Card>
      <CardContent>
        <Typography variant="caption">{formatAccount(account)}</Typography>
        <Typography>
          Balance: {balance} {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
