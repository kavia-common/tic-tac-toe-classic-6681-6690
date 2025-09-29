import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Board } from './src/components/Board';
import { SettingsModal } from './src/components/SettingsModal';
import { checkWinner, getAIMove } from './src/utils/gameLogic';
import { theme, COLORS } from './src/styles/theme';

export default function App() {
  const [board, setBoard] = useState<string[][]>(Array(3).fill('').map(() => Array(3).fill('')));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isAIMode, setIsAIMode] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    if (isAIMode && !isXNext) {
      const timer = setTimeout(() => {
        const { row, col } = getAIMove(board);
        handleCellPress(row, col);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAIMode, isXNext, board]);

  const handleCellPress = (row: number, col: number) => {
    if (board[row][col] || checkWinner(board)) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      if (winner === 'draw') {
        Alert.alert('Game Over', 'It\'s a draw!');
      } else {
        Alert.alert('Game Over', `Player ${winner} wins!`);
        setScores(prev => ({
          ...prev,
          [winner]: prev[winner as keyof typeof prev] + 1
        }));
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(3).fill('').map(() => Array(3).fill('')));
    setIsXNext(true);
  };

  const toggleAIMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
    setScores({ X: 0, O: 0 });
  };

  return (
    <View style={theme.container}>
      <StatusBar style="auto" />
      
      <TouchableOpacity
        style={theme.settingsButton}
        onPress={() => setSettingsVisible(true)}
      >
        <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={theme.scoreText}>
          {isAIMode ? 'Player vs AI' : 'Player vs Player'}
        </Text>
        
        <Text style={theme.scoreText}>
          X: {scores.X} - O: {scores.O}
        </Text>

        <Board 
          board={board} 
          onCellPress={handleCellPress} 
          isXNext={isXNext}
        />

        <TouchableOpacity
          style={[theme.button, { marginTop: 20 }]}
          onPress={resetGame}
        >
          <Text style={theme.buttonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>

      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onToggleAI={toggleAIMode}
        isAIMode={isAIMode}
      />
    </View>
  );
}
