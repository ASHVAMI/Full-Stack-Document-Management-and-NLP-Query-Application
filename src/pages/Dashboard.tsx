import React from 'react';
import { FileText, Users, MessageSquare, Clock } from 'lucide-react';

const stats = [
  { name: 'Total Documents', value: '128', icon: FileText, color: 'bg-blue-500' },
  { name: 'Active Users', value: '12', icon: Users, color: 'bg-green-500' },
  { name: 'Chat Sessions', value: '48', icon: MessageSquare, color: 'bg-purple-500' },
  { name: 'Processing Time', value: '1.2s', icon: Clock, color: 'bg-yellow-500' },
];

const recentDocuments = [
  { id: 1, name: 'Q4 Financial Report.pdf', type: 'PDF', size: '2.4 MB', date: '2024-03-15' },
  { id: 2, name: 'Product Roadmap.pptx', type: 'PPT', size: '4.1 MB', date: '2024-03-14' },
  { id: 3, name: 'Customer Survey.csv', type: 'CSV', size: '1.8 MB', date: '2024-03-13' },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{item.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;