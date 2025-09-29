import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, COLORS } from '../styles/theme';
import Animated, { 
  useAnimatedStyle, 
  withSpring
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(View);

interface BoardProps {
  board: string[][];
  onCellPress: (row: number, col: number) => void;
  isXNext: boolean;
}

export const Board: React.FC<BoardProps> = ({ board, onCellPress, isXNext }) => {
  const getCellAnimatedStyle = (rowIndex: number, colIndex: number) => {
    return useAnimatedStyle(() => {
      const isEmpty = !board[rowIndex][colIndex];
      return {
        transform: [
          {
            scale: withSpring(isEmpty ? 1 : 1.05, {
              damping: 10,
              stiffness: 100,
            }),
          },
        ],
      };
    });
  };

  return (
    <View style={theme.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={theme.row}>
          {row.map((cell, colIndex) => (
            <AnimatedTouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={[
                theme.cell,
                rowIndex === 0 && styles.topCell,
                rowIndex === 2 && styles.bottomCell,
                colIndex === 0 && styles.leftCell,
                colIndex === 2 && styles.rightCell,
                getCellAnimatedStyle(rowIndex, colIndex),
                {
                  opacity: !cell ? (isXNext ? 0.8 : 0.6) : 1,
                },
              ]}
              onStartShouldSetResponder={() => {
                if (!cell) {
                  onCellPress(rowIndex, colIndex);
                }
                return true;
              }}
            >
              <Text
                style={[
                  theme.cellText,
                  {
                    color: cell === 'X' ? COLORS.primary : COLORS.secondary,
                  },
                ]}
              >
                {cell}
              </Text>
            </AnimatedTouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  topCell: {
    borderTopWidth: 0,
  },
  bottomCell: {
    borderBottomWidth: 0,
  },
  leftCell: {
    borderLeftWidth: 0,
  },
  rightCell: {
    borderRightWidth: 0,
  },
});
