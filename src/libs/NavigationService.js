let _navigator;

function initial(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.navigate(routeName, {
    ...params,
  });
}

function resetRoot(routeName, params) {
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
