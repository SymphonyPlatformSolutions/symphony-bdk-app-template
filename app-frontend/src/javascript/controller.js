/* eslint-disable */
// Create our own local controller service.
// We have namespaced local services with "template:"
let templateControllerService = SYMPHONY.services.register("template:controller");
let messageControllerService = SYMPHONY.services.register("message:controller");

// All Symphony services are namespaced with SYMPHONY
SYMPHONY.remote.hello().then(function(data) {

    // Register the application with the Symphony client:
    // Subscribe the application to remote (i.e. Symphony's) services
    // Register our own local services
    SYMPHONY.application.register(
        "template",
        ["modules", "applications-nav", "ui", "entity"],
        ["template:controller", "message:controller"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user.
        // If the application is reinstalled, the userReferenceId will change.
        let userId = response.userReferenceId;
        
        // Subscribe to Symphony's services:
        // To use the services, you must subscribe to it from your application
        const modulesService = SYMPHONY.services.subscribe("modules");
        const navService = SYMPHONY.services.subscribe("applications-nav");
        const uiService = SYMPHONY.services.subscribe("ui");
        const entityService = SYMPHONY.services.subscribe("entity");

        // Register a renderer for a "type" of entity
        entityService.registerRenderer(
            "com.symphony.timer",
            {},
            "message:controller"
        );

        // LEFT NAV: Add an entry to the left navigation for our application
        navService.add("template-nav", "Template App", "template:controller");

        // Implement some methods on our local service. These will be invoked by user actions.
        templateControllerService.implement({
        // LEFT NAV & MODULE: When the left navigation item is clicked on, invoke Symphony's module service to show our application in the grid
        select: function(id) {
            if (id == "template-nav") {
                // Focus the left navigation item when clicked
                navService.focus("template-nav");
            }

            modulesService.show("template", {title: "Template App"}, "template:controller", "https://localhost:4000/app.html", {
                // You must specify canFloat in the module options so that the module can be pinned
                "canFloat": true,
            });
            // Focus the module after it is shown
            modulesService.focus("template");
            },
        });        
    }.bind(this));
}.bind(this));
