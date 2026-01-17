import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    return (
        <View style={[ globalTheme.globalMargin, { paddingTop: top + 10 } ]}>
            <TextInput
                placeholder='Search Pokemon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={value => console.log(value)}
                value={'Hello world'}
            />

            <ActivityIndicator style={{ paddingTop: 25 }} />

            <FlatList
                data={ [] as Pokemon[] }
                keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}` }
                numColumns={2}
                style={{paddingTop: top + 20}}
                renderItem={({item}) => <PokemonCard pokemon={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}