import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { WhackAMole } from "./WhackAMole";
import { ErrorBoundary } from "./ErrorBoundary";

const StackNavigator = stackNavigatorFactory();

const WhackAMoleScreen = () => (
    <ErrorBoundary>
        <WhackAMole />
    </ErrorBoundary>
);

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="WhackAMole"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9333ea",
                },
                headerTintColor: "#ffffff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="WhackAMole"
                component={WhackAMoleScreen}
                options={{
                    title: "Whack-a-Mole"
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);