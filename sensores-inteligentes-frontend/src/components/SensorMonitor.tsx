import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

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
