import React, { useState, createRef } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "../components/Configurator/Configurator";
import Footer from "../components/Footer/Footer.js";
// Layout components
import Navbar from "../components/Navbars/Navbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
// Custom Chakra theme
import theme from "../theme/theme.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";

import Home from "../views/Home/Home.js";
import Dashboard from "../views/Dashboard/Dashboard.js";
import Claim from "../views/Claim/Claim.js";
import Market from "../views/Market/Market.js";
import Vote from "../views/Vote/Vote.js";

export default function Layout(props) {
  const { ...rest } = props;
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = createRef();
  // functions for changing the states from components

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        logoText={"DIABOLO"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <Navbar
            onOpen={onOpen}
            logoText={"DIABOLO"}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        <PanelContent>
          <PanelContainer>
            <Switch>
              <Route path="/home" component={Home} key="0" />
              <Route path="/dashboard" component={Dashboard} key="1" />
              <Route path="/claim" component={Claim} key="2" />
              <Route path="/vote" component={Vote} key="3" />
              {/*<Route path="/market" component={Market} key="4" />*/}
              <Redirect from="/" to="/home" />
            </Switch>
          </PanelContainer>
        </PanelContent>
        <Footer />
        <Portal>
          <FixedPlugin fixed={fixed} onOpen={onOpen} />
        </Portal>
        <Configurator
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </ChakraProvider>
  );
}
