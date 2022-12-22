import AsyncStorage from "@react-native-async-storage/async-storage";

const storeAnime = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('anime-list', jsonValue)
    } catch (e) {
        alert('Save Failed')
    }
}

const storeManga = async (value: any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('manga-list', jsonValue)
    } catch (e) {
        alert('Save Failed')
    }
}


const getAnime = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('anime-list')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        alert('Load Failed')
    }
}

const getManga = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('manga-list')
        return jsonValue != null ? JSON.parse(jsonValue) :[];
    } catch (e) {
        alert('Load Failed')
    }
}

export {
    storeAnime,
    storeManga,
    getAnime,
    getManga,
};
