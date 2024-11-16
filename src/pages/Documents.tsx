import React from 'react';
import { FileText, MoreVertical, Search } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Q4 Financial Report.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedAt: '2024-03-15',
    status: 'Processed',
  },
  {
    id: 2,
    name: 'Product Roadmap.pptx',
    type: 'PPT',
    size: '4.1 MB',
    uploadedAt: '2024-03-14',
    status: 'Processing',
  },
  {
    id: 3,
    name: 'Customer Survey.csv',
    type: 'CSV',
    size: '1.8 MB',
    uploadedAt: '2024-03-13',
    status: 'Processed',
  },
];

const Documents = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select className="border border-gray-300 rounded-md px-4 py-2">
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="ppt">PPT</option>
            <option value="csv">CSV</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.uploadedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.status === 'Processed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documents;