import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TranslatorLSCEsp from './screens/TranslatorLSCEsp';
import { NavigationContainer } from '@react-navigation/native';
import TranslatorEspLSC from './screens/TranslatorEspLSC';
import Dictionary from './screens/DictionaryScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from '@rneui/themed';

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
                name='Favorite'
                component={FavoriteScreen}
                options={{
                    headerShown: false
                }}
            />
            <StackNavigator.Screen
                name='Dictionary'
                component={Dictionary}
                options={ ({navigation}) => ({
                    title: 'Diccionario',
                    headerStyle: styles.dictionaryHeader,
                    headerTitleStyle: styles.headerTitle,
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                    shouldShowHintSearchIcon: true,
                    headerLeft: () =>
                        <TouchableOpacity 
                            style={styles.favoriteIcon}
                            onPress={() => navigation.navigate('Favorite')}
                        >
                            <Icon 
                                name= 'favorite'
                                type='material-icons'
                                color='#b247c1'
                            />  
                        </TouchableOpacity>
                })}
            />
            </StackNavigator.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    dictionaryHeader:{
        backgroundColor: '#ffdbde'
    },
    headerTitle: {
        color: '#350066',
        fontSize: 20,
        fontWeight: 'bold'
    },
    favoriteIcon: {
        display: 'flex'
    }
});

export default Navigation;