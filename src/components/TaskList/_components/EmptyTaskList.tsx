//* Libraries imports
import { View, Text, StyleSheet } from 'react-native';
import { Clipboard } from 'phosphor-react-native';

//* Local imports
import theme from '../../../utils/theme';

export function EmptyTaskList() {
  const text = "Você ainda não tem tarefas cadastradas.";
  const text2 = "Clique no botão abaixo para adicionar uma nova tarefa.";

  return (
    <View style={styles.container}>
      <Clipboard size={48} color={theme.colors.gray[300]} />
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: theme.colors.gray[600],
    padding: 32,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: theme.colors.gray[200],
    marginTop: 16,
    textAlign: 'center',
  },
  text2: {
    fontSize: 16,
    color: theme.colors.gray[300],
    marginTop: 8,
    textAlign: 'center',
  }
});