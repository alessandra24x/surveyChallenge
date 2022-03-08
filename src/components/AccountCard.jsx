import { Card, CardContent, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { useContract } from '../context/contract';
import { formatAccount, formatBalance } from '../utils';

const AccountCard = () => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState(null);

  const { contract } = useContract();

  useEffect(() => {
    const fn = async () => {
      try {
        const [balance, name] = await Promise.all([
          contract.methods.balanceOf(account).call(),
          contract.methods.name().call(),
        ]);

        setBalance(formatBalance(balance));
        setName(name);
      } catch (error) {
        return null;
      }
    };
    fn();
  }, [account, contract, setBalance]);

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
