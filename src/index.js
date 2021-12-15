import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { Web3ReactProvider } from "@web3-react/core";

import { ethers } from "ethers";

import UserLayout from "./layouts/User.js";
import Layout from "./layouts/Layout.js";

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

ReactDOM.render(
  <HashRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Switch>
        <Route path={`/user`} component={UserLayout} />
        <Route path={`/`} component={Layout} />
        <Redirect from={`/`} to="home" />
      </Switch>
    </Web3ReactProvider>
  </HashRouter>,
  document.getElementById("root")
);
