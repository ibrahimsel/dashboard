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
import React from 'react';

import { Gallery, PageSection } from '@patternfly/react-core';

import RemoteComponent from '@eclipse-muto/liveui-react';

const VehicleSummary = props => <RemoteComponent form={{ component: "VehicleSummary", from: "dashboard-device" }} {...props} />
const StackSummary = props => <RemoteComponent form={{ component: "StackSummary", from: "dashboard-stack" }} {...props} />

const Home: React.FunctionComponent = () => {

  return (
    <PageSection>
      <div className="muto-home-welcome">
        <h1>Dashboard</h1>
        <p>Monitor and manage your vehicles and stacks.</p>
      </div>
      <Gallery hasGutter style={{ '--pf-l-gallery--GridTemplateColumns--min': '320px' } as any}>
        <VehicleSummary />
        <StackSummary />
      </Gallery>
    </PageSection>
  );
}

export default Home;