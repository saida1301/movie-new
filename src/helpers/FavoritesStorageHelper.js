import AsyncStorage from '@react-native-async-storage/async-storage';


export const favoritesStorageHelper = {
    set: async (favorites) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
        } catch (e) {
            // saving error
        }
    },
    get: async () => {

        let data = await AsyncStorage.getItem('favorites')
        if (data != null)
            return JSON.parse(data);
        else
            return [];
    }
}


