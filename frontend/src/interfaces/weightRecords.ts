export interface WeightRecordData {
    weightId: number
    pesoKg: number
    createdAt: string
}

export interface AddWeightData {
    pesoKg: number
}

export interface DeleteWeightData {
    id: number
}