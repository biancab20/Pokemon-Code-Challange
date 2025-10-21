# Welcome to my Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It a Pokemon Code Challenge for the React Native course withing the Application Design and Development Minor.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

#### App functionality

- [x] Working Expo Go project, should be able to scan the QR code and see the app running on any device.
- [ ] PokeAPI is used to fetch Pokémon data https://pokeapi.co/
  - [ ] List of Pokémon is loaded from the API.
  - [ ] Pokémon details (metadata, stats, evolution chain) are loaded from the API.
- [ ] List of Pokémon is displayed in a FlatList.
  - [ ] Must be able to filter the list by name using the search bar.
- [ ] Pokémon details are displayed in a ScrollView.
  - [ ] Must be able to navigate to the Pokémon details page from the list.
  - [ ] Must be able to favorite the Pokémon.
  - [ ] Must display type(s) for the Pokémon and use a unique color for each type.
  - [ ] Pokémon detail tabs should be swipeable left and right.
- [ ] Favorites list is displayed in a FlatList.
  - [ ] Must be able to navigate to the Pokémon details page from the favorites list.
  - [ ] Must be able to unfavorite the Pokémon.
  - [ ] Empty state must be displayed when there are no favorites.
- [ ] Pokémon actions must include:
    - [ ] Favorite.
    - [ ] Share.
    - [ ] Open in detail view.
- [ ] All async operations must include an loading and error state.
    - [ ] Fetching Pokémon list.
    - [ ] Fetching Pokémon details.
    - [ ] Fetching Pokémon evolution chain.

#### Project setup
- [ ] Tanstack Query for API calls.
- [ ] Expo Router for navigation.
- [ ] SQLite for local storage.
- [ ] Uses Typescript with no TS errors.
- [ ] Uses ESLint with no ESLint errors. (ideally use [React Compiler Linter](https://docs.expo.dev/guides/react-compiler/#enabling-the-linter))
- [ ] Uses Separation of Concerns (determine a project structure that follows this principle).
- [ ] Expo Font is used to implement [the font](./assets/fonts.zip).


### Optional items
Each optional item is worth 1 extra point.

- [ ] Use of animations (e.g. loading in UI elements).
- [ ] Dark mode support (making use of theming).
- [ ] Pokémon list is paginated and infinite scroll is used.
- [ ] Clean Typescript: no use of `any`, typecasting `as SomeType`, or TS ignore comments.
- [ ] Pixel Perfect Design on either iOS or Android.
- [ ] No bugs, console errors and use of console.log.
- [ ] Added [localizations](https://docs.expo.dev/guides/localization/) for the app.
- [ ] Adds Pokémon Battle Feature.