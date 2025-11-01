import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";
import type { EvolutionNode, PokemonAbout } from "@/types/pokemon";
import type { PokemonStat } from "pokenode-ts";
import { buildDetailPageImageUrl } from "@/utils/helpers";
import { Icon } from "../icons/Icon";

type Props = {
  about: PokemonAbout;
  evolution: EvolutionNode[];
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

function EvolutionCard({ id, name }: { id: number; name: string }) {
  return (
    <View style={style.shadowWrapper}>
      <View style={style.evoCard}>
        <ImageBackground
          source={{ uri: buildDetailPageImageUrl(id) }}
          style={{
            flex: 1,
            backgroundColor: "rgba(246, 246, 255, 1)",
            maxWidth: 80,
          }}
          resizeMode="cover"
        ></ImageBackground>
        <View style={style.evoInfoContainer}>
          <View style={style.evoTagContainer}>
            <Text style={style.evoId}>{String(id).padStart(3, "0")}</Text>
          </View>
          <Text style={style.evoName}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function PokemonDetailTabs({ about, evolution }: Props) {
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
        value={join(
          about.abilities
            .filter((a) => !a.is_hidden) // only non-hidden
            .map((a) => {
              const name = a.ability.name;
              return name.charAt(0).toUpperCase() + name.slice(1);
            }),
          (x) => x
        )}
      />
    </View>
  );

  const StatsRoute = () => (
    <View style={style.scene}>
      <StatBar label="HP" value={getStat(about.stats, "hp")} />
      <StatBar label="Attack" value={getStat(about.stats, "attack")} />
      <StatBar label="Defense" value={getStat(about.stats, "defense")} />
      <StatBar
        label="Special Attack"
        value={getStat(about.stats, "special-attack")}
      />
      <StatBar
        label="Special Defense"
        value={getStat(about.stats, "special-defense")}
      />
      <StatBar label="Speed" value={getStat(about.stats, "speed")} />
    </View>
  );

  const EvolutionRoute = () => (
    <View style={style.scene}>
      {evolution.length ? (
        <View style={style.evoList}>
          {evolution.map((evo, index) => (
            <React.Fragment key={evo.id}>
              <EvolutionCard id={evo.id} name={evo.name} />
              {index < evolution.length - 1 && (
                <View style={{ paddingHorizontal: 28, paddingBottom: 10 }}>
                  <Icon name="evolution" color="rgba(14, 9, 64, 1)" size={18} />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      ) : (
        <Text style={style.evoText}>No evolution data</Text>
      )}
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
    paddingHorizontal: 24,
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
    marginBottom: 10,
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
    fontWeight: "400",
    opacity: 0.65,
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
  evoCard: {
    flexDirection: "row",
    height: 80,
    borderRadius: 8,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  evoName: {
    marginTop: 8,
    color: "#0E0940",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
  evoId: {
    fontWeight: "500",
    fontSize: 10,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  evoTagContainer: {
    backgroundColor: "#5631E8",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  evoInfoContainer: {
    flexDirection: "column",
    flex: 3,
    paddingVertical: 17.5,
    paddingLeft: 12,
    alignItems: "flex-start",
  },
  evoList: {
    flexDirection: "column",
  },
  shadowWrapper: {
    shadowColor: "rgba(48, 55, 115, 1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    marginBottom: 10, // space so shadow is visible
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    // Android shadow
    elevation: 5,
    flexDirection: "row",
    //borderRadius: 8,
  },
});
