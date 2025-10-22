import * as React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";
import type { PokemonAbout } from "@/types/pokemon";
import type { PokemonStat } from "pokenode-ts";

type Props = {
  about: PokemonAbout;
  evolutionNames: string[]; // we'll fill this later
};

const MAX_STAT = 255; // Pokémon base stat theoretical max

type Route = { key: string; title: string };

function KVRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={style.kvRow}>
      <Text style={style.kvLabel}>{label}</Text>
      <Text style={style.kvValue}>{value}</Text>
    </View>
  );
}

function join<T>(arr: T[], map: (x: T) => string) {
  return arr.map(map).join(", ");
}

function getStat(stats: PokemonStat[], key: string) {
  return stats.find((s) => s.stat.name === key)?.base_stat ?? 0;
}

function StatBar({
  label,
  value,
  max = MAX_STAT,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <View style={style.statBlock}>
      <View style={style.statHeader}>
        <Text style={style.statLabel}>{label}</Text>
        <Text style={style.statValue}>{value}</Text>
      </View>
      <View style={style.barBg}>
        <View style={[style.barFill, { width: `${pct * 100}%` }]} />
      </View>
    </View>
  );
}

export default function PokemonDetailTabs({ about, evolutionNames }: Props) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: "about", title: "About" },
    { key: "stats", title: "Stats" },
    { key: "evolution", title: "Evolution" },
  ]);

  const AboutRoute = () => (
    <View style={style.scene}>
      <KVRow
        label="Name"
        value={about.name.charAt(0).toUpperCase() + about.name.slice(1)}
      />
      <KVRow label="ID" value={`${String(about.id).padStart(3, "0")}`} />
      <KVRow label="Base" value={`${about.base_xp} XP`} />
      <KVRow label="Weight" value={`${(about.weight / 10).toFixed(1)} Kg`} />
      <KVRow label="Height" value={`${(about.height / 10).toFixed(1)} m`} />
      <KVRow
        label="Types"
        value={join(about.types, (t) => {
          const name = t.type.name;
          return name.charAt(0).toUpperCase() + name.slice(1);
        })}
      />
      <KVRow
        label="Abilities"
        value={join(about.abilities, (a) => {
          const name = a.ability.name;
          return name.charAt(0).toUpperCase() + name.slice(1);
        })}
      />
    </View>
  );

  const StatsRoute = () => (
    <View style={style.scene}>
      <StatBar label="HP" value={getStat(about.stats, "hp")} />
      <StatBar label="Attack" value={getStat(about.stats, "attack")} />
      <StatBar label="Defense" value={getStat(about.stats, "defense")} />
      <StatBar label="Special Attack" value={getStat(about.stats, "special-attack")} />
      <StatBar
        label="Special Defense"
        value={getStat(about.stats, "special-defense")}
      />
      <StatBar label="Speed" value={getStat(about.stats, "speed")} />
    </View>
  );

  const EvolutionRoute = () => (
    <View style={style.scene}>
      <Text style={style.evoText}>
        {evolutionNames.length
          ? evolutionNames.join(" → ")
          : "No evolution data"}
      </Text>
    </View>
  );

  const renderScene = SceneMap({
    about: AboutRoute,
    stats: StatsRoute,
    evolution: EvolutionRoute,
  });

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<Route> }
  ) => (
    <TabBar
      {...props}
      scrollEnabled={false}
      style={style.tabBar}
      activeColor="rgba(14, 9, 64, 1)"
      tabStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      options={{
        about: {
          labelText: "About",
          labelStyle: style.tabLabel,
        },
        stats: {
          labelText: "Stats",
          labelStyle: style.tabLabel,
        },
        evolution: {
          labelText: "Evolution",
          labelStyle: style.tabLabel,
        },
      }}
      indicatorStyle={{ backgroundColor: "#5631E8", height: 2 }}
      indicatorContainerStyle={{ marginBottom: -2 }}
    />
  );

  return (
    <TabView<Route>
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={style.tabView}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const style = StyleSheet.create({
  tabView: {
    marginHorizontal: 24,
    backgroundColor: "white",
  },
  tabBar: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(219, 218, 230, 1)",
    shadowOpacity: 0,
  },
  scene: {
    backgroundColor: "#fff",
    marginTop: 24,
    marginBottom:10,
  },
  tabLabel: {
    width: "100%",
    textAlign: "center",
    color: "rgba(219,218,230,1)",
    fontWeight: "600",
  },
  kvRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 16,
  },
  kvLabel: {
    color: "#0E0940",
    fontWeight: "600",
    fontSize: 14,
    width: 100,
    marginRight: 16,
    lineHeight: 18,
  },
  kvValue: {
    color: "#0E0940",
    opacity: 0.65,
    fontWeight: "400",
    lineHeight: 18,
  },
  statBlock: {
    marginBottom: 24,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  statLabel: {
    color: "#0E0940",
    fontWeight: "700",
  },
  statValue: {
    color: "#0E0940",
    fontWeight: "700",
    opacity: 0.8,
  },
  barBg: {
    height: 4,
    borderRadius: 99,
    backgroundColor: "#F3F3F7",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 99,
    backgroundColor: "#5631E8",
  },
  evoText: {
    color: "#0E0940",
    fontWeight: "600",
  },
});
