import React, { useRef, useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { DataListProps, EditTitleArgs } from '../../screens/Dashboard';
import { Feather } from '@expo/vector-icons'

import {
    View,
    CardHeader,
    UserWrapper,
    Photo,
    User,
    UserName,
    Icons,
    ButtonEdit,
    IconEdit,
    ButtonDelete,
    IconDelete
} from './styles';

interface Props {
    data: DataListProps,
    buttonEdit: ({ titleId, postNewTitle }: EditTitleArgs) => void,
    buttonDelete: () => void,
    admin: boolean;
}

export function HeaderPost({ 
    data,
    buttonEdit,
    buttonDelete,
    admin
} : Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [postNewTitleValue, setPostNewTitleValue] = useState(data.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setPostNewTitleValue(data.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        buttonEdit({ titleId: data.id, postNewTitle: postNewTitleValue })
        setIsEditing(false)
    }

    useEffect(() => {
        if(textInputRef.current) {
            if(isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <View>
            <CardHeader>
                <UserWrapper>
                    <Photo source={{ uri: data.photo }}/>
                    <User>
                        <UserName>{ data.name }</UserName>
                        <TextInput 
                            value={postNewTitleValue}
                            onChangeText={setPostNewTitleValue}
                            editable={isEditing}
                            onSubmitEditing={handleSubmitEditing}
                            ref={textInputRef}
                        />
                    </User>
                </UserWrapper>
            
                {admin && (
                    <Icons>
                        {isEditing ? (
                            <TouchableOpacity
                                onPress={handleCancelEditing}
                                style={{ paddingHorizontal: 24 }}
                            >
                                <Feather name="x" size={24} color="#b2b2b2" />
                            </TouchableOpacity>
                        ) : (
                            <ButtonEdit onPress={handleStartEditing}>
                                <IconEdit name="edit"/>
                            </ButtonEdit>
                        )}

                        <ButtonDelete onPress={buttonDelete}>
                            <IconDelete name="delete" disabled={isEditing} style={{ opacity: isEditing ? 0.2 : 1 }}/>
                        </ButtonDelete>
                    </Icons>
                )}

            </CardHeader>
        </View>
    )
}
