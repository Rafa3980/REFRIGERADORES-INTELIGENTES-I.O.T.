export function getGeoLocation(reset) {
  if (navigator.geolocation) {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          reset({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        })
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition((position) => {
          reset({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        })
      } else if (result.state === 'denied') {
        console.log('Geolocation permission denied.')
      }
    })
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}
