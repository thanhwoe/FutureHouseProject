import axios from 'axios'
import {endpoint} from './apiURL'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authAxios = axios.create({
    baseURL:endpoint,
    headers:{
        Authorization: `Token ${AsyncStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
})