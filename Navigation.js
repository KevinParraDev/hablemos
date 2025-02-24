import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TranslatorLSCEsp from './screens/TranslatorLSCEsp';
import { NavigationContainer } from '@react-navigation/native';
import TranslatorEspLSC from './screens/TranslatorEspLSC';
import Dictionary from './screens/DictionaryScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from '@rneui/themed';
import { FavoritesProvider } from './screens/context/FavoritesContext';
import {CopilotProvider}  from 'react-native-copilot';

const StackNavigator = createNativeStackNavigator();

function Navigation(){
    return (
        <CopilotProvider 
            tooltipStyle={styles.toolTutorial}  
            labels={{
            previous: "Atrás",  
            next: "Siguiente",   
            skip: "Saltar",      
            finish: "Finalizar"  
            }}
            verticalOffset={39}  
        >
            <FavoritesProvider>
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
                        options={({navigation}) => ({
                        
                            title: 'Favoritos',
                            headerStyle: styles.dictionaryHeader,
                            headerTitleStyle: styles.headerTitle,
                            headerTitleAlign: 'center',
                            headerBackVisible: true,
                            shouldShowHintSearchIcon: true,
                        })}
                    />
                    <StackNavigator.Screen
                        name='Dictionary'
                        component={Dictionary}
                        options={ ({navigation}) => ({
                            title: 'Diccionario',
                            headerStyle: styles.dictionaryHeader,
                            headerTitleStyle: styles.headerTitle,
                            headerTitleAlign: 'center',
                            headerBackVisible: false, style: styles.backButton,
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
            </FavoritesProvider>
        </CopilotProvider>
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
    },
    toolTutorial: {
        borderRadius: 10,
    }
});

export default Navigation;