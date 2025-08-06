import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'

const modelPhotos = [
  { id: 1, src: '/models/model1.jpg', alt: 'Model 1', bodyType: 'Pear' },
  { id: 2, src: '/models/model2.jpg', alt: 'Model 2', bodyType: 'Apple' },
  { id: 3, src: '/models/model3.jpg', alt: 'Model 3', bodyType: 'Rectangle' },
  { id: 4, src: '/models/model4.jpg', alt: 'Model 4', bodyType: 'Hourglass' }
]

export default function PhotoUpload() {
  const router = useRouter()
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [uploadedPhoto, setUploadedPhoto] = useState(null)
  const [photoType, setPhotoType] = useState('upload') // 'upload' or 'model'

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target.result)
        setPhotoType('upload')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleModelSelect = (model) => {
    setSelectedPhoto(model)
    setPhotoType('model')
  }

  const handleContinue = () => {
    if (photoType === 'upload' && uploadedPhoto) {
      localStorage.setItem('userPhoto', uploadedPhoto)
    } else if (photoType === 'model' && selectedPhoto) {
      localStorage.setItem('selectedModel', JSON.stringify(selectedPhoto))
    }
    router.push('/measurement')
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Let's Get Started
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Upload your photo or choose a model to begin your style journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upload Your Photo */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6 text-center">Upload Your Photo</h2>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center mb-6">
                {uploadedPhoto ? (
                  <div>
                    <img 
                      src={uploadedPhoto} 
                      alt="Uploaded" 
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                    <p className="text-green-600 font-medium">Photo uploaded successfully!</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📸</div>
                    <h3 className="text-lg font-semibold mb-2">Upload Your Photo</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Take a full-body photo in good lighting
                    </p>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload" 
                  className="btn-primary cursor-pointer inline-block"
                >
                  Choose Photo
                </label>
              </div>
            </div>

            {/* Choose Model */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6 text-center">Or Choose a Model</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {modelPhotos.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhoto?.id === model.id
                        ? 'border-primary ring-2 ring-primary ring-opacity-50'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="bg-gray-200 dark:bg-gray-700 h-32 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="p-3 text-center">
                      <p className="font-medium">{model.bodyType} Shape</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Model {model.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleContinue}
              disabled={!uploadedPhoto && !selectedPhoto}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-colors ${
                uploadedPhoto || selectedPhoto
                  ? 'bg-primary hover:bg-purple-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Measurements
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}