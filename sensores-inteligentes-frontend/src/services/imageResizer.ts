import Resizer from 'react-image-file-resizer'

export const imageResizer = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      900,
      900,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'base64'
    )
  })
