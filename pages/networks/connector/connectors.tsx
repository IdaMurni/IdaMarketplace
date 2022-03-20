import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const INFURA_ID: string = 'bab89c57aa7f40f6860f59e271d12349';
const injected: InjectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 80001]
});

const walletconnect: WalletConnectConnector = new WalletConnectConnector({
  rpc: `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink: WalletLinkConnector = new WalletLinkConnector({
  url: `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`,
  appName: "web3-react-demo"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
