import uuid from 'react-native-uuid';


//to get current time
export const getCurrentTimestamp=():string=>{
    return new Date().toISOString()
}


export const getRandomUUID=():string=> {
    return uuid.v4()
}