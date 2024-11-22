import { procedures } from '../data/modules';

export default function Procedures() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold mb-6">Procédures</h1>
        
        <div className="grid gap-8">
          {procedures.map((procedure) => (
            <div key={procedure.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-4">{procedure.title}</h3>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Étapes</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {procedure.steps.map((step, index) => (
                      <li key={index} className="text-gray-600">{step}</li>
                    ))}
                  </ol>
                </div>
                
                {procedure.warnings && (
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-red-800 mb-2">Avertissements</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {procedure.warnings.map((warning, index) => (
                        <li key={index} className="text-red-600">{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}