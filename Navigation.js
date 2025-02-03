import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TranslatorLSCEsp from './screens/TranslatorLSCEsp';
import { NavigationContainer } from '@react-navigation/native';
import TranslatorEspLSC from './screens/TranslatorEspLSC';
import Dictionary from './screens/DictionaryScreen';

const StackNavigator = createNativeStackNavigator();

function Navigation(){
    return (
        <NavigationContainer>
            <StackNavigator.Navigator
            initialRouteName='Home'
        >
            <StackNavigator.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <StackNavigator.Screen
                name='TranslatorLSCEsp'
                component={TranslatorLSCEsp}
                options={{
                    headerShown: false
                }}
            />
            <StackNavigator.Screen
                name='TranslatorEspLSC'
                component={TranslatorEspLSC}
                options={{
                    headerShown: false
                }}
            />
            <StackNavigator.Screen
                name='Dictionary'
                component={Dictionary}
                options={{
                    headerShown: false
                }}
            />
        </StackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;