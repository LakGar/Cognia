import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState } from "react";
import moment from "moment";
import Swiper from "react-native-swiper";
import { useTheme } from "../../theme/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskView from "./TaskView";

const { width } = Dimensions.get("window");

const WeekView = () => {
  const swiper = useRef();
  const { theme } = useTheme();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const today = new Date();
  const [view, setView] = useState(true);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "week").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");
        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const toggleView = () => {
    setView(!view);
  };

  const goToToday = () => {
    setValue(today);
    const todayIndex = weeks.findIndex((weekDates) =>
      weekDates.some((day) => moment(day.date).isSame(today, "day"))
    );
    if (todayIndex !== -1) {
      swiper.current.scrollTo(todayIndex);
    }
    setValue(today);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
        paddingTop: 60,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
          <Text style={[styles.title, { color: theme.text }]}>August</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity
            style={[
              !view && {
                backgroundColor: theme.secondary,
                borderRadius: 3,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={toggleView}
          >
            <Ionicons
              name="list"
              size={24}
              color={!view ? "white" : theme.text}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search" size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: theme.accent,
              borderRadius: 15,
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.picker}>
        <Swiper
          index={1}
          ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={(ind) => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, "week").toDate());
              swiper.current.scrollTo(1, false);
            }, 100);
          }}
        >
          {weeks.map((dates, index) => (
            <View style={styles.itemRow} key={index}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  value.toDateString() === item.date.toDateString();
                const isToday = moment(item.date).isSame(today, "day");

                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setValue(item.date)}
                  >
                    <View
                      style={[
                        styles.item,
                        {
                          backgroundColor: isToday
                            ? theme.accent
                            : theme.secondary,
                        },
                        isActive && {
                          backgroundColor: theme.primary,
                          borderColor: theme.secondary,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && { color: "#fff" },
                        ]}
                      >
                        {item.weekday}
                      </Text>
                      <Text
                        style={[styles.itemDate, isActive && { color: "#fff" }]}
                      >
                        {item.date.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={styles.subtitle}>{value.toDateString()}</Text>
        <View style={styles.placeholder}>
          <TaskView />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={goToToday}>
          <Text style={[styles.btnText, { color: theme.accent }]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.btnText, { color: theme.accent }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.btnText, { color: theme.accent }]}>
            Schedule
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    height: "100%",
  },
  header: {
    paddingHorizontal: 16,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    textAlign: "center",
  },
  footer: {
    marginTop: 10,
    paddingHorizontal: 16,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */

  btnText: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
});

export default WeekView;
