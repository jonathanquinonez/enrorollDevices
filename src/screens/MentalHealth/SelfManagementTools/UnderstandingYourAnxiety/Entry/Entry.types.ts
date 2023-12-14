
export interface EntryProps {
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  setIdSelected: React.Dispatch<React.SetStateAction<number>>;
  onPress: any;
  currentPosition: number;
  idSelected: number;
  setStepTwo : boolean; 
  changeStepTwo: any;
}
export interface RectangleProps {
  width: number,
  idSelected: number | undefined,
  onPress: (id: number) => void;
  text: string,
  id: number,
  position: number
}

export interface RenderStartProps {
  title: string,
  scroll: number
}