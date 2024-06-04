import { useWindowDimensions } from "react-native";

export function usePinDimensions(
    margin?: number
): [number, number] {
    const { height, width } = useWindowDimensions();
    const pinWidth = Math.min(
        width - (margin === undefined ? 0 : margin) * 2,
        400
    );
    const pinHeight = 200;

    return [pinWidth, pinHeight];
}