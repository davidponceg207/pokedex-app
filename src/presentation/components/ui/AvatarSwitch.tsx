import { useContext, useState, useCallback } from 'react';
import { Card, Switch, Text } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleProp, ViewStyle } from 'react-native';

const cardStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  bottom: 20,
  left: 20,
  paddingVertical: 10,
  paddingHorizontal: 20,
};

const contentStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  gap: 15,
  alignItems: 'center',
};

export const AvatarSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { changeAvatarToShiny } = useContext(ThemeContext);

  const onToggleSwitch = useCallback(() => {
    setIsSwitchOn(prev => {
      const next = !prev;
      changeAvatarToShiny(next);
      return next;
    });
  }, [changeAvatarToShiny]);

  return (
    <Card style={cardStyle} contentStyle={contentStyle}>
      <Text variant="labelLarge" style={{ fontWeight: 800 }}>
        Shiny
      </Text>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </Card>
  );
};
