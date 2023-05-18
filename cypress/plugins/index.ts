const admin = require('firebase-admin')
const cypressFirebasePlugin = require('cypress-firebase').plugin

module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin)

  return extendedConfig
}
