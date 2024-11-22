import { cockpitModules } from '../data/modules';

export default function Cockpit() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6">Découverte du Cockpit</h1>
        
        <div className="grid gap-6">
          {cockpitModules.map((module) => (
            <div key={module.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{module.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {module.difficulty}
                    </span>
                    <span className="mt-2 text-sm text-gray-500">{module.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}