const { override } = require("customize-cra");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const path = require("path");

module.exports = override(function(config, env) {
    // include lib
    config.module.rules.forEach(rule => {
        if (!Reflect.has(rule, 'oneOf')) {
            return false;
        }

        rule.oneOf.forEach(loader => {
            if (loader.test && loader.test.toString().includes('tsx')) {
                loader.include = [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, '../page-wallet/src'),
                    path.resolve(__dirname, '../page-deposit/src'),
                    path.resolve(__dirname, '../page-homa/src'),
                    path.resolve(__dirname, '../page-loan/src'),
                    path.resolve(__dirname, '../page-swap/src'),
                    path.resolve(__dirname, '../react-components/src'),
                    path.resolve(__dirname, '../react-environment/src'),
                    path.resolve(__dirname, '../react-hooks/src'),
                    path.resolve(__dirname, '../ui-components/src')
                ]
            }
        });
    });
    // remove ModuleScoplePlugin
    config.resolve.plugins = config.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
    );
    config.resolve.alias = {
        "@honzon-platform/apps": path.resolve(__dirname, "src"),
        "@honzon-platform/page-wallet": path.resolve(__dirname, "../page-wallet/src"),
        "@honzon-platform/page-deposit": path.resolve(__dirname, "../page-deposit/src"),
        "@honzon-platform/page-homa": path.resolve(__dirname, "../page-homa/src"),
        "@honzon-platform/page-loan": path.resolve(__dirname, "../page-loan/src"),
        "@honzon-platform/page-swap": path.resolve(__dirname, "../page-swap/src"),
        "@honzon-platform/react-components": path.resolve(__dirname, "../react-components/src"),
        "@honzon-platform/react-environment": path.resolve(__dirname, "../react-environment/src"),
        "@honzon-platform/react-hooks": path.resolve(__dirname, "../react-hooks/src"),
        "@honzon-platform/ui-components": path.resolve(__dirname, "../ui-components/src")
    };
    return config;
});