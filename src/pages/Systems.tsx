import { systems } from '../data/modules';

export default function Systems() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6">Systèmes de l'Avion</h1>
        
        <div className="grid gap-8">
          {systems.map((system) => (
            <div key={system.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-4">{system.name}</h3>
                <p className="text-gray-600 mb-4">{system.description}</p>
                
                <h4 className="text-lg font-medium text-gray-800 mb-2">Composants</h4>
                <div className="grid gap-4">
                  {system.components.map((component, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-gray-900">{component.name}</h5>
                      <p className="text-sm text-gray-600">{component.description}</p>
                      {component.location && (
                        <p className="text-sm text-gray-500 mt-1">
                          Emplacement: {component.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}