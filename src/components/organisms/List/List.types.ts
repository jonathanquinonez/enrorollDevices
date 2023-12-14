import { ReactElement } from "react";
import { InfLabels } from "src/components/molecules/Card/CardList/CardList.type";

export interface ListProps {
    button?: Button[];

    data: any[];

    totalData: number;

    titleCard: any;

    cardLabels: InfLabels[]

    typeBody: 'referals' | 'labs' | 'register' | 'inmunization' | 'upcoming' | 'previus' | 'medication' | 'insurance' | 'referralsDetails';

    iconWhenNoResults?: {
        nameImg: string;
        subtitle: string;
    }

    paginator?: JSX.Element;
}

interface Button {
    name: string;
    onSubmit: (item?: any) => void;
}