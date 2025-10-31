import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs>

        <Tabs.Screen
            name="index"
            options={{
                title: 'ASL',
              headerShown: false,
            }}
        />
        <Tabs.Screen
            name="about"
            options={{
                title: 'About',
              headerShown: false,
            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'Settings',
              headerShown: false,
            }}
        />
  
        
    </Tabs>
  )
}

export default _layout