export class Pet {
    constructor(public id: string,
                public userId: string,
                public petName: string,
                public collarTagDescription: string,
                public petType: string,
                public desexed: string,
                public breed: string,
                public colour: string,
                public age: number,
                public ageUnit: string,
                public size: string,
                public gender: string,
                public microchipped: string,
                public microchipNumber: number,
                public reward: number,
                public date: string,
                public foundLost: string,
                public desc: string,
                public gallery: string[],
                public lat: number,
                public lng: number,
                public location: string) {
    }
}

export class Pagination {
    constructor(public page: number,
                public perPage: number,
                public prePage: number,
                public nextPage: number,
                public total: number,
                public totalPages: number) {
    }
}

