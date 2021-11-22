const {PlatformId} = require('@fightmegg/riot-api')
 
module.exports = {
    strValid: str => str && typeof str === 'string' 
        && str.replaceAll(/ +/g, '') !== '',
    // ensure region exists and is a valid PlatformId value
    regValid: reg => reg && typeof reg === 'string'
        && ((Object.values(PlatformId).indexOf(reg)) > -1) 
}