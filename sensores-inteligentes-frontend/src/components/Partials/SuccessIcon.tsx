import React from 'react'
import Lottie from 'lottie-react'
import file from '../../../public/lotties/91001-success.json'

const SuccessIcon = () => (
  <div className="mb-20 w-40" >
    <Lottie animationData={file} loop={false}  />
  </div>
)

export default SuccessIcon
