import React from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const EditModal = ({
  modalVisible,
  setModalVisible,
  currentNote,
  setCurrentNote,
  addNote,
  deleteNote,
  existingNoteObject,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {existingNoteObject?.note ? "Update Note" : "Add Note"}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your note..."
            value={currentNote.note || existingNoteObject?.note}
            multiline
            onChangeText={(value) =>
              setCurrentNote({ ...currentNote, note: value })
            }
          />
          <View style={styles.buttonContainer}>
            {existingNoteObject?.note ? (
              <>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#22bb33" }]}
                  onPress={addNote}
                >
                  <Text style={styles.buttonText}>Update Note</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={() => deleteNote(existingNoteObject?.text)}
                >
                  <Text style={styles.buttonText}>Delete Note</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#22bb33" }]}
                onPress={addNote}
              >
                <Text style={styles.buttonText}>Add Note</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
};
