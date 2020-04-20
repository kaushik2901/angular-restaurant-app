export interface Food {
    _id: string,
    name: string,
    category: string,
    url: string,
    description: string,
    varients: FoodVarients[],
    addOns: AddOns[],
    basePrice: string | number,
}

export interface FoodVarients {
    _id: string,
    name: string,
    description: string,
    addedPrice: string | number,
}

export interface AddOns {
    _id: string,
    name: string,
    description: string,
    addedPrice: string | number,
}