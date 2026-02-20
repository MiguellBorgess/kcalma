import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Context } from "@/context/AuthContext";
import { Mail, User } from "lucide-react";
import { useContext } from "react";

export function ProfilePage() {
    const user = useContext(Context)?.user

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-linear-to-br from-[#4CAF50] to-[#45a049] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User size={48} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User size={20} className="text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Nome</p>
                            <p className="font-medium text-gray-800">{user?.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={20} className="text-gray-500" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-800">{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}