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

  console.log('contract', contract);
  const methods = contract?.methods ?? undefined;

  useEffect(() => {
    if (!methods?.balanceOf || !methods?.name) {
      console.log("Can't find methods", methods);
      return;
    }

    const fn = async () => {
      try {
        const [balance, name] = await Promise.all([methods.balanceOf(account).call(), methods.name().call()]);

        setBalance(formatBalance(balance));
        setName(name);
      } catch (error) {
        return null;
      }
    };
    fn();
  }, [account, methods, setBalance]);

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
