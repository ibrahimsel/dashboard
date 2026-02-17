//
//  Copyright (c) 2022 Composiv.ai, Eteration A.S. and others
//
// All rights reserved. This program and the accompanying materials
// are made available under the terms of the Eclipse Public License v2.0
// and Eclipse Distribution License v1.0 which accompany this distribution.
//
// The Eclipse Public License is available at
//    http://www.eclipse.org/legal/epl-v10.html
//    and the Eclipse Distribution License is available at
//    http://www.eclipse.org/org/documents/edl-v10.php.
//
// Contributors:
//    Composiv.ai, Eteration A.S. - initial API and implementation
//
//
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { AppLayout } from './components/AppLayout';
import { AppRoutes } from './containers/routes';
import { Connector } from 'mqtt-react-hooks';
import { ConfigProvider, useConfig } from './config';

const queryClient = new QueryClient()

function MqttApp() {
  const config = useConfig()
  return (
    <Connector brokerUrl={config.mqtt_broker_url} options={{ protocolVersion: 5 }}>
      <Router>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </Connector>
  )
}

export default function App() {
  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <MqttApp />
      </QueryClientProvider>
    </ConfigProvider>
  )
}
