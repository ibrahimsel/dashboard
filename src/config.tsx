//
//  Copyright (c) 2025 Composiv.ai, Eteration A.S. and others
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

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Spinner } from '@patternfly/react-core'

export interface MutoConfig {
  mqtt_broker_url: string
  ditto_api_base: string
  device_definitions: string[]
  stack_definitions: string[]
}

const DEFAULT_CONFIG: MutoConfig = {
  mqtt_broker_url: 'wss://sandbox.composiv.ai:443/ws',
  ditto_api_base: '/api/2',
  device_definitions: ['org.eclipse.muto:EdgeDevice:0.0.1'],
  stack_definitions: ['org.eclipse.muto:Stack:0.0.1'],
}

const ConfigContext = createContext<MutoConfig>(DEFAULT_CONFIG)

export const useConfig = () => useContext(ConfigContext)

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<MutoConfig | null>(null)

  useEffect(() => {
    fetch('/config.json')
      .then((res) => res.json())
      .then((data) => setConfig({ ...DEFAULT_CONFIG, ...data }))
      .catch(() => {
        console.warn('Failed to load /config.json, using defaults')
        setConfig(DEFAULT_CONFIG)
      })
  }, [])

  if (!config) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner isSVG size="xl" aria-label="Loading configuration" />
      </div>
    )
  }

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
