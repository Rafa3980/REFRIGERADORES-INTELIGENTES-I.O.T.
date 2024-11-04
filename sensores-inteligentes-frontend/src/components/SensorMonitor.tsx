import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBXDyn_OUk3Q8C4efUKWXZzCc_e_3f7Iw4',
  authDomain: 'sensores-refrigeradores.firebaseapp.com',
  databaseURL: 'https://sensores-refrigeradores-default-rtdb.firebaseio.com',
  projectId: 'sensores-refrigeradores',
  storageBucket: 'sensores-refrigeradores.appspot.com',
  messagingSenderId: '76178323841',
  appId: '1:76178323841:web:7470185be1cd9c4af8d080',
  measurementId: 'G-35D20V0VVM',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const SensorMonitor = () => {
    const [sensores, setSensores] = useState({});
  
    useEffect(() => {
      const sensoresRef = ref(database, 'lab-test/');
  
      const unsubscribe = onValue(sensoresRef, (snapshot) => {
        const dados = snapshot.val();
        console.log('Dados recebidos do Firebase:', dados);
  
        setSensores(dados || {});
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div>
        <div id="dados-sensor">
          {Object.keys(sensores).length > 0 ? (
            Object.entries(sensores).map(([key, valor]) => {
              // Obter todos os valores de temperatura
              const temperaturas = Object.values(valor); // Extrai os valores (temperaturas)
              const ultimaTemperatura =
                temperaturas.length > 0
                  ? temperaturas[temperaturas.length - 1] // Pega a última temperatura
                  : 'N/A';
  
              return (
                <div key={key} className="hover:bg-zinc-700 duration-500 cursor-pointer w-full text-white rounded mb-3 p-4 border-b border-b-white flex flex-row justify-between items-center">
                  <p className="text-2xl font-thin">{`${key}`}</p>
                  <p className="text-2xl font-thin">Temperatura Atual: {ultimaTemperatura} °C</p>
                </div>
              );
            })
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </div>
    );
  };
  
  export default SensorMonitor;
