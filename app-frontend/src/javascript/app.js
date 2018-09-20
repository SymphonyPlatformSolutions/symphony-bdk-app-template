/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app';

// Create our own local service pertaining to the application module
// We have namespaced local services with "template:"
let templateAppService = SYMPHONY.services.register("template:app");

SYMPHONY.remote.hello().then(function(data) {
    // Set the theme of the app module
    let themeColor = data.themeV2.name;
    let themeSize = data.themeV2.size;
    // You must add the symphony-external-app class to the body element
    document.body.className = "symphony-external-app " + themeColor + " " + themeSize;

    SYMPHONY.application.connect(
        "template",
        ["modules", "applications-nav", "ui"],
        ["template:app"]).then(function(response){

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user.
        // If the application is reinstalled, the userReferenceId will change.
        let userId = response.userReferenceId;

        // Subscribe to Symphony's services
        const modulesService = SYMPHONY.services.subscribe("modules");
        const navService = SYMPHONY.services.subscribe("applications-nav");
        const uiService = SYMPHONY.services.subscribe("ui");

        uiService.listen("themeChangeV2", function() {
            SYMPHONY.remote.hello().then(function(theme) {
                themeColor = theme.themeV2.name;
                themeSize = theme.themeV2.size;
                document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
            });
        });

        // Add a menu item to the module's Menu (the three dots menu).
        modulesService.addMenuItem("template", "About template", "template-menu-item");
        // You must specify your own application service for handling clicks on the menu item
        modulesService.setHandler("template", "template:app");

        // Implement methods on the application module service
        templateAppService.implement({
            menuSelect: function(itemId)  {
                if (itemId == "template-menu-item"){
                    document.getElementById("about-template-app").className = "";
                }
            }

        });
        ReactDOM.render(
            <App userId={userId} />, document.getElementById('root')
        );
    }.bind(this));
}.bind(this));
