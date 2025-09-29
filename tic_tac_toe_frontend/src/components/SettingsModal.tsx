import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { theme, COLORS } from '../styles/theme';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onToggleAI: () => void;
  isAIMode: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onToggleAI,
  isAIMode,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={theme.modalView}>
          <Text style={styles.title}>Settings</Text>
          
          <TouchableOpacity
            style={[theme.button, { marginVertical: 10 }]}
            onPress={onToggleAI}
          >
            <Text style={theme.buttonText}>
              {isAIMode ? 'Switch to 2 Players' : 'Switch to AI Mode'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.themeInfo}>
            Theme: Ocean Professional
          </Text>
          
          <TouchableOpacity
            style={[theme.button, { backgroundColor: COLORS.secondary, marginTop: 20 }]}
            onPress={onClose}
          >
            <Text style={theme.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  themeInfo: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 20,
    textAlign: 'center',
  },
});
