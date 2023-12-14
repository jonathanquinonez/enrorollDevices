import { Method } from "axios";
import { CancelUpAppoimentDto } from "../models/appoiment";

type Endpoint = { url: string; method: Method; body?: any };

const AppoimentConfig = {
    //APPOIMENTS

    cancelUpAppoiment: (body: CancelUpAppoimentDto): Endpoint => ({
        method: 'post',
        url: `appointment/CancelAppointment`,
        body
      }),
}

export default AppoimentConfig ;