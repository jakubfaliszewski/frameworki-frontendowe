export interface IPost {
    id: number,
    userId: number
    body: string,
    title: string,
    user?: IUser,
    photo?: IPhoto
}

export interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}

export interface ICompany {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface IPhoto {
    albumId: number,
    id: number,
    thumbnailUrl: string
    title: string
    url: string
}

export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany,
    photo?: IPhoto
}

export interface IUserLocal extends IUser {
    partner: 'Partner' | 'Contractor'
}

export interface IComment {
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string,
    user?: IUser
    post?: IPost
}

export interface IFakeCompany {
    id: number,
    address: string,
    name: string,
    photo?: IPhoto
}

export interface IWorkspace {
    id: number,
    title: string,
    type: string,
    users: number,
    lastUpdate: string,
    background: string
}

export interface IProfile {
    details: {
        expertise: {
            id: string,
            value: string
        }[]
        specialities:  {
            id: string,
            value: string
        }[]
        admissions:  {
            id: string,
            value: string
        }[]
        counties:  {
            id: string,
            value: string
        }[]
    },
    panelInformations: {
        hourlyFee: string,
        terms: string,
        correspondants: {
            id: string,
            value: string
        }[]
    },
    proposals: {
        id: string,
        name: string,
        entity: string,
        location: string,
        expertise: string,
        date: string,
        firm: string,
    }[],
    reviews: {
        id: string,
        name: string,
        entity: string,
        location: string,
        expertise: string,
        date: string
    }[],
    fees: {
        id: string,
        year: number,
        costCenter: string,
        totalAmount: number | string,
        firm: string
    }[]
}