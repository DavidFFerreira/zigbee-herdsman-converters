const exposes = require('../lib/exposes');
const fz = {...require('../converters/fromZigbee'), legacy: require('../lib/legacy').fromZigbee};
const tz = require('../converters/toZigbee');
const reporting = require('../lib/reporting');
const e = exposes.presets;

const lockExtend = {
    fromZigbee: [fz.lock, fz.battery, fz.lock_operation_event, fz.lock_programming_event, fz.lock_pin_code_response,
        fz.lock_user_status_response],
    toZigbee: [tz.lock, tz.pincode_lock, tz.lock_userstatus],
    meta: {pinCodeCount: 250, battery: {dontDividePercentage: true}},
    exposes: [e.lock(), e.battery(), e.pincode()],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['closuresDoorLock', 'genPowerCfg']);
        await reporting.lockState(endpoint);
        await reporting.batteryPercentageRemaining(endpoint);
    },
};

module.exports = [
    {
        zigbeeModel: ['YRD446 BLE TSDB'],
        model: 'YRD426NRSC',
        vendor: 'Yale',
        description: 'Assure lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRD226 TSDB', 'YRD226L TSDB'],
        model: 'YRD226HA2619',
        vendor: 'Yale',
        description: 'Assure lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRD256 TSDB', 'YRD256L TSDB'],
        model: 'YRD256HA20BP',
        vendor: 'Yale',
        description: 'Assure lock SL',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['iZBModule01', '0700000001'],
        model: 'YMF40/YDM4109+',
        vendor: 'Yale',
        description: 'Real living lock / Intelligent biometric digital lock',
        extend: lockExtend,
        // Increased timeout needed: https://github.com/Koenkk/zigbee2mqtt/issues/3290 for YDM4109+
        meta: {timeout: 20000},
    },
    {
        zigbeeModel: ['YRD210 PB DB'],
        model: 'YRD210-HA-605',
        vendor: 'Yale',
        description: 'Real living keyless push button deadbolt lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRL220 TS LL'],
        // The zigbee module card indicate that the module will work on YRD 221 and YRD 221RL also
        model: 'YRL-220L',
        vendor: 'Yale',
        description: 'Real living keyless leveler lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRD226/246 TSDB'],
        model: 'YRD226/246 TSDB',
        vendor: 'Yale',
        description: 'Assure lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRD220/240 TSDB'],
        model: 'YRD220/YRD221',
        vendor: 'Yale',
        description: 'Lockwood keyless push button deadbolt lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRD246 TSDB'],
        model: 'YRD246HA20BP',
        vendor: 'Yale',
        description: 'Assure lock key free deadbolt with Zigbee',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRD216 PBDB'],
        model: 'YRD216-HA2-619',
        vendor: 'Yale',
        description: 'Real living keyless push button deadbolt lock',
        extend: lockExtend,
    },
    {
        zigbeeModel: ['YRL226L TS'],
        model: 'YRL226L TS',
        vendor: 'Yale',
        description: 'Assure lock SL',
        extend: lockExtend,
    },
];
