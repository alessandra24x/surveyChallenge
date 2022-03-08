import { useWeb3React } from '@web3-react/core';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import quizContract from '../abis/quiz.json';
import { CONTRACT_ADDRESS } from '../utils/constants';

const ContractContext = createContext();

const ContractProvider = ({ children }) => {
  const { library } = useWeb3React();
  const [contract, setContract] = useState({ contract: undefined });

  const loadContract = useCallback(() => {
    const fn = async () => {
      try {
        const sContract = await new library.eth.Contract(quizContract, CONTRACT_ADDRESS);
        setContract({ contract: sContract });
      } catch (error) {
        return null;
      }
    };
    fn();
  }, [library]);

  useEffect(() => {
    loadContract();
  }, [loadContract]);

  return <ContractContext.Provider value={contract}>{children}</ContractContext.Provider>;
};

export function useContract() {
  const context = useContext(ContractContext);

  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }

  return context;
}

export default ContractProvider;
