'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var Supercluster = _interopDefault(require('supercluster'));
var useDeepCompareEffect = require('use-deep-compare-effect');
var dequal = _interopDefault(require('dequal'));

var useSupercluster = function useSupercluster(_ref) {
  var points = _ref.points,
      bounds = _ref.bounds,
      zoom = _ref.zoom,
      options = _ref.options;
  var superclusterRef = react.useRef();
  var pointsRef = react.useRef();

  var _useState = react.useState([]),
      clusters = _useState[0],
      setClusters = _useState[1];

  var zoomInt = Math.round(zoom);
  useDeepCompareEffect.useDeepCompareEffectNoCheck(function () {
    if (!superclusterRef.current || !dequal(pointsRef.current, points) || // @ts-ignore
    !dequal(superclusterRef.current.options, options)) {
      superclusterRef.current = new Supercluster(options);
      superclusterRef.current.load(points);
    }

    if (bounds) {
      setClusters(superclusterRef.current.getClusters(bounds, zoomInt));
    }

    pointsRef.current = points;
  }, [points, bounds, zoomInt, options]);
  return {
    clusters: clusters,
    supercluster: superclusterRef.current
  };
};

exports.default = useSupercluster;
//# sourceMappingURL=use-supercluster.cjs.development.js.map
