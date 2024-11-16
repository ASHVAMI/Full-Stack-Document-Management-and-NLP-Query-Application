import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, File, X } from 'lucide-react';

const Upload = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploading, setUploading] = React.useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/csv': ['.csv'],
    },
  });

  const removeFile = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleUpload = async () => {
    setUploading(true);
    // TODO: Implement actual file upload logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploading(false);
    setFiles([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Documents</h1>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, PPT, PPTX, CSV
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Files</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(file.size / 1024)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                uploading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;