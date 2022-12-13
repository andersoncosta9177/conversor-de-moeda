import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import Picker from './src/components/Picker';
import api from './src/services/api';
import { LinearGradient } from 'linear-gradient'

export default function App() {
    const [moedas, setMoedas] = useState([])
    const [loading, setLoading] = useState(true)
    const [moedaSelecionada, setMoedaSelecionada] = useState(null)
    const [moedaBValor, setMoedaBValor] = useState(0)
    const [valorMoeda, setValorMoeda] = useState(null)
    const [valorConvertido, setValorConvertido] = useState(0)



    useEffect(() => {
        async function loadMoedas() {
            const response = await api.get('all')
            let arrayMoedas = []
            Object.keys(response.data).map((key) => {
                arrayMoedas.push({
                    key: key,
                    label: key,
                    value: key
                })
            })

            setMoedas(arrayMoedas)
            setLoading(false)

        }

        loadMoedas()

    }, [])



    async function converter() {

        if(moedaSelecionada === null){
            alert('Selecione uma moeda')
            return
        }else if(moedaBValor === 0){
            alert('Campo valor está vazio')
            return
        }
const response = await api.get(`all/${moedaSelecionada}-BRL`)
let resultado = (response.data[moedaSelecionada].ask * parseFloat(moedaBValor))
setValorConvertido(`R$ ${resultado.toFixed(2)}`)
setValorMoeda(moedaBValor)

Keyboard.dismiss()

    }










    if (loading) {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <ActivityIndicator color="#fff" size={50} />
            </View>
        )
    } else {

        return (
            <View style={styles.container}>

                <View style={styles.areaMoeda}>
                    <Text style={styles.titulo}>Selecione uma moeda</Text>
                    <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionada(moeda)} />
                </View>



                <View style={styles.areaValor}>
                    <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
                    <TextInput onChangeText={(valor) => setMoedaBValor(valor)} keyboardType='numeric' style={styles.input} placeholder="R$: 00.00" placeholderTextColor="#cfcfcf" />
                </View>


                <TouchableOpacity style={styles.botaoArea} onPress={converter}>
                    <Text style={styles.botaoTexto}>Converter</Text>
                </TouchableOpacity>




                {/* view de resultado abaixo */}
                {valorConvertido !== 0 && (
                <View style={styles.areaResultado}>
                    <Text style={styles.valorConvertido}>{valorMoeda} {moedaSelecionada}</Text>
                    <Text style={[styles.valorConvertido, { fontSize: 18, margin: 10 }]}>corresponde á</Text>
                    <Text style={styles.valorConvertido}>{valorConvertido}</Text>

                </View>
                ) }


            </View>
        )

    }






}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor:'#660f56'
    },

    areaMoeda: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#4F4F4F',
        paddingTop: 9,
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        marginBottom: 1

    },

    titulo: {
        fontSize: 17,
        marginLeft: 7,
        color: '#fff',
        paddingTop: 5,
        paddingLeft: 5

    },
    areaValor: {
        width: '90%',
        backgroundColor: '#4F4F4F',
        paddingBottom: 9,
        paddingTop: 9
    },

    input: {
        width: '100%',
        padding: 10,
        fontSize: 20,
        height: 45,
        marginTop: 9,
        color: '#fff',

    },

    botaoArea: {
        width: '90%',
        backgroundColor: '#FFB91D',
        height: 50,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    botaoTexto: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },

    areaResultado: {
        width: '90%',
        backgroundColor: '#FFB91D',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        borderRadius: 10

    },

    valorConvertido: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#fff'

    }
})