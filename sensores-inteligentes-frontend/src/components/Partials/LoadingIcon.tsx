import React from 'react'
import Lottie from 'lottie-react'
import file from '../../../public/lotties/98742-loading.json'

const LoadingIcon = () => (
  <div className="mb-20">
    <Lottie animationData={file} loop={true} />
  </div>
)

export default LoadingIcon
