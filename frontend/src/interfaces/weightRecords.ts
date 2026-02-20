export interface WeightRecordData {
    id: number
    pesoKg: number
    createdAt: string
}

export interface AddWeightData {
    pesoKg: number
}

export interface DeleteWeightData {
    id: number
}