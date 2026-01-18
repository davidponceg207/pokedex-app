import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const [term, setTerm] = useState('')

    const { isLoading, data: pokemonNamelist = [] } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonNamesWithId()
    });

    const pokemonNameIdList = useMemo(() => {

        if(!isNaN(Number(term))) {
            const pokemon = pokemonNamelist.find(pokemon => pokemon.id === Number(term));
            return pokemon ? [pokemon] : [];
        }

        if(term.length === 0) return [];

        if(term.length < 3) return [];

        return pokemonNamelist.filter(pokemon => 
            pokemon.name.includes(term.toLocaleLowerCase())
        )

    },[term]);

    const { isLoading: isLoadingPokemons, data: pokemons } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5
    })

    if(isLoading) {
        return (<FullScreenLoader />);
    }

    return (
        <View style={[ globalTheme.globalMargin, { paddingTop: top + 10 } ]}>
            <TextInput
                placeholder='Search Pokemon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term}
            />

            {isLoadingPokemons && <ActivityIndicator style={{ paddingTop: 25 }} />}
            

            <FlatList
                data={ pokemons }
                keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}` }
                numColumns={2}
                style={{paddingTop: top + 20}}
                renderItem={({item}) => <PokemonCard pokemon={item} />}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 130 }} />}
            />
        </View>
    )
}