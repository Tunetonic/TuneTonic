import React, {useContext} from "react";
import {LoginContext} from "../Context";
import Home from "../Components/Home";


// @ts-ignore
const LoginGuard = ({navigation}) => {
    // @ts-ignore
    const {isSignedIn} = useContext(LoginContext);


    if (isSignedIn === false){
        navigation.replace('Login')
    }


return <Home navigation={navigation}/>
}

export default LoginGuard;
