export type CancelUpAppoimentDto = {
    identifier :[
      {
        type : string, 
        value: string
      }
    ],
    communication: {
      language: string
    }
  }