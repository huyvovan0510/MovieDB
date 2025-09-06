import { ChevronDown } from '@/assets/svg';
import { colors } from '@/theme/colors';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedRef,
  SharedValue,
} from 'react-native-reanimated';

interface AccordionItemProps {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey?: string;
  style?: ViewStyle;
  duration?: number;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  duration?: number;
  disabled?: boolean;
  iconPosition?: 'left' | 'right';
  customIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inValid?: boolean;
}

function AccordionItem({
  isExpanded,
  children,
  viewKey = 'accordion',
  style,
  duration = 300,
}: AccordionItemProps) {
  const height = useSharedValue(0);
  const animatedRef = useAnimatedRef<View>();

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        ref={animatedRef}
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const ChevronIcon: React.FC<{ isExpanded: boolean; style?: ViewStyle }> = ({
  isExpanded,
  style,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isExpanded ? '180deg' : '0deg') }],
  }));

  return (
    <Animated.View style={[styles.chevron, animatedStyle, style]}>
      <ChevronDown />
    </Animated.View>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isExpanded: controlledIsExpanded,
  onToggle,
  titleStyle,
  containerStyle,
  contentStyle,
  headerStyle,
  duration = 300,
  disabled = false,
  leftIcon,
}) => {
  const [isExpandedState, setIsExpandedState] = React.useState(false);

  // Use controlled or internal state
  const isExpanded =
    controlledIsExpanded !== undefined ? controlledIsExpanded : isExpandedState;
  const expandedSharedValue = useSharedValue(isExpanded);

  React.useEffect(() => {
    expandedSharedValue.value = isExpanded;
  }, [isExpanded, expandedSharedValue]);

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const newExpandedState = !isExpanded;

    if (controlledIsExpanded === undefined) {
      setIsExpandedState(newExpandedState);
    }

    onToggle?.(newExpandedState);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.header, headerStyle, disabled && styles.disabledHeader]}
        onPress={handleToggle}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {leftIcon}
        <Text
          style={[styles.title, titleStyle, disabled && styles.disabledTitle]}
        >
          {title}
        </Text>
        <ChevronIcon isExpanded={isExpanded} />
      </TouchableOpacity>

      <AccordionItem
        isExpanded={expandedSharedValue}
        duration={duration}
        style={contentStyle}
      >
        <View style={styles.content}>{children}</View>
      </AccordionItem>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  disabledHeader: {
    opacity: 0.6,
  },
  title: {
    fontWeight: '600',
    flex: 1,
    marginHorizontal: 8,
  },
  disabledTitle: {
    color: colors.grayDark,
  },
  chevron: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    fontSize: 12,
    color: colors.grayDark,
    fontWeight: 'bold',
  },
  animatedView: {
    overflow: 'hidden',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
