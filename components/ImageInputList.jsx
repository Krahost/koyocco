import React, { useState } from "react";
import { View } from "react-native";

// External Libraries
import DraggableFlatList from "react-native-draggable-flatlist";

// Custom Components & Constants
import ImageInput from "./ImageInput";
import AppButton from "./AppButton";
import { useStateValue } from "../StateProvider";
import { __ } from "../language/stringPicker";

const ImageInputList = ({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  maxCount,
  reorder,
  type,
}) => {
  const [{ appSettings }] = useStateValue();
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const renderImageItem = ({ item, drag, isActive }) => {
    return (
      <ImageInput
        imageUri={item}
        onChangeImage={() => onRemoveImage(item)}
        drag={drag}
        active={isActive}
        display={true}
        type={type}
      />
    );
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: "3%",
          marginVertical: !imageUris.length ? 15 / 2 : 15,
        }}
      >
        <DraggableFlatList
          ListHeaderComponent={
            imageUris.length < maxCount && (
              <ImageInput
                onChangeImage={(uri) => {
                  onAddImage(uri);
                  setPhotoModalVisible(false);
                }}
                addingImage={photoModalVisible}
                closePhotoModal={() => setPhotoModalVisible(false)}
                display={false}
                type={type}
              />
            )
          }
          data={imageUris}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={({ data }) => {
            if (type) {
              return;
            }
            reorder(data);
          }}
          horizontal
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <AppButton
          title={
            !maxCount || maxCount == 1
              ? __("imageInputListTexts.addPhotoButtonTitle", appSettings.lng)
              : __("imageInputListTexts.addPhotosButtonTitle", appSettings.lng)
          }
          style={{ width: "40%" }}
          onPress={() => {
            setPhotoModalVisible(true);
          }}
          disabled={imageUris.length >= maxCount}
        />
      </View>
    </>
  );
};

export default ImageInputList;
