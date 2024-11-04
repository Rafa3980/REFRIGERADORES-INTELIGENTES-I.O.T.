export function idbClient(callback: any) {
  let request = indexedDB.open('formulariosDB', 1)
  request.onerror = console.error
  request.onsuccess = () => {
    let db = request.result
    callback(getStore(db))
  }

  request.onupgradeneeded = () => {
    let db = request.result
    db.createObjectStore('formularios', { autoIncrement: true })
    // callback(getStore(db))
  }

  function getStore(db: any) {
    let transaction = db.transaction(['formularios'], 'readwrite')
    let store = transaction.objectStore('formularios')
    return store
  }
}

export function idbClientFormUpdate(callback: any) {
  let request = indexedDB.open('formulario_update', 1)
  request.onerror = console.error
  request.onsuccess = () => {
    let db = request.result
    callback(getStore(db))
  }

  request.onupgradeneeded = () => {
    let db = request.result
    db.createObjectStore('formulario', { autoIncrement: true })
    // callback(getStore(db))
  }

  function getStore(db: any) {
    let transaction = db.transaction(['formulario'], 'readwrite')
    let store = transaction.objectStore('formulario')
    return store
  }
}
