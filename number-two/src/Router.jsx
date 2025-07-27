import { useEffect } from "react";

function Router({ graphicsLayer, PointA, PointB }) {
    useEffect(() => {
        const solveRoute = async () => {
            try {
                const [routeModule, Collection, RouteParameters, Stop] = await Promise.all([
                    import("@arcgis/core/rest/route"),
                    import("@arcgis/core/core/Collection").then(mod => mod.default),
                    import("@arcgis/core/rest/support/RouteParameters").then(mod => mod.default),
                    import("@arcgis/core/rest/support/Stop").then(mod => mod.default)
                ]);

                const { solve } = routeModule;

                const routeUrl =
                    "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

                const stops = new Collection([
                    new Stop({
                        geometry: PointA, // JFK Airport
                        name: "JFK Airport"
                    }),
                    new Stop({
                        geometry: PointB, // Empire State Building
                        name: "Empire State Building"
                    }),
                ]);

                const routeParams = new RouteParameters({
                    returnRoutes: true,
                    stops
                });

                const result = await solve(routeUrl, routeParams);
                const route = result.routeResults[0].route;
                graphicsLayer.graphics.removeAll();
                graphicsLayer.graphics.add(route);

            } catch (error) {
                console.error("Error solving route:", error);
            }
        };

        solveRoute();
    }, [graphicsLayer]);

    return null; // This component doesn't render anything
}

export default Router;
