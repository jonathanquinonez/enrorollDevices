import Constants from 'expo-constants';
import { Dimensions, ScaledSize, StyleProp, ViewStyle } from 'react-native';

export const screenDimentions: ScaledSize = Dimensions.get('screen');
export const windowDimentions: ScaledSize = Dimensions.get('window');

export const marginStatusBar: StyleProp<any> = {
    marginTop: Constants.statusBarHeight,
};

export const statusBarView:  StyleProp<ViewStyle> = {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#0069A7'
};

export const safeScreen: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: '#0069A7'
}

export const container: StyleProp<any> = {
    flex: 1,
    width: screenDimentions.width,
    ...marginStatusBar
}

export const border: StyleProp<ViewStyle> = {
    borderColor: "black",
    borderWidth: 1,
}

export const centerElement: StyleProp<ViewStyle> = {
    justifyContent: 'center', 
    alignItems: 'center'
}



