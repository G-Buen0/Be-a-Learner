import React from 'react'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'


import styles from './styles'
import logoimg from '../../assets/logo.png'

export default function Detail(){
    const navigation = useNavigation()
    const route = useRoute()

    const Class = route.params.Class
    const message = `Olá, ${Class.name}. Tenho interesse em participar da aula de "${Class.title}".`


    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Learner: ${Class.title}`,
            recipients: [Class.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${Class.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoimg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#0069e9" />
                </TouchableOpacity>
            </View>

            <View style={styles.class}>
                <Text style={[styles.classProperty, { marginTop: 0 }]}>INSTITUIÇÃO:</Text>
                <Text style={styles.classValue}>{Class.name}. {Class.city}/{Class.uf}</Text>

                <Text style={styles.classProperty}>AULA:</Text>
                <Text style={styles.classValue}>{Class.title}</Text>

                <Text style={styles.classProperty}>VALOR:</Text>
                <Text style={styles.classValue}>{Class.value}</Text>
            
            </View>
                
            <View style={styles.contactBox}>
                <Text style={styles.learnerTitle}>Estude!</Text>
                <Text style={styles.learnerTitle}>Seja um aprendiz!</Text>

                <Text style={styles.learnerDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
          
}