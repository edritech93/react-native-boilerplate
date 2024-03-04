import {NavigationContainerRef} from '@react-navigation/native';

let _navigator: NavigationContainerRef<any>;

function initial(ref: NavigationContainerRef<any>) {
  _navigator = ref;
}

function navigate(routeName: string, params?: any) {
  _navigator.navigate(routeName, {
    ...params,
  });
}

function resetRoot(routeName: string) {
  _navigator.resetRoot({
    index: 0,
    routes: [{name: routeName}],
  });
}

export default {
  initial,
  navigate,
  resetRoot,
};
