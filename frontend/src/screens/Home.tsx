import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { getAsyncItem } from '../services/async-storage.service'
import Admin from './Admin'

const Home = ({ navigation }): JSX.Element => {
  const [role, setRole] = useState('')

  useEffect(() => {
    getRole()
  }, [])

  const getRole = async () => {
    const userRole = await getAsyncItem('role')
    setRole(userRole!)
  }

  // useEffect(() => {
  //     if (cookies.loginCookie !== '') {
  //         axios.get(
  //             "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
  //                 headers: {
  //                     Accept: "application/json",
  //                     "Content-Type": "application/json",
  //                     Authorization: "Bearer " + cookies.loginCookie,
  //                 },
  //             }).then((response: any) => {
  //             // console.log(response)
  //         })
  //             .catch((error: { message: any; }) => {
  //                 console.log("error", error.message);
  //                 removeCookie('loginCookie');
  //             });
  //     }
  // }, [])

  return (
    <>
      {role === 'admin' ? (
        <Admin />
      ) : (
        <View>
          <Text>you're logged in!</Text>
          {/* <Button onPress={() => logOut()} title={'logOut'}/>
            <Button onPress={() => navigation.navigate('Landingpage')} title={'go back to landingPage'}/> */}
        </View>
      )}
    </>
  )
}
export default Home
