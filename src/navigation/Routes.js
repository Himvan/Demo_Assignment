import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from 'Demo/src/screens/Splash';
import Listing from 'Demo/src/screens/Listing';

const OnBoardingStack = createStackNavigator();

const MyStack = () => {
  return (
    <OnBoardingStack.Navigator>
      <OnBoardingStack.Screen
        name="splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <OnBoardingStack.Screen
        name="listing"
        component={Listing}
        options={{
          headerShown: false,
        }}
      />
    </OnBoardingStack.Navigator>
  );
};

const Routes = MyStack;

export default Routes;
