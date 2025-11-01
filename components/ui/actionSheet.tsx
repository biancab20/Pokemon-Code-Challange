import React, { useEffect, useMemo, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  BackHandler,
  AccessibilityInfo,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ActionItem = {
  label: string;
  onPress?: () => void;
  icon?: React.ReactNode; // pass your <Icon /> here if you want
};

type Props = {
  visible: boolean;
  options: ActionItem[];
  cancelText?: string; // default: "Cancel"
  onClose: () => void;
  backdropClosable?: boolean; // default: true
};

export function ActionSheet({
  visible,
  options,
  cancelText = "Cancel",
  onClose,
  backdropClosable = true,
}: Props) {
  const backdrop = useRef(new Animated.Value(0)).current; // 0..1
  const translateY = useRef(new Animated.Value(40)).current; // px
  const pendingActionRef = useRef<null | (() => void)>(null);

  // Animate in/out
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        AccessibilityInfo.announceForAccessibility?.("Options opened");
      });
    } else {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 0,
          duration: 160,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 40,
          duration: 180,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdrop, translateY]);

  // Android back button closes the sheet
  useEffect(() => {
    if (!visible || Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose]);

  const sheetStyle = useMemo(
    () => [styles.sheet, { transform: [{ translateY }] }],
    [translateY]
  );

  return (
    <Modal
      visible={visible}
      transparent // keep transparent so we can control layers
      animationType="none"
      onRequestClose={onClose}
      onDismiss={() => {
        const fn = pendingActionRef.current;
        pendingActionRef.current = null;
        if (fn) {
          // defer one tick so iOS is fully free to present native UIs
          requestAnimationFrame(() => setTimeout(fn, 0));
        }
      }}
      statusBarTranslucent
    >
      {/* 1) Opaque white cover: hides all app UI underneath */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#fff" }]} />

      {/* 2) Pressable black backdrop (animated to 30%) */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={backdropClosable ? onClose : undefined}
        android_ripple={{ color: "transparent" }}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "black",
              opacity: backdrop.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3], // 30%
              }),
            },
          ]}
        />
      </Pressable>

      {/* 3) Sheet content at the bottom */}
      <SafeAreaView pointerEvents="box-none" style={styles.safeArea}>
        <Animated.View style={sheetStyle}>
          <View style={styles.list}>
            {options.map((opt, idx) => {
              const border = idx < options.length - 1;
              return (
                <Pressable
                  key={`${opt.label}-${idx}`}
                  onPress={() => {
                    pendingActionRef.current = opt.onPress ?? null; // queue it
                    onClose(); // close the sheet
                  }}
                  style={[styles.row, border && styles.rowBorder]}
                  android_ripple={{ color: "#eee" }}
                >
                  {opt.icon ? (
                    <View style={styles.iconWrap}>{opt.icon}</View>
                  ) : null}
                  <Text style={[styles.rowText]}>{opt.label}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.cancelBlock}>
            <Pressable
              onPress={onClose}
              style={styles.cancelBtn}
              android_ripple={{ color: "#eee" }}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  title: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
  },
  list: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#DADADA",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  row: {
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ECECEC",
  },
  iconWrap: { marginRight: 20 },
  rowText: {
    fontSize: 18,
    color: "#000000", // your palette
    fontWeight: "400",
    textAlign: "left",
    letterSpacing: 0,
  },
  cancelBlock: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 14,
    overflow: "hidden",
  },
  cancelBtn: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 20,
    color: "#006DF8",
    fontWeight: "700",
  },
});
