import { useRef, useState } from 'react';
import Supercluster from 'supercluster';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import dequal from 'dequal';

var useSupercluster = function useSupercluster(_ref) {
  var points = _ref.points,
      bounds = _ref.bounds,
      zoom = _ref.zoom,
      options = _ref.options;
  var superclusterRef = useRef();
  var pointsRef = useRef();

  var _useState = useState([]),
      clusters = _useState[0],
      setClusters = _useState[1];

  var zoomInt = Math.round(zoom);
  useDeepCompareEffectNoCheck(function () {
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

export default useSupercluster;
//# sourceMappingURL=use-supercluster.esm.js.map
