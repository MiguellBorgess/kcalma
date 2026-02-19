import { CalendarIcon } from "lucide-react";

export function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-green-100 p-8 rounded-full mb-6">
          <CalendarIcon size={64} className="text-[#4CAF50]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Calendário
        </h2>
        <p className="text-gray-600 max-w-md">
          Esta funcionalidade será implementada em breve. Aqui você poderá visualizar seu histórico de consumo calórico.
        </p>
      </div>
    </div>
  )
}
