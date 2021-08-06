export interface Services {
    get(): void,
    getById(id:string): void,
    post(body:any): void,
    delete(id: string): void,
    put(body:any):void
}