export interface RawContact {
    id: string,
    fullName: string,
    organization: string,
    phones: string[],
    emails: string[],
    addresses: string[],
    birthday: number[],
    avatar: string,
}