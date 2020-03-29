import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const AppStack = createStackNavigator()

import Classes from './pages/classses'
import Detail from './pages/Detail'

export default function Routes() {
    return (
        <NavigationContainer >

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Class" component={Classes}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>

        </NavigationContainer>
    )
}