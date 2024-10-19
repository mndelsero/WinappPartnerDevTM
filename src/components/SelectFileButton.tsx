
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '@/config/tw';
import { FileInfo } from 'expo-file-system';

 

interface SelectFileButtonProps {
  onFileSelect: (file: { uri: string; name: string; mimeType: string }) => void;
  label: string;
}
const SelectFileButton: React.FC<SelectFileButtonProps> = ({ onFileSelect, label }) => {
 
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled) {  // Asegúrate de que sea un resultado exitoso
        console.log(result)
        const { uri, name, mimeType } = result.assets[0]
        
        onFileSelect({ uri, name, mimeType: mimeType || '' });
     setSelectedFile(name)
       
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };
  return (
    <TouchableOpacity onPress={pickDocument}
      activeOpacity={0.8}

      style={tw`border-2 border-gray-100 py-3 rounded-2xl w-6/6 tablet:w-4/6 flex items-center justify-center`}
    >
      <Text style={tw`text-primary text-xl`}>{selectedFile ? selectedFile : '+'}</Text>

    </TouchableOpacity>
  );
}

export default SelectFileButton;