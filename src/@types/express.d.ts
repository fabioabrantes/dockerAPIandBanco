type Client = {
  id:string;
}

declare namespace Express{
  export interface Request{
    user:Client;
  }
}