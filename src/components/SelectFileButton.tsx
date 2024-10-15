
import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from '@/config/tw';


export const SelectFileButton = () => {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setSelectedFile(result);
  };

    return (
        <TouchableOpacity onPress={handleSelectFile}
        activeOpacity={0.8}
        
        style={tw`border-2 border-gray-100 py-3 rounded-2xl w-6/6 tablet:w-4/6 flex items-center justify-center`}
    >
            <Text style={tw`text-primary text-xl`}>{selectedFile ? selectedFile.name : '+'}</Text>

         </TouchableOpacity>
      );
}