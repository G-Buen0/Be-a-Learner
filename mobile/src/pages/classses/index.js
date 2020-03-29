import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity, PickerIOSItem } from 'react-native'
import api from '../../services/api'
import logoimg from '../../assets/logo.png'

import styles from './styles'
export default function Classes(){
    const navigation =  useNavigation()
    const [classes, setClasses] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(Class) {
        navigation.navigate('Detail', { Class })

    }

    async function loadClasses() {

        if (loading){
            return
        }

        if (total > 0 && classes.length == total) {
            return
        }

        setLoading(true)
        const response = await api.get('classes', {
            params: { page }
        })

        setClasses([... classes, ... response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }
    useEffect(() => {
        loadClasses()
    }, [])


    return (
        <View  style={styles.container}> 
            <View style={styles.header}>
                <Image source={logoimg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} aulas</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha uma aula e seja um aprendiz.</Text>

            <FlatList 
                style={styles.classList}
                data={classes}
                keyExtractor={Class => String(Class.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadClasses}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => (
                    <View style={styles.class}>
                    <Text style={styles.classProperty}>INSTITUIÇÃO:</Text>
                    <Text style={styles.classValue}>{item.name}</Text>

                    <Text style={styles.classProperty}>AULA:</Text>
                    <Text style={styles.classValue}>{item.title}</Text>

                    <Text style={styles.classProperty}>VALOR:</Text>
                    <Text style={styles.classValue}>{item.value}</Text>
                
                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(item)}
                    >
                        <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#0069e9" />
                    </TouchableOpacity>
                </View>
                )}
            />

        </View>
    )
}