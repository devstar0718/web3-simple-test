import "./App.css";
import { useState, useEffect } from "react";
import ABI from "./ghsp.json";
import { GHSP_ADDRESS } from "./constant";
import Web3 from "web3";

function App() {
  const [currentAccount, setCurrentAccount] = useState("Connect Wallet");
  let web3 = null;

  const connectWalletHandler = async () => {
    let web3Provider = Web3.givenProvider;
    web3 = new Web3(web3Provider);

    let act;
    await web3.eth
      .getAccounts(function (error, accounts) {
        if (error) {
          console.log(error);
        }
      })
      .then((accounts) => {
        act = accounts[0];
      });

    setCurrentAccount(act);

    const token = new web3.eth.Contract(ABI, GHSP_ADDRESS);
    let balance = await token.methods.balanceOf(act).call(function (err, res) {
      if (err) {
        console.log(err);
        return;
      }
      return res;
    });

    setCurrentAccount(act + " - " + web3.utils.fromWei(balance));
  };

  return (
    <div className="main-app">
      <h1>Web3 Test</h1>
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        {currentAccount}
      </button>
    </div>
  );
}

export default App;
