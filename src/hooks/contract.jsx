import { useWeb3React } from "@web3-react/core";
import { createContext, useState, useEffect, useCallback } from "react";
import quizContract from '../abis/quiz.json'
import { CONTRACT_ADDRESS } from "../utils/constants";

export const contractContext = createContext();

const ContractProvider = ({children}) => {
const {library} = useWeb3React();
const [contract, setContract] = useState(undefined);

  const loadContract = useCallback(() => {
    const fn = async () => {
      try {
        const sContract = await new library.eth.Contract(quizContract, CONTRACT_ADDRESS);
         setContract(sContract);
      } catch (error) {
        return null;
      }
    };
    fn();
  },[library]);

  useEffect(() => {
    console.log('holi')
      loadContract();
  }, [loadContract])

  // console.log(contract)

	return (
		<contractContext.Provider value={{ contract }}>
			{ children }
		</contractContext.Provider>
	);

}

export default ContractProvider;