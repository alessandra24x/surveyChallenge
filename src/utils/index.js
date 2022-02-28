import Web3 from 'web3/';

const web3 = new Web3();

export const CONTRACT_ADDRESS = '0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03';
  
export const formatAccount = (account) => {
	const A = account.slice(0, 4);
	const B = account.slice(account.length-4);
	const formatedAccount = `${A}...${B}`;
	return formatedAccount;
};

export const formatBalance = (balance) => {
	const precision = 100;
	balance = web3.utils.fromWei(balance.toString(), 'ether');
	balance = Math.round(balance * precision) / precision; // redondeado a dos decimales
	return balance;
};

export const configureNetwork = async(web3) => {
	if (web3) {
		try {
			// check if the chain to connect to is installed
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: web3.utils.toHex('3') }], // chainId must be in hexadecimal numbers
			});
			// window.location.reload()
		} catch (error) {
			// This error code indicates that the chain has not been added to MetaMask
			// if it is not, then install it into the user MetaMask
			if (error.code === 4902 || error.code === -32603) {
				try {
					await window.ethereum
						.request({
							method: 'wallet_addEthereumChain',
							params: [
								{
									chainId: web3.utils.toHex('3'),
									chainName: 'ropsten testnet',
									rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
									nativeCurrency: {
										name: 'ETH',
										symbol: 'ETH',
										decimals: 18,
									},
									blockExplorerUrls: ['https://ropsten.etherscan.io'],
								},
							],
						});
				} catch (addError) {
					console.error(addError);
				}
			} else if (error.code === -32002) {
				window.alert('Tiene una transacción pendiente');
			}
			console.error(error);
		}
	}
};
